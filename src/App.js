import React, {useEffect} from 'react';
import WelcomeScreen from './components/welcome-screen'
import LoadingScreen from './components/loading-screen'
//import MenuScreen from './components/menu-screen'
//import GameScreen from './components/game-screen'
import EndGameScreen from './components/endgame-screen'
import GameParameters from './components/game-parameters'
import heroesLibrary from './components/heroes-library'
import cardsLibrary from './components/cards-library'
import itemsLibrary from './components/items-library'

const MenuScreen = React.lazy(() => import('./components/menu-screen'));
const GameScreen = React.lazy(() => import('./components/game-screen'));

let gameParameters = {

    gameMode: {
        gameModeNames: ['Campain', 'Custom', 'Endless'],
        activeGameMode: 0
    },

    customGameStats: {
        numberOfCreatures: 2,
        numberOfWaves: 1,
        difficult: {
            arrayOfDifficults:['Простая', 'Средняя', 'Сложная'],
            activeDifficult: 0
        }
    },

    heroStats: {
        activeHero: 0,
        name: '',
        avatar: '',
        spells: [],
        spellsState: [],
        startSpellsState: [],
        maxHealth: 10,
        health: 10,
        maxMana: 10,
        mana: 10,
        dmg: 1,
        minDmg: 1,
        score: 0,
        gold: 0,
        backpack: Array(6).fill(itemsLibrary[0])
    },
    
    gameStats: {
        cardsArray: [],
        cardInfo: 0,
        wave: 1,
        shop: []
    },
    
    libraries: {
        heroes: heroesLibrary,
        cards: cardsLibrary,
        items: itemsLibrary
    }
    
}

function App () {
    let [activeScreen, SetActiveScreen] = React.useState('welcomeScreen');

    useEffect(() => {setTimeout(SetActiveScreen, 2000, 'menuScreen')}, []);

    function changeScreen(screen) {
        SetActiveScreen(screen);
    }

    let openScreen = "";

    // eslint-disable-next-line default-case
    switch (activeScreen) {
        case 'welcomeScreen': 
            openScreen = <WelcomeScreen />
            break;
        case 'menuScreen':
            openScreen = 
                <React.Suspense fallback = {<LoadingScreen />}>
                    <MenuScreen changeScreen={changeScreen}/>
                </React.Suspense>;
            break;
        case 'gameScreen':
            openScreen = 
                <React.Suspense fallback = {<LoadingScreen />}>
                    <GameScreen changeScreen={changeScreen}/>
                </React.Suspense>
            break;
        case 'endGameScreen':
            openScreen = <EndGameScreen changeScreen={changeScreen}/>
            break;
    } 


    return (
        <GameParameters.Provider value={gameParameters}>
            {openScreen}
        </GameParameters.Provider>
        )

}

export default App;
