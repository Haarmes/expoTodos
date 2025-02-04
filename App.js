import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Constants from 'expo-constants'
import Row from './components/Row.js';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
import Add from './components/Add.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key'


export default function App() {
  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  //This useeffect only runs once when the program starts
  useEffect(() => {
    //AsyncStorage.clear() <--- If you want to clear storage
    getData()
  }, [])

  //This useffect runs if data is changed "setData is used"
  useEffect(() => {
    storeData(data)
  }, [data])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      const json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      setData(json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async (value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY, json)
    } catch (ex) {
      console.log(ex)
    }
  }


  const add = useCallback((name) => {
    const newItem = {
      id: uuidv4(),
      name: name,
      doneState: false,
    }
    const tempData = [...data, newItem]
    setData(tempData)
  }, [data])

  return (
    <SafeAreaView style={styles.container}>
      <Add add={add} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Row
            item={item}
            selectedId={selectedId}
            select={setSelectedId} />
        )} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
