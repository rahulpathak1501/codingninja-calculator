import "./Calculator.css";
import { useState } from "react";

function Calculator() {
  const number = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", ".", "C"],
  ];

  const [result, setResult] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [symbol, setSymbol] = useState("");

  const handleNumberClick = (value) => {
    if (value === "C") {
      setInput1((prevInput) => prevInput.slice(0, -1));
      // if (input2 !== "") {
      //   setInput2((prevInput) => prevInput.slice(0, -1));
      // }
      if (result !== "") {
        setResult("");
      }
    } else {
      if (result !== "") {
        setResult("");
      }
      setInput1((prevInput) => prevInput + value);
    }
  };

  const handleOperatorClick = (e) => {
    if (result !== "") {
      setResult("");
    }
    if (input1 !== "") {
      setSymbol(e.target.value);
      setInput2((prevInput) => prevInput + input1 + e.target.value);
      setInput1("");
    }
    //setInput1("0");
    // setSymbol(e.target.value);
    // //setInput2((prevInput) => prevInput + input1 + e.target.value);
    // setInput1("");
  };

  const handleSubmit = (e) => {
    if (input1 !== "" && input2 !== "") {
      const num1 = parseFloat(input2);
      const num2 = parseFloat(input1);

      switch (symbol) {
        case "+":
          setResult(num1 + num2);
          setInput1(result);
          break;
        case "-":
          setResult(num1 - num2);
          break;
        case "*":
          setResult(num1 * num2);
          break;
        case "/":
          setResult(num1 / num2);
          break;
        default:
          setResult("");
      }

      setInput1("");
      setInput2("");
      setSymbol("");
    }
    // else if(input1 !=="" || input2 !== ""){
    //   alert("please refresh the page");
    // }
    else {
      alert("please type both the input");
    }
  };

  return (
    <div className="container">
      <div className="result">
        {result !== "" ? (
          <input type="text" value={result} readOnly />
        ) : (
          <input
            type="text"
            value={input2 !== "" ? input2 + input1 : input1}
            readOnly
          />
        )}
      </div>
      <div className="oparations">
        <div className="numbers">
          <table>
            <tbody>
              {number.map((row) => (
                <tr>
                  {row.map((column) => (
                    <td>
                      <button
                        value={column}
                        onClick={() => handleNumberClick(column)}
                      >
                        {column}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="oparators">
          <button value={"+"} onClick={handleOperatorClick}>
            +
          </button>
          <button value={"-"} onClick={handleOperatorClick}>
            -
          </button>
          <button value={"*"} onClick={handleOperatorClick}>
            x
          </button>
          <button value={"/"} onClick={handleOperatorClick}>
            /
          </button>
          <button type="submit" onClick={handleSubmit}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
