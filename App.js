import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './src/components/Header';
import FilterAndSort from './src/components/FilterAndSort';
import HomeScreen from './src/pages/HomeScreen';
import AddGameModal from './src/modals/AddGameModal';
import videoGames from './src/data/VideoGames';

const App = () => {
    const [games, setGames] = useState(videoGames);
    const [filteredGames, setFilteredGames] = useState(videoGames);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        filterAndSortGames();
    }, [categoryFilter, sortOption]);

    const addGame = (game) => {
        const newGames = [...games, { ...game, id: games.length + 1 }];
        setGames(newGames);
        setFilteredGames(newGames);
    };

    const filterGames = (category) => {
        setCategoryFilter(category);
    };

    const sortGames = (option) => {
        setSortOption(option);
    };

    const filterAndSortGames = () => {
        let newGames = [...games];
        if (categoryFilter) {
            newGames = newGames.filter((game) => game.catégorie === categoryFilter);
        }
        if (sortOption === 'asc') {
            newGames.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === 'desc') {
            newGames.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        setFilteredGames(newGames);
    };

    return (
        <View style={styles.container}>
            <Header username="Lenaindejard1" gameCount={filteredGames.length} />
            <FilterAndSort
                categories={[...new Set(games.map((game) => game.catégorie))]}
                onFilter={filterGames}
                onSort={sortGames}
                sortOption={sortOption}
            />
            <HomeScreen games={filteredGames} />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setIsModalVisible(true)}
            >
                <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <AddGameModal
                            onClose={() => setIsModalVisible(false)}
                            onAdd={addGame}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default App;
