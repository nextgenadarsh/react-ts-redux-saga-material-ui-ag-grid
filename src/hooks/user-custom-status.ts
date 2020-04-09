import { useState, useEffect, useRef } from "react";
import DataService from "../services/data-service";

const useCustomStatus = () => {
  const [status, setStatus] = useState(null);

  const statusSubscriptionRef = useRef();

  useEffect(() => {
    // Subscribe to receive notification when data change
    statusSubscriptionRef.current = DataService.getStatus().subscribe(
      status => {
        setStatus(status);
      }
    );

    return () => {
      // Unsubscribe
      statusSubscriptionRef.current.unsubscribe();
    };
  });

  return status;
};

export { useCustomStatus };
