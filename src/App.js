import React, { Component } from 'react';
import Order from './Order/Order';

class App extends Component {

  state = {
    filter: '', //Значение фильтра, передаем его в Order

    orders: [], // список всех заказов
  }

  // при обновлении компонента проверяем не фильтр ли это
  async componentDidUpdate(prevProps, prevState) {
    if (this.state.filter !== prevState.filter) {

      console.log('Update Order Info');

      const response = await fetch(`http://127.0.0.1:8080/api/order?filter=${this.state.filter}`); //Получение отфильтрованного заказа из API
      const data = await response.json();

      this.setState({
        orders: data
      });
    }
  }

  async componentDidMount() {
    console.log(`Order.js: => componentDidMount() => ${this.props.data}`);
    const response = await fetch(`http://127.0.0.1:8080/api/order`);
    const data = await response.json();
    this.setState({
      orders: data
    })
  }

  changeInput = event => { //Обработчик изменения фильтра (input)
    this.setState({
      filter: event.target.value,
    });

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            Фильтр:<input type="text" size="40" onChange={this.changeInput}></input>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            Заказы:
          </div>
        </div>
        {
          this.state.orders.map((order) => (
            <Order order={order} key={order.id}/>
          ))
        }
      </div>
    );
  }
}

export default App;

