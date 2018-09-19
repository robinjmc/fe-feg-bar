import React, { Component } from 'react'
import {postFeg} from "./Api"
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
        postFeg(feg)
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
                  <img id="feg_img" src={img_src ? img_src : 'https://c.pxhere.com/photos/06/4a/vegetables_season_leek_apple_useful_health_pumpkin_cabbage-673328.jpg!d'} alt={feg_name}/>
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