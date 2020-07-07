import React, {useContext, useEffect, useState} from 'react';
import HeroWindow from "./hero-window";
import GameFieldSide from "./game-field";
import GameParameters from './game-parameters'
import InGameMenu from './ingame-menu'
import Shop from './shop'
import CardInfo from './card-info'

export default function GameScreen(props) {
    let gameParameters = useContext(GameParameters);
    let initialState = {
        gameParameters,
        activeWindow: 'game',
    };
    let [state, setState] = useState(initialState);
    let window = null;

    function resetStats() {
        gameParameters.gameStats.wave = 1;
        gameParameters.heroStats = {
            ...gameParameters.heroStats,
            spellsState: gameParameters.libraries.heroes[gameParameters.heroStats.activeHero].spellsState,
            maxHealth: 10,
            health: 10,
            maxMana: 10,
            mana: 10,
            dmg: 1,
            minDmg: 1,
            score: 0,
            gold: 0,
            backpack: Array(6).fill(gameParameters.libraries.items[0])
        }
        gameParameters.gameStats.cardsArray = [];
        if (gameParameters.gameMode.activeGameMode === 2) {
            gameParameters.customGameStats.numberOfCreatures = 2;
        }
    }

    function refreshState() {
        setState({
            ...state,
            gameParameters
        });
    }

    function setScore(points) {
        if (points > 0) {
            gameParameters.heroStats = {
                ...gameParameters.heroStats,
                score: gameParameters.heroStats.score+points,
                gold: gameParameters.heroStats.gold+points,
            }
        };
        if (points < 0) {
            gameParameters.heroStats = {
                ...gameParameters.heroStats,
                gold: gameParameters.heroStats.gold+points,
            }
        };
        if (gameParameters.heroStats.gold < 0) {
            gameParameters.heroStats = {
                ...gameParameters.heroStats,
                gold: 0,
            }
        };
        setState({
            ...state,
            gameParameters
        });
    };

    function setHealth(points) {
        if ((points > 0) & (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth)) {
            alert('У героя максимум здоровья');
            return false;
        };
        gameParameters.heroStats.health += points;
        if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {
            gameParameters.heroStats.health = gameParameters.heroStats.maxHealth;
        };
        setState({
            ...state,
            gameParameters
        });
    };

    function setDmg(points) {
        gameParameters.heroStats.dmg = points;
        setState({
            ...state,
            gameParameters
        });
    };

    function openWindow(window) {
        setState({
            ...state,
            activeWindow: window
        });
    }

    function buyItem(item) {
        if (gameParameters.heroStats.gold >= gameParameters.gameStats.shop[item].price) {
            if (gameParameters.heroStats.backpack.some((item) => {return item.name === "Пустой слот"})) {
            gameParameters.heroStats.gold-=gameParameters.gameStats.shop[item].price;
            for (let i = 0; i < gameParameters.heroStats.backpack.length; i++) {
                if (gameParameters.heroStats.backpack[i].name === "Пустой слот") {
                    gameParameters.heroStats.backpack[i] = gameParameters.gameStats.shop[item];
                    gameParameters.gameStats.shop[item] = gameParameters.libraries.items[0];
                    setState({
                        ...state,
                        gameParameters
                    });
                    break;
                }
            };
            }
            else {
                alert('Нет свободного места в рюкзаке.')
            }
        }
        else {
            alert('Недостаточно золота.');
        }
        
    }

    function setSpellState(spellIndex, toState) {
        gameParameters.heroStats.spellsState[spellIndex] = toState;
        setState({
            ...state,
            gameParameters
        });
    };

    function deleteItem(item) {
        console.log('deleted ' + item);
        gameParameters.heroStats.backpack[item] = gameParameters.libraries.items[0];
        setState({
            ...state,
            gameParameters
        });
    }

    function setCard(id, toState) {
        gameParameters.gameStats.cardsArray.forEach((item)=>{if (item.id === id) {item.state = toState}});
        setState({
            ...state,
            gameParameters
        });
    };

    function showCards() {
        gameParameters.gameStats.cardsArray.forEach((item)=>{item.state = 'begin-opening-show'});
        setState({
            ...state,
            gameParameters
        });
        setTimeout(()=>{
            gameParameters.gameStats.cardsArray.forEach((item)=>{item.state = 'begin-closing'});
            setState({
                ...state,
                gameParameters
            });
        }, 3000);
    };

    function setWaves() {
        
        let newWave = gameParameters.gameStats.wave + 1;
        gameParameters.gameStats.wave = 'new wave';
        gameParameters.gameStats.cardsArray = [];
        gameParameters.gameStats.shop.length = [];
        gameParameters.heroStats.dmg = gameParameters.heroStats.minDmg;
        gameParameters.heroStats.spellsState = gameParameters.heroStats.startSpellsState.slice();

        setState({
            ...state,
            gameParameters
        });
        setTimeout(()=>{
            gameParameters.gameStats.wave = newWave;
            setState({
                ...state,
                gameParameters
            });
        }, 3000);
    }

    function cardInfo(index) {
        gameParameters.gameStats.cardInfo = index;
        openWindow('cardInfo');
    }

    switch (state.activeWindow) {
        case 'game': {
            window = null;
            break;
        }
        case 'menu': {
            window = <InGameMenu
                        gold={gameParameters.heroStats.gold}
                        score={gameParameters.heroStats.score}
                        waves={gameParameters.gameStats.wave}
                        open={openWindow} 
                        changeScreen={props.changeScreen} 
                    />;
            break;
        }
        case 'shop': {
            window = <Shop 
                        close={()=>openWindow('game')}
                        gold={gameParameters.heroStats.gold}
                        score={gameParameters.heroStats.score}
                        waves={gameParameters.gameStats.wave}
                        backpack={gameParameters.heroStats.backpack} 
                        items={gameParameters.libraries.items}
                        buyItem={buyItem}
                        arrayOfItems={gameParameters.gameStats.shop}
                    />;
            break;
        }
        case 'cardInfo': {
            window = <CardInfo
                        gold={gameParameters.heroStats.gold}
                        score={gameParameters.heroStats.score}
                        waves={gameParameters.gameStats.wave}
                        close={()=>openWindow('game')} 
                        name={gameParameters.gameStats.cardsArray[gameParameters.gameStats.cardInfo].creature.name}
                        avatar={gameParameters.gameStats.cardsArray[gameParameters.gameStats.cardInfo].creature.img}
                        health={gameParameters.gameStats.cardsArray[gameParameters.gameStats.cardInfo].creature.health}
                        armor={gameParameters.gameStats.cardsArray[gameParameters.gameStats.cardInfo].creature.armor}
                        dmg={gameParameters.gameStats.cardsArray[gameParameters.gameStats.cardInfo].creature.dmg}
                        desc={gameParameters.gameStats.cardsArray[gameParameters.gameStats.cardInfo].creature.desc}
                        price={gameParameters.gameStats.cardsArray[gameParameters.gameStats.cardInfo].creature.price}
                    />;
            break;
        }
        default: {window = null}
    }

    useEffect(() => resetStats, []);

    return (
    <div className="container-fluid p-0 h-100 game-frame">
        <div className='row-field'>
            {window}
            <GameFieldSide 
                gameMode={gameParameters.gameMode.activeGameMode} 
                wave={gameParameters.gameStats.wave} 
                changeScreen={props.changeScreen}
                setScore={setScore}
                setHealth={setHealth}
                setDmg={setDmg}
                open={openWindow}
                refreshState={refreshState}
                setCard={setCard}
                gameSet={setState}
                gameState={state}
                showCards={showCards}
                gameParameters={state.gameParameters}
                setWaves = {setWaves}
                cardInfo = {cardInfo}
            />
            <HeroWindow 
                changeScreen={props.changeScreen}
                gameParameters={state.gameParameters}
                openWindow={openWindow}
                gameSet={setState}
                gameState={state}
                deleteItem={deleteItem}
                setSpellState={setSpellState}
            />
        </div>
    </div>)
}