import React, { useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Image } from 'react-native';
import { CartContext } from './CartContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const Checkout = ({ navigation: propNavigation, route }) => {
    const { updateCartItemCount } = useContext(CartContext);
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const { cartItems, totalPrice, setCartItems, setTotalPrice } = route.params;
    const navigation = useNavigation();
    useEffect(() => {
        console.log('Cart Items:', cartItems);
        console.log('Total Price:', totalPrice);
    }, [cartItems, totalPrice]);

    const handlePayment = () => {
        clearCart();
        console.log('Payment');
        Alert.alert('Thông báo', 'Thanh toán thành công');
        navigation.replace('HomeScreen');
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
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={customerAddress}
                    onChangeText={text => setCustomerAddress(text)}
                />
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