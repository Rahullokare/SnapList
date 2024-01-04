import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {saveItem, SavedItem} from '../services/storageService';
import RNPickerSelect from 'react-native-picker-select';
import {categories} from '../utils/CategoryData';

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
  const handleSaveLink = async (
    values: AddLinkFormValues,
    {resetForm}: any,
  ) => {
    try {
      const transformedItem: SavedItem = {
        id: '',
        title: values.title,
        category: values.category,
        note: values.note,
        link: values.link,
      };

      await saveItem(transformedItem);
      Alert.alert('Success', 'Link saved successfully!', [{text: 'OK'}]);
      // You can navigate to another screen or perform any other action upon success
    } catch (error) {
      console.error('Error saving link:', error);
      Alert.alert('Error', 'Failed to save link. Please try again.', [
        {text: 'OK'},
      ]);
    } finally {
      if (resetForm) {
        resetForm();
      }
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
      <Formik
        initialValues={{title: '', category: '', note: '', link: ''}}
        onSubmit={handleSaveLink}
        validationSchema={validationSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Title"
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title}</Text>
            )}

            <RNPickerSelect
              onValueChange={itemValue => handleChange('category')(itemValue)}
              placeholder={{label: 'Select a Category', value: null}}
              items={categories}
              style={{...pickerSelectStyles}}
              value={values.category}
            />
            {errors.category && (
              <Text style={styles.errorText}>{errors.category}</Text>
            )}

            <Text style={styles.label}>Note</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('note')}
              onBlur={handleBlur('note')}
              value={values.note}
              placeholder="Note"
            />
            {errors.note && <Text style={styles.errorText}>{errors.note}</Text>}

            <Text style={styles.label}>Link</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('link')}
              onBlur={handleBlur('link')}
              value={values.link}
              placeholder="Link"
            />
            {errors.link && <Text style={styles.errorText}>{errors.link}</Text>}

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}>
              <Text style={styles.buttonText}>Save Link</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15,
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
