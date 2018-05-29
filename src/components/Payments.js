import React from "react";
import Button from "./Button";
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
          {this.props.payments.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.currency}</td>
                <td>{row.amount}</td>
                <td>{row.description}</td>
                <td>{row.status}</td>
                <td>
                  {row.status === "Pending" ? <Button onClick={() => this.props.removePayment(index)}>Cancel</Button> : ""}
                </td>
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
