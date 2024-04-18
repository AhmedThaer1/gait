import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Audio } from 'expo-av';

export default function FallDetection() {
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });
  const [sound, setSound] = useState();

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/alert.mp3')
      );
      setSound(sound);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    const subscribeToGyroscope = async () => {
      const gyroscopeSubscription = Gyroscope.addListener(({ x, y, z }) => {
        setGyroscopeData({ x, y, z });

        if (y >= 10 || x >=3.5  && sound) {
          playSound();
        }
      });

      await Gyroscope.setUpdateInterval(250); 

      return () => {
        gyroscopeSubscription.remove();
      };
    };

    const playSound = async () => {
      try {
        await sound.replayAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };

    subscribeToGyroscope();
  }, [sound]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>X: {gyroscopeData.x.toFixed(2)}</Text>
      <Text>Y: {gyroscopeData.y.toFixed(2)}</Text>
      <Text>Z: {gyroscopeData.z.toFixed(2)}</Text>
    </View>
  );
}
