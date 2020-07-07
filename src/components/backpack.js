import React from 'react';

export default function Backpack(props) {
    let backpackClass = "hero-backpack";
    if (props.inshop) {
        backpackClass = "hero-backpack-inshop";
        return (
            <div className={backpackClass}>
            {props.items.map((item, index) => {return (<BackpackSlot 
                                                            key={index} 
                                                            index={index} 
                                                            name={item.name} 
                                                            image={item.image}
                                                            effect={()=>{return false}}
                                                            deleteItem={()=>{return false}}
                                                            inshop={props.inshop}
                                                        />)})}
        </div>
        )
    }

    else {
        return (
            <div className={backpackClass}>
                {props.items.map((item, index) => {return (<BackpackSlot 
                                                                key={index} 
                                                                index={index} 
                                                                name={item.name} 
                                                                image={item.image} 
                                                                effect={item.effect}
                                                                gameState={props.gameState}
                                                                gameSet={props.gameSet}
                                                                gameParameters={props.gameParameters}
                                                                inshop={props.inshop}
                                                                deleteItem={props.deleteItem}
                                                            />)})}
            </div>
        )
    }
}

function BackpackSlot(props) {
    let backpackClass = "hero-backpack-slot";

    function useItem() {
        if (props.effect(props.gameParameters, props.gameState, props.gameSet)) {
            props.deleteItem(props.index)
        }
    }
    if (props.inshop) {backpackClass = "hero-backpack-inshop-slot"}
    return (
        <img 
            className={backpackClass}
            alt={props.name} 
            src={props.image} 
            onClick={useItem}
        />
    )
}