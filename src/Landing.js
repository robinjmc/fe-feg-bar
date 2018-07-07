import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Landing extends Component {
    state={}

    render() {
        return (
            <div>
                <div>
                    <Link to='/whats-in-guv'>
                        <button>
                            <h1>Get Me Feg!</h1>
                        </button>
                    </Link>
                    {/* <button>
                    
                    </button> */}
                </div>
            </div>
        )
    }
}

export default Landing;