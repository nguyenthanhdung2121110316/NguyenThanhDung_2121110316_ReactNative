import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from './CartContext';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { updateCartItemCount } = useContext(CartContext);
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const cartItemsData = await AsyncStorage.getItem('cartItems');
      if (cartItemsData) {
        const parsedCartItems = JSON.parse(cartItemsData);
        setCartItems(parsedCartItems);
        updateCartItemCount(getCartItemCount(parsedCartItems));
      }
    } catch (error) {
      console.log('Error fetching cart items:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId) {
          item.quantity -= 1;
          if (item.quantity === 0) {
            return null;
          }
        }
        return item;
      }).filter(Boolean);

      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      updateCartItemCount(getCartItemCount(updatedCartItems));

    } catch (error) {
      console.log('Error removing item from cart:', error);
    }
  };

  const handleIncreaseQuantity = async (itemId) => {
    try {
      const updatedCartItems = cartItems.map(item => {
        if (item.id === itemId) {
          item.quantity += 1;
        }
        return item;
      });

      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      updateCartItemCount(getCartItemCount(updatedCartItems));

    } catch (error) {
      console.log('Error increasing item quantity:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);

      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

      updateCartItemCount(getCartItemCount(updatedCartItems));

    } catch (error) {
      console.log('Error deleting item from cart:', error);
    }
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

  const getCartItemCount = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Thông báo', 'Giỏ hàng trống vui lòng thêm sản phẩm');
      return;
    }

    navigation.navigate('Checkout', {
      cartItems: cartItems,
      totalPrice: totalPrice,
      setCartItems: setCartItems,
      setTotalPrice: setTotalPrice,
      updateCartItemCount: updateCartItemCount
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
              <View style={styles.cartItemInfo}>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
                <View style={styles.cartItemQuantityContainer}>
                  <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                    <View style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.cartItemQuantityContainer}>
                    <Text style={styles.cartItemQuantityText}>{item.quantity}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
                    <View style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cartItemPrice}>Price: ${item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                <Text style={styles.cartItemButton}>X</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
      <Text style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemQuantityText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  cartItemPrice: {
    fontSize: 14,
  },
  cartItemButton: {
    fontSize: 14,
    color: 'black',
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CartScreen;