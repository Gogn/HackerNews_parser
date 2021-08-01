import {StyleSheet} from 'react-native';
import Layout from "./Layout";


export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.containerPadding,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoUrl: {
    maxWidth: '60%',
    alignSelf: 'flex-end',
  },
  infoTextUrl: {
    color: 'blue',
    textAlign: 'right'
  }
});
