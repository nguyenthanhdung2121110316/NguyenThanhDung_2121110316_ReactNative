import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import AuthContext from './AuthContext';
export default function LoginScreen() {
  const [value, setValue] = useState(true);
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const navigation = useNavigation(); 
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const loginSuccess = login(email, password);
    if (loginSuccess) {
      Alert.alert('Login successful');
      navigation.replace('HomeScreen'); 
    } else {
      Alert.alert('Invalid email or password');
    }
  };

  return (
    <SafeAreaView style={styles.contain}>
      <StatusBar backgroundColor='red'></StatusBar>
      <View style={styles.chualogo}>
        <Image style={styles.logo} source={require('../images/logo2.jpg')} />
      </View>
      <View style={styles.title}>
        <Text style={{ fontWeight: 'bold', fontSize: 50 }}>Login</Text>
        <Text>By signing in you are agreeing</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text>our </Text>
          <TouchableOpacity onPress={() => Alert.alert('hello DungDubai')}>
            <Text style={{ color: "blue" }}>Term and privacy policy</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.group}>
          <FontAwesome name="envelope" size={30} color="red" style={styles.icon} />
          <TextInput
            placeholder='Email Address'
            style={styles.input}
            onChangeText={(text) => setEmail(text)} 
          ></TextInput>
        </View>
        <View style={styles.group}>
          <FontAwesome name="lock" size={40} color="red" style={styles.icon} />
          <TextInput
            placeholder='Password'
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)} 
          ></TextInput>
        </View>

        <View style={styles.group1}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              disabled={false}
              value={value}
              onValueChange={(newValue) => setValue(newValue)}
            />
            <Text style={{ paddingLeft: 10 }}>Remember my choice</Text>
          </View>

          <View>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={{ color: "blue" }}>Đăng ký</Text>
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity style={styles.btn} onPress={handleLogin}> 
          <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>Login</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chualogo: {
    alignItems: "center",
  },
  logo: {
    marginTop: 80,
    width: 150,
    height: 150,
  },
  contain: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  title: {
    marginTop: 10,
    alignItems: 'center',
  },
  form: {
    marginTop: 30,
  },
  group: {
    marginTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderColor: "gray",
    height: 50,
    paddingLeft: 40,
  },
  icon: {
    position: "absolute",
    top: 10,
    zIndex: 1000,
  },
  group1: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    marginTop: 30,
    backgroundColor: "red",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },

});