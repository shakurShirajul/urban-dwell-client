import React from 'react';

const PaymentHistoryTable = ({ paymentHistory, index }) => {

    const currentDate = new Date(paymentHistory.date);

    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{`${date}-${month}-${year}`}</td>
            <td>{paymentHistory.transactionId}</td>
            <td>Blue</td>
        </tr>
    );
};

export default PaymentHistoryTable;