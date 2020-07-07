import React from 'react';
import Backpack from './backpack'

export default function Shop(props) {

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
        <div className="shop-window with-borders">

            <div className="shop-top">
                <div className="seller-frame">
                    <div className="seller-img">
                        <img className="h-100" src={require("../img/templates/seller_img.jpg")} alt='Продавец'/>
                    </div>
                    <div className="seller-speech">
                        <span className="seller-speech-text">Привет, путник!</span>
                    </div>
                </div>
            </div>

            <div className="shop-middle">

                <Backpack inshop={true} items={props.backpack} effect={()=>()=>{return false}}/>
                <button type="button" className="btn btn-primary btn-big" onClick={props.close}>Обратно в бой!</button>

            </div>

            <div className="shop-bottom">
                <ShopItemsGrid arrayOfItems={props.arrayOfItems} items={props.items} buy={props.buyItem}/>
            </div>

        </div>
    </div>
    )
}

function ShopItemsGrid(props) {
    return (
        <div className="shop-grid">
            {props.arrayOfItems.map((item, index)=>{return (<ShopItem key={index} index={index} name={item.name} image={item.image} buy={props.buy}/>)})}
        </div>
    )
}

function ShopItem(props) {
    return (
            <img className="h-100 mx-auto" alt={props.name} src={props.image} onClick={()=>props.buy(props.index)}/>
    )
}