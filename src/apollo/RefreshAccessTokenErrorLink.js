/**
 * implementation reference:
 * https://github.com/apollographql/apollo-client/blob/4658694f2e11e4f73a73690064e92a9ad5a0f65e/src/link/error/index.ts
 * https://able.bio/AnasT/apollo-graphql-async-access-token-refresh--470t1c8
 */

import {ApolloLink} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {fromPromise} from '@apollo/client/core';

import {AUTH_TOKENS, REFRESH_TOKEN_API} from '@/api/auth';

/**
 * @typedef {import('@apollo/client').ApolloClient} ApolloClient
 */

export default class RefreshAccessTokenErrorLink extends ApolloLink {
  constructor() {
    super();
    this.isRefreshing = false;
    this.pendingRequests = [];
    this.link = onError(this.errorHandler);
  }

  errorHandler = ({networkError, operation, forward}) => {
    /** @type {ApolloClient} */
    const client = operation.client;
    const auth = operation.getContext().auth;
    if (networkError?.statusCode === 401 && client && auth) {
      let forward$;

      if (!this.isRefreshing) {
        this.isRefreshing = true;

        const fetch = async () => {
          const {refreshToken} = client.readQuery({
            query: AUTH_TOKENS,
          });

          try {
            const {data} = await client.mutate({
              mutation: REFRESH_TOKEN_API,
              variables: {
                refreshToken,
              },
            });

            client.writeQuery({
              query: AUTH_TOKENS,
              data: {
                accessToken: data.refreshAccessToken,
              },
            });

            this.resolvePendingRequests(true);
            this.isRefreshing = false;
            console.info('token refreshed');
            return true;
          } catch (error) {
            this.resolvePendingRequests(false);
            // TODO: Handle token refresh errors e.g clear stored tokens, redirect to login, ...
            client.writeQuery({
              query: AUTH_TOKENS,
              data: {
                isRefreshTokenExpired: true,
              },
            });
            throw networkError;
          }
        };

        forward$ = fromPromise(fetch()).filter((value) => Boolean(value));
      } else {
        // Will only emit once the Promise is resolved
        forward$ = fromPromise(
          new Promise((resolve, reject) => {
            this.pendingRequests.push((done) => {
              if (!done) {
                reject(networkError);
                return;
              }

              resolve();
            });
          }),
        );
      }

      return forward$.flatMap(() => forward(operation));
    }
  };

  resolvePendingRequests = (done) => {
    this.pendingRequests.map((callback) => callback(done));
    this.pendingRequests = [];
  };

  request(operation, forward) {
    return this.link.request(operation, forward);
  }
}
