import React from 'react';
import { View, ScrollView } from 'react-native';
import ListCategory from './ListCategory';
import ListProduct from './ListProduct';
import Search from './Search';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function HomeScreen() {
    return (
        <>
            <Header></Header>
            <ListCategory></ListCategory>
            <ScrollView>
                <View>


                    <ListProduct></ListProduct>
                </View>
            </ScrollView>
            <Footer></Footer>
        </>

    );
}