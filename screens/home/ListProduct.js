import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ListCategory from './ListCategory';
import { SearchContext } from './SearchContext';
export default function ListProduct() {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { searchResults, setSearchResults } = useContext(SearchContext);

    useEffect(() => {
        getAllProduct();
    }, [searchResults]);

    const getAllProduct = () => {
        let url = 'https://fakestoreapi.com/products';

        axios
            .get(url)
            .then(function (response) {
                let products = response.data;

                if (searchResults && searchResults.length > 0) {
                    const searchValue = searchResults.toLowerCase(); 

                    products = products.filter(product => {
                        const title = product.title.toLowerCase(); 
                        return title.startsWith(searchValue);
                    });
                }

                setProducts(products);
            })
            .catch(function (error) {
                alert(error.message);
            });
    };


    const getProductsByCategory = (category) => {

        axios
            .get(`https://fakestoreapi.com/products/category/${category}`)
            .then(function (response) {
                setProducts(response.data);
            })
            .catch(function (error) {
                alert(error.message);
            });

    };

    const handleProductPress = (product) => {
        navigation.navigate('SingleProduct', { product, category: selectedCategory });
    };

    const handleCategoryPress = (category) => {
        setSelectedCategory(category);
        getProductsByCategory(category);
    };

    const handleSeeMorePress = () => {
        if (searchResults !== '') {
            setSearchResults('');
        } else {
            getAllProduct();
        }
    };


    return (
        <View>
          <ListCategory onPress={handleCategoryPress} />
          <View style={styles.catetitle}>
            <Text style={{ fontSize: 20, color: 'red', fontWeight: '600' }}>Sản phẩm</Text>
            <TouchableOpacity onPress={handleSeeMorePress}>
              <Text style={{ fontSize: 15 }}>Xem thêm</Text>
            </TouchableOpacity>
          </View>
      
          <ScrollView>
            {products.length === 0 ? (
              <View>
                <Text style={{ fontSize: 20}}>"Không có kết quả này"</Text>
              </View>
            ) : (
              <View style={styles.container}>
                {products.map((product) => (
                  <TouchableOpacity
                    style={styles.item}
                    key={product.id}
                    onPress={() => handleProductPress(product)}
                  >
                    <View>
                      <Image style={styles.img} source={{ uri: product.image }} />
                    </View>
                    <View style={styles.des}>
                      <Text style={styles.des_text}>{product.title}</Text>
                      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
                      <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>Rating: </Text>
                        <FontAwesome name="star" style={styles.starIcon} />
                        <Text style={styles.ratingValue}>{product.rating.rate.toFixed(1)}</Text>
                        <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    catetitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    item: {
        width: '48%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    img: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    des: {
        padding: 8,
    },
    des_text: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingText: {
        color: 'black',
    },
    starIcon: {
        color: 'gold',
        fontSize: 16,
        marginRight: 2,
    },
    ratingValue: {
        color: 'black',
        marginRight: 2,
    },
    ratingCount: {
        color: 'black',
    },
});