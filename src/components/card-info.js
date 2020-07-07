import React from 'react';

export default function CardInfo(props) {
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
            <div className="row p-3 card-info with-style">
                <div className="col-sm-6 d-flex justify-content-center">
                    <img className="mh-100 mw-100" alt={props.name} src={require(`../img/cards/${props.avatar}`)} />
                </div>
                <div className="col-sm-6">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <div className="w-100 d-flex justify-content-around align-items-center bg-black">
                            <img className="card-stats-img" alt='Здоровье' src={require("../img/icons/health.png")} />
                            <span>{props.health}</span>
                            <img className="card-stats-img" alt='Броня' src={require("../img/icons/armor.png")} />
                            <span>{props.armor}</span>
                            <img className="card-stats-img" alt='Урон' src={require("../img/icons/attack.png")} />
                            <span>{props.dmg}</span>
                        </div>
                        <p className="card-text">{props.desc}</p>
                        <p className="card-text">{'Стоимость: '+props.price+' золотых'}</p>
                        <button className="btn btn-primary" onClick={props.close}>Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

    