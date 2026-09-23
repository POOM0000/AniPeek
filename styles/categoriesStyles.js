import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  searchBox: { backgroundColor: "#333", color: "white", padding: 10, borderRadius: 8, marginBottom: 10 },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: { color: "white", fontWeight: "bold" },
  row: { justifyContent: "space-between" },
  animeCard: { 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 10, 
    width: "48%", 
    alignItems: "center",
  },
  animeImage: { width: "100%", height: 160, borderRadius: 8 },
  animeTitle: { fontSize: 14, fontWeight: "bold", color: "#fff", marginTop: 5, textAlign: "center" },
  animeRating: { fontSize: 12, color: "#FFD700", marginTop: 2 }
});