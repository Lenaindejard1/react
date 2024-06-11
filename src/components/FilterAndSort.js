import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const FilterAndSort = ({ categories, onFilter, onSort, sortOption }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSort, setSelectedSort] = useState(sortOption);

    return (
        <View style={styles.container}>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedCategory(itemValue);
                        onFilter(itemValue);
                    }}
                >
                    <Picker.Item label="Toutes les catégories" value="" />
                    {categories.map((category) => (
                        <Picker.Item key={category} label={category} value={category} />
                    ))}
                </Picker>
            </View>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedSort}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setSelectedSort(itemValue);
                        onSort(itemValue);
                    }}
                >
                    <Picker.Item label="Défaut" value="default" />
                    <Picker.Item label="Croissant" value="asc" />
                    <Picker.Item label="Décroissant" value="desc" />
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f8f8f8',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pickerContainer: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default FilterAndSort;
