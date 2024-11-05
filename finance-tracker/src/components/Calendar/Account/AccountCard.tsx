import { AccountModel } from "../../../models/AccountModel";
import { FTCard } from "../../Common/FTCard";
import { FTGrid } from "../../Common/FTGrid";
import { FTGridItem } from "../../Common/FTGridItem";
import { FTTypography } from "../../Common/FTTypography";

interface AccountCardProps {
  account: AccountModel;
}

export const AccountCard = (props: AccountCardProps) => {
  return (
    <FTCard>
      <FTGrid>
        <FTGridItem>
          <FTTypography>{props.account.accountName}</FTTypography>
          <FTTypography>
            Default: {props.account.defaultIndc ? "Yes" : "No"}
          </FTTypography>
        </FTGridItem>
      </FTGrid>
    </FTCard>
  );
};
