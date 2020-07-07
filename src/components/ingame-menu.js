import React from 'react';

export default function InGameMenu(props) {
    return (
        <div className="banner ingame">
            <div className="menu-stats">
                <span>Всего очков: </span>
                <span>{props.score}</span>
                <span>Золотых монет: </span>
                <span>{props.gold}</span>
                <span>Волна: </span>
                <span>{props.waves}</span>
            </div>
            <div className="with-borders p-3 bg-dark">
                <button type="button" className="btn btn-primary btn-big btn-block mb-3" onClick={()=>props.open('shop')}>Магазин</button>
                <button type="button" className="btn btn-primary btn-big btn-block mb-3" onClick={()=>alert('No contracts :(')}>Контракты</button>
                <button type="button" className="btn btn-primary btn-big btn-block mb-3" onClick={()=>{props.changeScreen('menuScreen')}}>Вернуться в Главное меню</button>
                <button type="button" className="btn btn-primary btn-big btn-block mb-3" onClick={()=>{props.changeScreen('endGameScreen')}}>Начать заново</button>
                <button type="button" className="btn btn-primary btn-big btn-block" onClick={()=>props.open('game')}>Назад</button>
            </div>
        </div>
    );
}