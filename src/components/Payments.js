import React from "react";
import Button from "../components/Button";
import "./Payments.css";
import payments from "../data/payments.js";
console.log (payments)
function Payments(props) {
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
        {payments.map((payment)=>(<tr>
          <td>{payment.date}</td>
          <td>{payment.currency}</td>
          <td>{payment.amount}</td>
          
          <td>{payment.description}</td>
          <td>{payment.status}</td>
          <td><Button>Cancel</Button></td>
         
        </tr>)
        )}
        
         </tbody>
      <tfoot>
        <tr>
          <td />
          <td />
          <td>???</td>
          <td>Total (GBP)</td>
          <td />
          <td />
        </tr>
      </tfoot>
    </table>
  );
}

export default Payments;
