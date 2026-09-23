import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/detailStyles';

const DetailScreen = () => {
  const route = useRoute();
  const { anime_id } = route.params;
  const [user_id, setUserId] = useState(null);
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('user_id');
      if (storedUserId) {
        setUserId(Number(storedUserId));
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!user_id) return;

    axios.get(`http://192.168.1.117/backend/animelist/api/user/get_anime.php?anime_id=${anime_id}`)
      .then(response => {
        if (response.data.status === 'success') {
          setAnime(response.data.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching anime details:', error);
        setLoading(false);
      });

    axios.get(`http://192.168.1.117/backend/animelist/api/user/check_favorite.php?user_id=${user_id}&anime_id=${anime_id}`)
      .then(response => {
        if (response.data.status === 'success' && response.data.is_favorite) {
          setIsFavorite(true);
        }
      })
      .catch(error => {
        console.error('Error checking favorite:', error);
      });

    axios.get(`http://192.168.1.117/backend/animelist/api/user/get_reviews.php?anime_id=${anime_id}`)
      .then(response => {
        if (response.data.status === 'success') {
          setReviews(response.data.data);
        }
        setLoadingReviews(false);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setLoadingReviews(false);
      });
  }, [user_id, anime_id]);

  const addToFavorites = () => {
    if (!user_id) {
      Alert.alert('เกิดข้อผิดพลาด', 'กรุณาเข้าสู่ระบบก่อนเพิ่มในรายการโปรด');
      return;
    }

    axios.post('http://192.168.1.117/backend/animelist/api/user/add_favorite.php', {
        user_id: user_id,
        anime_id: anime_id
      })
      .then(response => {
        if (response.data.status === 'success') {
          Alert.alert('สำเร็จ', 'เพิ่มลงในรายการโปรดเรียบร้อยแล้ว!');
          setIsFavorite(true);
        } else {
          Alert.alert('เกิดข้อผิดพลาด', response.data.message);
        }
      })
      .catch(error => {
        console.error('Error adding to favorites:', error);
        Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเพิ่มลงในรายการโปรดได้');
      });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {anime && (
        <View>
          <Image source={{ uri: anime.image }} style={styles.image} />
          <Text style={styles.title}>{anime.title}</Text>
          <Text style={styles.category}>{anime.category_name}</Text>
          <Text style={styles.rating}>⭐ {anime.rating} (จากรีวิว)</Text>
          <Text style={styles.description}>{anime.description}</Text>

          <TouchableOpacity style={styles.favoriteButton} onPress={addToFavorites} disabled={isFavorite}>
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? '✅ เพิ่มเรียบร้อย' : '+ เพิ่มลงในรายการโปรด'}
            </Text>
          </TouchableOpacity>

          <View style={styles.reviewSection}>
            <Text style={styles.reviewTitle}>ความคิดเห็น</Text>
            {loadingReviews ? (
              <ActivityIndicator size="small" color="#00ff00" />
            ) : reviews.length > 0 ? (
              reviews.map((review, index) => (
                <View key={index} style={styles.reviewItem}>
                  <Text style={styles.reviewUser}>👤 ผู้ใช้ {review.user_id}:</Text>
                  <Text style={styles.reviewText}>{review.comment}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noReviewText}>ยังไม่มีความคิดเห็น</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default DetailScreen;