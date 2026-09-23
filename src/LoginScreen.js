import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ ใช้เก็บ user_id
import styles from '../styles/loginStyles';

const API_URL = "http://192.168.1.117/backend/animelist/api/authen/login.php";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ✅ สร้าง state สำหรับ loading indicator

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    setLoading(true); // เริ่มโหลด

    const requestBody = JSON.stringify({ username, password });

    console.log("🔹 Request Body:", requestBody); // ตรวจสอบ JSON ที่ถูกส่งไป

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody
      });

      const responseText = await response.text(); // อ่าน response แบบ text
      console.log("🔹 Raw Response:", responseText); // ตรวจค่าที่ API ตอบกลับมา

      const json = JSON.parse(responseText); // แปลงเป็น JSON
      setLoading(false); // หยุดโหลด

      if (json.status === "success") {
        // ✅ บันทึก user_id ใน AsyncStorage
        await AsyncStorage.setItem('user_id', json.user.id.toString());
        
        Alert.alert("สำเร็จ", "เข้าสู่ระบบสำเร็จ");

        // 🔀 นำทางไปยัง Home (เปลี่ยนตาม navigation structure ที่ต้องการ)
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }]
        });

      } else {
        Alert.alert("ข้อผิดพลาด", json.message);
      }
    } catch (error) {
      console.error("🚨 Error:", error);
      Alert.alert("ข้อผิดพลาด", "เกิดข้อผิดพลาดขณะเข้าสู่ระบบ");
      setLoading(false); // หยุดโหลด
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon2.png')} style={styles.logo} />

      <Text style={styles.title}>Welcome to AniPeek</Text>
      
      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้ใช้"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Log in</Text>}
      </TouchableOpacity>

      <Text style={styles.orText}>หรือ</Text>

      <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerButtonText}>Sign up</Text>  
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
