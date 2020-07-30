import {Linking} from 'react-native';
import RNInAppBrowser from 'react-native-inappbrowser-reborn';

class InAppBrowser {
  constructor() {
    this.isOpen = false;
  }

  async open(url) {
    if (await RNInAppBrowser.isAvailable()) {
      RNInAppBrowser.close();
      this.isOpen = true;
      await RNInAppBrowser.open(url);
      this.isOpen = false;
    } else {
      await Linking.openURL(url);
    }
  }
  close() {
    if (this.isOpen) {
      RNInAppBrowser.close();
      this.isOpen = false;
    }
  }
}

/** @type InAppBrowser */
let inAppBrowser = null;
if (!inAppBrowser) {
  inAppBrowser = new InAppBrowser();
}

export default inAppBrowser;
