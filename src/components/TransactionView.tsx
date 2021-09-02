import React, { FC } from "react";
import { TransactionWithSignature } from "../helpers/transactions";
import "./TransactionView.css";

interface TransactionsViewProps {
  transactions?: Array<TransactionWithSignature>;
}

const TransactionsView: FC<TransactionsViewProps> = ({ transactions }) => {
  const getTransactions = () => {
    return transactions?.map((trans) => {
      return <TransactionItemView key={trans.signature} transaction={trans} />;
    });
  };

  return <div>{getTransactions()}</div>;
};

interface TransactionItemViewProps {
  transaction: TransactionWithSignature;
}
let sum = 0; 
const TransactionItemView: FC<TransactionItemViewProps> = ({ transaction }) => {
  
  
  const getTransactionItems = () => {
    const signature = transaction.signature?.toString();
  
    const meta = transaction.confirmedTransaction.meta;
    const trans = transaction.confirmedTransaction.transaction;
    let amount = 0;

    const getBalance = () => {
      return 
    }

    if (meta) {
      //const initialBalance = meta.preBalances[1];
     // console.log("meta.preBalances[Receiver]",meta.preBalances[1]);
     // console.log("meta.preBalances[sender]",meta.preBalances[0]);
     // console.log("meta.postBalances[Receiver]",meta.postBalances[1]);
      //console.log("meta.postBalances[sender]",meta.postBalances[0]);
      amount = meta.preBalances[0] - meta.postBalances[0];
      //sum = meta.postBalances[1] - initialBalance;


    }
    return (
      <>
        <li key={signature + "signature"}>
          <label>Tx:</label> &nbsp;
          {signature}
        </li>
        <li key={signature + "fee"}>
          <label>Fee:</label>&nbsp;
          {meta?.fee}
        </li>
        
        <li key={signature + "amount"}>
          <label>Sent Amount (Stream + Performance):</label>&nbsp;
          {amount}
        </li>

        
        <li key={signature + "sender"}>
          <label>Sender:</label>&nbsp;
          {trans.instructions[0].keys[0].pubkey.toBase58()}
        </li>
        <li key={signature + "sender-balance"}>
          <label>Sender Balance:</label>&nbsp;
          {meta?.postBalances[0]}
        </li>
        <li key={signature + "receiver"}>
          <label>Receiver:</label>&nbsp;
          {trans.instructions[0].keys[1].pubkey.toBase58()}
        </li>
        <li key={signature + "receiver-balance"}>
          <label>Receiver Balance:</label>&nbsp;
          {meta?.postBalances[1]}
        </li>
      </>
    );
  };

  return (
    <div className="trans-item">
      <ul className="trans-meta">{getTransactionItems()}</ul>
    </div>
  );
};

export default TransactionsView;
