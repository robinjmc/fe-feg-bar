import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Landing extends Component {
    state={}

    render() {
        return (
            <div>
                <div>
                    <Link to='/whats-in-guv'>
                        {/* <button> */}
                            {/* <h1>Get Me Feg!</h1> */}
                            <img alt="Get Me Feg!"src="https://media.giphy.com/media/2AL9ryaLCciMsqHYlr/giphy.gif"/>
                        {/* </button> */}
                    </Link>
                    
                    {/* <button>
                    
                    </button> */}
                </div>
            </div>
        )
    }
}

export default Landing;