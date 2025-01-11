import axios from "axios";
import baseUrl from "./axios";

export const storeExpense = function (expenseData) {
  axios.post(baseUrl + "expenses.json", expenseData);
};
