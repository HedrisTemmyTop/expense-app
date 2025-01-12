import axios from "axios";
import baseUrl from "./axios";

export const storeExpense = async function (expenseData) {
  const response = await axios.post(`${baseUrl}/expenses.json`, expenseData);
  const id = response.data.name;

  return id;
};

export const getExpenses = async function () {
  const response = await axios.get(`${baseUrl}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: Number(response.data[key].amount),
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  console.log(expenses);
  return expenses;
};

export const updateExpense = function (id, updatedData) {
  return axios.put(`${baseUrl}/expenses/${id}.json`, updatedData);
};
export const deleteExpense = async function (id) {
  return axios.delete(`${baseUrl}/expenses/${id}.json`);
};
