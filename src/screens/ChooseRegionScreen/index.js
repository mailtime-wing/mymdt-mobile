import React from 'react';
import {
  Container,
  SectionList,
  Header,
  Title,
  Description,
  Section,
  SectionText,
  Item,
  ItemText,
} from './style';

const DATA = [
  {
    region: 'Americas',
    data: [
      {
        id: '1',
        country: 'United States',
      },
      {
        id: '2',
        country: 'Canada',
      },
    ],
  },
  {
    region: 'Europe',
    data: [
      {
        id: '3',
        country: 'United Kingdom',
      },
      {
        id: '4',
        country: 'France',
      },
    ],
  },
];

const ChooseRegionScreen = ({route, navigation}) => {
  const renderItem = ({item}) => (
    <Item onPress={() => navigation.navigate(route.params.next)}>
      <ItemText>{item.country}</ItemText>
    </Item>
  );

  return (
    <Container hasTopBar>
      <SectionList
        sections={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={({section: {region}}) => (
          <Section>
            <SectionText>{region}</SectionText>
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
    </Container>
  );
};

export default ChooseRegionScreen;
