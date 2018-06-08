import React, { Component } from "react";
import Button from "./Button";
import "./CalcPayment.css";
import moment from "moment";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: "USD",
      amount: 0, 
      input: 0
    };
  }

  // Handles input field and saves in state
  handleInput = e => {
    const input = parseFloat(e.target.value);
    this.setState({ input });
  };

  // Saves selected currency in its state
  selectCurrency = event => {
    const currency = event.target.value;
    this.setState({
      selectedCurrency: currency
    });
  };

  // Currency conversion
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

  addPayment = () => {
    const date = moment().format("YYYY-MM-DD");
    const currency = this.state.selectedCurrency;
    const amount = this.state.input;
    const description = "Description...";
    const status = "Pending";
    this.props.addToPayments(date, currency, amount, description, status);
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
            <Button onClick={this.addPayment}>Make Payment</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
