import React from 'react';
import {FormattedMessage} from 'react-intl';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'emotion-theming';
import SafeAreaView from 'react-native-safe-area-view';

import {Container, LabelText, styles} from './style';

import BrowseScreen from '@/screens/BrowseScreen';
import BonusScreen from '@/screens/BonusScreen';
import WalletScreen from '@/screens/WalletScreen';
import RedeemScreen from '@/screens/RedeemScreen';
import ConverterScreen from '@/screens/ConverterScreen';
import WithdrawalScreen from '@/screens/WithdrawalScreen';
import MissingReceiptScreen from '@/screens/MissingReceiptScreen';
import CloseButton from '@/components/CloseButton';

import {
  TOP_BAR_HEIGHT,
  MARGIN_BETWEEN_MODAL_HEAD_AND_TOP_BAR,
} from '@/constants/layout';

import BrowseIcon from '@/assets/browse.svg';
import BonusIcon from '@/assets/bonus.svg';
import RedeemIcon from '@/assets/redeem.svg';
import PointIcon from '@/assets/point.svg';

const Tab = createBottomTabNavigator();
const WalletStack = createStackNavigator();

const walletStackScreens = [
  {name: 'wallet', component: WalletScreen},
  {name: 'converter', component: ConverterScreen, modal: true},
  {name: 'withdrawal', component: WithdrawalScreen, modal: true},
  {name: 'missing_receipt', component: MissingReceiptScreen, modal: true},
];

const Label = ({focused, id}) => (
  <LabelText focused={focused}>
    <FormattedMessage id={id} />
  </LabelText>
);

const TabNavigatorContainer = () => {
  const theme = useTheme();
  const white = theme.colors.white.normal;
  const grey = theme.colors.black.light;
  const iconWidth = 24;
  const iconHeight = 24;
  const strokeWidth = 2;

  return (
    <>
      <SafeAreaView
        style={[styles.safeAreaViewContainer, styles.safeAreaView]}
      />
      <Tab.Navigator
        initialRouteName="Browse"
        tabBarOptions={{
          activeTintColor: white,
          inactiveTintColor: grey,
          activeBackgroundColor: theme.colors.secondary.normal,
          inactiveBackgroundColor: white,
          labelPosition: 'below-icon',
          style: styles.tabBarContainer,
          // tabStyle: [styles.tabBar, styles.tabBarShadow],
          tabStyle: styles.tabBar, // TODO: no tabstyle for active / inactive
        }}>
        <Tab.Screen
          name="Browse"
          component={BrowseScreen}
          options={{
            tabBarLabel: ({focused}) => <Label id="browse" focused={focused} />,
            tabBarIcon: ({focused}) => (
              <BrowseIcon
                width={iconWidth}
                height={iconHeight}
                strokeWidth={strokeWidth}
                stroke={focused ? white : grey}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Bonus"
          component={BonusScreen}
          options={{
            tabBarLabel: ({focused}) => <Label id="bonus" focused={focused} />,
            tabBarIcon: ({focused}) => (
              <BonusIcon
                width={iconWidth}
                height={iconHeight}
                strokeWidth={strokeWidth}
                stroke={focused ? white : grey}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Redeem"
          component={RedeemScreen}
          options={{
            tabBarLabel: ({focused}) => <Label id="redeem" focused={focused} />,
            tabBarIcon: ({focused}) => (
              <RedeemIcon
                width={iconWidth}
                height={iconHeight}
                strokeWidth={strokeWidth}
                stroke={focused ? white : grey}
              />
            ),
          }}
        />
        <Tab.Screen
          name="wallet"
          component={WalletTabStack}
          options={{
            tabBarLabel: ({focused}) => <Label id="wallet" focused={focused} />,
            tabBarIcon: ({focused}) => (
              <PointIcon
                width={iconWidth}
                height={iconHeight}
                strokeWidth={strokeWidth}
                stroke={focused ? white : grey}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const WalletTabStack = () => {
  const modalHeaderStyle = {
    ...styles.header,
    height: MARGIN_BETWEEN_MODAL_HEAD_AND_TOP_BAR + TOP_BAR_HEIGHT,
  };

  const modalCardStyle = [
    {
      ...styles.card,
    },
    styles.modalCard,
  ];

  return (
    <WalletStack.Navigator
      mode="modal"
      initialRouteName={walletStackScreens[0].name}>
      {walletStackScreens.map(screen => (
        <WalletStack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            headerTransparent: true,
            headerTitleStyle: styles.headerTitle,
            headerStyle: modalHeaderStyle,
            cardStyle: screen.modal ? modalCardStyle : styles.card,
            headerLeft: props =>
              screen.modal ? <CloseButton {...props} /> : null,
            cardOverlayEnabled: true,
            gestureEnabled: true,
            headerStatusBarHeight: 0,
          }}
        />
      ))}
    </WalletStack.Navigator>
  );
};

const HomeStack = props => {
  return (
    <Container>
      <TabNavigatorContainer {...props} />
    </Container>
  );
};

export default HomeStack;
