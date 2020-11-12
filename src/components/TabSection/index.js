import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTheme} from 'emotion-theming';

import AppText from '@/components/AppText2';

import {
  tabGroupContainer,
  tabContainer,
  tabNameStyle,
  activeBottomBar,
} from './style';

const TabSection = ({
  tabList,
  activeTextColor,
  activeTabColor,
  RenderTabContent,
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <View style={tabGroupContainer}>
        {tabList.map(({name}, index) => {
          const active = index === activeTab;
          return (
            <TouchableOpacity
              key={`${name}_${index}`}
              style={tabContainer(theme)}
              onPress={() => handleTabPress(index)}>
              <AppText
                variant="button"
                style={tabNameStyle(
                  theme,
                  index === activeTab,
                  activeTextColor,
                )}>
                {name}
              </AppText>
              {active && <View style={activeBottomBar(activeTabColor)} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <RenderTabContent index={activeTab} />
    </>
  );
};

export default TabSection;
