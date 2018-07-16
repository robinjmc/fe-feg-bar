import React, { Component } from 'react';
import { Link } from "react-router-dom";

class FegList extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        fetch('https://feg-bar.herokuapp.com/api/feg_list')
            .then(res => {
                return res.json()
            })
            .then(({ feg_list }) => {
                console.log(feg_list, 'hello')
                this.setState({
                    feg_list: feg_list,
                    loading: false
                })
            })
    }

    moreFeg = (feg, e) => {
        console.log(JSON.stringify(feg))
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feggie_id}`, {
          method: 'PUT',
          body: JSON.stringify( feg ),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            return res.json()
          })
          .then(body => {
            console.log(body, 'body')
            this.setState({
              fegStatus: 'increment'
            })
          })
      }

      lessFeg = (feg, e) => {
        console.log(JSON.stringify(feg))
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feggie_id}`, {
          method: 'PUT',
          body: JSON.stringify( feg ),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            return res.json()
          })
          .then(body => {
            console.log(body)
            this.setState({
              fegStatus: 'decrement'
            })
          })
      }

      deleteFeg = (feg, e) => {
        console.log(JSON.stringify(feg))
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feggie_id}`, {
          method: 'DELETE',
          body: JSON.stringify( feg ),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            return res.json()
          })
          .then(body => {
            console.log(body)
            this.setState({
              fegStatus: 'removed'
            })
          })
      }

    render() {
        const { feg_list, loading } = this.state;
        return (
            <div>
                <div>
                    <h1>Your Feg</h1>
                </div>
                <div id="whatsinfeg">
                    {
                        loading ? <h1>Loading...</h1> :
                            <div>
                                {
                                    feg_list.length > 0 ?
                                        feg_list.map(feg => {
                                            let feg_name = /_/g.test(feg.feg_name) ? feg.feg_name.split('_').map(name => name[0].toUpperCase() + name.slice(1)).join(' ') : feg.feg_name[0].toUpperCase() + feg.feg_name.slice(1)
                                            console.log(feg.feg_name)
                                            return (
                                                <div style={{ padding: "10px" }} key={feg.feg_list_id}>
                                                    <div id="feg">
                                                        <h1>{feg_name}</h1>
                                                        <div >
                                                            <img id="feg_img" alt={feg.feg_type_id} src={feg.img_src} />
                                                        </div>
                                                        <div id="feg_info">
                                                            <form onSubmit={e => this.moreFeg({feggie_id: `${feg.feggie_id}`, feg_name: feg.feg_name, img_src: feg.img_src}, e)}><button type="submit">+</button></form>
                                                           <h1>{feg.amount}</h1>
                                                           <form onSubmit={feg.amount > 0 ? e => this.lessFeg({feggie_id: `${feg.feggie_id}`, feg_name: feg.feg_name, img_src: feg.img_src}, e) : e => this.deleteFeg({feggie_id: `${feg.feggie_id}`, feg_name: feg.feg_name, img_src: feg.img_src}, e)}><button type="submit">-</button></form>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                        <Link to='/whats-in-guv'>
                                            <button>
                                                <h1>Get Me Feg!</h1>
                                            </button>
                                        </Link>
                                }
                            </div>
                    }
                </div>
            </div>
        )
    }

}

export default FegList;