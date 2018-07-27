import React, { Component } from 'react'

class AddToBasket extends Component {
    state = {
        amount_added: 0,
        feg_status: ''
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        let {amount_added, feg_status} = this.state
        if (prevState.feg_status !== feg_status && feg_status === 'posted') {
            this.setState({
                amount_added: amount_added + 1,
                feg_status: ''
            })
        }
    }
    post_feg = (feg, e) => {
        e.preventDefault();
        fetch(`https://feg-bar.herokuapp.com/api/feg_list/${feg.feggie_id}`, {
            method: 'POST',
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
                    feg_status: 'posted'
                })
            })
    }
    render() {
        let { amount_added } = this.state;
        let {feggie_id, feg_name, img_src, nutrients} = this.props
        return (
            <div >
                <form onSubmit={e => this.post_feg({ feggie_id: `${feggie_id}`, feg_name: feg_name, img_src: img_src, amount: "1", nutrients: nutrients }, e)}>
                    <button class="button" style={{ height: "5em", width: "5em" }} type="submit">{amount_added ? <p>{amount_added}</p> : <p>+</p>}</button>
                </form>
            </div>
        )
    }
}
export default AddToBasket