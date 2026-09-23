import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, Switch, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/profileStyles';

const API_URL = "http://192.168.1.117/backend/animelist/api/user/get_profile.php";
const LOGOUT_URL = "http://192.168.1.117/backend/animelist/api/user/logout.php";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const loadUserPreferences = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        const storedDarkMode = await AsyncStorage.getItem("dark_mode");

        if (storedUserId) {
          setUserId(Number(storedUserId));
          fetchProfile(Number(storedUserId));
        }
        
        if (storedDarkMode !== null) {
          setDarkMode(storedDarkMode === "true");
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };
    loadUserPreferences();
  }, []);

  const fetchProfile = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?user_id=${id}`);
      const json = await response.json();
      if (json.status !== "success") throw new Error(json.message || "Unknown error");
      setProfile(json);
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_URL, { method: "POST" });
      await AsyncStorage.removeItem("user_id");
      Alert.alert("Logged out", "You have been logged out successfully.", [
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out.");
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newMode = !darkMode;
      setDarkMode(newMode);
      await AsyncStorage.setItem("dark_mode", newMode.toString());
    } catch (error) {
      console.error("Error saving dark mode preference:", error);
    }
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      {loading ? (
        <ActivityIndicator size="large" color={darkMode ? "#fff" : "#000"} />
      ) : (
        <>
          <Image source={require('../assets/icon2.png')} style={styles.profileImage} />
          <Text style={[styles.name, darkMode ? styles.darkText : styles.lightText]}>{profile?.user?.username || "Unknown"}</Text>
          <Text style={[styles.username, darkMode ? styles.darkText : styles.lightText]}>@{profile?.user?.email || "unknown"}</Text>
          <Text style={[styles.sectionTitle, darkMode ? styles.darkText : styles.lightText]}>รายการโปรด</Text>
          <FlatList 
            data={profile?.favorites || []}
            keyExtractor={(item) => item.anime_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.animeCard} 
                onPress={() => navigation.navigate("Detail", { anime_id: item.anime_id })}
              >
                <Image source={{ uri: item.image }} style={styles.animeImage} />
                <View>
                  <Text style={styles.animeTitle}>{item.title}</Text>
                  <Text style={styles.animeDate}>บันทึกเมื่อ {item.date_added}</Text>
                </View>
                <Text style={styles.animeRating}>⭐ {item.rating}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, darkMode ? styles.darkText : styles.lightText]}>Theme [Dark/Light]</Text>
            <Switch value={darkMode} onValueChange={toggleDarkMode} />
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;