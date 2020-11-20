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
  onBankItemPress,
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
              if (Array.isArray(item.data)) {
                return (
                  <BottomSheetOptionList
                    currentActive={activeOptionIndex === index}
                    onItemPress={onItemPress}
                    sectionIndex={index}
                    options={item.data}
                    title={item.title}
                  />
                );
              } else if (typeof item.data === 'object') {
                // special handle for banks filter
                // TODO: improve this bottom sheet later?
                const subTypes = Object.keys(item.data);
                const options = [];
                subTypes.forEach((subType) =>
                  item.data[subType].forEach((mask) =>
                    options.push({
                      value: {subType: subType, mask: mask},
                      label: `${subType} (•••• ${mask})`,
                    }),
                  ),
                );
                return (
                  <BottomSheetOptionList
                    currentActive={activeOptionIndex === index}
                    onItemPress={onItemPress}
                    onBankItemPress={onBankItemPress}
                    sectionIndex={index}
                    options={options}
                    title={item.title}
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
