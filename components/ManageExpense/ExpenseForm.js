import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Input from "./InputAndLabel";
import { getFormattedDate } from "../../util/date";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({ btnLabel, onCancel, onSubmit, defaultValues }) => {
  console.log(defaultValues);
  const [amount, setAmount] = useState({
    value: defaultValues ? defaultValues.amount.toString() : "",
    isValid: true,
  });
  const [date, setDate] = useState({
    value: defaultValues ? getFormattedDate(defaultValues.date) : "",
    isValid: true,
  });
  const [description, setDescription] = useState({
    value: defaultValues ? defaultValues.description : "",
    isValid: true,
  });

  const handleAmount = function (enteredAmount) {
    setAmount({
      value: enteredAmount,
      isValid: true,
    });
  };
  const handleDate = function (enteredDate) {
    setDate({
      value: enteredDate,
      isValid: true,
    });
  };
  const handleDescription = function (enteredDescription) {
    setDescription({
      value: enteredDescription,
      isValid: true,
    });
  };

  useEffect(() => {}, []);
  const handleSubmit = function () {
    const data = {
      date: new Date(date.value),
      amount: amount.value,
      description: description.value,
    };
    const amountIsValid = !isNaN(data.amount) && data.amount > 0;
    const dateIsValid = data.date.toString() !== "Invalid Date";
    const descriptionIsValid = data.description.trim().length > 3;

    if (!amountIsValid) {
      setAmount((prev) => ({
        ...prev,
        isValid: false,
      }));
    }
    if (!dateIsValid) {
      setDate((prev) => ({
        ...prev,
        isValid: false,
      }));
    }
    if (!descriptionIsValid) {
      setDescription((prev) => ({
        ...prev,
        isValid: false,
      }));
    }
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      return Alert.alert("Invalid input!", "Pls check your input alert");
    }

    onSubmit(data);
  };

  const formIsInvalid =
    !amount.isValid || !date.isValid || !description.isValid;
  return (
    <View style={styles.ExpenseForm}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          invalid={!amount.isValid}
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleAmount,
            placeholder: "#0.00",
            value: amount.value,
          }}
          wrapperStyle={styles.rowInput}
        />
        <Input
          label="Date"
          invalid={!date.isValid}
          inputConfig={{
            onChangeText: handleDate,
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: date.value,
          }}
          wrapperStyle={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        invalid={!description.isValid}
        inputConfig={{
          onChangeText: handleDescription,
          multiline: true,
          value: description.value,
          // autocorrect: false,
          // autoCapitalize: "none",
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - pls check your entered values
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>

        <Button style={styles.button} onPress={handleSubmit}>
          {btnLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    marginVertical: 24,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
