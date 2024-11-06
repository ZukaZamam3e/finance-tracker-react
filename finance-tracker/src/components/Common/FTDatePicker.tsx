import ClearIcon from "@mui/icons-material/Clear";
import { DatePicker } from "@mui/x-date-pickers";
import { FTIconButton } from "./FTIconButton";
import Grid from "@mui/material/Grid2";
import { useRef } from "react";
import dayjs from "dayjs";

interface FTDatePickerProps {
  label: string;
  date?: Date;
  onDateChange: (value: any) => void;
}

export const FTDatePicker = (props: FTDatePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearDate = () => {
    props.onDateChange(null);
  };

  return (
    <Grid container spacing={3} size={{ xs: 12 }}>
      <Grid size={{ xs: 10, sm: 11 }}>
        <DatePicker
          slotProps={{ textField: { fullWidth: true, required: false } }}
          closeOnSelect
          inputRef={inputRef}
          value={props.date && dayjs(props.date)}
          onChange={props.onDateChange}
          label={props.label}
        />
      </Grid>
      <Grid size={{ xs: 2, sm: 1 }}>
        <FTIconButton aria-label="Clear" size="large" onClick={clearDate}>
          <ClearIcon style={{ color: "red" }} />
        </FTIconButton>
      </Grid>
    </Grid>
  );
};
