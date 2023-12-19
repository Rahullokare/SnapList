import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';

interface CategoryCardsProps {
  image: string | null; // Accepts null as a valid value
  title: string;
  category: string;
}

const CategoryCards: React.FC<CategoryCardsProps> = ({
  title,
  category,
  image,
}) => {
  const defaultImageURL = 'https://picsum.photos/200/300'; // Provide a default image URL

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{uri: image || defaultImageURL}}
        resizeMode="cover"
        style={styles.image}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardCategory}>{category}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 0,
    height: 150,
    width: 150,
    marginBottom: 10,
    elevation: 2,
    overflow: 'hidden',
    marginRight: 34,
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Text color on the overlay
    marginBottom: 8,
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  cardCategory: {
    fontSize: 14,
    color: '#FFFFFF', // Text color on the overlay
    backgroundColor: '#000000c0',
  },
});

export default CategoryCards;
