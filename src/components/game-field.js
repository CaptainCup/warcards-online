import React, {useEffect} from 'react';
import {SizeMe} from 'react-sizeme';



export default function GameFieldSide (props) {

    let waves = props.gameParameters.gameStats.wave;
    let hero = props.gameParameters.heroStats;
    let numberOfCreatures = props.gameParameters.customGameStats.numberOfCreatures;
    let cardsLibrary = props.gameParameters.libraries.cards;
    let cardsArray = props.gameParameters.gameStats.cardsArray;
    let filteredLibrary = cardsLibrary.map((cards) => (cards.filter((card) => {return card.power <= (props.gameParameters.customGameStats.difficult.activeDifficult)})));

    function checkVictory() {
        if (cardsArray.length !== 0) {
            if (props.gameParameters.gameStats.cardsArray.every((card)=>{return card.state === 'hidden'})) {

                if (props.gameMode === 2) {
                    props.gameParameters.customGameStats.numberOfCreatures++;
                    props.setWaves();
                    return;
                }

                if (waves < props.gameParameters.customGameStats.numberOfWaves) {
                    props.setWaves();
                }
                else {
                    props.changeScreen('endGameScreen');
                }

            }

            if (props.gameParameters.heroStats.health <= 0) {
                props.changeScreen('endGameScreen');
            }
        }
    }

    function createRandomDesk() {

        /*console.log('before creation array length ' + cardsArray.length);
        console.log('filteredCards');
        console.log(filteredLibrary);*/

        if (cardsArray.length === 0) {
        
        for (let i = 0; i < numberOfCreatures; i++) {

            let randomCard = {
                id: null,
                creature: null,
                state: 'closed'
            };

            if (i <= 2) {
                let randomHealth = Math.floor(Math.random() * filteredLibrary[0].length);
                randomCard.creature = filteredLibrary[0][randomHealth];
            }
            if ((i > 2) & (i <= 5)) {
                let randomArmor = Math.floor(Math.random() * 2);
                let randomHealth = Math.floor(Math.random() * filteredLibrary[randomArmor].length);
                randomCard.creature = filteredLibrary[randomArmor][randomHealth];
            }
            if ((i > 5) & (i <= 8)) {
                let randomArmor = Math.floor(Math.random() * 3);
                let randomHealth = Math.floor(Math.random() * filteredLibrary[randomArmor].length);
                randomCard.creature = filteredLibrary[randomArmor][randomHealth];
            }
            if (i > 8) {
                let randomArmor = Math.floor(Math.random() * filteredLibrary.length);
                let randomHealth = Math.floor(Math.random() * filteredLibrary[randomArmor].length);
                randomCard.creature = filteredLibrary[randomArmor][randomHealth];
            }

            for (let j = 1; j <= randomCard.creature.health; j++) {
                cardsArray.push({...randomCard, id: cardsArray.length});
            }
        }

        //cardsArray.forEach((item)=>{console.log(item)});
    
        for (let i = cardsArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        }
    }

    }

    function createRandomItemsInShop() {
        if (props.gameParameters.gameStats.shop.length === 0) {
            for (let i=0; i < 6; i++) {
                props.gameParameters.gameStats.shop.push(props.gameParameters.libraries.items[Math.floor(Math.random() * Math.floor(props.gameParameters.libraries.items.length-1)) + 1]);
            }
        }
    }

    if (waves === 'new wave') { 
        return <NewWaveAnnounce /> 
    }
        
    createRandomItemsInShop();
    createRandomDesk();

    return (
        <SizeMe monitorHeight>
            {({size}) =>
                <div className="col-sm-10 p-0 flex-grow-1 game-field-side">
                    <GameField 
                        width={size.width} 
                        height={size.height} 
                        cardsArray={cardsArray} 
                        checkVictory={checkVictory} 
                        changeScreen={props.changeScreen}
                        hero={hero}
                        setHealth={props.setHealth}
                        setScore={props.setScore}
                        setDmg={props.setDmg}
                        cardInfo={props.cardInfo}
                        gameSet={props.gameSet}
                        gameState={props.gameState}
                        gameParameters={props.gameParameters}
                        setCard={props.setCard}
                        showCards={props.showCards}
                    />
                </div>
            }
        </SizeMe>
    )
    
}

