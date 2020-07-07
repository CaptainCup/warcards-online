import React, { useEffect } from 'react';
import MainMenu from './main-menu';
import CustomMenu from './custom-menu'

export default function MenuScreen(props) {
    let [activeMenu, setActiveMenu] = React.useState({
        activeWindow: 'main',
        style: {backgroundImage:`url(${require(`../img/background/1.jpg`)})`}
    });

    function open(menu) {
        setActiveMenu({
            ...activeMenu,
            activeWindow: menu
        });
    }

    function changeBackground() {
        let screen = Math.floor(1 + Math.random() * 8);
        let newBackground = `url(${require(`../img/background/${screen}.jpg`)})`;
        setActiveMenu({
            ...activeMenu,
            style: {backgroundImage: newBackground}
        });
    }

    useEffect(() => {changeBackground()}, []);

    let openMenu = '';

    if (activeMenu.activeWindow === 'main') {
        openMenu = <MainMenu open = {open}/>
    }
    if (activeMenu.activeWindow === 'custom') {
        openMenu = <CustomMenu open = {open} changeScreen={props.changeScreen}/>
    }

    return (
        <div style={activeMenu.style} className="container-fluid game-menu">
            <span className="game-name">WarCards</span>
            <div className="row align-items-center h-100 w-100 m-0">
                {openMenu}
            </div>
        </div>
    )
}