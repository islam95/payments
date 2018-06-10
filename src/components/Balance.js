import React, { Component } from "react";
import "./Balance.css";

class Balance extends Component {
  constructor() {
    super();
    this.state = {
      alternateCurrency: "USD",
      alternateBalance: 0
    };
  }

  getConversions = () => {
    fetch("https://exchangeratesapi.io/api/latest?base=GBP")
      .then(response => response.json())
      .then(data => {
        const rate = data.rates[this.state.alternateCurrency];
        const total = this.props.total;
        this.setState({
          alternateBalance: (rate * total).toFixed(2)
        });
      });
  }

  componentDidMount() {
    this.getConversions();
  }

  convert = event => {
    const currency = event.target.value;
    this.setState({
      alternateCurrency: currency
    });
    this.getConversions();
  };

  render() {
    return (
      <div className="Balance">
        <h2 className="Balance-title">
          Your account balance is
          <span className="Balance-total">£{this.props.total.toFixed(2)}</span>
        </h2>
        <div className="Balance-alt">
          Your balance is {this.state.alternateBalance} in
          <select
            onChange={this.convert}
            defaultValue={this.state.alternateCurrency}
          >
            {this.props.currencies.map((currency, index) => (
              <option key={index}>{currency}</option>
            ))}
          </select>
          .
        </div>
      </div>
    );
  }
}

export default Balance;
