import React, { useContext } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';

const LanguageOption = ({ title, value }) => {
  const { saveLanguage } = useContext(LanguageContext)
  return (
    <View style={styles.languageOption}>
      <TouchableOpacity 
        onPress={() => saveLanguage(value)} 
      >
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

function LanguageList() {
  const { languageList } = useContext(LanguageContext)
  return (
    <SafeAreaView>
      <FlatList
        data={languageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({ item }) => <LanguageOption title={item.label} value={item.value}/>
        }
      />
    </SafeAreaView>
  )
}

export default function LanguageScreen() {
  return (
    <View style={styles.containers}>
      <LanguageList />
    </View>
  );
}

const styles = StyleSheet.create({
  containers: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start' 
  },
  languageOption: {
    color: '#4a4a4a',
  },
});