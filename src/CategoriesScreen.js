import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from '../styles/categoriesStyles'

export default function AnimeCategories() {
  const navigation = useNavigation(); // ✅ ใช้ navigation
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://192.168.1.117/backend/animelist/api/user/get_categories.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCategories(data.data);
          setSelectedCategory(data.data[0]?.category_id || null);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const selectedCategoryData = categories.find(cat => cat.category_id === selectedCategory);

  return (
    <View style={styles.container}>

      {/* ช่องค้นหา */}
      <TextInput
        style={styles.searchBox}
        placeholder="ค้นหาหมวดหมู่..."
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
      />

      {/* รายการหมวดหมู่ */}
      <FlatList
        data={categories.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()))}
        horizontal
        keyExtractor={(item) => item.category_id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              { backgroundColor: item.category_id === selectedCategory ? item.color : "#333" },
            ]}
            onPress={() => setSelectedCategory(item.category_id)}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* รายการอนิเมะ (2 คอลัมน์) */}
      <FlatList
        data={selectedCategoryData?.animes || []}
        keyExtractor={(item) => item.anime_id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        style={{ marginTop: 20 }}
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
}

