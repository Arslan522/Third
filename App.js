import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Linking, Text, Animated, View, Alert, Image, Dimensions } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { ReactPropTypes } from 'react';

export default function App() {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };
  const achived = (a) => {
    Linking.openURL(a.data).catch(err =>
      console.error('An error occurred', err)
    );
  };

  Animated.loop(
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]),
  ).start();

  return (
    <View style={styles.container}>
      <View style={styles.imagesCon}>
        <Image source={require('./images/arrow.png')} style={styles.backImage} />
        <Image source={require('./images/logo.png')} style={styles.logoImage} />
        <Image source={require('./images/london.png')} style={styles.londonImage} />
      </View>
      <QRCodeScanner
        style={styles.QRCodeScanner}
        onRead={achived}
        flashMode={isOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        reactivate={true}
        reactivateTimeout={5000}
      />
      <Animated.View
        style={[
          styles.square,
          {
            height: 250,
            width: 250,
            borderRadius: 30,
            borderStyle: "dotted",
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          },
        ]}
      />
      <View style={styles.bottomnav}>
        <Image source={require('./images/qr.png')} style={styles.qrImage} />
        <Image source={require('./images/HISTORY.png')} style={styles.historyImage} />
        <TouchableOpacity onPress={handleToggle}>
          <View style={styles.tourchImage}>
            <Image style={styles.image} resizeMode='contain' source={require('./images/tourch.png')} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoImage: {
    left: "160%"
  },
  backImage: {
    top: 5,
    left: 2,
  },
  londonImage: {
    top: 3,
  },
  QRCodeScanner: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  imagesCon: {
    backgroundColor: "grey",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tourchImage: {
    alignSelf: "flex-end",
    right: "5%"
  },
  bottomnav: {
    backgroundColor: "grey",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  qrImage: {
    left: 10,

  },
  historyImage: {
    top: 6,
  },
  square: {
    position: 'absolute',
    top: "35%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: 'green',
  },
});
