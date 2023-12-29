import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import Search from '../screens/home/Search';

export default function Header() {
  const navigation = useNavigation();
  const [cartItemCount, setCartItemCount] = useState(0);

  const fetchCartItems = async () => {
    try {
      // Lấy danh sách sản phẩm từ AsyncStorage
      const cartItems = await AsyncStorage.getItem('cartItems');
      const parsedCartItems = JSON.parse(cartItems);
      
      // Cập nhật giá trị cartItemCount
      setCartItemCount(parsedCartItems.length);
    } catch (error) {
      // Xử lý lỗi
      console.error(error);
    }
  };
  
  const removeItemFromCart = async (itemId) => {
    try {
      // Lấy danh sách sản phẩm từ AsyncStorage
      const cartItems = await AsyncStorage.getItem('cartItems');
      const parsedCartItems = JSON.parse(cartItems);
      
      // Xóa sản phẩm khỏi giỏ hàng
      const updatedCartItems = parsedCartItems.filter(item => item.id !== itemId);
      
      // Lưu trữ danh sách sản phẩm mới vào AsyncStorage
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      
      // Cập nhật giá trị cartItemCount
      setCartItemCount(updatedCartItems.length);
    } catch (error) {
      // Xử lý lỗi
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