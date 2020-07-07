import React, {useContext, useEffect} from 'react';
import GameParameters from './game-parameters'
import Backpack from './backpack'

export default function HeroWindow(props) {

    return (
        <div className="col-sm-2 p-0 right-side">
            <div className="hero-window w-100">
                <HeroAvatar 
                    avatar={props.gameParameters.heroStats.avatar} 
                    name={props.gameParameters.heroStats.name}
                    openWindow={props.openWindow}
                />
                <HeroStats 
                    health={props.gameParameters.heroStats.health} 
                    maxHealth={props.gameParameters.heroStats.maxHealth} 
                    mana={props.gameParameters.heroStats.mana} 
                    maxMana={props.gameParameters.heroStats.maxMana} 
                    dmg={props.gameParameters.heroStats.dmg}/>
                <HeroSpells
                    spells={props.gameParameters.heroStats.spells}
                    spellsState={props.gameParameters.heroStats.spellsState}
                    setSpellState = {props.setSpellState}
                    gameState={props.gameState}
                    gameSet={props.gameSet}
                />
                <Backpack
                    items={props.gameParameters.heroStats.backpack}
                    gameState={props.gameState}
                    gameSet={props.gameSet}
                    gameParameters={props.gameParameters}
                    deleteItem={props.deleteItem}
                />
            </div>
        </div>
    )
}

function HeroAvatar(props) {
    return (
    <div className="hero-avatar">
        <img 
            className="h-100 w-100" 
            src={props.avatar} 
            alt={props.name}
            onClick={()=>props.openWindow('menu')}
        />
    </div>
    )
}

function HeroStats(props) {
    let dmgLogo = require("../img/heroes/damage/dmg-1.png");
    let healthStatus = "text-success mr-2";
    let dmgStatus = "text-light ml-2";

    switch (props.dmg) {
        case 1: {
            dmgLogo = require("../img/heroes/damage/dmg-1.png");
            dmgStatus = "text-light ml-2";
            break;
        }
        case 2: {
            dmgLogo = require("../img/heroes/damage/dmg-2.png");
            dmgStatus = "text-success ml-2";
            break;
        }
        case 3: {
            dmgLogo = require("../img/heroes/damage/dmg-3.png");
            dmgStatus = "text-primary ml-2";
            break;
        }
        case 4: {
            dmgLogo = require("../img/heroes/damage/dmg-4.png");
            dmgStatus = "text-danger ml-2";
            break;
        }
        default: {
            dmgLogo = require("../img/heroes/damage/dmg-4.png");
            dmgStatus = "text-danger ml-2"
        }
    }

    if (props.health >= (props.maxHealth * 0.7)) {
        healthStatus = "text-success";
    } else if (props.health <= (props.maxHealth * 0.3)) {
        healthStatus = 'text-danger';
    } else {
        healthStatus = 'text-warning';
    }

    return (
        <div className="hero-stats">
            <div className="hero-stats-row">
                <span className={healthStatus}>{props.health+'/'+props.maxHealth}</span>
            </div>
            <div className="hero-stats-row">
                <span className='text-light'>{props.mana+'/'+props.maxMana}</span>
            </div>
            <div className="hero-stats-row">
                <img className="hero-stats-icon" alt="Урон" src={dmgLogo}/>
                <span className={dmgStatus}>{props.dmg}</span>
            </div>
        </div>
    )
}

function HeroSpells(props) {

    return (
        <div className="hero-ability">
            {props.spells.map((spell, index)=>{return <HeroSpell 
                                                            key={index} 
                                                            index={index} 
                                                            name={spell.name} 
                                                            desc={spell.desc}
                                                            cost={spell.cost}
                                                            img={spell.img} 
                                                            cast={spell.cast} 
                                                            state={props.spellsState[index]}
                                                            set={props.setSpellState}
                                                            gameState={props.gameState}
                                                            gameSet={props.gameSet}
                                                        />})}
        </div>
    )
}

function HeroSpell(props) {
    let gameParameters = useContext(GameParameters);
    let [animation, setAnimation] = React.useState("hero-ability-placeholder");

    function castSpell() {
        if (props.state === 'open') {
            if (gameParameters.heroStats.mana > props.cost) {
                if (props.cast(gameParameters, props.gameSet, props.gameState)) {
                    gameParameters.heroStats.mana-=props.cost;
                    setSpellState('begin-closing');
                }
            }
            else {alert('Недостаточно маны')};
        }
    };

    function setSpellState(toState) {
        props.set(props.index, toState);
    }

    function animateSpell() {    
        
        if (props.state === 'open') {
            setAnimation('hero-ability-placeholder');
        }

        if (props.state === 'closed') {
            setAnimation('hero-ability-placeholder closed');
        }

        if (props.state === 'begin-opening') {
            setSpellState('opening');
            setAnimation('hero-ability-placeholder backflip closed');
            setTimeout(setAnimation, 250, "hero-ability-placeholder backflip");
            setTimeout(() => {
                setAnimation("hero-ability-placeholder");
                setSpellState('open');
            }, 500);
        }

        if (props.state === 'begin-closing') {
            setSpellState('closing');
            setAnimation('hero-ability-placeholder flip');
            setTimeout(setAnimation, 250, "hero-ability-placeholder flip closed");
            setTimeout(() => {
                setAnimation("hero-ability-placeholder closed");
                setSpellState('closed');
            }, 500);
        }
    };

    useEffect(()=>animateSpell());

    return (
        <div className={animation} title={props.desc} onClick={castSpell} >
            <img className="hero-ability-img front" alt={props.name} src={props.img} />
            <img className="hero-ability-img back" alt="" src={require("../img/templates/ability_cd.jpg")} />
        </div>
    )
}
