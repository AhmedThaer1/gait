import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
import { Gyroscope } from 'expo-sensors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const StepCounter = () => {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState(0);
  const [gyroscopeData, setGyroscopeData] = useState({ x: 0, y: 0, z: 0 });

  const maxFill = 100; // Maximum value for the progress
  const circleforfill = 2 * Math.PI * (100 - 25 / 2);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDasharray: [circleforfill * (progress / maxFill), circleforfill],
    };
  });

  useEffect(() => {
    let isCountingSteps = false;

    const subscribeToGyroscope = async () => {
      Gyroscope.addListener(({ y }) => {
        setGyroscopeData({ y });

        // Check for y reaching -2.5
        if (y <= -2) {
          // Increment step count
          setSteps((prevSteps) => prevSteps + 1);
          isCountingSteps = true;

          // Increment progress when steps reach 1% of maxFill
          setProgress((prevProgress) =>
            prevProgress < maxFill ? prevProgress + 1 : maxFill
          );
        } else if (isCountingSteps) {
          // Reset counting if not in peak and was counting steps
          isCountingSteps = false;
        }
      });

      await Gyroscope.setUpdateInterval(100); // Set update interval in milliseconds
    };

    subscribeToGyroscope();

    // Cleanup subscription on component unmount
    return () => {
      Gyroscope.removeAllListeners();
    };
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    // Check if progress reaches maxFill
    if (progress === maxFill) {
      // Reset progress and steps to initial state
      setProgress(0);
      setSteps(0);
    }
  }, [progress, maxFill]);

  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Be Healthy And run Be Fit Not Fat</Text>
      <Svg height="200" width="200">
        <Circle
          cx={100}
          cy={100}
          r={100 - 25 / 2}
          strokeWidth={25}
          stroke="#588b8b"
          fill="none"
          opacity={0.3}
        />
        <AnimatedCircle
          cx={100}
          cy={100}
          r={100 - 25 / 2}
          strokeWidth={25}
          stroke="#588b8b"
          fill="none"
          strokeDasharray={[
            circleforfill * (progress / maxFill),
            circleforfill,
          ]}
          strokeLinecap="round"
          rotation="-90"
          originX={100}
          originY={100}
          animatedProps={animatedProps}
        />
      </Svg>
      <Text style={styles.stepsText}>Steps: {steps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsText: {
    marginTop: 20,
    fontSize: 18,
  },
  Heading: {
    fontSize: 20,
    marginBottom: 80,
  }
});

export default StepCounter;
