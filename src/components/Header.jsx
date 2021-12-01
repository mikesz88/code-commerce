import React from 'react';
import s from '../components/Header.module.css'

class Header extends React.Component {
    render() {
        return (
            <div className={`container`}>
                <div className={`container ${s.header}`}>
                    <h1 className={`header-lg ${s.h1}`}>Mr. Sanchez's Code Store</h1>
                    <p className={`caption`}>Ready Made Code You can copy and go!</p>
                </div>
            </div>
        )
    }
}

export default Header;