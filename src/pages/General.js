import React, { Component } from 'react';
import SelectGeneral from '../components/SelectGeneral';
// import { Select } from '@material-ui/core';


class General extends Component {

    render() {
        return (
            <div>
                <SelectGeneral />
                {/*<button onClick={this.props.moveForward}>Jatka</button>*/}
            </div>
        )
    }
}

export default General;