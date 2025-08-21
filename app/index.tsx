import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemePicker } from "../components/ThemePicker";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { soundService } from "../services/SoundService";

function Calculator() {
  const { currentTheme } = useTheme();
  const [display, setDisplay] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);

  useEffect(() => {
    // Cleanup function to unload sounds when component unmounts
    return () => {
      soundService.cleanup();
    };
  }, []);

  const inputNumber = (num: number) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (
    firstValue: number,
    secondValue: number,
    operation: string
  ): number => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const percentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const handleButtonPress = async (
    onPress: () => void,
    buttonValue?: string | number
  ) => {
    // Play keyboard sound with specific button input
    await soundService.playKeySound(buttonValue);
    // Execute the button's function
    onPress();
  };

  const renderButton = (
    title: string,
    onPress: () => void,
    style: string = "number",
    buttonValue?: string | number
  ) => {
    const getButtonStyle = () => {
      const baseButtonStyle = [styles.button];

      switch (style) {
        case "operator":
          return [
            baseButtonStyle,
            { backgroundColor: currentTheme.colors.operatorButton },
          ];
        case "function":
          return [
            baseButtonStyle,
            { backgroundColor: currentTheme.colors.functionButton },
          ];
        case "zero":
          return [
            baseButtonStyle,
            styles.zeroButton,
            { backgroundColor: currentTheme.colors.numberButton },
          ];
        default:
          return [
            baseButtonStyle,
            { backgroundColor: currentTheme.colors.numberButton },
          ];
      }
    };

    const getTextStyle = () => {
      const baseTextStyle = [styles.buttonText];

      switch (style) {
        case "operator":
          return [
            baseTextStyle,
            { color: currentTheme.colors.operatorButtonText },
          ];
        case "function":
          return [
            baseTextStyle,
            { color: currentTheme.colors.functionButtonText },
          ];
        default:
          return [
            baseTextStyle,
            { color: currentTheme.colors.numberButtonText },
          ];
      }
    };

    return (
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={() => handleButtonPress(onPress, buttonValue)}
      >
        <Text style={getTextStyle()}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: currentTheme.colors.background },
      ]}
    >
      <StatusBar barStyle="light-content" />
      <ThemePicker />
      <View style={styles.displayContainer}>
        <Text
          style={[
            styles.displayText,
            { color: currentTheme.colors.displayText },
          ]}
        >
          {display}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton("AC", clear, "function", "AC")}
          {renderButton("+/-", toggleSign, "function", "+/-")}
          {renderButton("%", percentage, "function", "%")}
          {renderButton("÷", () => performOperation("÷"), "operator", "÷")}
        </View>

        <View style={styles.row}>
          {renderButton("7", () => inputNumber(7), "number", 7)}
          {renderButton("8", () => inputNumber(8), "number", 8)}
          {renderButton("9", () => inputNumber(9), "number", 9)}
          {renderButton("×", () => performOperation("×"), "operator", "×")}
        </View>

        <View style={styles.row}>
          {renderButton("4", () => inputNumber(4), "number", 4)}
          {renderButton("5", () => inputNumber(5), "number", 5)}
          {renderButton("6", () => inputNumber(6), "number", 6)}
          {renderButton("-", () => performOperation("-"), "operator", "-")}
        </View>

        <View style={styles.row}>
          {renderButton("1", () => inputNumber(1), "number", 1)}
          {renderButton("2", () => inputNumber(2), "number", 2)}
          {renderButton("3", () => inputNumber(3), "number", 3)}
          {renderButton("+", () => performOperation("+"), "operator", "+")}
        </View>

        <View style={styles.row}>
          {renderButton("0", () => inputNumber(0), "zero", 0)}
          {renderButton(".", inputDecimal, "number", ".")}
          {renderButton("=", () => performOperation("="), "operator", "=")}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function CalculatorScreen() {
  return (
    <ThemeProvider>
      <Calculator />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  displayText: {
    fontSize: 80,
    fontWeight: "200",
    textAlign: "right",
  },
  buttonContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  zeroButton: {
    width: 175,
    borderRadius: 40,
    justifyContent: "center",
    paddingLeft: 30,
    alignItems: "flex-start",
  },
  buttonText: {
    fontSize: 35,
    fontWeight: "400",
  },
});
