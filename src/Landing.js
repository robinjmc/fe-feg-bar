import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Landing extends Component {
    state = {}

    render() {
        return (
            <div>
                <Link to='/whats-in-guv'>
                    <img alt="Get Me Feg!" src="https://media.giphy.com/media/2AL9ryaLCciMsqHYlr/giphy.gif" />
                </Link>
            </div>
        )
    }
}

export default Landing;