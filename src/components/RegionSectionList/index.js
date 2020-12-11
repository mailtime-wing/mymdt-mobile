import React from 'react';
import {FormattedMessage} from 'react-intl';

import LoadingSpinner from '@/components/LoadingSpinner';
import useFetch from '@/hooks/useFetch';
import bankSyncServerDataAPIType from '@/enum/bankSyncServerDataAPIType';
import {GET_USER_PHONE_NUMBER} from '@/api/data';
import useQueryWithAuth from '@/hooks/useQueryWithAuth';
import countryCodeData from '@/constants/countryCode';

import {
  SectionList,
  Header,
  Title,
  Description,
  Section,
  SectionText,
  Item,
  ItemText,
  CountryFlag,
} from './style';

const initialFetchOptions = {
  method: 'GET',
};

// TODO: support other providers
const supportedDataAPIType = [
  bankSyncServerDataAPIType.PLAID,
  bankSyncServerDataAPIType.PLANTO,
  bankSyncServerDataAPIType.CREDIGO,
];

const ChooseRegionScreen = ({onItemPress}) => {
  const {data: userData, loading} = useQueryWithAuth(GET_USER_PHONE_NUMBER);
  const userPhoneNumber = userData?.userProfile?.phoneNumber;
  const userCountryCode = countryCodeData.find((c) =>
    userPhoneNumber.includes(c.dial_code),
  )?.code;

  const [, {data: fetchedData, isError, isLoading}] = useFetch(
    'https://bankwebhook-alpha.reward.me/bankcountryconfig',
    {
      initialFetchOptions,
    },
  );

  const renderItem = ({item}) => (
    <Item
      onPress={() =>
        onItemPress({
          type: item.dataAPIType,
          countryCode: item.countryCode,
        })
      }>
      <CountryFlag
        source={{
          uri: `${fetchedData.imgBaseUrl}${item.countryFlag._meta.key}`,
        }}
      />
      <ItemText>
        <FormattedMessage
          id={item.countryCode}
          defaultMessage={item.countryCode}
        />
      </ItemText>
    </Item>
  );

  if (loading || isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    // TODO: handle error
  }

  /** @type {Object.<string, Array<any>} */
  const dataByContinent = {};
  fetchedData?.countryData?.forEach((countryItem) => {
    if (!dataByContinent[countryItem.continent]) {
      dataByContinent[countryItem.continent] = [];
    }

    if (supportedDataAPIType.includes(countryItem.dataAPIType)) {
      dataByContinent[countryItem.continent].push(countryItem);
    }
  });
  const data = Object.keys(dataByContinent)
    .filter((continent) => dataByContinent[continent].length > 0)
    .map((continent) => ({
      continent,
      data: dataByContinent[continent],
    }));

  let sortedData = data;
  if (userCountryCode) {
    let targetIndex;
    data.forEach((continent, index) => {
      continent.data.forEach((countryData) => {
        if (countryData.countryCode === userCountryCode) {
          targetIndex = index;
        }
      });
    });

    sortedData = data.filter((continent, index) => index !== targetIndex);
    sortedData.unshift(data[targetIndex]);
  }

  return (
    <SectionList
      sections={sortedData}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      renderSectionHeader={({section: {continent}}) => (
        <Section>
          <SectionText>{continent}</SectionText>
        </Section>
      )}
      ListHeaderComponent={
        <Header>
          <Title>
            <FormattedMessage
              id="choose_region"
              defaultMessage="Choose region"
            />
          </Title>
          <Description>
            <FormattedMessage
              id="choose_issue_region"
              defaultMessage="Choose the issue region of your credit/debit card."
            />
          </Description>
        </Header>
      }
    />
  );
};

export default ChooseRegionScreen;
