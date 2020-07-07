import React, { useContext } from 'react';
import GameParameters from './game-parameters';

export default function EndGameScreen(props) {
    let gameParameters = useContext(GameParameters);
    let title = gameParameters.heroStats.health > 0 ? 'Победа!' : 'Поражение!';
    let text = `Вы набрали ${gameParameters.heroStats.score} очков.`

    return (
        <div className="banner">
            <span className="banner-text victory">{title}</span>
            <span className="banner-score">{text}</span>
            <div className="banner-buttons">
                <button type="button" className="btn btn-primary btn-big" onClick={()=>{props.changeScreen('menuScreen')}}>В главное меню</button>
                <button type="button" className="btn btn-primary btn-big" onClick={()=>{props.changeScreen('gameScreen')}}>Сыграть заново</button>
            </div>
        </div>
    )
}