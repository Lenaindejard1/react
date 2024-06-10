import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import CocktailDetailsScreen from '../screens/CocktailDetailsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import BarSearchScreen from '../screens/BarSearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CocktailDetails" component={CocktailDetailsScreen} />
            <Stack.Screen name="BarSearch" component={BarSearchScreen} />
        </Stack.Navigator>
    );
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Cocktails') {
                            iconName = 'glass';
                        } else if (route.name === 'Favoris') {
                            iconName = 'heart';
                        } else if (route.name === 'Recherche Bars'){
                            iconName = 'map';
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Cocktails" component={HomeStack} />
                <Tab.Screen name="Favoris" component={FavoritesScreen} />
                <Tab.Screen name="Recherche Bars" component={BarSearchScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
