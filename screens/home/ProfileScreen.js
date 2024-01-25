import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';
export default function ProfileScreen() {
  const navigation = useNavigation();
  const avatarImage = require('../../assets/favicon.png');

  const userProfile = {
    fullName: 'Nguyễn Thành Dũng',
    dateOfBirth: '01/01/1990',
    address: '123 Đường ABC, Quận XYZ, Thành phố HCM',
  };

  const handleLogout = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={avatarImage} style={styles.avatar} />
      <Text style={styles.label}>Họ và tên:</Text>
      <Text style={styles.text}>{userProfile.fullName}</Text>
      <Text style={styles.label}>Ngày sinh:</Text>
      <Text style={styles.text}>{userProfile.dateOfBirth}</Text>
      <Text style={styles.label}>Địa chỉ:</Text>
      <Text style={styles.text}>{userProfile.address}</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginBottom: 16,
  },
});