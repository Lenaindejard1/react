import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/nav/nav';
import { FavoritesProvider } from './src/context/FavoritesContext';

export default function App() {
    return (
        <FavoritesProvider>
            <AppNavigator />
        </FavoritesProvider>
    );
}
