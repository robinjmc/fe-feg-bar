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

    componentDidUpdate(prevProps, prevState){
        let {feg_list_id} = this.props
        let {fegStatus} = this.state
        if (prevProps !== this.props && fegStatus.length > 0 && fegStatus !== 'removed'){
            console.log('alright')
            fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg_list_id}`)
            .then(res => {
                console.log('gello')
                return res.json()
            })
            .then(body => {
                console.log('whats up')
                this.setState({
                    fegStatus: '',
                    body: body
                })
            })
        }
    }

    moreFeg = (feg, e) => {
        console.log(JSON.stringify(feg))
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feg_list_id}?amount=up`, {
          method: 'PUT',
          body: JSON.stringify( feg ),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            return res.json()
          })
          .then(({feg_list}) => {
            this.setState({
            amount: feg_list.amount,
            fegStatus: 'increment'
            })
          })
      }

      lessFeg = (feg, e) => {
          console.log(feg)
        console.log(JSON.stringify(feg))
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feg_list_id}?amount=down`, {
          method: 'PUT',
          body: JSON.stringify( feg ),
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            return res.json()
          })
          .then(({feg_list}) => {
            console.log(feg_list, 'body')
            this.setState({
            amount: feg_list.amount,
            fegStatus: 'decrement'
            })
          })
      }

      deleteFeg = (feg, e) => {
          console.log(feg.fegRemoved)
        console.log(JSON.stringify(feg))
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feg_list_id}`, {
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
            feg.fegRemoved('removed')
          })
      }
    render() {
        let {amount, body} = this.state
        console.log(body)
        return (
            <div id="feg_info">
                <form onSubmit={e => this.moreFeg(this.props, e)}
                ><button>+</button></form>
                <h1>{amount}</h1>
                <form onSubmit={amount > 1 ? e => this.lessFeg(this.props, e) : e => this.deleteFeg(this.props, e)}
                ><button>-</button></form>
            </div>
        )
    }
}

export default FegAmount;