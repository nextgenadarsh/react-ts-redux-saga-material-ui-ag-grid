import React from "react";
import {
  Checkbox,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: "10px"
  },
  listItem: {
    border: "1px solid gray"
  }
}));

const HierarchySelectionList = props => {
  const classes = useStyles();
  const options = props.options || [];

  const handleToggle = (event, item) => {
    props.onToggle && props.onToggle(event, item);
  };

  return (
    <List className={classes.root}>
      {options.map(item => {
        return (
          <ListItem
            className={classes.listItem}
            key={item.id}
            role={undefined}
            dense
            button
          >
            <Checkbox
              edge="start"
              checked={item.selected === true}
              tabIndex={-1}
              disableRipple
              indeterminate={item.indeterminate}
              onChange={e => handleToggle(e, item)}
            />
            <ListItemText primary={`${item.name}`} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default HierarchySelectionList;
