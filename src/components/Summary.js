import React from 'react'
import print from '../img/PNG/print.png';

const Summary = () => {

    return (
        <div className="App">
            <img src={print} id="cursor-hover" alt="Print" onClick={() => { window.print() }} />
        </div>
    )
}

export default Summary
