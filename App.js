import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = () => {
  const [calc, setCalc] = useState({
    firstOperand: null,
    secondOperand: null,
    operator: "=",
  });

  const handleNumber = (number) => {
    if (calc.secondOperand !== null && calc.secondOperand.length === 15) return;
    if (calc.secondOperand === "0" && number === "0") return;
    if (calc.secondOperand?.includes(",") && number === ",") return;
    let l_calc = {};
    if (calc.secondOperand === null && number === ",") {
      l_calc = {
        ...calc,
        secondOperand: "0, ",
      };
    } else {
      l_calc = {
        ...calc,
        secondOperand: calc.secondOperand !== null ? calc.secondOperand + number : number,
      };
    }
    setCalc(l_calc);
  }

  const handleOperator = (operator) => {
    if (calc.firstOperand === null && calc.secondOperand === null) return;
    if (calc.firstOperand === null) {
      setCalc({
        ...calc,
        operator: operator,
        firstOperand: calc.secondOperand,
        secondOperand: null,
      });
    } else {
      setCalc({
        ...calc,
        operator: operator,
      });
    }

    if (calc.secondOperand === null) {
      setCalc({
        ...calc,
        operator: operator,
      });
    }

    if (calc.firstOperand !== null && calc.secondOperand !== null) {
      setCalc({
        ...calc,
        firstOperand: compute(),
        operator: operator,
        secondOperand: null,
      });
    }
  }

  const handleClear = () => {
    setCalc({
      ...calc,
      firstOperand: null,
      secondOperand: null,
      operator: "=",
    });
  }

  const handlePlusMinus = () => {
    if (calc.secondOperand !== null) {
      const secondOperand = -1 * parseFloat(calc.secondOperand);
      setCalc({
        ...calc,
        secondOperand: secondOperand.toString(),
      });
    }
  }

  const handlePercent = () => {
    if (calc.secondOperand !== null) {
      let secondOperand = parseFloat(calc.secondOperand) * 0.01;
      if (secondOperand.toString().length > 7) {
        secondOperand = secondOperand.toFixed(2);
      }
      setCalc({
        ...calc,
        secondOperand: secondOperand.toString(),
      });
    }
  }

  const handleDelete = () => {
    if (calc.secondOperand === null) return;
    let secondOperand = calc.secondOperand;
    if (secondOperand?.length === 1) {
      secondOperand = null;
    } else {
      secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    }
    setCalc({
      ...calc,
      secondOperand: secondOperand,
    });
  }

  const handleCompute = () => {
    if (calc.firstOperand === null || calc.secondOperand == null) return;
    setCalc({
      ...calc,
      secondOperand: compute(),
      firstOperand: null,
    });
  }

  const format = (value) => {
    if (value === null) return;
    const sub = value.split(",");
    let formatted = "";
    if (sub.length > 1) {
      formatted = sub[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "," + sub[1];
    } else {
      formatted = sub[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return formatted;
  }

  const compute = () => {
    const randomWords = [
      "Miss na kita",
      "Balik ka na plss",
      "Labyu!",
      "Sana ako nalang",
      "Sana ako parin ;(",
      "Miss you lods",
      "Sana all lahat",
      "Sana all may jowa",
      "I love you",
      "Miss mo ba ko lods?",
      "I'm suffering, need you",
      "Sorry na",
      "Sorry na agad",
      "Sorry na talaga",
      "Sorry na bhe",
      "Mahal mo pa ba ako? ;(",
      "Sana ako nalang ulit",
    ]

    return randomWords[Math.floor(Math.random() * randomWords.length)];
  }

  return (
    <View style={styles.container}>
      <View style={styles.calculator}>
        <View style={styles.screens}>
          <Text style={styles.firstScreen}>{calc.firstOperand !== null ? `${format(calc.firstOperand)} ${calc.operator}` : ""}</Text>
          <Text style={[styles.secondScreen, calc.secondOperand !== null && calc.secondOperand.length > 9 ? styles.secondScreenSmall : styles.secondScreenNormal]}>{format(calc.secondOperand)}</Text>
        </View>
        <View style={styles.inputsWrapper}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handleClear()}>
              <Text style={styles.featuredButtonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handlePlusMinus()}>
              <Text style={styles.featuredButtonText}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handlePercent()}>
              <Text style={styles.featuredButtonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handleOperator('÷')}>
              <Text style={styles.featuredButtonText}>÷</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handleOperator('*')}>
              <Text style={styles.featuredButtonText}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handleOperator('-')}>
              <Text style={styles.featuredButtonText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handleOperator('+')}>
              <Text style={styles.featuredButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber(',')}>
              <Text style={styles.buttonText}>,</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleNumber('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
              <Text style={styles.buttonText}>Del</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featuredButton} onPress={() => handleCompute()}>
              <Text style={styles.featuredButtonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  calculator: {
    width: 420,
    height: 860,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      elevation: 5,
    },
  },
  screens: {
    // padding: 10,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // backgroundColor: '#333',
    // color: 'whitesmoke',
    // minHeight: 50,
    // borderRadius: 5,
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#333',
    color: 'whitesmoke',
  },
  firstScreen: {
    fontSize: 16,
    color: '#fff',
  },
  secondScreen: {
    fontSize: 36,
    color: '#fff',
  },
  secondScreenNormal: {
    fontSize: 30,
  },
  secondScreenSmall: {
    fontSize: 30,
  },
  inputsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50,
    padding: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    width: 70,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  featuredButton: {
    width: 70,
    height: 55,
    borderRadius: 10,
    backgroundColor: '#ff6b00',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#333',
  },
  featuredButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default App;