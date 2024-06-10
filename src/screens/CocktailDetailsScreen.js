
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesContext } from '../context/FavoritesContext';

const CocktailDetailsScreen = ({ route }) => {
    const { cocktailId } = route.params;
    const [cocktail, setCocktail] = useState(null);
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    useEffect(() => {
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
            .then(response => {
                setCocktail(response.data.drinks[0]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [cocktailId]);

    if (!cocktail) {
        return <Text>Chargement...</Text>;
    }

    const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(cocktail.idDrink);
        } else {
            addFavorite(cocktail);
        }
    };

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail[`strIngredient${i}`];
        const measure = cocktail[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push({ ingredient, measure });
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
            <View style={styles.header}>
                <Text style={styles.title}>{cocktail.strDrink}</Text>
                <TouchableOpacity onPress={toggleFavorite}>
                    <Icon name={isFavorite ? 'heart' : 'heart-o'} size={30} color="red" />
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Ingrédients :</Text>
            <FlatList
                data={ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.ingredientContainer}>
                        <Image
                            source={{ uri: `https://www.thecocktaildb.com/images/ingredients/${item.ingredient}-Small.png` }}
                            style={styles.ingredientImage}
                        />
                        <Text style={styles.ingredient}>{item.measure} {item.ingredient}</Text>
                    </View>
                )}
            />
            <Text style={styles.subtitle}>Recette :</Text>
            <Text style={styles.description}>{cocktail.strInstructions}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    ingredientContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    ingredientImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    ingredient: {
        fontSize: 16,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
});

export default CocktailDetailsScreen;
