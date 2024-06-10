import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (cocktail) => {
        setFavorites([...favorites, cocktail]);
    };

    const removeFavorite = (idDrink) => {
        setFavorites(favorites.filter(cocktail => cocktail.idDrink !== idDrink));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
