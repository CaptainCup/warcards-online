let heroesLibrary = [

    {
        name: 'Джайна',
        avatar: require("../img/heroes/avatar/jaina.jpg"),
        spells: [
            {
                name: 'Чародейская гениальность.',
                desc: 'Открывает все карты на 3 секунды.',
                img: require("../img/heroes/abilities/open_cards.jpg"),
                cost: 3,
                cast(gameParameters, setState, state) {
                    gameParameters.gameStats.cardsArray.forEach((item)=>{if (item.state === 'closed') {item.state = 'begin-opening-show'}});
                    setState( {
                        ...state,
                        gameParameters
                    });
                    setTimeout(()=>{
                        gameParameters.gameStats.cardsArray.forEach((item)=>{if (item.state === 'open-show') {item.state = 'begin-closing'}});
                        setState( {
                            ...state,
                            gameParameters
                        });
                    }, 3000);
                    return true;
                },
            },
   
            {
                name: 'Снежная буря.',
                desc: 'Уничтожает все карты с броней, равной вашей атаке.',
                img: require("../img/heroes/abilities/blizzard.png"),
                cost: 5,
                cast(gameParameters, setState, state) {
                    gameParameters.gameStats.cardsArray.forEach((item)=>{if (item.creature.armor === gameParameters.heroStats.dmg) {item.state = 'correct'}});
                    setState( {
                        ...state,
                        gameParameters
                    });
                    return true;
                },
            },

            {
                name: 'Сотворение предмета.',
                desc: 'Создает случайный предмет.',
                img: require("../img/heroes/abilities/create-item.png"),
                cost: 3,
                cast(gameParameters, setState, state) {
                    if (gameParameters.heroStats.backpack.some((item) => {return item.name === "Пустой слот"})) {
                    for (let i = 0; i < gameParameters.heroStats.backpack.length; i++) {
                        if (gameParameters.heroStats.backpack[i].name === "Пустой слот") {
                            gameParameters.heroStats.backpack[i] = gameParameters.libraries.items[Math.floor(Math.random() * Math.floor(gameParameters.libraries.items.length-1)) + 1];
                            setState({
                                ...state,
                                gameParameters
                            });
                            return true;
                         }
                    };
                    }
                    else {
                        alert('Нет свободного места в рюкзаке.');
                        return false;
                    }
                }
                    

            },
  
            {
                name: 'Восполнение сил.',
                desc: 'Восполняет 3 единицы здоровья и маны, но запрещает пользоваться способностями до конца волны.',
                img: require("../img/heroes/abilities/restore.png"),
                cost: 0,
                cast(gameParameters, setState, state) {
                    if ((gameParameters.heroStats.health === gameParameters.heroStats.maxHealth) && (gameParameters.heroStats.mana === gameParameters.heroStats.maxMana)) {
                        alert('У героя максимум здоровья и маны');
                        return false;
                    } else {
                        gameParameters.heroStats.health+=3;
                        gameParameters.heroStats.mana+=3;
                        if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {gameParameters.heroStats.health = gameParameters.heroStats.maxHealth};
                        if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {gameParameters.heroStats.mana = gameParameters.heroStats.maxMana};
                        //gameParameters.heroStats.spellsState.forEach((item) => {if (item === 'open') {item = 'begin-closing'}});
                        gameParameters.heroStats.spellsState = Array(4).fill('begin-closing');
                        setState({
                            ...state,
                            gameParameters
                        });
                        return true;
                    }
                },
            },
        ],
        spellsState: [
            'open', 'open', 'open', 'open'
        ]
    },

    {
        name: 'Громмаш',
        avatar: require("../img/heroes/avatar/grom.jpg"),
        spells: [
            {
                name: 'Критический удар.',
                desc: 'Увеличивает урон героя на 1 единицу до конца волны.',
                img: require("../img/heroes/abilities/critical-strike.png"),
                cost: 1,
                cast(gameParameters, setState, state) {
                    gameParameters.heroStats.dmg++;
                    setState({
                        ...state,
                        gameParameters
                    });
                    return true;
                },
            },

            {
                name: 'Кровожадность.',
                desc: 'Восстанавливает здоровье героя на размер величины показателя урона героя.',
                img: require("../img/heroes/abilities/bloodlust.png"),
                cost: 3,
                cast(gameParameters, setState, state) {
                    if (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth) {
                        alert('У героя максимум здоровья');
                        return false;
                    } else {
                        gameParameters.heroStats.health+=gameParameters.heroStats.dmg;
                        if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {gameParameters.heroStats.health = gameParameters.heroStats.maxHealth};
                        setState({
                            ...state,
                            gameParameters
                        });
                        return true;
                    }
                },
            },

            {
                name: 'Берсерк.',
                desc: 'Восстанавливает ману на размер недостающего здоровья героя.',
                img: require("../img/heroes/abilities/enrage.png"),
                cost: 0,
                cast(gameParameters, setState, state) {
                    if (gameParameters.heroStats.mana === gameParameters.heroStats.maxMana) {
                        alert('У героя максимум маны');
                        return false;
                    } else {
                        gameParameters.heroStats.mana+=(gameParameters.heroStats.maxHealth - gameParameters.heroStats.health);
                        if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {gameParameters.heroStats.mana = gameParameters.heroStats.maxMana};
                        setState({
                            ...state,
                            gameParameters
                        });
                        return true;
                    }
                },
            },

            {
                name: 'Вихрь клинков.',
                desc: 'Уничтожает все карты с броней, равной вашей атаке, и показывает остальные карты.',
                img: require("../img/heroes/abilities/blade-storm.png"),
                cost: 6,
                cast(gameParameters, setState, state) {
                    gameParameters.gameStats.cardsArray.forEach((item)=>{if (item.creature.armor === gameParameters.heroStats.dmg) {item.state = 'correct'}});
                    gameParameters.gameStats.cardsArray.forEach((item)=>{if (item.state === 'closed') {item.state = 'begin-opening-show'}});
                    setState( {
                        ...state,
                        gameParameters
                    });
                    setTimeout(()=>{
                        gameParameters.gameStats.cardsArray.forEach((item)=>{if (item.state === 'open-show') {item.state = 'begin-closing'}});
                        setState( {
                            ...state,
                            gameParameters
                        });
                    }, 3000);
                    return true;
                },
            },
        ],
        spellsState: [
            'open', 'open', 'open', 'open'
        ]
    },
    
   /* {
        name: 'Тралл',
        avatar: require("../img/heroes/avatar/thrall.jpg"),
        spells: [
            {
                name: 'spell1Warrior',
                desc: 'desc spell1 warrior',
                img: require("../img/heroes/abilities/сhain-lightning.png"),
                cast() {console.log('Cast spell 1')},
            },

            {
                name: 'spell1Warrior',
                desc: 'desc spell2 warrior',
                img: require("../img/heroes/abilities/сhain-lightning.png"),
                cast() {console.log('Cast spell 2')},
            },

            {
                name: 'spell1Warrior',
                desc: 'desc spell3 warrior',
                img: require("../img/heroes/abilities/сhain-lightning.png"),
                cast() {console.log('Cast spell 3')},
            },

            {
                name: 'spell1Warrior',
                desc: 'desc spell4 warrior',
                img: require("../img/heroes/abilities/сhain-lightning.png"),
                cast() {console.log('Cast spell 4')},
            },
        ],
        spellsState: [
            'open', 'open', 'open', 'open'
        ]
    }*/
]

export default heroesLibrary;