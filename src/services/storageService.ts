// storageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'savedItems';

export interface SavedItem {
  id: string;
  title: string;
  category: string;
  note: string;
  link: string;
}

export const saveItem = async (item: SavedItem): Promise<void> => {
  try {
    const existingItems = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedItems: SavedItem[] = existingItems
      ? JSON.parse(existingItems)
      : [];
    const updatedItems = [...parsedItems, {...item, id: generateId()}];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
    console.log('Saved Successfully', updatedItems);
  } catch (error) {
    console.error('Error saving item:', error);
    throw error;
  }
};

export const getSavedItems = async (): Promise<SavedItem[]> => {
  try {
    const savedItems = await AsyncStorage.getItem(STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  } catch (error) {
    console.error('Error retrieving saved items:', error);
    throw error;
  }
};

export const updateItem = async (updatedItem: SavedItem): Promise<void> => {
  try {
    const existingItems = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedItems: SavedItem[] = existingItems
      ? JSON.parse(existingItems)
      : [];
    const updatedItems = parsedItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItem = async (itemId: string): Promise<void> => {
  try {
    const existingItems = await AsyncStorage.getItem(STORAGE_KEY);
    const parsedItems: SavedItem[] = existingItems
      ? JSON.parse(existingItems)
      : [];
    const updatedItems = parsedItems.filter(item => item.id !== itemId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedItems));
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const getAllCategories = async (): Promise<string[]> => {
  try {
    const savedItems = await getSavedItems();
    const categoriesSet = new Set<string>();
    savedItems.forEach(item => categoriesSet.add(item.category));
    return Array.from(categoriesSet);
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

export const getAllTags = async (): Promise<string[]> => {
  try {
    const savedItems = await getSavedItems();
    const tagsSet = new Set<string>();
    savedItems.forEach(item => tagsSet.add(item.note)); // Assuming notes are used as tags
    return Array.from(tagsSet);
  } catch (error) {
    console.error('Error getting tags:', error);
    throw error;
  }
};

const generateId = (): string => {
  return (
    'item_' +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
