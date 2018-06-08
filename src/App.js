import React, { Component } from "react";
import Balance from "./components/Balance";
import CalcPayment from "./components/CalcPayment";
import Payments from "./components/Payments";
import currencies from "./data/currencies";
import payments from "./data/payments";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currencies: currencies,
      balance: 87.43, // This is the current balance in GBP
      payments: payments, 
      total: 0
    };
    this.state.payments.forEach((payment, index) => {
      this.fetchData(payment.currency, payment.amount);
    });
  }

  fetchData = (currency, amount) => {
    fetch(`https://exchangeratesapi.io/api/latest?base=${currency}`)
      .then(response => response.json())
      .then(data => {
        let rate = data.rates.GBP;
        this.setState({
          total: this.state.total + rate * amount
        });
      });
  };

  addToPayments = (date, currency, amount, desciption, status) => {
    const payments = this.state.payments;
    payments.push({ date, currency, amount, desciption, status });
    this.fetchData(currency, amount);
    this.setState({
      payments
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Payments</h1>
        </header>
        <Balance
          total={this.state.balance}
          currencies={this.state.currencies}
        />
        <CalcPayment
          currencies={this.state.currencies}
          addToPayments={this.addToPayments}
        />
        <h2>Payments</h2>
        <Payments payments={this.state.payments} total={this.state.total} />
      </div>
    );
  }
}

export default App;
