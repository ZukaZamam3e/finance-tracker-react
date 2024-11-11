import { useEffect, useState } from "react";
import { transactionApi } from "../../../../api/transactionApi";
import { TransactionViewModel } from "../../../../models/TransactionViewModel";
import { FabCancel } from "../../../Common/FabCancel";
import { Box } from "@mui/material";
import { List } from "../../../Common/List";
import { ViewTransactionCard } from "./ViewTransactionCard";

interface TransactionsProps {
  accountId: number;
  onCancelTransactions: () => void;
}

export const Transactions = (props: TransactionsProps) => {
  const { loadTransactions, getTransactions } = transactionApi();
  const [transactions, setTransactions] = useState<TransactionViewModel[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const take = 12;

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { response } = await loadTransactions(props.accountId, take);

    if (!!response) {
      setTransactions(response.transactions);
      setTransactionCount(response.count);
    }
  };

  const get = async (page: number, search: string) => {
    const { response } = await getTransactions(
      props.accountId,
      page,
      take,
      search
    );

    if (!!response) {
      setTransactions(response.transactions);
      setTransactionCount(response.count);
    }
  };

  const sxBody = {
    //display: !editing.show && accountTransactionId == 0 ? "initial" : "none",
    display: "initial",
  };

  const body = (
    <div style={sxBody}>
      <List count={transactionCount} onGet={get} take={take}>
        {transactions.map((transaction: TransactionViewModel) => (
          <ViewTransactionCard
            key={transaction.transaction.transactionId}
            transaction={transaction}
          />
        ))}
      </List>
      <FabCancel
        //onAddClick={handleAddTransactionClick}
        onCancelClick={props.onCancelTransactions}
      />
    </div>
  );

  //const handleAddTransactionClick = () => {};
  return <>{body}</>;
};
