let itemsLibrary = [
    {
        name: 'Пустой слот',
        image: require('../img/items/backpack-slot.jpg'),
        price: 0,
        effect() {
            console.log('empty slot');
        }
    },

    {
        name: 'Малое зелье лечения',
        desc: 'Восстанавливает 1 единицу здоровья',
        image: require('../img/items/hp-small.png'),
        price: 500,
        effect(gameParameters, state, setState) {

            if (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth) {
                alert('У героя максимум здоровья');
                return false;
            };
            gameParameters.heroStats.health += 1;
            if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {
                gameParameters.heroStats.health = gameParameters.heroStats.maxHealth;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Среднее зелье лечения',
        desc: 'Восстанавливает 3 единицы здоровья',
        image: require('../img/items/hp-medium.png'),
        price: 1200,
        effect(gameParameters, state, setState) {

            if (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth) {
                alert('У героя максимум здоровья');
                return false;
            };
            gameParameters.heroStats.health += 3;
            if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {
                gameParameters.heroStats.health = gameParameters.heroStats.maxHealth;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Большое зелье лечения',
        desc: 'Восстанавливает 5 единиц здоровья',
        image: require('../img/items/hp-big.png'),
        price: 2000,
        effect(gameParameters, state, setState) {
            if (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth) {
                alert('У героя максимум здоровья');
                return false;
            };
            gameParameters.heroStats.health += 5;
            if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {
                gameParameters.heroStats.health = gameParameters.heroStats.maxHealth;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Малое зелье маны',
        desc: 'Восстанавливает 1 единицу маны',
        image: require('../img/items/mana-small.png'),
        price: 300,
        effect(gameParameters, state, setState) {

            if (gameParameters.heroStats.mana === gameParameters.heroStats.maxMana) {
                alert('У героя максимум маны');
                return false;
            };
            gameParameters.heroStats.mana += 1;
            if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {
                gameParameters.heroStats.mana = gameParameters.heroStats.maxMana;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Среднее зелье маны',
        desc: 'Восстанавливает 3 единицы маны',
        image: require('../img/items/mana-medium.png'),
        price: 700,
        effect(gameParameters, state, setState) {

            if (gameParameters.heroStats.mana === gameParameters.heroStats.maxMana) {
                alert('У героя максимум маны');
                return false;
            };
            gameParameters.heroStats.mana += 3;
            if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {
                gameParameters.heroStats.mana = gameParameters.heroStats.maxMana;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Большое зелье маны',
        desc: 'Восстанавливает 5 единиц маны',
        image: require('../img/items/mana-big.png'),
        price: 1200,
        effect(gameParameters, state, setState) {

            if (gameParameters.heroStats.mana === gameParameters.heroStats.maxMana) {
                alert('У героя максимум маны');
                return false;
            };
            gameParameters.heroStats.mana += 5;
            if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {
                gameParameters.heroStats.mana = gameParameters.heroStats.maxMana;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Малое зелье омоложения',
        desc: 'Восстанавливает 1 единицу здоровья и маны',
        image: require('../img/items/rejuv-small.png'),
        price: 600,
        effect(gameParameters, state, setState) {

            if ((gameParameters.heroStats.mana === gameParameters.heroStats.maxMana) && (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth)) {
                alert('У героя максимум здоровья и маны');
                return false;
            };
            gameParameters.heroStats.health += 1;
            gameParameters.heroStats.mana += 1;
            if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {
                gameParameters.heroStats.mana = gameParameters.heroStats.maxMana;
            };
            if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {
                gameParameters.heroStats.health = gameParameters.heroStats.maxHealth;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Среднее зелье омоложения',
        desc: 'Восстанавливает 3 единицы здоровья и маны',
        image: require('../img/items/rejuv-medium.png'),
        price: 1500,
        effect(gameParameters, state, setState) {

            if ((gameParameters.heroStats.mana === gameParameters.heroStats.maxMana) && (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth)) {
                alert('У героя максимум здоровья и маны');
                return false;
            };
            gameParameters.heroStats.health += 3;
            gameParameters.heroStats.mana += 3;
            if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {
                gameParameters.heroStats.mana = gameParameters.heroStats.maxMana;
            };
            if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {
                gameParameters.heroStats.health = gameParameters.heroStats.maxHealth;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Большое зелье омоложения',
        desc: 'Восстанавливает 5 единицы здоровья и маны',
        image: require('../img/items/rejuv-big.png'),
        price: 2500,
        effect(gameParameters, state, setState) {

            if ((gameParameters.heroStats.mana === gameParameters.heroStats.maxMana) && (gameParameters.heroStats.health === gameParameters.heroStats.maxHealth)) {
                alert('У героя максимум здоровья и маны');
                return false;
            };
            gameParameters.heroStats.health += 5;
            gameParameters.heroStats.mana += 5;
            if (gameParameters.heroStats.mana > gameParameters.heroStats.maxMana) {
                gameParameters.heroStats.mana = gameParameters.heroStats.maxMana;
            };
            if (gameParameters.heroStats.health > gameParameters.heroStats.maxHealth) {
                gameParameters.heroStats.health = gameParameters.heroStats.maxHealth;
            };
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Малое зелье выносливости',
        desc: 'Увеличивает максимальный запас здоровья на 1 единицу',
        image: require('../img/items/maxhp-small.png'),
        price: 1500,
        effect(gameParameters, state, setState) {
            gameParameters.heroStats.maxHealth+=1;
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Большое зелье выносливости',
        desc: 'Увеличивает максимальный запас здоровья на 3 единицы',
        image: require('../img/items/maxhp-big.png'),
        price: 2500,
        effect(gameParameters, state, setState) {
            gameParameters.heroStats.maxHealth+=3;
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Малое зелье интеллекта',
        desc: 'Увеличивает максимальный маны на 1 единицу',
        image: require('../img/items/maxmana-small.png'),
        price: 1500,
        effect(gameParameters, state, setState) {
            gameParameters.heroStats.maxMana+=1;
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },

    {
        name: 'Большое зелье интеллекта',
        desc: 'Увеличивает максимальный маны на 3 единицы',
        image: require('../img/items/maxmana-big.png'),
        price: 1500,
        effect(gameParameters, state, setState) {
            gameParameters.heroStats.maxMana+=3;
            setState({
                ...state,
                gameParameters
            });
            return true;
        }
    },
]

export default itemsLibrary;