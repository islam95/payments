import React, { Component } from "react";
import Button from "./Button";
import "./CalcPayment.css";

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      selectedCurrency: "USD",
      amount: 0,
      input: 0
    };
  }

  handleInput = e => {
    const input = parseFloat(e.target.value);
    this.setState({ input });
  };

  selectCurrency = event => {
    const currency = event.target.value;
    this.setState({
      selectedCurrency: currency
    });
  };

  calculate = () => {
    const currency = this.state.selectedCurrency;
    fetch(`https://exchangeratesapi.io/api/latest?base=${currency}`)
      .then(response => response.json())
      .then(data => {
        const rate = data.rates.GBP;
        const input = this.state.input;
        this.setState({
          amount: (rate * input).toFixed(2)
        });
      });
  }

  render() {
    return (
      <div className="CalcPayment">
        <h2 className="CalcPayment-label">Calculate Payment in GBP</h2>
        <div className="CalcPayment-control">
          <select
            onChange={this.selectCurrency}
            defaultValue={this.state.selectedCurrency}
          >
            {this.props.currencies.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
          <input
            className="CalcPayment-amount"
            type="text"
            defaultValue="0.00"
            onChange={this.handleInput}
          />
          is worth{" "}
          <span className="CalcPayment-result">{this.state.amount}</span> in
          GBP.
          <div className="CalcPayment-calculate">
            <Button onClick={this.calculate}>Calculate</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
