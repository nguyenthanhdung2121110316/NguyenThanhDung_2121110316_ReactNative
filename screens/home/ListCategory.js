import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
export default function ListCategory() {
    return (
        <>
            <View style={styles.catetitle}>
                <Text style={{ fontSize: 20, color: "red", fontWeight: "600" }}>Danh mục</Text>
                <Text style={{ fontSize: 15 }}>Xem thêm</Text>
            </View>
            <SafeAreaView style={styles.contain}>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.item}><Image style={styles.catepic} source={require('../../images/cate-dubai.jpg')} /></View>
                    <Text>Dubai</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.item}><Image style={styles.catepic} source={require('../../images/cate-japan.jpg')} /></View>
                    <Text>Japan</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <View style={styles.item}><Image style={styles.catepic} source={require('../../images/cate-my.jpg')} /></View>
                    <Text>USA</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <View style={styles.item}><Image style={styles.catepic} source={require('../../images/cate-thai.jpg')} /></View>
                    <Text>ThaiLan</Text>
                </View>
            </SafeAreaView>
        </>

    );
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