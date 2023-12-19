import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/Navigation';

interface CategoryViewScreenProps {
  route: RouteProp<RootStackParamList, 'Category'>;
}

const CategoryViewScreen: React.FC<CategoryViewScreenProps> = ({route}) => {
  const {category} = route.params;
  console.log(category);

  return (
    <View>
      <Text>CategoryViewScreen</Text>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
};

export default CategoryViewScreen;

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 24,
  },
});
