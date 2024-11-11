import { Box } from "@mui/material";
import { formatCurrency } from "../../../models/DayModel";
import { CategoryModel } from "../../../models/CategoryModel";

interface CategoryCardProps {
  category: CategoryModel;
}

export const CategoryCard = (props: CategoryCardProps) => {
  const sxBorder = {
    border: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", sm: "3px" },
  };
  const sxTransactionName = { gridColumn: "span 2", ...sxBorder };

  return (
    <>
      <Box sx={sxTransactionName}>{props.category.category}</Box>
      <Box sx={sxBorder}>{formatCurrency(props.category.total)}</Box>
      <Box sx={sxBorder}>{props.category.transactions.length}</Box>
    </>
  );
};
