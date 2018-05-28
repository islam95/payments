import React from "react";
import Button from "../components/Button";
import "./Payments.css";

class Payments extends React.Component {
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
        <tbody>
          {this.props.payments.map((payment, index) => {
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
          })}
        </tbody>
        <tfoot>
          <tr>
            <td />
            <td />
            <td>{this.props.total.toFixed(2)}</td>
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
