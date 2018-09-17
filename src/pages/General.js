import React, { Component } from 'react';

class General extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Tänne tulee kyselyn ensimmäinen osa
                <button onClick={this.props.moveForward}>Jatka</button>
            </div>
        )
    }
}

export default General;