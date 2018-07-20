import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Landing from './Landing'
import WhatsIn from './WhatsIn'
import FegList from './FegList'

class FegBar extends Component {
    state={
    }

    render(){
        return (
            <div>
                <Route exact path="/" component={Landing} />
                <Route exact path="/whats-in-guv" component={WhatsIn} />
                <Route exact path="/my-feg-list" component={FegList} />
            </div>
        )
    }

}


export default FegBar;
