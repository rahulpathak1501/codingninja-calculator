import { useState, useCallback } from "react";

function Calculator() {
  const number = [
    ["1", "2", "3", "+"],
    ["4", "5", "6", "-"],
    ["7", "8", "9", "*"],
    ["0", "C", "=", "/"],
  ];

  const [result, setResult] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [symbol, setSymbol] = useState("");

  const handleNumberClick = useCallback(
    (value) => {
      if (value !== "=") {
        setInput1(input1 + value);
        if (value === "+" || value === "-" || value === "*" || value === "/") {
          handleOperatorClick(value);
        }
        if (value === "C") {
          setResult("");
          setInput1("");
          setInput2("");

          setSymbol("");
        }
      } else if (value === "=") {
        handleSubmit();
      }
    },
    [input1, setInput1]
  );

  // useEffect(() => {
  //   console.log(input2);
  // }, [input2]);

  const handleOperatorClick = (value) => {
    // console.log(input1);
    if (result !== "") {
      setResult("");
    }

    if (input1 !== "") {
      if (symbol === "") {
        setInput2(input1 + value);
      } else {
        setInput2((prevInput2) => prevInput2.slice(0, -1) + value);
      }

      setInput1("");
      setSymbol(value);
    } else if (
      (value === "+" || value === "-" || value === "*" || value === "/") &&
      input2 !== ""
    ) {
      setInput2((prevInput2) => prevInput2.slice(0, -1) + value);
      setSymbol(value);
    }
  };

  // const handleSignChange = () => {
  //   setInput1((prevInput) =>
  //     prevInput[0] === "-" ? prevInput.slice(1) : "-" + prevInput
  //   );
  // };

  const handleSubmit = () => {
    if (input1 !== "" && input2 !== "") {
      const num1 = parseFloat(input2);
      const num2 = parseFloat(input1);

      switch (symbol) {
        case "+":
          setResult(num1 + num2);
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

      setInput1((prevInput1) =>
        prevInput1 !== "" ? prevInput1 : result.toString()
      );
      setInput2("");
      setSymbol("");
    } else {
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
      </div>
    </div>
  );
}

export default Calculator;
