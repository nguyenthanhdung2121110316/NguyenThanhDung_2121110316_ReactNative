import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';

export default function ListCategory({ onPress }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  const handleCategoryPress = (category) => {
    onPress(category);
  };

  return (
    <>
      <View style={styles.catetitle}>
        <Text style={{ fontSize: 20, color: "red", fontWeight: "600" }}>Danh mục</Text>
        <Text style={{ fontSize: 15 }}>Xem thêm</Text>
      </View>
      <SafeAreaView style={styles.contain}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={{ alignItems: "center" }} onPress={() => handleCategoryPress(category)}>
            <View style={styles.item}>
              <Image style={styles.catepic} source={getImageSource(category)} />
            </View>
            <Text>{category}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </>
  );
}

function getImageSource(category) {
  switch (category) {
    case 'electronics':
      return require('../../images/electronic.jpg');
    case 'jewelery':
      return require('../../images/jewelry.jpg');
    case "men's clothing":
      return require('../../images/men.jpg');
    case "women's clothing":
      return require('../../images/women.jpg');
    default:
      return require('../../images/Teddy5.jpg');
  }
}

const styles = StyleSheet.create({
  catepic: {
    width: 60,
    height: 60,
  },
  contain: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 10,
  },
  catetitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});