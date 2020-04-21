import React, { useState } from "react";
import { Typography } from "@material-ui/core";

const Test = props => {
  return (
    <div>
      <h3>Test Component</h3>
      <Level0 {...props.level0} />
    </div>
  );
};

export const Level0 = props => {
  const [count, increaseCount] = useState(0);
  const handleOnClick = e => {
    increaseCount(count + 1);
  };

  return (
    <div>
      <h4>Level 0</h4>
      <p id="level1Message">{props.message}</p>
      <Level1 {...props.level1} count={count} onClick={handleOnClick} />
      <Typography>Typography Demo</Typography>
    </div>
  );
};

export const Level1 = props => {
  return (
    <div>
      <h5>Level 1</h5>
      <p className="level1-message">{props.message}</p>
      <p id="count">{props.count}</p>
      <button onClick={e => props.onClick(e)}>Click Me!</button>
    </div>
  );
};

export default Test;
