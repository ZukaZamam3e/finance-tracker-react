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
import { CodeValueModel } from "../../models/CodeValueModel";
import { calendarApi } from "../../api/calendarApi";

interface DayProps {
  day: DayModel;
  frequencyTypeIds: CodeValueModel[];
  onCancelDay: () => void;
  largeView?: boolean;
  onSaveTransaction: (
    transaction: TransactionModel,
    selectedDate: Date
  ) => void;
  onDeleteTransaction: (transactionId: number, selectedDate: Date) => void;
}

export const Day = (props: DayProps) => {
  const [hideAddButton, setHideAddButton] = useState(false);
  const [editing, setEditing] = useState({
    show: false,
    editingTransaction: defaultTransaction(),
  });
  const take = 18;

  const handleAddNewTransaction = () => {
    setEditing({
      show: true,
      editingTransaction: defaultTransaction(props.day.date),
    });
  };

  const handleSelectTransaction = (transaction: TransactionModel) => {
    setEditing({ show: true, editingTransaction: transaction });
  };

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

  const handleSaveTransaction = async (transaction: TransactionModel) => {
    const updatedTransaction = props.onSaveTransaction(
      transaction,
      props.day.date
    );

    if (updatedTransaction != null) {
      handleCancelTransactionEdit();
    }
  };

  const editTransactionView = editing.show && (
    <EditTransaction
      transaction={editing.editingTransaction}
      frequencyTypeIds={props.frequencyTypeIds}
      selectedDate={props.day.date}
      onCancelEditTransaction={handleCancelTransactionEdit}
      onTransactionSave={handleSaveTransaction}
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
                  key={transaction.transactionId}
                  transaction={transaction}
                  selectedDate={props.day.date}
                  onSelectTransaction={handleSelectTransaction}
                  onDeleteTransaction={props.onDeleteTransaction}
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
                  key={transaction.transactionId}
                  transaction={transaction}
                  selectedDate={props.day.date}
                  onSelectTransaction={handleSelectTransaction}
                  onDeleteTransaction={props.onDeleteTransaction}
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
                  key={transaction.transactionId}
                  transaction={transaction}
                  selectedDate={props.day.date}
                  onSelectTransaction={handleSelectTransaction}
                  onDeleteTransaction={props.onDeleteTransaction}
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
