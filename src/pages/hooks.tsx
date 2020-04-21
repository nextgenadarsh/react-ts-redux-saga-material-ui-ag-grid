import React from "react";

import Counter from "../components/counter/counter";
import HooksExecution from "../components/hooks-execution";

const HooksPage = () => {
  return (
    <div className="hooks-page">
      <Counter initialCount={5} />
      <HooksExecution value={2} />
    </div>
  );
};

export default HooksPage;
