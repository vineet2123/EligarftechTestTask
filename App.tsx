/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {GiveFeedback} from './src/screens';
import {Colors} from './src/utils/constants';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GiveFeedback />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});

export default App;
