import React, { useEffect, useState } from "react";

import HierarchySelectionList from "./hierarchy-selection-list";

const HierarchyFilters = props => {
  const [levelFilters, setLevelFilters] = useState([[], [], [], [], []]); // Need to keep in state so that it can render when changed
  const [selections, setSelections] = useState([]); // Need to keep local selection until apply

  //#region
  useEffect(() => {
    // Update local selection if it is updated from parent
    setSelections(props.selections || []);
  }, [props.selections]);

  useEffect(() => {
    // Generate level filters from filters and selections
    const updatedLevelFilters = [[], [], [], [], []];

    props.filters.forEach(currentNode => {
      currentNode.selected = selections.indexOf(currentNode.id) > -1;
      updatedLevelFilters[0].push(currentNode);

      handleChildNodes(updatedLevelFilters, selections, currentNode);
    });
    setLevelFilters(updatedLevelFilters);
  }, [props.filters, selections]);
  // endregion

  //#region
  const handleChildNodes = (
    updatedLevelFilters,
    updatedSelections,
    currentNode
  ) => {
    if (currentNode.subHierarchy && currentNode.subHierarchy.length > 0) {
      currentNode.subHierarchy.forEach(childNode => {
        handleChildNodes(updatedLevelFilters, updatedSelections, childNode);
      });
      const selectedChildNodes = currentNode.subHierarchy.filter(
        childNode => childNode.selected
      );

      currentNode.indeterminate =
        selectedChildNodes.length > 0 &&
        selectedChildNodes.length < currentNode.subHierarchy.length;
      currentNode.selected =
        updatedSelections.indexOf(currentNode.id) > -1 ||
        currentNode.indeterminate;
      if (currentNode.selected) {
        currentNode.subHierarchy.forEach(childNode =>
          updatedLevelFilters[childNode.level].push(childNode)
        );
      }
    } else {
      currentNode.selected = updatedSelections.indexOf(currentNode.id) > -1;
    }
  };

  const getNodeIdsToBeUnSelected = (eventNode, levelFilters) => {
    const nodeIdsToBeUnSelected = [eventNode.id];
    for (
      let count = eventNode.level + 1;
      count < levelFilters.length;
      count++
    ) {
      levelFilters[count].forEach(levelNode => {
        if (nodeIdsToBeUnSelected.indexOf(levelNode.parent) > -1) {
          nodeIdsToBeUnSelected.push(levelNode.id);
        }
      });
    }
    return nodeIdsToBeUnSelected;
  };

  const handleOnToggle = (event, eventNode) => {
    if (!event.target.checked) {
      const nodeIdsToBeUnSelected = getNodeIdsToBeUnSelected(
        eventNode,
        levelFilters
      );
      setSelections(prevSelections =>
        prevSelections.filter(id => nodeIdsToBeUnSelected.indexOf(id) < 0)
      );
    } else {
      setSelections(prevSelections => [...prevSelections, eventNode.id]);
    }
  };
  //#endregion

  return (
    <div style={{ display: "flex" }}>
      {levelFilters.map((levelFilter, levelFilterIndex) => (
        <div key={levelFilterIndex} style={{ width: "200px" }}>
          <HierarchySelectionList
            options={levelFilter}
            onToggle={handleOnToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default HierarchyFilters;
