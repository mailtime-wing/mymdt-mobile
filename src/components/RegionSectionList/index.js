import React from 'react';
import {FormattedMessage} from 'react-intl';

import LoadingSpinner from '@/components/LoadingSpinner';
import useFetch from '@/hooks/useFetch';
import bankSyncServerDataAPIType from '@/enum/bankSyncServerDataAPIType';

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
];

const ChooseRegionScreen = ({onItemPress}) => {
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    // TODO: handle error
  }

  /** @type {Object.<string, Array<any>} */
  const dataByContinent = {};
  fetchedData?.countryData?.forEach(countryItem => {
    if (!dataByContinent[countryItem.continent]) {
      dataByContinent[countryItem.continent] = [];
    }

    if (supportedDataAPIType.includes(countryItem.dataAPIType)) {
      dataByContinent[countryItem.continent].push(countryItem);
    }
  });
  const data = Object.keys(dataByContinent)
    .filter(continent => dataByContinent[continent].length > 0)
    .map(continent => ({
      continent,
      data: dataByContinent[continent],
    }));

  return (
    <SectionList
      sections={data}
      keyExtractor={item => item._id}
      renderItem={renderItem}
      renderSectionHeader={({section: {continent}}) => (
        <Section>
          <SectionText>{continent}</SectionText>
        </Section>
      )}
      ListHeaderComponent={
        <Header>
          <Title>Choose region</Title>
          <Description>
            Choose the issue region of your credit/debit card.
          </Description>
        </Header>
      }
    />
  );
};

export default ChooseRegionScreen;
