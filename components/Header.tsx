import React from "react";
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import {mainOrangeAccent} from "../constants/Colors";


export const Header = ({text}: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: mainOrangeAccent
  }
})
