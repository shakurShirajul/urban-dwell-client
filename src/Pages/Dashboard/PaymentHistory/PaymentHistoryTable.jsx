import React from 'react';

const PaymentHistoryTable = ({ paymentHistory, index }) => {

    const currentDate = new Date(paymentHistory.date);

    const date = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    return (
        <tr className='text-base font-medium'>
            <th>{index + 1}</th>
            <td>{`${date}-${month}-${year}`}</td>
            <td>{paymentHistory.transactionId}</td>
            <td className='capitalize'>{paymentHistory.month}</td>
            <td>{paymentHistory.coupon? paymentHistory.coupon : 'N/A'}</td>
            <td>${paymentHistory.discount}</td>
            <td>${paymentHistory.rent-paymentHistory.discount}</td>
        </tr>
    );
};

export default PaymentHistoryTable;