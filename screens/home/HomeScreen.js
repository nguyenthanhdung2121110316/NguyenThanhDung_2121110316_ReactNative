import React from 'react';
import { View, ScrollView,StyleSheet } from 'react-native';
import ListProduct from './ListProduct';
import Search from './Search';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HomeScreen() {
    return (
        <>
            <Header></Header>
            <ScrollView>
                <View>


                    <ListProduct></ListProduct>
                    <View style={styles.container}>

                    </View>
                </View>
            </ScrollView>
            <Footer></Footer>
        </>

    );
}
const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      paddingTop: 18,
    },
    
  });