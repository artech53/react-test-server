import React, { Component } from 'react';
import Product from '../Section/Product'

const ARROW_UP = '▲';
const ARROW_DOWN = '▼';


class Order extends Component {
    state = {
        arrow: ARROW_DOWN,

        orderID: '',
        data: [],
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.arrow !== prevState.arrow && this.state.arrow !== ARROW_DOWN) {

            console.log('Update Order Info');

            const response = await fetch(`http://127.0.0.1:8080/api/order/${this.state.orderID}`); //Получение отфильтрованного заказа из API
            const data = await response.json();

            this.setState({
                data
            });
        }
    }

    getOrderInfo = (event) => { //Обработчик нажатия кнопки на Заказе
        this.setState({
            arrow: this.state.arrow === ARROW_DOWN ? ARROW_UP : ARROW_DOWN,
            orderID: event.target.name,
        })
    }

    render() {
        const { id, description, docDate, docNum } = this.props.order;
        return (
            <div className="row">
                <div className="col">

                    <div className="row">
                        <div className="col-1">
                            <button onClick={this.getOrderInfo} name={id} className="btn btn-primary " type="button">{this.state.arrow}</button>
                        </div>
                        <div className="col-1">
                            {id}
                        </div>
                        <div className="col">
                            {description}
                        </div>
                        <div className="col">
                            {docDate}
                        </div>
                        <div className="col">
                            {docNum}
                        </div>
                    </div>

                    {this.state.arrow === ARROW_UP
                        ? this.state.data.map((product) => (
                            <Product orderInfo={product} key={product.sum}/>
                        ))
                        : <></>
                    }

                </div>
            </div>
        )

    }
}
export default Order;
