import { Connection, PublicKey, ConfirmedTransaction  } from "@solana/web3.js";

export class TransactionWithSignature {
  constructor(
    public signature: string,
    public confirmedTransaction: ConfirmedTransaction
  ) {}
}

export async function getTransactions(
  connection: Connection,
  address: PublicKey
): Promise<Array<TransactionWithSignature>> {
  const transSignatures = await connection.getConfirmedSignaturesForAddress2(
    address
  );

  const transactions = new Array<TransactionWithSignature>();
  for (let i = 0; i < transSignatures.length; i++) {
    const signature = transSignatures[i].signature;
    const confirmedTransaction = await connection.getConfirmedTransaction(
      signature
    );
    if (confirmedTransaction) {
      const transWithSignature = new TransactionWithSignature(
        signature,
        confirmedTransaction
      );
      transactions.push(transWithSignature);
    }
  }
  return transactions;
}

/*let divideVars: (depositAmount: number, time: number) => number = function (
  depositAmount: number,
  time: number
): number {
  var ratePerTransaction = depositAmount/time;
  return ratePerTransaction;
};*/


export async function divideVars(
  depositAmount: number,
  time: number
): Promise<Number> {
  var ratePerTransaction = depositAmount/time;
  return ratePerTransaction;
}

export async function getBalance(
  publicKey: PublicKey,
  connection: Connection,
): Promise<number> {
  return await connection.getBalanceAndContext(publicKey)
    .then(x => x.value)
    .catch(e => {
      throw new Error(
        'failed to get balance of account ' + publicKey.toBase58() + ': ' + e,
      );
    });
}