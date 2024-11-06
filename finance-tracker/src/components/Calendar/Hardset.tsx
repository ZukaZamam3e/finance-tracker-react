import {
  Box,
  FormControl,
  InputAdornment,
  InputBaseComponentProps,
  InputLabel,
  Paper,
} from "@mui/material";
import { FabSaveCancel } from "../Common/FabSaveCancel";
import { FTGrid } from "../Common/FTGrid";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { currencyInputProps, FTInput } from "../Common/FTInput";
import { FTPaper } from "../Common/FTPaper";
import Grid from "@mui/material/Grid2";

interface HardsetProps {
  onSaveHardset: (date: Date, amount: number) => void;
  onCancelHardset: () => void;
}

export const Hardset = (props: HardsetProps) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);

  const handleSave = () => {
    props.onSaveHardset(date, amount);
  };

  const handleDateChange = (value: any) => {
    setDate(value.toDate());
  };

  return (
    <Box>
      <FTPaper>
        <FTGrid>
          <Grid size={{ xs: 12 }}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Date"
              value={dayjs(date)}
              onChange={(value) => handleDateChange(value)}
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
                value={amount}
                onChange={(e: any) => setAmount(+e.target.value)}
              />
            </FormControl>
          </Grid>
        </FTGrid>
      </FTPaper>
      <FabSaveCancel
        onSaveClick={handleSave}
        onCancelClick={props.onCancelHardset}
      />
    </Box>
  );
};
