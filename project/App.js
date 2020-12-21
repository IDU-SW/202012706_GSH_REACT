import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Button, RefreshControl } from 'react-native'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as SMS from 'expo-sms';
import MapView from 'react-native-maps';

console.disableYellowBox = true;

export default function App() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [call, setCall] = useState('')
  let timer;
  const [region, setRegion] = useState({ latitude: 0, longitude: 0 })

  const [load, setLoad] = useState(0)

  let text = 'Waiting..'
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location)
    console.log(text)
  }

  useEffect(() => {
    (async () => {
      await getLocation()
      await getData()
    })()
  }, [])

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009
    })
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@call', value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@call')
      if (value !== null) {
        // value previously stored
        console.log(value)
        setCall(value)
      }
    } catch (e) {
      // error reading value

    }
  }

  const saveData = () => {
    storeData(call)
  }

  const loadData = () => {
    getLocation()
    getData()
  }

  const start = async () => {

    /*
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      // do your SMS stuff here
    } else {
      // misfortune... there's no SMS available on this device
    }*/
    const { result } = await SMS.sendSMSAsync(
      [call],
      '[구조 요청]' +
      '\n위도:' + region.latitude +
      '\n경도:' + region.longitude +
      `\nhttps://google.com/maps/search/${region.latitude},${region.longitude}/@${region.latitude},${region.longitude},18z`
    );
    /*
    if(timer==0){
      timer = setInterval(() => {

      }, 500)
      console.log('start interval : ' + timer)
      
    }
    else {
      console.log('stop interval : ' + timer)
      clearInterval(timer)
      timer = 0;
    }
    */
  }

  return (
    <View style={styles.container}>
      <View style={styles.stateView}>
        <MapView style={styles.map}
          initialRegion={region}
          onRegionChange={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={region => {
            setLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}>
          <MapView.Marker coordinate={region}></MapView.Marker>
        </MapView>
      </View>

      <View style={styles.buttonView}>
        <View style={styles.button}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setCall(text)}
            placeholder='번호를 입력하세요.(01012345678)'
            value={call}></TextInput>
        </View>
        <View style={styles.button}>
          <Button onPress={saveData} title="저장"></Button>
        </View>
      </View>

      <View style={styles.buttonView}>
        <View style={styles.button}>
          <Button onPress={start} title="전송"></Button>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(false),
    paddingBottom: 20,
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  button: {
    fontSize: 16,
    flex: 1,
    margin: 10,
    height: '100%'
  },
  stateView: {
    flexDirection: 'column',
    flex: 1,
    width: '100%'
  },
  map: {
    flex: 1
  },
  textInput: {
    textAlign: 'center',
    width: '100%'
  }
})
