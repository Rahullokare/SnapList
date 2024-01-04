import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import {categories} from '../utils/CategoryData';
import {saveItem, SavedItem} from '../services/storageService';

interface AddLinkFormValues {
  title: string;
  category: string;
  note: string;
  link: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  category: Yup.string().required('Category is required'),
  note: Yup.string().required('Note is required'),
  link: Yup.string().url('Invalid URL').required('Link is required'),
});

const AddLinkScreen: React.FC = () => {
  const navigation = useNavigation<any>(); // Specify the type for useNavigation

  const [formValues, setFormValues] = useState<AddLinkFormValues>({
    title: '',
    category: '',
    note: '',
    link: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    category: '',
    note: '',
    link: '',
  });

  const handleInputChange = (field: keyof AddLinkFormValues, value: string) => {
    setFormValues(prevValues => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const handleSaveLink = async () => {
    try {
      await validationSchema.validate(formValues, {abortEarly: false});
      const transformedItem: SavedItem = {
        id: '',
        title: formValues.title,
        category: formValues.category,
        note: formValues.note,
        link: formValues.link,
      };

      await saveItem(transformedItem);
      Alert.alert('Success', 'Link saved successfully!', [{text: 'OK'}]);
      setFormValues({
        title: '',
        category: '',
        note: '',
        link: '',
      });

      // Navigate to the home screen
      navigation.navigate('Home');
    } catch (validationErrors: any) {
      const newErrors: any = {};
      validationErrors.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          textAlign: 'center',
          color: '#000',
        }}>
        Add Link
      </Text>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputChange('title', value)}
          value={formValues.title}
          placeholder="Title"
        />
        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

        <RNPickerSelect
          onValueChange={itemValue => handleInputChange('category', itemValue)}
          placeholder={{label: 'Select a Category', value: null}}
          items={categories}
          style={{...pickerSelectStyles}}
          value={formValues.category}
        />
        {errors.category && (
          <Text style={styles.errorText}>{errors.category}</Text>
        )}

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputChange('note', value)}
          value={formValues.note}
          placeholder="Note"
        />
        {errors.note && <Text style={styles.errorText}>{errors.note}</Text>}

        <Text style={styles.label}>Link</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputChange('link', value)}
          value={formValues.link}
          placeholder="Link"
        />
        {errors.link && <Text style={styles.errorText}>{errors.link}</Text>}

        <TouchableOpacity onPress={handleSaveLink} style={styles.button}>
          <Text style={styles.buttonText}>Save Link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'grey',
    marginBottom: 12,
  },
});
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    elevation: 1,
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 18,
    paddingLeft: 10,
    color: '#000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddLinkScreen;
