import { useEffect, useState } from "react";
import { CategoryModel } from "../../../models/CategoryModel";
import { FabCancel } from "../../Common/FabCancel";
import { calendarApi } from "../../../api/calendarApi";
import { Box } from "@mui/material";
import { CategoryCard } from "./CategoryCard";

interface CategoriesProps {
  accountId: number;
  selectedDate: Date;
  onCancelCategories: () => void;
}

export const Categories = (props: CategoriesProps) => {
  const { getCategories } = calendarApi();

  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const load = async () => {
    const { response } = await getCategories(
      props.accountId,
      props.selectedDate
    );

    if (!!response) {
      setCategories(response);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const sxBody = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    columnGap: { xs: "2px", sm: "5px" },
    rowGap: { xs: "2px", sm: "5px" },
    fontSize: { xs: "12px", sm: "16px" },
    paddingBottom: {
      xs: "185px",
      sm: "185px",
      md: "52px",
      lg: "52px",
    },
  };

  const body = (
    <Box sx={sxBody}>
      <Header />
      {categories.map((category) => (
        <CategoryCard key={category.category} category={category} />
      ))}
      <FabCancel onCancelClick={props.onCancelCategories} />
    </Box>
  );

  return <>{body}</>;
};

const Header = () => {
  const sxBorder = {
    borderBottom: "solid rgb(58, 58, 60)",
    borderWidth: { xs: "1px", sm: "3px" },
  };
  const sxCategoryName = { gridColumn: "span 2", ...sxBorder };

  return (
    <>
      <Box sx={sxCategoryName}>Name</Box>
      <Box sx={sxBorder}>Total</Box>
      <Box sx={sxBorder}>Count</Box>
    </>
  );
};
