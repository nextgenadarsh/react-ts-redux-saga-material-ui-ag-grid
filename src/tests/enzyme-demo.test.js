import React from "react";
import { shallow } from "../enzyme";
import sinon from "sinon";
import chai from "chai";

import Test, { Level0 } from "../components/test";

const props = {
  level0: {
    message: "level0",
    level1: {
      message: "level1"
    }
  }
};
let wrapper;

describe("Test component using Enzyme", () => {
  describe("Shallow Rendering Demo", () => {
    beforeEach(() => {
      wrapper = shallow(<Test {...props} />);
    });

    it("find() demo", () => {
      // chai.expect(wrapper.contains(<div />)).to.equal(true);
      chai.expect(wrapper.find(Level0)).to.have.lengthOf(1);
    });

    it("wrapper.html() demo", () => {
      // expect(wrapper.html()).toEqual(
      //   '<div><h3>Test Component</h3><div><h4>Level 0</h4><p id="level1Message">level0</p><div><h5>Level 1</h5><p class="level1-message">level1</p><p id="count">0</p><button>Click Me!</button></div><p class="MuiTypography-root MuiTypography-body1">Typography Demo</p></div></div>'
      // );
      // let level1Message = wrapper.find(".level1-message");
      // expect(level1Message.get(0)).toEqual("");
      // expect(wrapper.find(".level1-message").get(0).props()).toEqual(
      //   props.level0.level1.message
    });
  });
});
