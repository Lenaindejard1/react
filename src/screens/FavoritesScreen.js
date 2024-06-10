import React, { useContext } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const FavoritesScreen = ({ navigation }) => {
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                <Text style={styles.noFavoritesText}>Aucun favori ajouté.</Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.idDrink}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => navigation.navigate('CocktailDetails', { cocktailId: item.idDrink })}>
                                <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
                                <Text style={styles.title}>{item.strDrink}</Text>
                                <Text style={styles.description}>Un délicieux cocktail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeFavorite(item.idDrink)}>
                                <FontAwesomeIcon icon={faHeart} style={styles.favorie} size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    noFavoritesText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    itemContainer: {
        marginBottom: 20,
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        left: 5,
    },
    description: {
        fontSize: 14,
        color: 'gray',
        left:5,
    },
    favorie: {
        left:10,
    },
});

export default FavoritesScreen;
