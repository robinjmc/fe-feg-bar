import React, { Component } from 'react'

class AddToBasket extends Component {
    state = {
        amount_added: 0,
        feg_status: ''
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
        let { amount_added, feg_status } = this.state
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
                this.props.posted()
            })
    }
    render() {
        let { amount_added } = this.state;
        let { feggie_id, feg_name, img_src, nutrients } = this.props
        return (
            <div >
                <div onClick={e => this.post_feg({ feggie_id: `${feggie_id}`, feg_name: feg_name, img_src: img_src, amount: "1", nutrients: nutrients }, e)}>
                  <img id="feg_img"  alt={feg_name} src={img_src} />
                </div>
                <div style={{ "display": "flex", "flexFlow": "row", "justifyContent": "center", "alignItems": "center" }}>
                    <form onSubmit={e => this.post_feg({ feggie_id: `${feggie_id}`, feg_name: feg_name, img_src: img_src, amount: "1", nutrients: nutrients }, e)}>
                        <button className="button" style={{ height: "4.5em", width: "4.5em" }} type="submit">{amount_added ? <p>{amount_added}</p> : <p>+</p>}</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default AddToBasket