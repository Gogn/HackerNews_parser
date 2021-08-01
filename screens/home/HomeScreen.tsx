import * as React from 'react';
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity} from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import {Text, View} from '../../components/Themed';
import {useGetItemQuery, useGetTopstoriesQuery, useGetUserQuery} from "../../services/queries";
import {Header} from "../../components/Header";
import {useEffect, useState} from "react";
import {StoryItem} from "./components/StoryItem";
import {useDispatch, useSelector} from "react-redux";
import {setRandomizedStories, setViewedStories} from "../../state/slices/hackers.slice";
import {RootState} from "../../state/store";
import {storiesAmount, storiesToShowAmount} from "../../constants/constants";
import Layout from "../../constants/Layout";
import {mainOrangeTing} from "../../constants/Colors";
import {commonStyles} from "../../constants/styles";

export default function HomeScreen() {
  const dispatch = useDispatch()
  const {randomizedStories} = useSelector((state: RootState) => state.hackers)
  const {viewedStories} = useSelector((state: RootState) => state.hackers)

  const topstoriesQuery = useGetTopstoriesQuery({refetchOnFocus: true});
  const userQuery = useGetUserQuery('type_Ben_struct');

  const [loading, setLoading] = useState(true);

  const onRefresh = () => {
    handleStories(topstoriesQuery.data)
  }

  useEffect(() => {
    if (topstoriesQuery.isSuccess && topstoriesQuery.data) {
      handleStories(topstoriesQuery.data)
    }
  }, [topstoriesQuery.isFetching])

  const handleStories = (stories: number[]) => {
    setLoading(true);
    let array = [...stories];
    const getTenRandoms = (array: number[]) => array.sort(() => 0.5 - Math.random()).slice(0, storiesToShowAmount);

    const filterViewedStories = (array: number[]) => {
      if (viewedStories.length !== 0 && (viewedStories.length < storiesAmount - storiesToShowAmount)) {
        return array.filter(story => !viewedStories.findIndex(viewedStory => viewedStory !== story))
      }
      return array
    }
    array = filterViewedStories(array);
    array = getTenRandoms(array);

    dispatch(setRandomizedStories({randomizedStories: array}))
    dispatch(setViewedStories({viewedStories: array}))
    setLoading(false);
  }

  const handlePress = () => {
    setLoading(true);
    handleStories(topstoriesQuery.data)
    setLoading(false);
  }

  const renderFlatListHeader = () => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Header text={'Top stories'}/>
      </View>
    )
  }

  return (
    <View style={commonStyles.container}>

      <FlatList
        data={randomizedStories}
        keyExtractor={(item: number) => `${item}`}
        ListHeaderComponent={renderFlatListHeader}
        refreshControl={<RefreshControl refreshing={topstoriesQuery.isFetching} onRefresh={() => onRefresh()}/>}
        refreshing={loading}
        onScrollToIndexFailed={() => {console.log('SCROLL FAILED')}}
        renderItem={!loading ? ({item}) => <StoryItem id={item}/> : null}
      />

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => handlePress()}
      >
        <Text>Refresh stories</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  refreshButton: {
    marginTop: 15,
    width: '40%',
    height: 40,
    backgroundColor: mainOrangeTing,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
