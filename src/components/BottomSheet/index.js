import React, {useState} from 'react';
import {Title, Modal, CenteredView, ModalView} from './style';

import BottomSheetListOption from '@/components/BottomSheetListOption';

const BottomSheet = ({
  title,
  items,
  onLayoutPress,
  onItemPress,
  activeItemIndex,
}) => {
  const [show] = useState(true);

  return (
    <CenteredView>
      <Modal transparent={true} visible={show}>
        <CenteredView onPress={onLayoutPress}>
          <ModalView>
            <Title>{title}</Title>
            {items.map((item, index) => (
              <BottomSheetListOption
                active={activeItemIndex === index}
                key={item}
                onPress={() => onItemPress(index)}
                label={item}
              />
            ))}
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
};

export default BottomSheet;
