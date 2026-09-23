import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' },
    title: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '80%', backgroundColor: '#222', color: '#fff', padding: 10, borderRadius: 8, marginBottom: 10 },
    button: { width: '80%', backgroundColor: 'red', padding: 15, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    outlineButton: { width: '80%', borderWidth: 1, borderColor: '#fff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    outlineButtonText: { color: '#fff', fontSize: 18 },
    orText: { color: '#fff', marginVertical: 10 },
    secondaryButton: { borderWidth: 1, borderColor: '#888', paddingVertical: 10, width: '80%', alignItems: 'center',borderRadius: 15 },
    secondaryButtonText: { color: '#fff', fontSize: 18 }
  });