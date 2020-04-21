import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import HierarchyFilters from "../components/hierarchy-filters";

import data from "../data/hierarchy.json";

const MaterialUiPage = () => {
  const [hierarchyFilters, setHierarchyFilters] = useState([]);
  const [hierarchyFilterSelections, setHierarchyFilterSelections] = useState(
    []
  );

  useEffect(() => {
    setHierarchyFilters(data.payload);
    setHierarchyFilterSelections([21200]);
  }, []);

  return (
    <>
      <Typography align="center" variant="h4">
        Material UI Demo
      </Typography>
      <HierarchyFilters
        filters={hierarchyFilters}
        selections={hierarchyFilterSelections}
      />
    </>
  );
};
export default MaterialUiPage;
