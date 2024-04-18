import { View, Text } from 'react-native';
import React from 'react';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Welcome to the Health Care App
      </Text>
      <Text style={{ fontSize: 16}} >
        This app is designed to prioritize your well-being. Shake your hand to activate
        the alarm feature. When the phone detects shaking, an alarm will sound, serving as a
        reminder to pay attention to your health and take necessary actions.
      </Text>
    </View>
  );
}
