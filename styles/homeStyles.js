import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  searchBar: { 
    height: 40, 
    backgroundColor: '#333',
    borderRadius: 8, 
    paddingHorizontal: 10, 
    color: '#fff',
    marginBottom: 10
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginVertical: 10 },
  animeCard: { 
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: '47%',
    alignItems: 'center'
  },
  animeImage: { width: 120, height: 160, borderRadius: 8 },
  animeTitle: { fontSize: 14, fontWeight: 'bold', color: '#fff', marginTop: 5, textAlign: 'center' },
  animeRating: { fontSize: 12, color: '#FFD700', marginTop: 2 }
});
