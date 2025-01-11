import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./InputAndLabel";

const ExpenseForm = ({ onCancel, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleAmount = function (enteredAmount) {
    setAmount(enteredAmount);
  };
  const handleDate = function (enteredDate) {
    setDate(enteredDate);
  };
  const handleDescription = function (enteredDescription) {
    setDescription(enteredDescription);
  };

  const submitData = {
    date,
    amount,
    description,
  };
  return (
    <View style={styles.ExpenseForm}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: handleAmount,
            placeholder: "#0.00",
            value: amount,
          }}
          wrapperStyle={styles.rowInput}
        />
        <Input
          label="Date"
          inputConfig={{
            onChangeText: handleDate,
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: date,
          }}
          wrapperStyle={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        inputConfig={{
          onChangeText: handleDescription,
          multiline: true,
          value: description,
          // autocorrect: false,
          // autoCapitalize: "none",
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={() => onSubmit(submitData)}>
          {isEditing ? "Update" : "Add"}
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
});
