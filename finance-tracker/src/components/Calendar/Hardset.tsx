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
import { FTGridItem } from "../Common/FTGridItem";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { FTInput } from "../Common/FTInput";

interface HardsetProps {
  onSaveHardset: (date: Date, amount: number) => void;
  onCancelHardset: () => void;
}

export const Hardset = (props: HardsetProps) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);

  const currencyInputProps: InputBaseComponentProps = {
    inputMode: "decimal",
    style: { textAlign: "right" },
  };

  const handleSave = () => {
    props.onSaveHardset(date, amount);
  };

  const handleDateChange = (value: any) => {
    setDate(value.toDate());
  };

  return (
    <Box>
      <Paper
        sx={{
          borderStyle: "solid",
          borderWidth: "2px",
          borderColor: "white",
          borderRadius: 3,
          m: 2,
          padding: 3,
        }}
      >
        <FTGrid>
          <FTGridItem size={{ xs: 12 }}>
            <DatePicker
              slotProps={{ textField: { fullWidth: true } }}
              label="Date"
              value={dayjs(date)}
              onChange={(value) => handleDateChange(value)}
            />
          </FTGridItem>
          <FTGridItem size={{ xs: 12 }}>
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
          </FTGridItem>
        </FTGrid>
      </Paper>
      <FabSaveCancel
        onSaveClick={handleSave}
        onCancelClick={props.onCancelHardset}
      />
    </Box>
  );
};
