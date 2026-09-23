import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 350,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00aaff',
    marginTop: 5,
  },
  rating: {
    fontSize: 16,
    color: '#FFD700',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 10,
    textAlign: 'justify',
  },
  favoriteButton: {
    backgroundColor: '#1e90ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  favoriteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewSection: {
    marginTop: 20,
    padding: 50,
    backgroundColor: '#f8f9fa',
    borderRadius: 10
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  reviewItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  reviewUser: {
    fontWeight: 'bold',
    color: '#333'
  },
  reviewText: {
    color: '#555'
  },
  noReviewText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#888'
  },  
  input: {
    backgroundColor: '#222222',
    color: '#ffffff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#ff4500',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
