import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={() => console.log('Home icon clicked')} style={styles.footerButton}>
        <FontAwesome name="home" size={24} color="red" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Settings icon clicked')} style={styles.footerButton}>
        <FontAwesome name="user" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('Home icon clicked')} style={styles.footerButton}>
        <FontAwesome name="plane" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f2f2f2',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});