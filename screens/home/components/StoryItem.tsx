import React from "react";
import {Text, View} from '../../../components/Themed';
import {ItemResponse, useGetItemQuery, useGetUserQuery, UserResponse} from "../../../services/queries";
import {ActivityIndicator, StyleSheet, TouchableOpacity} from "react-native";
import {mainCyanAccent, mainCyanTint, mainOrangeAccent} from "../../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import Layout from "../../../constants/Layout";
import {onShare} from "../../../services/share";
import {commonStyles} from "../../../constants/styles";

export const StoryItem = ({id}: { id: number }) => {
  const itemQuery = useGetItemQuery(id);
  const data: ItemResponse = itemQuery.data
  const userQuery = useGetUserQuery(data ? data.by : null)
  const userData: UserResponse = userQuery?.data


  if (!data) {
    return (
      <View style={[styles.container, styles.mockView]}>
        <ActivityIndicator />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerText} >{data.title}</Text>
        </View>

        <View style={styles.info}>

            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Story URL:</Text>
              <TouchableOpacity style={commonStyles.infoUrl} onPress={() => onShare(data.url)}>
                <Text style={data.url ? commonStyles.infoTextUrl : {color: 'gray'}}>{data.url ?? 'none'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Story score:</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>{data.score}&nbsp;</Text>
                <Ionicons name={'star'}  color={mainOrangeAccent}/>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Story timestamp:</Text>
              <Text style={styles.infoText}>{data.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Author id:</Text>
              { userData
                ? <Text style={styles.infoText}>{userData.id}</Text>
                : <ActivityIndicator />
              }
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Author karma score:</Text>
              {userData
              ? <Text style={styles.infoText}>{userData.karma}</Text>
              : <ActivityIndicator />
              }
            </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor:  mainCyanAccent
  },
  mockView: {
    height: 300,
    width: (Layout.window.width - (Layout.containerPadding * 2)),
    justifyContent: 'center'
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: mainCyanTint,
    borderBottomColor: mainCyanAccent,
    borderBottomWidth: 1,
    marginBottom: 10
  },
  infoRow: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  info: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 16
  },

});

