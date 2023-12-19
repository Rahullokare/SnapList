import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {saveItem} from '../services/storageService';
import {v4 as uuidv4} from 'uuid';

const AddLinkScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleSave = async () => {
    try {
      const id = uuidv4();
      // Save the item
      await saveItem({
        id,
        name,
        category,
        tags: tags.split(',').map(tag => tag.trim()),
        description,
        link,
      });

      // Optionally, you can navigate back to the previous screen or update UI
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Link</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags (comma-separated)"
        value={tags}
        onChangeText={setTags}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Link"
        value={link}
        onChangeText={setLink}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
  },
});

export default AddLinkScreen;
