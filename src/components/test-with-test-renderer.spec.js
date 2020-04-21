/**
 * react-test-renderer : For snapshot test
 */

import React from "react";

import { create, act } from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

import Test, { Level0, Level1 } from "./test.jsx";

describe("Test Component using react-test-renderer", () => {
  const props = {
    level0: {
      message: "level0",
      level1: {
        message: "level1"
      }
    }
  };

  describe("Test Renderer demo", () => {
    let testRenderer;
    let testInstance;

    beforeEach(() => {
      /**
       * Create test renderer instance with passed react component
       * Does not use real dom
       */
      testRenderer = create(<Test {...props} />);

      /**
       * Returns the root “test instance” object
       * Useful for making assertions about specific nodes in the tree.
       * You can use it to find other “test instances” deeper below.
       */
      testInstance = testRenderer.root;
    });

    it("testInstance.type demo", () => {
      expect(testInstance.type).toEqual(Test);
    });

    it(".toJSON() .toMatchSnapshot() demo", () => {
      /***
       * Get JSON for the renderer.
       * It contains native elements not react components
       */
      // expect(testRenderer.toJSON()).toMatchSnapshot();
      // expect(JSON.stringify(testRenderer.toJSON())).toEqual(
      //   `{"children": [{"children": ["Test Component"], "props": {}, "type": "h3"}, {"children": [{"children": ["Level 0"], "props": {}, "type": "h4"}, {"children": ["level0"], "props": {"id": "level1Message"}, "type": "p"}, {"children": [{"children": ["Level 1"], "props": {}, "type": "h5"}, {"children": ["level1"], "props": {"className": "level1-message"}, "type": "p"}, {"children": ["0"], "props": {"id": "count"}, "type": "p"}, {"children": ["Click Me!"], "props": {"onClick": [Function onClick]}, "type": "button"}], "props": {}, "type": "div"}, {"children": ["Typography Demo"], "props": {"className": "MuiTypography-root MuiTypography-body1"}, "type": "p"}], "props": {}, "type": "div"}], "props": {}, "type": "div"}`
      // );
    });

    it(".toTree() .toMatchSnapshot() demo", () => {
      /***
       * Returns rendered tree; more detailed than toJSON
       * Includes user written components
       */
      // expect(testRenderer.toTree()).toMatchSnapshot();
    });

    it("should render the compoennt", () => {
      expect(testInstance).toBeDefined();
    });

    it("find() / findAll() demo", () => {
      /**
       * Get all elements matching expression
       */
      expect(testInstance.findAll(node => node.type === "p").length).toEqual(4);
    });

    it("findByType() / findAllByType() demo", () => {
      /**
       * Find elements by component type
       * Throws exception if not found one
       */
      let level0Element = testInstance.findByType(Level0);
      expect(level0Element.props.message).toEqual(props.level0.message);
    });

    it("findByProps() / findAllByProps() demo", () => {
      // Find elements by className
      let level1Message = testInstance.findByProps({
        className: "level1-message"
      });
      expect(level1Message.children).toEqual([props.level0.level1.message]);
    });

    it(".instance demo", () => {
      /**
       * component instance corresponding to test instance
       * only available for class components
       */
      expect(testInstance.instance).toBeDefined();
    });

    it("testInstance.props demo", () => {
      expect(testInstance.props.level0).toEqual(props.level0);
    });

    it("testInstance.parent demo", () => {
      expect(testInstance.children[0].parent).toEqual(testInstance);
    });

    describe("act() demo", () => {
      it("Trigger events demo", () => {
        let level1 = testInstance.findByType(Level1);
        let button = level1.findByType("button");
        let count = level1.findByProps({ id: "count" });
        expect(button).toBeDefined();
        expect(count.children[0]).toEqual("0");

        act(button.props.onClick);
        expect(count.children[0]).toEqual("1");
        act(button.props.onClick);
        expect(count.children[0]).toEqual("2");
      });

      it("restRenderer.update() demo", () => {
        let newProps = {
          ...props,
          level0: { ...props.level0, message: "level0 new message" }
        };
        act(() => {
          testRenderer.update(<Test {...newProps} />);
        });
        let level0Message = testInstance
          .findByType(Level0)
          .findByProps({ id: "level1Message" });
        expect(level0Message.children[0]).toEqual(newProps.level0.message);
      });
    });

    it("testRenderer.update(element) demo", () => {});

    it("testRenderer.unmount() demo", () => {
      /**
       * Umounts in-memory tree; triggering lifecycle events
       */
    });
  });

  describe("ShallowRenderer demo", () => {
    let shallowRenderer = new ShallowRenderer();

    beforeEach(() => {

      shallowRenderer.render(<Test {...props} />);
    });

    it("ShallowRenderer demo", () => {
      // Get shallowly rendered output
      let result = shallowRenderer.getRenderOutput();
      
      expect(result.type).toBe("div");
      expect(result.props.children).toEqual([
        <h3>Test Component</h3>,
        <Level0 level1={{ message: "level1" }} message="level0" />
      ]);
      expect(result).toEqual(
        <div>
          <h3>Test Component</h3>
          <Level0 level1={{ message: "level1" }} message="level0" />
        </div>
      );
    });
  });
});
