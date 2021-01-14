import React from 'react';
import {View, Image} from 'react-native';

import {container} from './style';

export default function PseudoSplashScreen() {
  return (
    <View style={container}>
      <Image
        source={require('../../../ios/RewardMe/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo.png')}
      />
    </View>
  );
}