function GameField(props) {

    let numberOfColumns = {
        gridTemplateColumns: createField(props.cardsArray.length, props.width, props.height)
    }
    let sizes = cardCalculateSize(props.cardsArray.length, props.width, props.height);
    let hero = props.hero;

    function checkCards() {
        let openedCards = props.cardsArray.filter((card)=>{return card.state === 'open'});
        if (openedCards.length > 1) {
            let value = openedCards[0].creature.name;
            let checkIndex = openedCards.findIndex(item => item.creature.name !== value);
            if (checkIndex === -1) {
                if (openedCards.length === openedCards[0].creature.health) {
                    if (openedCards[0].creature.armor <= hero.dmg) {
                        props.setScore(openedCards[0].creature.price);
                        openedCards.forEach((card) => {
                            props.setCard(card.id, 'correct');
                        });
                    }
                    else {
                        openedCards.forEach((card) => {
                            props.setCard(card.id, 'begin-wrong');
                        });
                    }
                }
                else {
                    return;
                }
            } else {
                openedCards.forEach((card) => {
                    props.setCard(card.id, 'begin-wrong');
                    props.setHealth(-card.creature.dmg);
                });
            }
        openedCards = [];
        }
    };

    function checkHeroDmg() {
        let lowestArmor = 4;
        let detector = false;
        props.cardsArray.forEach((item)=>{if ((item.state === 'closed') && (item.creature.armor < lowestArmor)) {lowestArmor = item.creature.armor; detector = true}});
        if ((lowestArmor > hero.dmg) && detector) {
            props.setDmg(lowestArmor);
        }
    }

    function createField(numberOfCards, width, height) {
        let size = optimalGrid(numberOfCards);
        if (width < height) {
            return "repeat(" + size.first + ", 1fr)";
        } else {
            return "repeat(" + size.second + ", 1fr)";
        }
    }
    
    function optimalGrid(value) {
        let result = {};
    
        do {
            let factors = [];
            let maxFactor = Math.trunc(value / 2);
            for (let i = 2; i <= maxFactor; i++) {
                if (value % i === 0) {
                    let result = {};
                    result.first = i;
                    result.second = value / i;
                    result.delta = Math.abs(result.first - result.second);
                    factors.push(result);
                }
            }
    
            if (factors.length === 0) {
                value++;
                continue;
            }
    
            let bestResult = factors[0].delta;
            let bestResultindex = 0;
            for (let i = 1; i < factors.length; i++) {
                if (factors[i].delta < bestResult) {
                    bestResult = factors[i].delta;
                    bestResultindex = i;
                }
            }
            result = factors[bestResultindex];
            if (result.delta > 2) {
                value++;
                continue;
            } else {
                break;
            }
        } while (true);
    
        return result;
    }
    
    function cardCalculateSize(numberOfCards, width, height) {
        let size = optimalGrid(numberOfCards);
        let gap = document.documentElement.clientWidth * 0.02;
        let cardSizeH;
        let cardSizeW;
        let cardSize;
    
        if (height < width) {
            cardSizeH = Math.floor((height*0.9 - (gap * (size.first - 1))) / size.first) + 'px';
            cardSizeW = Math.floor((width*0.9 - (gap * (size.second - 1))) / size.second) + 'px';
        } else {
            cardSizeH = Math.floor((height*0.9 - (gap * (size.second - 1))) / size.second) + 'px';
            cardSizeW = Math.floor((width*0.9 - (gap * (size.first - 1))) / size.first) + 'px';
        };
    
        if (parseInt(cardSizeH) < parseInt(cardSizeW)) {
            cardSize = cardSizeH;
        } else {
            cardSize = cardSizeW;
        };
    
        if (parseInt(cardSize) > 150) {
            cardSize = '150px';
        };
    
        let borderSize = parseInt(cardSize) * 0.05 + 'px solid';
        let result = {
            cardSizes: 
                {
                width: cardSize,
                height: cardSize
                },
            borderSizes: 
                {
                border: borderSize
                }
        }
        return result;
    };

    useEffect(()=>props.showCards(), []);
    useEffect(()=>checkCards());
    useEffect(()=>checkHeroDmg());
    useEffect(()=>props.checkVictory());

    return (
        <div style={numberOfColumns} className="game-field">
            {props.cardsArray.map((item, index) => {return <Card 
            key={item.id}
            index={index}
            startPosition = 'card-flipper'
            card={item}
            style={sizes.cardSizes} 
            border={sizes.borderSizes}
            set={props.setCard}
            cardInfo={props.cardInfo}
            />})}
        </div>
    )
}

function Card(props) {

    let [animation, setAnimation] = React.useState(props.startPosition);
    let frontClass = "card-img front";

    // eslint-disable-next-line default-case
    switch (props.card.creature.armor) {
        case 1:
            frontClass+=' border-light';
            break;
        case 2:
            frontClass+=' border-success';
            break;
        case 3:
            frontClass+=' border-primary';
            break;
        case 4:
            frontClass+=' border-danger';
            break;
    };

    function setCard(toState) {
        props.set(props.card.id, toState);
    };

    function openCard() {
        if (props.card.state === 'closed') {
        props.set(props.card.id, 'begin-opening');
        }
    };

    function animateCard() {        

        if (props.card.state === 'begin-wrong') {
            setCard('wrong');
            setAnimation('card-flipper open wrong');
            setTimeout(setCard, 500 ,'begin-closing');
        }

        if (props.card.state === 'correct') {
            setAnimation('card-flipper open correct');
            setTimeout(() => {
                setAnimation("card-flipper hidden");
                setCard('hidden');
            }, 500);
        }

        if (props.card.state === 'begin-opening') {
            setCard('opening');
            setAnimation('card-flipper flip');
            setTimeout(setAnimation, 250, "card-flipper flip open");
            setTimeout(() => {
                setAnimation("card-flipper open");
                setCard('open');
            }, 500);
        }

        if (props.card.state === 'begin-opening-show') {
            setCard('opening-show');
            setAnimation('card-flipper flip');
            setTimeout(setAnimation, 250, "card-flipper flip open");
            setTimeout(() => {
                setAnimation("card-flipper open");
                setCard('open-show');
            }, 500);
        }

        if (props.card.state === 'begin-closing') {
            setCard('closing');
            setAnimation('card-flipper backflip open');
            setTimeout(setAnimation, 250, "card-flipper backflip");
            setTimeout(() => {
                setAnimation("card-flipper");
                setCard('closed');
            }, 500);
        }
    };

    useEffect(()=>animateCard());

    return (
        <div className="card-cell">
            <div className={animation} style={props.style} onClick={openCard}>
                <img className="card-img back" alt="" src={require("../img/cards/card.png")} />
                <img className={frontClass} alt="" src={require(`../img/cards/${props.card.creature.img}`)} style={props.border} onClick={()=>props.cardInfo(props.index)}/>
            </div>
        </div>
    );
}

function NewWaveAnnounce() {
    return (
    <div className='col-sm-10 p-0 flex-grow-1 new-wave d-flex justify-content-center align-items-center'>
        <span className='new-wave'>Новая волна приближается!</span>
    </div>
    );
}

