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
      payments: payments.filter(payment => {
        return payment.status === "Complete"
      }),
      pendingPayments: payments.filter(payment => {
        return payment.status === "Pending"
      }),
      total: 0,
      pendingTotal: 0
    };
    this.state.payments.forEach(payment => {
      this.calculateTotal("total", payment.currency, payment.amount);
    });
    this.state.pendingPayments.forEach(payment => {
      this.calculateTotal("pendingTotal", payment.currency, payment.amount);
    });
  }

  calculateTotal = (total, currency, amount) => {
    fetch(`https://exchangeratesapi.io/api/latest?base=${currency}`)
      .then(response => response.json())
      .then(data => {
        let rate = data.rates.GBP;
        const aTotal = {};
        aTotal[total] = this.state[total] + rate * amount
        this.setState(aTotal);
      });
  };

  updateBalance = (currency, amount) => {
    fetch(`https://exchangeratesapi.io/api/latest?base=${currency}`)
      .then(response => response.json())
      .then(data => {
        let rate = data.rates.GBP;
        this.setState({
          balance: this.state.balance - rate * amount
        });
      });
  }

  updateTotalAndBalance = (currency, amount) => {
    fetch(`https://exchangeratesapi.io/api/latest?base=${currency}`)
      .then(response => response.json())
      .then(data => {
        let rate = data.rates.GBP;
        this.setState({
          balance: this.state.balance + rate * amount,
          pendingTotal: this.state.pendingTotal - rate * amount
        });
      });
  }

  addToPayments = (date, currency, amount, desciption = "", status = "Pending") => {
    const pendingPayments = this.state.pendingPayments;
    pendingPayments.push({ date, currency, amount, desciption, status });
    this.calculateTotal("pendingTotal", currency, amount);
    this.updateBalance(currency, amount)
    this.setState({pendingPayments});
  };

  removePayment = (key) => {
    const pendingPayments = this.state.pendingPayments;
    this.updateTotalAndBalance(pendingPayments[key].currency, pendingPayments[key].amount);
    pendingPayments.splice(key, 1);
    this.setState({pendingPayments}); 
  }

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
        <Payments payments={this.state.pendingPayments} total={this.state.pendingTotal} removePayment={this.removePayment} />
        <Payments payments={this.state.payments} total={this.state.total} />
      </div>
    );
  }
}

export default App;
