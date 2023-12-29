import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home/HomeScreen';
import SingleProductScreen from './screens/home/SingleProductScreen';
import Header from './components/Header';
import CartScreen from './screens/home/CartScreen';
import { CartProvider } from './screens/home/CartContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerTitle: 'Trang chủ' }}
            />
            <Stack.Screen name="SingleProduct" component={SingleProductScreen} options={{ headerTitle: 'Chi tiết sản phẩm' }} />
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{ headerTitle: 'Giỏ hàng' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </CartProvider>
  );
};