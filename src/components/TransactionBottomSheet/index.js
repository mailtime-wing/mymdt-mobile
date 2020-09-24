import React, {useState} from 'react';
import {View} from 'react-native';
import {FormattedMessage} from 'react-intl';
import {useTheme} from 'emotion-theming';
import {css} from '@emotion/native';
import {
  Modal,
  CenteredView,
  Divider,
  MarginTop,
  ButtonContainers,
  modal,
  titleStyle,
} from './style';

import BottomSheetOption from '@/components/BottomSheetOption';
import BottomSheetOptionList from './BottomSheetOptionList';
import AppButton from '@/components/AppButton';
import AppText from '@/components/AppText2';

const TransactionBottomSheet = ({
  title,
  items,
  activeOptionIndex,
  onLayoutPress,
  onItemPress,
  onApplyPress,
}) => {
  const theme = useTheme();
  const [show] = useState(true);

  const handleResetPress = () => {
    onItemPress(null);
  };

  const handleApplyPress = () => {
    onApplyPress();
  };

  return (
    <CenteredView>
      <Modal transparent={true} visible={show}>
        <CenteredView onPress={onLayoutPress}>
          <View
            style={[
              css`
                ${theme.colors.elevatedBackground2}
              `,
              modal,
            ]}>
            <AppText variant="heading4" style={titleStyle(theme)}>
              {title}
            </AppText>
            <Divider />
            {items.map((item, index) => {
              if (Array.isArray(item)) {
                return (
                  <BottomSheetOptionList
                    currentActive={activeOptionIndex === index}
                    onItemPress={() => onItemPress(index)}
                    options={item}
                    title="Cash Back"
                  />
                );
              } else {
                return (
                  <BottomSheetOption
                    active={activeOptionIndex === index}
                    key={item}
                    onPress={() => onItemPress(index)}
                    label={item.label}
                  />
                );
              }
            })}
            <Divider />
            <MarginTop />
            <ButtonContainers>
              <AppButton
                onPress={handleResetPress}
                text={
                  <FormattedMessage id="button.reset" defaultMessage="Reset" />
                }
                variant="outlined"
                sizeVariant="normal"
                colorVariant="secondary"
              />
              <AppButton
                disabled={activeOptionIndex === null}
                onPress={handleApplyPress}
                text={
                  <FormattedMessage id="button.apply" defaultMessage="Apply" />
                }
                variant="filled"
                sizeVariant="normal"
                colorVariant="secondary"
              />
            </ButtonContainers>
          </View>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default TransactionBottomSheet;
