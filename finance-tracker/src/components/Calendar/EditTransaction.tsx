import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputAdornment,
  InputBaseComponentProps,
  InputLabel,
} from "@mui/material";
import { FTGrid } from "../Common/FTGrid";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { FTTextField } from "../Common/FTTextField";
import { FabSaveCancel } from "../Common/FabSaveCancel";
import { FTPaper } from "../Common/FTPaper";
import { TransactionModel } from "../../models/TransactionModel";
import { currencyInputProps, FTInput } from "../Common/FTInput";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FTDatePicker } from "../Common/FTDatePicker";

interface EditTransactionProps {
  transaction: TransactionModel;
  onCancelEditTransaction: () => void;
  onTransactionSave: (transaction: TransactionModel) => void;
}

export const EditTransaction = (props: EditTransactionProps) => {
  const [transaction, setTransaction] = useState<TransactionModel>(
    props.transaction
  );

  const handleStartDateChange = (value: any) => {
    const updatedTransaction = {
      ...transaction,
      ["startDate"]: value.toDate(),
    };
    setTransaction(updatedTransaction);
  };

  const handleEndDateChange = (value: any) => {
    const updatedTransaction = {
      ...transaction,
      ["endDate"]: value != null ? value.toDate() : null,
    };
    setTransaction(updatedTransaction);
  };

  const handleChange = (e: any) => {
    if (e.target.name == "amount") {
      setTransaction({ ...transaction, [e.target.name]: +e.target.value });
    } else {
      setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }
  };

  const handleTransactionSave = () => {};
  return (
    <Box>
      <FTPaper>
        <FTGrid>
          <Grid size={{ xs: 12 }}>
            <FTTextField
              fullWidth
              name="name"
              label="Name"
              defaultValue={transaction.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Start Date"
              value={dayjs(transaction.startDate)}
              onChange={(value) => handleStartDateChange(value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FTDatePicker
              label="End Date"
              date={transaction.endDate}
              onDateChange={(value) => handleEndDateChange(value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Amount</InputLabel>
              <FTInput
                inputProps={currencyInputProps}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                name="amount"
                label="Amount"
                type="number"
                value={transaction.amount}
                onChange={(e: any) => handleChange(e)}
              />
            </FormControl>
          </Grid>
        </FTGrid>
      </FTPaper>
      <FabSaveCancel
        onSaveClick={handleTransactionSave}
        onCancelClick={props.onCancelEditTransaction}
      />
    </Box>
  );
};
