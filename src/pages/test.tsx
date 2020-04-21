import React from "react";

import Test from "../components/test";

const TestPage = () => {
  const props = {
    level0: {
      message: "level0 message",
      level1: {
        message: "level1 message"
      }
    }
  };

  return (
    <>
      <h2>Test Page</h2>
      <Test {...props} />
    </>
  );
};
export default TestPage;
