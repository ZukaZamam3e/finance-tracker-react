import { useEffect, useState } from "react";
import { accountApi } from "../../../api/accountApi";
import { FabAddCancel } from "../../Common/FabAddCancel";
import { AccountModel, defaultAccount } from "../../../models/AccountModel";
import { List } from "../../Common/List";
import { AccountCard } from "./AccountCard";
import { EditAccount } from "./EditAccount";
import { Transactions } from "./Transactions/Transactions";

interface AccountProps {
  onCancelAccount: () => void;
  onSetAccounts: (accounts: AccountModel[]) => void;
}

export const Accounts = (props: AccountProps) => {
  const {
    loadAccounts,
    getAccounts,
    saveAccount,
    deleteAccount,
    cloneAccount,
  } = accountApi();
  const [accounts, setAccounts] = useState<AccountModel[]>([]);
  const [clearSearch, setClearSearch] = useState(false);
  const [accountCount, setAccountCount] = useState<number>(0);
  const [accountTransactionId, setAccountTransactionId] = useState<number>(0);
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
      props.onSetAccounts(response.accounts);
    }
  };

  const get = async (page: number, search: string) => {
    const { response } = await getAccounts(page, take, search);

    if (!!response) {
      setAccounts(response.accounts);
      setAccountCount(response.count);
      props.onSetAccounts(response.accounts);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSelectAccount = (account: AccountModel) => {
    setEditing({ show: true, editingAccount: account });
  };

  const handleAccountAdd = () => {
    setEditing({ show: true, editingAccount: defaultAccount() });
  };

  const handleAccountSave = async (account: AccountModel) => {
    const updatedAccount = await saveAccount(account);
    console.log(updatedAccount);

    if (updatedAccount != null) {
      await get(0, "");
      handleCancelAccountEdit();
    }
  };

  const handleCancelAccountEdit = () => {
    setEditing({ show: false, editingAccount: defaultAccount() });
  };

  const handleDeleteAccount = async (accountId: number) => {
    setClearSearch((prev) => !prev);
    const success = await deleteAccount(accountId);

    if (success) {
      await get(0, "");
    }
  };

  const handleCloneAccount = async (accountId: number) => {
    setClearSearch((prev) => !prev);
    const success = await cloneAccount(accountId);

    if (success) {
      await get(0, "");
    }
  };

  const handleViewTransactions = (accountId: number) => {
    setAccountTransactionId(accountId);
  };

  const handleCancelTransactions = () => {
    setAccountTransactionId(0);
  };

  const sxBody = {
    display: !editing.show && accountTransactionId == 0 ? "initial" : "none",
  };

  const editAccountView = editing.show && (
    <EditAccount
      account={editing.editingAccount}
      onCancelEditAccount={handleCancelAccountEdit}
      onAccountSave={handleAccountSave}
    />
  );

  const accountTransactionsView = accountTransactionId != 0 && (
    <Transactions
      accountId={accountTransactionId}
      onCancelTransactions={handleCancelTransactions}
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
          <AccountCard
            key={account.accountId}
            account={account}
            onSelectAccount={handleSelectAccount}
            onDeleteAccount={handleDeleteAccount}
            onCloneAccount={handleCloneAccount}
            onViewTransactions={handleViewTransactions}
          />
        ))}
      </List>
      <FabAddCancel
        onAddClick={handleAccountAdd}
        onCancelClick={props.onCancelAccount}
      />
    </div>
  );

  return (
    <>
      {body}
      {editAccountView}
      {accountTransactionsView}
    </>
  );
};
