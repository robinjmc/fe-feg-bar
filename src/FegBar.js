import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Landing from './Landing'
import WhatsIn from './WhatsIn'

class FegBar extends Component {
    state={

    }

    render(){
        return (
            <div>
                <Route exact path="/" component={Landing} />
                <Route exact path="/whats-in-guv" component={WhatsIn} />
            </div>
        )
    }

}


export default FegBar;
