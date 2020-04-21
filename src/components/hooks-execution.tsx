import React, { useState, useEffect } from "react";

const HooksExecution = props => {
  const [localValue, setLocalValue] = useState(props.value);
  console.log(`localValue: ${localValue}`);

  useEffect(() => {
    console.log("Effect 1 executed");
  });

  useEffect(() => {
    console.log("Effect 2 executed");
  }, []);

  const handleOnIncreament = () => {
    setLocalValue(prevValue => prevValue + 1);
  };

  return (
    <div>
      Current Value: {localValue}
      <button onClick={handleOnIncreament} className="btn btn-secondary">
        Increament
      </button>
    </div>
  );
};

export default HooksExecution;
