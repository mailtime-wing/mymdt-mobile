module.exports = {
  extends: [
    "@react-native-community",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier"
  ],
  settings: {
    "import/resolver": {
      "eslint-import-resolver-babel-module": {}
    }
  },
  rules: {
    "prettier/prettier": "error"
  }
};