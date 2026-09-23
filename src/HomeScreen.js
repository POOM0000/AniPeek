import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/homeStyles'

const API_URL = "http://192.168.1.117/backend/animelist/api/user/get_anime.php";

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetchAnimeList();
  }, []);

  const fetchAnimeList = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      if (json.status === "success") {
        setAnimeList(json.data);
      } else {
        console.error("Error:", json.message);
      }
    } catch (error) {
      console.error("Error fetching anime:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar} 
        placeholder="ค้นหาอนิเมะ..." 
        placeholderTextColor="#888"
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />
      
      <FlatList 
        numColumns={2}
        data={animeList} 
        keyExtractor={(item) => item.anime_id.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.animeCard} 
            onPress={() => navigation.navigate("Detail", { anime_id: item.anime_id })}
          >
            <Image source={{ uri: item.image }} style={styles.animeImage} />
            <Text style={styles.animeTitle}>{item.title}</Text>
            <Text style={styles.animeRating}>⭐ {item.rating}</Text>
          </TouchableOpacity>
        )} 
      />
    </View>
  );
};

export default HomeScreen;