import React from 'react'

import './styles/Navbar/Navbar.css'

function Navbar({ logOut }) {
    return (
        <nav className="Navbar">
            <span className="Navbar__Title">MINTWEBB admin</span>
            <button
                className='Navbar__Button'
                variant='contained'
                size='small'
                onClick={logOut}
            >
                Log Out
            </button>
        </nav>
    )
}

export default Navbar