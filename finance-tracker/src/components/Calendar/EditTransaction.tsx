import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
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
import { CodeValueModel } from "../../models/CodeValueModel";
import { FTIconButton } from "../Common/FTIconButton";
import IsoIcon from "@mui/icons-material/Iso";
import { TransactionOffsetModel } from "../../models/TransactionOffsetModel";

interface EditTransactionProps {
  transaction: TransactionModel;
  offset?: TransactionOffsetModel;
  frequencyTypeIds: CodeValueModel[];
  selectedDate: Date;
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

  const handleOffsetDateChange = (value: any) => {
    const updatedTransaction = {
      ...transaction,
      ["offsetDate"]: value != null ? value.toDate() : null,
    };
    setTransaction(updatedTransaction);
  };

  const handleChange = (e: any) => {
    if (e.target.name == "amount") {
      setTransaction({ ...transaction, [e.target.name]: +e.target.value });
    }
    if (e.target.name == "offsetAmount") {
      setTransaction({
        ...transaction,
        [e.target.name]: e.target.value != "" ? +e.target.value : undefined,
        offsetDate:
          e.target.value != "" ? new Date(props.selectedDate) : undefined,
      });
    } else {
      setTransaction({ ...transaction, [e.target.name]: e.target.value });
    }
  };

  const handleFrequencyTypeChange = (event: SelectChangeEvent) => {
    setTransaction({
      ...transaction,
      ["frequencyTypeId"]: parseInt(event.target.value),
    });
  };

  const flipAmount = () => {
    const updatedTransaction = {
      ...transaction,
      ["amount"]: transaction.amount * -1,
    };
    setTransaction(updatedTransaction);
  };

  const flipOffsetAmount = () => {
    const updatedTransaction = {
      ...transaction,
      ["offsetAmount"]: (transaction.offsetAmount ?? 0) * -1,
    };
    setTransaction(updatedTransaction);
  };

  const handleTransactionSave = () => {
    const saveData: TransactionModel = { ...transaction };
    props.onTransactionSave(saveData);
  };
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
            <Grid container spacing={3}>
              <Grid size={{ xs: 10, sm: 11 }}>
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
              <Grid size={{ xs: 2, sm: 1 }}>
                <FTIconButton
                  aria-label="Clear"
                  size="large"
                  onClick={flipAmount}
                >
                  <IsoIcon style={{ color: "white" }} />
                </FTIconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={`${transaction.frequencyTypeId}`}
                displayEmpty
                fullWidth
                sx={{ textAlign: "left" }}
                onChange={handleFrequencyTypeChange}
                label="Frequency"
              >
                <MenuItem value="0">Select Account</MenuItem>
                {props.frequencyTypeIds.map((item) => (
                  <MenuItem key={item.codeValueId} value={item.codeValueId}>
                    {item.decodeTxt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FTTextField
              fullWidth
              name="transactionNotes"
              label="Notes"
              multiline
              defaultValue={transaction.transactionNotes}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FTTextField
              fullWidth
              name="transactionUrl"
              label="URL"
              defaultValue={transaction.transactionUrl}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Offset Date"
              value={dayjs(transaction.offsetDate)}
              onChange={(value) => handleOffsetDateChange(value)}
            />
          </Grid> */}
          <Grid size={{ xs: 12 }}></Grid>
          <Grid size={{ xs: 12 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 10, sm: 11 }}>
                <FormControl fullWidth>
                  <InputLabel>
                    Offset for{" "}
                    {new Date(props.selectedDate).toLocaleDateString()}
                  </InputLabel>
                  <FTInput
                    inputProps={currencyInputProps}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    name="offsetAmount"
                    label={`Offset for ${new Date(props.selectedDate).toLocaleDateString()}`}
                    type="number"
                    value={transaction.offsetAmount}
                    onChange={(e: any) => handleChange(e)}
                  />
                </FormControl>
              </Grid>
              <Grid size={{ xs: 2, sm: 1 }}>
                <FTIconButton
                  aria-label="Clear"
                  size="large"
                  onClick={flipOffsetAmount}
                >
                  <IsoIcon style={{ color: "white" }} />
                </FTIconButton>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FTTextField
                  fullWidth
                  name="categories"
                  label="Categories"
                  multiline
                  defaultValue={transaction.categories}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
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
