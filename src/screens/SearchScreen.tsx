import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {getSavedItems, SavedItem} from '../services/storageService'; // Import your storage service functions
import Icon from 'react-native-vector-icons/Feather';
interface SearchScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SavedItem[]>([]);

  useEffect(() => {
    // Function to fetch saved items based on search query
    const searchItems = async () => {
      const savedItems: SavedItem[] = await getSavedItems(); // Use your storage service function here
      const filteredItems = savedItems.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(filteredItems);
    };

    searchItems();
  }, [searchQuery]);
  const renderItem = ({item}: {item: SavedItem}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        console.log('Item pressed:', item);
      }}>
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.title}</Text>
        {/* Add more details as needed */}
        <Text style={styles.itemDescription}>{item.note}</Text>
        <TouchableOpacity
          onPress={() => {
            // Open the link when the icon is pressed
            Linking.openURL(item.link).catch(err =>
              console.error('Error opening link:', err),
            );
          }}
          style={styles.linkContainer}>
          <Icon name="link" size={20} color="#0066cc" style={styles.linkIcon} />
          <Text style={styles.link}>{item.link}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for items..."
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  linkIcon: {
    marginRight: 8,
  },
  link: {
    color: 'blue',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    marginBottom: 18,
    borderRadius: 8,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  itemContent: {
    flexDirection: 'column',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemDescription: {
    color: '#666',
  },
});

export default SearchScreen;
