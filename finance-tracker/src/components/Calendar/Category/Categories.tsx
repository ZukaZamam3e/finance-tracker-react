import { FabCancel } from "../../Common/FabCancel";

interface CategoriesProps {
  onCancelCategories: () => void;
}

export const Categories = (props: CategoriesProps) => {
  const body = (
    <div>
      <FabCancel onCancelClick={props.onCancelCategories} />
    </div>
  );

  return <>{body}</>;
};
