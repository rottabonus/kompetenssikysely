import React from 'react';
import taidottyohon from '../img/PNG/taidottyohon.png'

class Header extends React.Component {

    render() {
        return (
            <header>
                <img src={taidottyohon} alt={taidottyohon} id="logo" />
            </header>
        )
    }
}

export default Header;
