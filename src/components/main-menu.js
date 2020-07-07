import React from 'react';

function Button(props) {
    return (
        <div className="col">
            <button type="button" className={'btn btn-lg btn-block ' + (props.ready ? ' btn-primary ' : ' btn-secondary  ') + (props.margin ? "  mb-3" : "")}
            onClick={props.onClick}>{props.name}</button>
        </div>
    )
}

export default function MainMenu (props) {

    return (
        <div className="col-sm-5 p-3 game-menu-window start down main with-borders">
            <div className="menu-chain left"></div>
            <div className="menu-chain right"></div>
                <div className="row flex-column">
                    <Button name='Кампания' ready={false} margin={true} onClick={()=>alert('Campains not ready')}/>
                    <Button name='Своя игра' ready={true}  margin={true} onClick={()=>props.open('custom')}/>
                    <Button name='Обучение' ready={false}  margin={false} onClick={()=>alert('Tutorial not ready')}/>
            </div>
        </div>
     
    )
}