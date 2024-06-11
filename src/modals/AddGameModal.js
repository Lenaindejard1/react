import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

const AddGameModal = ({ visible, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = () => {
        onAdd({ title, price: parseFloat(price), category, image });
        setTitle('');
        setPrice('');
        setCategory('');
        setImage('');
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
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
                <TextInput
                    style={styles.input}
                    placeholder="Catégorie"
                    value={category}
                    onChangeText={setCategory}
                />
                <TextInput
                    style={styles.input}
                    placeholder="URL de l'image"
                    value={image}
                    onChangeText={setImage}
                />
                <Button title="Ajouter" onPress={handleSubmit} />
                <Button title="Annuler" onPress={onClose} color="red" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
});

export default AddGameModal;
