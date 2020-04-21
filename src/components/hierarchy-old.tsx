import React, { useState, useEffect } from "react";
import { Grid, makeStyles, List } from "@material-ui/core";

import HierarchySelectionList from "./hierarchy-selection-list";
import * as HierarchyData from "../data/hierarchy";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    border: "1px solid gray"
  }
}));

const HierarchyOld = props => {
  const classes = useStyles();
  const [localFilters, setLocalFilters] = useState([]);
  const [localSelections, setLocalSelections] = useState([]);

  useEffect(() => {
    console.log(`Updating hierarchy data with selection in local state`);
    setLocalFilters(props.hierarchyFilters);
  }, [props.hierarchyFilters]);

  const getHierarchyDataWithSelection = hierarchyFilters => {};

  const setNodesSelection = (childNodes, isSelected) => {
    (childNodes || []).forEach(childNode => {
      childNode.selected = isSelected;
      setNodesSelection(childNode.subHierarchy, isSelected);
    });
  };

  const handleSelection = (levelFilters, currentFilter, isSelected, parent) => {
    let selectedCount = 0,
      unSelectedCount = 0;
    levelFilters.forEach(filter => {
      if (filter.id === currentFilter.id) {
        filter.selected = isSelected;
        // Unselect child and
        !isSelected && setNodesSelection(filter.subHierarchy, isSelected);
      }
      filter.selected ? selectedCount++ : unSelectedCount++;

      filter.subHierarchy &&
        handleSelection(filter.subHierarchy, currentFilter, isSelected, filter);
    });
    // indeterminate = not all selected + at least one selected
    if (parent)
      parent.indeterminate =
        selectedCount > 0 && selectedCount < levelFilters.length;
  };

  // When user toggles the filter
  const handleToggle = (event, currentNode) => {
    const localFiltersCopy = [...localFilters];

    handleSelection(localFiltersCopy, currentNode, event.target.checked);

    setLocalFilters(localFiltersCopy);
  };

  useEffect(() => {
    if (localFilters.length < 1) {
      // Set the localFilter from props first time
      setLocalFilters(HierarchyData.payload);
    }
  });

  const allLevelData = [[], [], [], [], []];

  const populateFiltersUiStateForLevel = levelFilters => {
    levelFilters.forEach(levelFilter => {
      if (levelFilter.selected) {
        // allLevelData[levelFilter.level].push(levelFilter);
        levelFilter.subHierarchy.forEach(subFilter => {
          allLevelData[subFilter.level].push(subFilter);
        });
      }
      populateFiltersUiStateForLevel(levelFilter.subHierarchy);
    });
  };

  const populateFilterUiState = () => {
    localFilters.forEach(localFilter => {
      // Populate all elements of level 0
      allLevelData[localFilter.level].push(localFilter);
      if (localFilter.selected) {
        // Populate all child of selected parent
        localFilter.subHierarchy.forEach(subFilter => {
          allLevelData[subFilter.level].push(subFilter);
        });
      }
      populateFiltersUiStateForLevel(localFilter.subHierarchy);
    });
  };

  populateFilterUiState();

  return (
    <Grid className={classes.root}>
      <Grid container>
        {allLevelData.map(levelData => (
          <Grid>
            <HierarchySelectionList
              options={levelData}
              handleToggle={handleToggle}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default HierarchyOld;
