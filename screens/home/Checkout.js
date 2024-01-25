import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Image } from 'react-native';
import { CartContext } from './CartContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import * as Location from 'expo-location';


const Checkout = ({ route }) => {
    const { updateCartItemCount } = useContext(CartContext);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const { cartItems, totalPrice, setCartItems, setTotalPrice } = route.params;
    const navigation = useNavigation();

    useEffect(() => { }, [cartItems, totalPrice]);

    const handlePayment = () => {
        if (!customerName || !customerEmail || !customerAddress) {
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin');
        } else {
            clearCart();
            console.log('Payment');
            Alert.alert('Thông báo', 'Thanh toán thành công');
            navigation.replace('HomeScreen');
        }
    };

    const clearCart = async () => {
        try {
            setCartItems([]);
            setTotalPrice(0);
            await AsyncStorage.removeItem('cartItems');
            updateCartItemCount(0);
        } catch (error) {
            console.log('Error clearing cart:', error);
        }
    };

    const getCurrentLocation = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
      
          navigation.navigate('MapScreen', { handleAddressSelection: handleAddressSelection });
        } catch (error) {
          console.log('Error getting current location:', error);
        }
      };
      
      const handleAddressSelection = async (latitude, longitude) => {
        try {
          const selectedAddress = await fetchAddressFromCoordinates(latitude, longitude);
          setCustomerAddress(selectedAddress);
        } catch (error) {
          console.log('Error fetching address from coordinates:', error);
        }
      };
      
      const fetchAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    
            const response = await fetch(apiUrl);
            const data = await response.json();
    
            if (data && data.address) {
                const addressComponents = Object.values(data.address);
                const address = addressComponents.join(', ');
    
                return address;
            }
        } catch (error) {
            console.log('Error fetching address from coordinates:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Vui lòng nhập thông tin</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={customerName}
                    onChangeText={text => setCustomerName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={customerEmail}
                    onChangeText={text => setCustomerEmail(text)}
                />
                <View style={styles.addressContainer}>
                    <TextInput
                        style={styles.addressInput}
                        placeholder="Address"
                        multiline
                        numberOfLines={2}
                        value={customerAddress}
                        onChangeText={text => setCustomerAddress(text)}
                    />
                    <Button
                        style={styles.locationButton}
                        title="Sử dụng vị trí"
                        onPress={getCurrentLocation}
                    />
                </View>
            </View>
            <ScrollView style={styles.cartItemsContainer}>
                {cartItems.map(item => (
                    <View key={item.id} style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                        <View style={styles.cartItemInfo}>
                            <Text style={styles.cartItemTitle}>{item.title}</Text>
                            <Text style={styles.cartItemPrice}>Price: ${item.price.toFixed(2)}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Total Price: ${totalPrice.toFixed(2)}</Text>
            </View>
            <Button title="Pay Now" onPress={handlePayment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    addressInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    locationButton: {
        borderRadius: 20,
        backgroundColor: 'blue',
        color: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    cartItemsContainer: {
        maxHeight: 200,
        marginBottom: 16,
    },
    cartItem: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: 'row',
    },
    cartItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartItemPrice: {
        fontSize: 14,
        marginTop: 8,
    },
    totalPriceContainer: {
        marginBottom: 16,
    },
    totalPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cartItemImage: {
        width: 50,
        height: 50,
        marginRight: 8,
    },
    cartItemInfo: {
        flex: 1,
    },
});

export default Checkout;