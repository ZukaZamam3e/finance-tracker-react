import { Route, Routes } from "react-router-dom";
import { Calendar } from "../Calendar/Calendar";

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendar />} />
    </Routes>
  );
};
