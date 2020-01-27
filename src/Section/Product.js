import React, { Component } from 'react';
import './Product.css'


export default (props) =>
    <div className="row">
        <div className="col">{props.orderInfo.name}</div>
        <div className="col">{props.orderInfo.price}</div>
        <div className="col">{props.orderInfo.qty}</div>
        <div className="col">{props.orderInfo.sum}</div>
    </div>


