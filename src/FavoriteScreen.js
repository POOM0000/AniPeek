import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/favoriteStyles';

const API_URL = "http://192.168.1.117/backend/animelist/api/user/get_favorite.php";
const REMOVE_URL = "http://192.168.1.117/backend/animelist/api/user/remove_favorite.php";

const FavoriteScreen = () => {
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (storedUserId) {
          const parsedUserId = Number(storedUserId);
          setUserId(parsedUserId);
          fetchFavorites(parsedUserId);
        }
      } catch (error) {
        console.error("Error loading user ID:", error);
      }
    };
    loadUserId();
  }, []);

  const fetchFavorites = async (id) => {
    if (!id) return;
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}?user_id=${id}`);
      const text = await response.text();
      console.log("Raw Response:", text);
      
      const json = JSON.parse(text);
      
      if (json.status === "success") {
        setFavorites(json.favorites);
      } else {
        Alert.alert("Error", json.message || "Unknown error occurred.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      Alert.alert("Error", "Failed to load favorites. Check network or server.");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (animeId) => {
    try {
      const response = await fetch(REMOVE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, anime_id: animeId }),
      });

      const json = await response.json();
      if (json.status === "success") {
        setFavorites(favorites.filter(anime => anime.anime_id !== animeId));
      } else {
        Alert.alert("Error", json.message);
      }
    } catch (error) {
      console.error("Remove error:", error);
      Alert.alert("Error", "Failed to remove anime.");
    }
  };

  const onRefresh = async () => {
    if (!userId) return;
    setRefreshing(true);
    await fetchFavorites(userId);
    setRefreshing(false);
  };

  const filteredFavorites = favorites.filter(anime =>
    anime.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="ค้นหาในรายการโปรด..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.anime_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.genre}>{item.genre}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFavorite(item.anime_id)}>
                <Text style={styles.removeText}>-</Text>
              </TouchableOpacity>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#00ff00"]} />
          }
        />
      )}
    </View>
  );
};

export default FavoriteScreen;
