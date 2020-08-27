import React, {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import {
  Title,
  Modal,
  CenteredView,
  ModalView,
  Divider,
  MarginTop,
  ButtonContainers,
} from './style';

import BottomSheetOption from '@/components/BottomSheetOption';
import BottomSheetOptionList from './BottomSheetOptionList';
import ThemeButton from '@/components/ThemeButton';

const TransactionBottomSheet = ({
  title,
  items,
  onLayoutPress,
  onItemPress,
  activeOptionIndex,
}) => {
  const [show] = useState(true);

  const handleResetPress = () => {
    onItemPress(null);
  };

  const handleApplyPress = () => {};

  return (
    <CenteredView>
      <Modal transparent={true} visible={show}>
        <CenteredView onPress={onLayoutPress}>
          <ModalView>
            <Title>{title}</Title>
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
                    label={item}
                  />
                );
              }
            })}
            <Divider />
            <MarginTop />
            <ButtonContainers>
              <ThemeButton medium reverse onPress={handleResetPress}>
                <FormattedMessage id="reset" defaultMessage="Reset" />
              </ThemeButton>
              <ThemeButton
                medium
                disabled={activeOptionIndex === null}
                onPress={handleApplyPress}>
                <FormattedMessage id="apply" defaultMessage="Apply" />
              </ThemeButton>
            </ButtonContainers>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default TransactionBottomSheet;
