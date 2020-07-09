import React from 'react';
import {FormattedMessage} from 'react-intl';
import ModalContaienr from '@/components/ModalContainer';
import Button from '@/components/Button';
import OfferList from '@/components/OfferList';

import {Detail, Header, NumberOfBrand, RowContainer} from './style';

const selectedOffers = [
  {id: '111', name: 'AAAA'},
  {id: '333', name: 'CCCC'},
  {id: '555', name: 'EEEE'},
  {id: '666', name: 'FFFF'},
  {id: '777', name: 'GGGG'},
];

const OfferPreferenceEditScreen = () => {
  return (
    <ModalContaienr title={<FormattedMessage id="favorite_brands" />}>
      <Detail>
        <FormattedMessage id="edit_preference_in_30_days" />
      </Detail>
      <RowContainer>
        <Header>
          <FormattedMessage id="max_choices" />
        </Header>
        <NumberOfBrand>3 Brands</NumberOfBrand>
      </RowContainer>
      <Detail>
        <FormattedMessage id="choose_more_brand_when_upgrade" />
      </Detail>
      <RowContainer>
        <Header>
          <FormattedMessage id="your_choices" />
        </Header>
        <Button medium>
          <FormattedMessage id="edit" />
        </Button>
      </RowContainer>
      <Detail>
        <FormattedMessage id="get_reward_from_brands" />
      </Detail>
      <OfferList offerList={selectedOffers} />
    </ModalContaienr>
  );
};

export default OfferPreferenceEditScreen;
