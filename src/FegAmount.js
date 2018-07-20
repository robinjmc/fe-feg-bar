import React, { Component } from 'react';

import Nutrition from './Nutrition';

class FegAmount extends Component {
  state = {
    amount: 1,
    fegStatus: '',
    body: {}
  }

  componentDidMount() {
    this.setState({
      amount: this.props.feg_amount
    })
  }
 
//   componentDidUpdate(prevProps, prevState) {
//     let { feg_list_id } = this.props
//     let { fegStatus } = this.state
// //dont think I need this
//     if (prevProps !== this.props && fegStatus.length > 0 && fegStatus !== 'removed') {
//       console.log('alright')
//       fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg_list_id}`)
//         .then(res => {
//           console.log('gello')
//           return res.json()
//         })
//         .then(body => {
//           console.log('whats up')
//           this.setState({
//             fegStatus: '',
//             body: body
//           })
//         })
//     }
//   }

  moreFeg = (feg, e) => {
    e.preventDefault();
    fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feg_list_id}?amount=up`, {
      method: 'PUT',
      body: JSON.stringify(feg),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(({ feg_list }) => {
        console.log('up')
        this.setState({
          amount: feg_list.amount,
          fegStatus: 'increment'
          })
      this.props.reset('reset')
      })
  }

  lessFeg = (feg, e) => {
    e.preventDefault();
    console.log(this.props.reset)
    fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feg_list_id}?amount=down`, {
      method: 'PUT',
      body: JSON.stringify(feg),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(({ feg_list }) => {
        this.setState({
          amount: feg_list.amount,
          fegStatus: 'decrement'
        })
       this.props.reset('reset')
      })
  }

  deleteFeg = (feg, e) => {
    e.preventDefault();
    fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feg_list_id}`, {
      method: 'DELETE',
      body: JSON.stringify(feg),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
      .then(body => {
        this.setState({
          fegStatus: 'removed'
        })
        feg.fegRemoved('removed')
      })
  }
  render() {
    let { amount } = this.state
    return (
      <div>
        <div id="feg_info">
          <div>
            <form onSubmit={amount > 1 ? e => this.lessFeg(this.props, e) : e => this.deleteFeg(this.props, e)}
            ><button>-</button></form>
          </div>
          <div>
            <h1>{amount}</h1>
          </div>
          <div>
            <form onSubmit={e => this.moreFeg(this.props, e)}
            ><button>+</button></form>
          </div>
        </div>
        <div>
          <Nutrition amount={amount} feg={this.props}/>
        </div>
      </div>
    )
  }
}

export default FegAmount;