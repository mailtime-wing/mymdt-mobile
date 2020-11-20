import React, {useState, useEffect} from 'react';
import {useTheme} from 'emotion-theming';
import {
  Option,
  OptionHeader,
  RightSide,
  OptionsContainer,
  headerLabelStyle,
  labelStyle,
} from './style';

import AppText from '@/components/AppText2';

import ChevronUpIcon from '@/assets/chevron_up.svg';
import ChevronDownIcon from '@/assets/chevron_down.svg';
import ActiveRadioIcon from '@/assets/active_radio.svg';
import RadioIcon from '@/assets/radio.svg';

const BottomSheetOptionList = ({
  title,
  options,
  currentActive,
  onItemPress,
  onBankItemPress,
  sectionIndex,
}) => {
  const theme = useTheme();
  const [isExpand, setIsExpand] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const headerActive = activeItemIndex !== null;
  const handleOptionHeaderPress = () => {
    setIsExpand(!isExpand);
  };

  const handleOptionPress = (optionIndex) => {
    setActiveItemIndex(optionIndex);
    onItemPress(sectionIndex, optionIndex);
  };

  const handleBankOptionPress = (bankObj, optionIndex) => {
    onBankItemPress(bankObj.subType, bankObj.mask);
    setActiveItemIndex(optionIndex);
    onItemPress(sectionIndex, optionIndex);
  };

  useEffect(() => {
    if (!currentActive) {
      setActiveItemIndex(null);
    }
  }, [currentActive]);

  return (
    <>
      <OptionHeader active={headerActive} onPress={handleOptionHeaderPress}>
        <AppText variant="body1" style={headerLabelStyle(theme, headerActive)}>
          {title}
        </AppText>
        <RightSide>
          {isExpand ? (
            <ChevronUpIcon stroke={theme.colors.borderColor} strokeWidth="2" />
          ) : (
            <ChevronDownIcon
              stroke={theme.colors.borderColor}
              strokeWidth="2"
            />
          )}
        </RightSide>
      </OptionHeader>
      <OptionsContainer expand={isExpand}>
        {options &&
          options.map((option, index) => {
            const optionActive = activeItemIndex === index;
            if (typeof option === 'object') {
              return (
                <Option
                  active={optionActive}
                  onPress={() => handleBankOptionPress(option.value, index)}>
                  <RightSide>
                    {optionActive ? (
                      <ActiveRadioIcon
                        stroke={theme.colors.secondary.normal}
                        fill={theme.colors.secondary.normal}
                        strokeWidth="2"
                      />
                    ) : (
                      <RadioIcon
                        stroke={theme.colors.textOnBackground.highEmphasis}
                        strokeWidth="2"
                      />
                    )}
                  </RightSide>
                  <AppText
                    variant="body1"
                    style={labelStyle(theme, optionActive)}>
                    {option.label}
                  </AppText>
                </Option>
              );
            } else {
              return (
                <Option
                  active={optionActive}
                  onPress={() => handleOptionPress(index)}>
                  <RightSide>
                    {optionActive ? (
                      <ActiveRadioIcon
                        stroke={theme.colors.secondary.normal}
                        fill={theme.colors.secondary.normal}
                        strokeWidth="2"
                      />
                    ) : (
                      <RadioIcon
                        stroke={theme.colors.textOnBackground.highEmphasis}
                        strokeWidth="2"
                      />
                    )}
                  </RightSide>
                  <AppText
                    variant="body1"
                    style={labelStyle(theme, optionActive)}>
                    {option}
                  </AppText>
                </Option>
              );
            }
          })}
      </OptionsContainer>
    </>
  );
};

export default BottomSheetOptionList;
