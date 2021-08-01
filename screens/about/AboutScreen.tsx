import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Layout from "../../constants/Layout";
import {Header} from "../../components/Header";
import {onShare} from "../../services/share";
import {commonStyles} from "../../constants/styles";

export default function AboutScreen() {
  return (
    <View style={commonStyles.container}>

      <Header text={'About the app'} />

      <Text style={styles.text}>React Native app that displays 10 randomized Hacker News top stories using the Hacker News API.</Text>

      <TouchableOpacity
        onPress={() => onShare('https://github.com/HackerNews/API')}
      >
        <Text style={[commonStyles.infoTextUrl, styles.textUrl]}>https://github.com/HackerNews/API</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  textUrl: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16
  }
});
