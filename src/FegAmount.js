import React, { Component } from 'react';

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
  more_feg = (feg, e) => {
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
        this.setState({
          amount: feg_list.amount,
          fegStatus: 'increment'
          })
          feg.amount_change('change')
      })
  }

  less_feg = (feg, e) => {
    e.preventDefault();
    // console.log(this.props.reset)
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
        feg.amount_change('change')
      })
  }

  delete_feg = (feg, e) => {
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
            <form onSubmit={amount > 1 ? e => this.less_feg(this.props, e) : e => this.delete_feg(this.props, e)}
            ><button class="button">-</button></form>
          </div>
          <div>
            <h1>{amount}</h1>
          </div>
          <div>
            <form onSubmit={e => this.more_feg(this.props, e)}
            ><button class="button">+</button></form>
          </div>
        </div>
      </div>
    )
  }
}

export default FegAmount;