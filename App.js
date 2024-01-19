import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home/HomeScreen';
import SingleProductScreen from './screens/home/SingleProductScreen';
import CartScreen from './screens/home/CartScreen';
import ProfileScreen from './screens/home/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AuthContext from './screens/AuthContext';
import { CartProvider } from './screens/home/CartContext';
import { SearchProvider } from './screens/home/SearchContext';
import Checkout from './screens/home/Checkout';

const Stack = createStackNavigator();

export default function App() {
  const [registeredUser, setRegisteredUser] = useState(null);

  const register = (email, password) => {
    setRegisteredUser({ email, password });
  };

  const login = (email, password) => {
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
      return true;
    }
    return false;
  };
  return (

    <AuthContext.Provider value={{ register, login }}>

      <CartProvider>
        <SearchProvider>
          <View style={{ flex: 1, paddingHorizontal: 15 }}>

            <NavigationContainer>
              <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                  name="LoginScreen"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='RegisterScreen'
                  component={RegisterScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ headerTitle: 'Trang chủ', headerLeft: null }}
                />
                <Stack.Screen name="SingleProduct" component={SingleProductScreen} options={{ headerTitle: 'Chi tiết sản phẩm' }} />
                <Stack.Screen
                  name="CartScreen"
                  component={CartScreen}
                  options={{ headerTitle: 'Giỏ hàng' }}
                />
                <Stack.Screen
                  name='Checkout'
                  component={Checkout}
                  options={{ headerTitle: 'Thanh toán' }}
                />
                <Stack.Screen
                  name="ProfileScreen"
                  component={ProfileScreen} // Thêm màn hình ProfileScreen vào Stack Navigator
                  options={{ headerTitle: 'Trang cá nhân' }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </SearchProvider>

      </CartProvider>



    </AuthContext.Provider>


  );
};