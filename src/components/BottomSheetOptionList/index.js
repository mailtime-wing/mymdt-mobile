import React, {useState, useEffect} from 'react';
import {
  Option,
  OptionHeader,
  HeaderLabel,
  Label,
  RightSide,
  OptionsContainer,
} from './style';

import ChevronUpIcon from '@/assets/chevron_up.svg';
import ChevronDownIcon from '@/assets/chevron_down.svg';
import ActiveRadioIcon from '@/assets/active_radio.svg';
import RadioIcon from '@/assets/radio.svg';

const BottomSheetOptionList = ({
  title,
  options,
  currentActive,
  onItemPress,
}) => {
  const [isExpand, setIsExpand] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(null);
  const handleOptionHeaderPress = () => {
    setIsExpand(!isExpand);
  };

  const handleOptionPress = optionIndex => {
    setActiveItemIndex(optionIndex);
    onItemPress();
  };

  useEffect(() => {
    if (!currentActive) {
      setActiveItemIndex(null);
    }
  }, [currentActive]);

  return (
    <>
      <OptionHeader
        active={activeItemIndex !== null}
        onPress={handleOptionHeaderPress}>
        <HeaderLabel active={activeItemIndex !== null}>{title}</HeaderLabel>
        <RightSide>
          {isExpand ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </RightSide>
      </OptionHeader>
      <OptionsContainer expand={isExpand}>
        {options &&
          options.map((option, index) => {
            const optionActive = activeItemIndex === index;
            return (
              <Option
                active={optionActive}
                onPress={() => handleOptionPress(index)}>
                <RightSide>
                  {optionActive ? <ActiveRadioIcon /> : <RadioIcon />}
                </RightSide>
                <Label active={optionActive}>{option}</Label>
              </Option>
            );
          })}
      </OptionsContainer>
    </>
  );
};

export default BottomSheetOptionList;
