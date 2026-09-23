import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, padding: 20 },
  darkContainer: { backgroundColor: '#121212' },
  lightContainer: { backgroundColor: '#ffffff' },
  profileImage: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  username: { fontSize: 16, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  animeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', padding: 10, borderRadius: 10, marginVertical: 5 },
  animeImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  animeTitle: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  animeDate: { fontSize: 12, color: '#bbb' },
  animeRating: { marginLeft: 'auto', fontSize: 16, fontWeight: 'bold', color: 'gold' },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  switchLabel: { fontSize: 16 },
  logoutButton: { backgroundColor: 'red', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  darkText: { color: '#fff' },
  lightText: { color: '#000' },
});