import React, {useContext, useEffect, useState} from 'react';
import GameParameters from './game-parameters'


export default function CustomMenu(props) {
    let gameParameters = useContext(GameParameters);
    let [custom, setCustom] = useState(gameParameters);

    function changeCreatures(change) {
        if (gameParameters.gameMode.activeGameMode === 1) {
            if (((gameParameters.customGameStats.numberOfCreatures > 2) && (change < 0)) || (change > 0)) {
                gameParameters.customGameStats.numberOfCreatures+=change;
                let newCustom = Object.assign({}, gameParameters);
                setCustom(newCustom);
            }
        }
    }

    function changeWaves(change) {
        if (gameParameters.gameMode.activeGameMode === 1) {
            if (((gameParameters.customGameStats.numberOfWaves > 1) && (change < 0)) || (change > 0)) {
                gameParameters.customGameStats.numberOfWaves+=change;
                let newCustom = Object.assign({}, gameParameters);
                setCustom(newCustom);
            }
        }
    }

    function changeDifficult(change) {
        if (gameParameters.gameMode.activeGameMode === 1) {
            if (((gameParameters.customGameStats.difficult.activeDifficult > 0) && (change < 0)) || ((gameParameters.customGameStats.difficult.activeDifficult < 2) && (change > 0))) {
                gameParameters.customGameStats.difficult.activeDifficult+=change;
                let newCustom = Object.assign({}, gameParameters);
                setCustom(newCustom);
            }
        }
    }

    function changeMode() {
        if (gameParameters.gameMode.activeGameMode === 2) {
            gameParameters.gameMode.activeGameMode = 1
        }
        else {gameParameters.gameMode.activeGameMode = 2}
        gameParameters.customGameStats.numberOfCreatures = 2;
        gameParameters.customGameStats.numberOfWaves = 1;
        gameParameters.customGameStats.difficult.activeDifficult = 2;
        let newCustom = Object.assign({}, gameParameters);
        setCustom(newCustom);
    }

    function changeHero(change) {
        if (((gameParameters.heroStats.activeHero > 0) && (change < 0)) || ((gameParameters.heroStats.activeHero < (gameParameters.libraries.heroes.length-1)) && (change > 0))) {
            gameParameters.heroStats.activeHero+=change;
            let newCustom = Object.assign({}, gameParameters);
            setCustom(newCustom);
        }
    }

    function setToCustom() {
        gameParameters.gameMode.activeGameMode = 1;
    }

    function installHero() {

        gameParameters.heroStats = {
            ...gameParameters.heroStats,
            name: gameParameters.libraries.heroes[gameParameters.heroStats.activeHero].name,
            avatar: gameParameters.libraries.heroes[gameParameters.heroStats.activeHero].avatar,
            spells: gameParameters.libraries.heroes[gameParameters.heroStats.activeHero].spells,
            spellsState: gameParameters.libraries.heroes[gameParameters.heroStats.activeHero].spellsState.slice(),
            startSpellsState: gameParameters.libraries.heroes[gameParameters.heroStats.activeHero].spellsState.slice(),
        }
    }

    useEffect(()=>(setToCustom()), []);

    return (
        <div className="col-md-8 p-3 game-menu-window start down with-borders">
            <div className="menu-chain left"></div>
            <div className="menu-chain right"></div>
            <div className="row align-items-center">
                <CustomMenuItem name='Количество врагов' number={custom.customGameStats.numberOfCreatures}  checkbox={false} change={changeCreatures}/>
                <CustomMenuItem name='Количество волн' number={custom.customGameStats.numberOfWaves} checkbox={false} change={changeWaves}/>
                <CustomMenuItem name='Сложность' number={custom.customGameStats.difficult.arrayOfDifficults[custom.customGameStats.difficult.activeDifficult]}  
                                checkbox={false} change={changeDifficult}/>
                <CustomMenuItem name='Бесконечная игра' checkbox={true} on={(custom.gameMode.activeGameMode === 2)} change={changeMode}/>
            </div>
            <CustomMenuHero 
                name={custom.libraries.heroes[custom.heroStats.activeHero].name} 
                avatar={custom.libraries.heroes[custom.heroStats.activeHero].avatar} 
                change={changeHero} 
            />
            <div className="row">
                <Button label = "Назад" onClick={()=>props.open('main')}/>
                <Button label = "В бой!" onClick={()=>{props.changeScreen('gameScreen'); installHero()}} />
            </div>
        </div>
    )
}

function CustomMenuItem(props) {
    //let [state, setState] = React.useState(props);
    return (
        <React.Fragment>
        <div className="col-md-3 mb-3">
            <span className="game_menu_window_text">{props.name}</span>
        </div>
        
        <div className="col-md-3 mb-3 p-0">
            <div className="game-menu-item">
            {props.checkbox ? 
            <input type="checkbox" checked = {props.on} onChange={props.change}/>
            :
            <React.Fragment>
            <div className="game-menu-arrow arrow-left" onClick={()=>{props.change(-1)}}></div>
            <span className="game_menu_window_text">{props.number}</span>
            <div className="game-menu-arrow arrow-right" onClick={()=>{props.change(+1)}}></div>
            </React.Fragment>
        }
            </div>
        </div>
        </React.Fragment>
    )
}

function HeroFrame(props) {
    return (
        <div className="hero-frame">
            <img src={props.avatar} className="d-block w-100 h-100" alt={props.name} /> 
        </div>
    )
}

function CustomMenuHero(props) {

    return (
        <div className="row align-items-center">
                    <div className="col-md-6">
                        <span>Выберите героя</span>
                    </div>
  
                    <div className="col-md-6">
                        <div className="row align-items-center justify-content-center mb-3">
                            <div className="game-menu-arrow arrow-left" onClick={()=>{props.change(-1)}}></div>
                            <div className="hero-swiper">
                                <HeroFrame 
                                avatar={props.avatar} 
                                name={props.name}
                                />
                            </div>
                            <div className="game-menu-arrow arrow-right" onClick={()=>{props.change(+1)}}></div>
                        </div>
                    </div>
        </div>
    )
}

function Button(props) {
    return (
        <div className="col">
            <button type="button" className="btn btn-primary btn-big btn-block" onClick={()=>props.onClick('main')}>{props.label}</button>
        </div>
    )
}

