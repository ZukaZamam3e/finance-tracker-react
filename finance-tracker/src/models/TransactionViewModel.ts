import { TransactionModel } from "./TransactionModel";
import { TransactionOffsetModel } from "./TransactionOffsetModel";

export interface TransactionViewModel {
    transaction: TransactionModel,
    offset: TransactionOffsetModel
}