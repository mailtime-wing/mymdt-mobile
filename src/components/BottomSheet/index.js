import React from 'react';
import {View, Modal, TouchableOpacity, FlatList} from 'react-native';
import {useTheme} from 'emotion-theming';
import {centeredView, modal, container, headerStyle} from './style';
import BottomSheetOption from '@/components/BottomSheetOption';
import AppText from '@/components/AppText2';

export const BottomSheet = ({
  list = [],
  header = 'Header',
  optionActiveIndex,
  onLayoutPress,
  onPress,
}) => {
  const theme = useTheme();

  const renderItem = ({item, index}) => {
    return (
      <BottomSheetOption
        active={optionActiveIndex === index}
        key={item.value}
        label={item.label}
        onPress={() => onPress(index)}
      />
    );
  };

  return (
    <TouchableOpacity style={centeredView}>
      <Modal transparent={true} style={modal}>
        <TouchableOpacity style={centeredView} onPress={onLayoutPress}>
          <View style={container(theme)}>
            <FlatList
              data={list}
              keyExtractor={item => item.value}
              ListHeaderComponent={
                <AppText variant="heading4" style={headerStyle(theme)}>
                  {header}
                </AppText>
              }
              renderItem={renderItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

export default BottomSheet;
