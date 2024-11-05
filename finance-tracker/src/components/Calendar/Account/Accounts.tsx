import { useEffect, useState } from "react";
import { accountApi } from "../../../api/accountApi";
import { FabAddCancel } from "../../Common/FabAddCancel";
import { AccountModel, defaultAccount } from "../../../models/AccountModel";
import { Box } from "@mui/material";
import { List } from "../../Common/List";
import { AccountCard } from "./AccountCard";
import { EditAccount } from "./EditAccount";

interface AccountProps {
  onCancelAccount: () => void;
}

export const Accounts = (props: AccountProps) => {
  const { loadAccounts, getAccounts } = accountApi();
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [clearSearch, setClearSearch] = useState(false);
  const [accountCount, setAccountCount] = useState<number>(0);
  const [editing, setEditing] = useState({
    show: false,
    editingAccount: defaultAccount(),
  });
  const take = 12;

  const load = async () => {
    const { response } = await loadAccounts(take);

    if (!!response) {
      setAccounts(response.accounts);
      setAccountCount(response.count);
    }
  };

  const get = async (page: number, search: string) => {
    const { response } = await getAccounts(page, take, search);

    if (!!response) {
      setAccounts(response.accounts);
      setAccountCount(response.count);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAccountAdd = () => {
    setEditing({ show: true, editingAccount: defaultAccount() });
  };

  const handleAccountSave = () => {};

  const handleCancelAccountEdit = () => {
    setEditing({ show: false, editingAccount: defaultAccount() });
  };

  const sxBody = {
    display: !editing.show ? "initial" : "none",
  };

  const editAccountView = editing.show && (
    <EditAccount
      account={editing.editingAccount}
      onCancelEditAccount={handleCancelAccountEdit}
    />
  );

  const body = (
    <div style={sxBody}>
      <List
        count={accountCount}
        onGet={get}
        clearSearch={clearSearch}
        take={take}
      >
        {accounts.map((account: AccountModel) => (
          <AccountCard key={account.accountId} account={account} />
        ))}
      </List>
    </div>
  );

  return (
    <>
      {body}
      {editAccountView}
      <FabAddCancel
        onAddClick={handleAccountAdd}
        onCancelClick={props.onCancelAccount}
      />
    </>
  );
};
