import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer
} from "react";
import { ThemeContext } from "../../providers/theme-provider";
import { useCustomStatus } from "../../hooks/user-custom-status";
import DataService from "../../services/data-service";
import logger from "../../services/logger-service";

const Counter = ({ initialCount }) => {
  const [successCounter, setSuccessCounter] = useState(0);
  const [status, setStatus] = useState(null);

  const customStatus = useCustomStatus();

  const statusSubscriptionRef = useRef();

  const theme = useContext(ThemeContext);

  const [state, dispatch] = useReducer(reducer, initialCount, init);

  useEffect(() => {
    logger.info(
      `Effect 1: You felt good ${successCounter} times during render`
    );

    // Subscribe to any obervable
    statusSubscriptionRef.current = DataService.getStatus().subscribe(
      status => {
        setStatus(status);
      }
    );

    // eslint-disable-next-line no-undef
    document.title = `You felt good ${successCounter} times!`;

    return () => {
      // Unsubscribe here
      statusSubscriptionRef.current.unsubscribe();

      logger.info(
        `Effect 1: You were feeling good ${successCounter} times during cleanup`
      );
    };
  }, [successCounter]); // Runs only if successCounter changes

  useEffect(() => {
    logger.info(
      `Effect 2: You felt danger ${state.dangerCount} times during render`
    );

    return () => {
      logger.info(
        `Effect 2: You were feeling danger good ${
          state.dangerCount
        } times during cleanup`
      );
    };
  }, [state.dangerCount]); // Runs only once

  return (
    <div style={{ background: theme.background, color: theme.color }}>
      <h2>Hooks Demo - Check console logs to understand flow and actions</h2>
      <hr />
      <h6>Current Status using Subscription: {status}</h6>
      <h6>Custom Status using Custom Hook: {customStatus}</h6>
      <hr />
      <button
        className="btn btn-primary"
        onClick={() => setSuccessCounter(successCounter => successCounter + 1)}
      >
        Click if feeling good!!
      </button>
      {successCounter > 0 && <h3>You felt good {successCounter} times!</h3>}

      <hr />

      <button
        className="btn btn-danger"
        onClick={() => dispatch({ type: "increament" })}
      >
        Click if in danger!
      </button>
      {state.dangerCount > 0 && (
        <h3>You felt danger {state.dangerCount} times!</h3>
      )}
    </div>
  );
};

function init(initialCount) {
  return { dangerCount: initialCount };
}

function reducer(state, action) {
  switch (action.type) {
    case "increament":
      return { dangerCount: state.dangerCount + 1 };
    case "decreament":
      return { dangerCount: state.dangerCount + 1 };
    default:
      throw new Error("Invalid action");
  }
}

export default Counter;
