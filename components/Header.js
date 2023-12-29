import React, { useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Search from '../screens/home/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../screens/home/CartContext';

export default function Header() {
  const navigation = useNavigation();
  const { cartItemCount, updateCartItemCount } = useContext(CartContext);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const cartItemsData = await AsyncStorage.getItem('cartItems');
      if (cartItemsData) {
        const parsedCartItems = JSON.parse(cartItemsData);
        updateCartItemCount(parsedCartItems.length);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='red' />

      <View style={styles.titleContainer}>
        <View style={styles.searchContainer}>
          <Search />
        </View>
        <TouchableOpacity style={styles.cartContainer} onPress={() => navigation.navigate('CartScreen')}>
          <FontAwesome name="shopping-cart" size={40} color="black" />
          <View style={styles.cartCountContainer}>
            <Text style={styles.cartCountText}>{cartItemCount}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../images/logo2.jpg')} />
        <Text style={styles.textTitle}>CocaRed</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    marginRight: 10,
  },
  cartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartCountContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  cartCountText: {
    color: 'white',
    fontSize: 12,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  textTitle: {
    color: 'red',
    fontWeight: '700',
    fontSize: 30,
    marginLeft: 10,
  },
});