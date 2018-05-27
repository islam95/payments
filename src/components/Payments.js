import React from "react";
import Button from "../components/Button";
import "./Payments.css";
import payments from "../data/payments";

class Payments extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0
    };
  }

  paymentsData = payments.map((payment, index) => {
    fetch(`https://exchangeratesapi.io/api/latest?base=${payment.currency}`)
      .then(response => response.json())
      .then(data => {
        let rate = data.rates.GBP;
        let amount = payment.amount;
        this.setState({
          total: this.state.total + rate * amount
        });
      });

    return (
      <tr key={index}>
        <td>{payment.date}</td>
        <td>{payment.currency}</td>
        <td>{payment.amount}</td>
        <td>{payment.description}</td>
        <td>{payment.status}</td>
        <td />
      </tr>
    );
  });

  render() {
    return (
      <table className="Payments">
        <thead>
          <tr>
            <th>Date</th>
            <th>Cur</th>
            <th>Amount</th>
            <th className="Payments-description">Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{this.paymentsData}</tbody>
        <tfoot>
          <tr>
            <td />
            <td />
            <td>{this.state.total.toFixed(2)}</td>
            <td>Total (GBP)</td>
            <td />
            <td />
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default Payments;
