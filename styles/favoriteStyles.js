import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#222", padding: 10 },
  header: { fontSize: 22, color: "white", marginBottom: 10 },
  searchBar: { backgroundColor: "#333", padding: 8, borderRadius: 5, color: "white" },
  listItem: { flexDirection: "row", justifyContent: "space-between", backgroundColor: "#333", padding: 15, borderRadius: 5, marginVertical: 5 },
  title: { fontSize: 18, color: "white" },
  genre: { fontSize: 14, color: "gray" },
  removeButton: { backgroundColor: "red", padding: 10, borderRadius: 20 },
  removeText: { color: "white", fontSize: 16, fontWeight: "bold" },
});