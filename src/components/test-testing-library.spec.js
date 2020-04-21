/**
 * @testing-library/react  :  DOM Test
 */

import React from "react";
import { cleanup, render } from "@testing-library/react";

import Test from "./test";

beforeEach(() => {});

afterEach(cleanup);

describe("Test component using @testing-library/react", () => {
  const props = {
    level0: {
      message: "level0",
      level1: {
        message: "level1"
      }
    }
  };

  it("", () => {
    const { getByText } = render(<Test {...props} />);
    // expect(getByText(props.level0.message)).toBeTruthy();
  });
});
