import Header from "./components/Header";
import Form from "./components/Form";
import Table from "./components/Table";
import React, { useState } from "react";
function App() {
  const [userInput, setUserData] = useState(null);
  const calculateHandler = (userInput) => {
    setUserData(userInput);
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    // do something with yearlyData ...
  };
  const yearlyData = []; // per-year results
  if (userInput) {
    let currentSavings = +userInput["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution
      });
    }
  }
  return (
    <div>
      <Header />
      <Form calculateHandler={calculateHandler} />
      {!userInput && <p style={{ textAlign: "center" }}>No Results to show!</p>}
      {userInput && (
        <Table data={yearlyData} initialAmount={userInput["current-savings"]} />
      )}

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
    </div>
  );
}

export default App;
