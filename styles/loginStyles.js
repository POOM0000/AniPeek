import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 45,
    backgroundColor: '#333',
    color: '#fff',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    width: '80%',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#888',
    marginVertical: 10,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: '#888',
    paddingVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 30,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
