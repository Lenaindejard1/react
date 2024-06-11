import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const AddGameModal = ({ visible, onClose, onAdd, existingCategories }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = () => {
        onAdd({ name: title, price: parseFloat(price), catégorie: category, image });
        setTitle('');
        setPrice('');
        setCategory('');
        setImage('');
        onClose();
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Comment je peux travailler moi ? Si vous acceptez pas !');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Titre"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Prix"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                    <Picker
                        selectedValue={category}
                        style={styles.input}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                        <Picker.Item label="Toutes les catégories" value="" />
                        {existingCategories.map((cat) => (
                            <Picker.Item key={cat} label={cat} value={cat} />
                        ))}
                    </Picker>
                    <Button title="Sélectionner une image" onPress={pickImage} />
                    {image ? <Text style={styles.imageText}>Image sélectionnée</Text> : null}
                    <View style={styles.buttonContainer}>
                        <Button title="Annuler" onPress={onClose} color="red" />
                        <Button title="Enregistrer" onPress={handleSubmit} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    closeButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    imageText: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default AddGameModal;
