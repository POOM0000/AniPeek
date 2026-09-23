import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/registerStyles';

const API_URL = "http://192.168.1.117/backend/animelist/api/authen/register.php";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      });

      const json = await response.json();

      if (json.status === "success") {
        Alert.alert("สำเร็จ", "สมัครสมาชิกสำเร็จ!", [
          { text: "ตกลง", onPress: () => navigation.navigate("Login") }
        ]);
      } else {
        Alert.alert("ข้อผิดพลาด", json.message);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดขณะสมัครสมาชิก");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="ชื่อ"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>หรือ</Text>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Log in")}>
        <Text style={styles.secondaryButtonText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
