import React from 'react';
import { View, ScrollView } from 'react-native';
import ListCategory from './ListCategory';
import ListProduct from './ListProduct';
import Search from './Search';
import Header from '../../components/Header';

export default function HomeScreen() {
    return (
        <>
        
            <ScrollView>
                <View>
                <Header></Header>
                    <ListCategory></ListCategory>
                    <ListProduct></ListProduct>
                </View>
            </ScrollView>
        </>

    );
}