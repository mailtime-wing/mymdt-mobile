/**
 * styled-component allows attaching prop to a styled component as below:
 *
 * const Password = styled(AppText).attrs({ variant: 'body1' })`
 *   color: blue;
 * `;
 *
 * But emotion does not.
 *
 * This `withAttrs` utilily function exists to workaround this feature
 * https://github.com/emotion-js/emotion/issues/821
 *
 * Usage example:
 *
 * const Description = styled(withAttrs(AppText, {variant: 'body1'}))`
 *   color: ${props => props.theme.colors.textOnBackground.mediumEmphasis};
 * `;
 */
import React from 'react';

export default function withAttrs(Component, attrs) {
  return props => <Component {...attrs} {...props} />;
}
