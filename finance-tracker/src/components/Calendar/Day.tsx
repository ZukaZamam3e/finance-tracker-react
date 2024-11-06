import { useState } from "react";
import { Box } from "@mui/material";
import { FabAddCancel } from "../Common/FabAddCancel";
import { DayModel } from "../../models/DayModel";
import { DayCard } from "./DayCard";
import { List } from "../Common/List";
import {
  defaultTransaction,
  TransactionModel,
} from "../../models/TransactionModel";
import { TransactionCard } from "./TransactionCard";
import { EditTransaction } from "./EditTransaction";

interface DayProps {
  day: DayModel;
  onCancelDay: () => void;
  largeView?: boolean;
}

export const Day = (props: DayProps) => {
  const [hideAddButton, setHideAddButton] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editingTransaction: defaultTransaction(),
  });
  const take = 18;

  const handleAddNewTransaction = () => {
    setEditing({ show: true, editingTransaction: defaultTransaction() });
  };

  const handleSelectTransaction = (transaction: TransactionModel) => {
    setEditing({ show: true, editingTransaction: transaction });
  };

  const handleTransactionSave = () => {};

  const handleDeleteTransaction = () => {};

  const handleCancelTransactionEdit = () => {
    setEditing({ show: false, editingTransaction: defaultTransaction() });
  };

  const hardset = props.day.transactions.filter(
    (m) => m.frequencyTypeId == 1000
  );
  const income = props.day.transactions.filter(
    (m) => m.amount > 0 && m.frequencyTypeId != 1000
  );

  const expenses = props.day.transactions.filter((m) => m.amount < 0);

  const sxBody = {
    display: !editing.show ? "initial" : "none",
  };

  const sxDayRow = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
    columnGap: "5px",
    rowGap: "5px",
  };

  const sxFiller = {
    gridColumn: { xs: "span 2", sm: "span 3" },
  };

  const sxDay = {
    gridColumn: { xs: "span 3", sm: "span 1" },
  };

  const editTransactionView = editing.show && (
    <EditTransaction
      transaction={editing.editingTransaction}
      onCancelEditTransaction={handleCancelTransactionEdit}
      onTransactionSave={handleTransactionSave}
    />
  );

  const body = (
    <div style={sxBody}>
      <div style={sxDayRow}>
        <Box sx={sxFiller} />
        <Box sx={sxDay}>
          <DayCard day={props.day} largeView={props.largeView} />
        </Box>
        <Box sx={sxFiller} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        {hardset.length > 0 && (
          <>
            <h2>Hardset</h2>
            <List
              count={hardset.length}
              hideSearch={true}
              hidePagination={true}
              take={take}
              paddingBottom={false}
            >
              {hardset.map((transaction: TransactionModel) => (
                <TransactionCard
                  transaction={transaction}
                  onSelectTransaction={handleSelectTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              ))}
            </List>
            <hr />
          </>
        )}
        {income.length > 0 && (
          <>
            <h2>Income</h2>
            <List
              count={income.length}
              hideSearch={true}
              hidePagination={true}
              take={take}
              paddingBottom={false}
            >
              {income.map((transaction: TransactionModel) => (
                <TransactionCard
                  transaction={transaction}
                  onSelectTransaction={handleSelectTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              ))}
            </List>
            <hr />
          </>
        )}
        {expenses.length > 0 && (
          <>
            <h2>Expenses</h2>
            <List
              count={expenses.length}
              hideSearch={true}
              hidePagination={true}
              take={take}
            >
              {expenses.map((transaction: TransactionModel) => (
                <TransactionCard
                  transaction={transaction}
                  onSelectTransaction={handleSelectTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                />
              ))}
            </List>
            <hr />
          </>
        )}
      </div>
      {!hideAddButton && (
        <FabAddCancel
          onAddClick={handleAddNewTransaction}
          onCancelClick={props.onCancelDay}
        />
      )}
    </div>
  );

  return (
    <>
      {body}
      {editTransactionView}
    </>
  );
};
