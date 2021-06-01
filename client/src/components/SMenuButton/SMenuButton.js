import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React, { useState, useEffect } from "react";
function Sbutton(props) {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [options, setOptions] = useState([props.options]);
  const onMenuSelect = props.onMenuSelect;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelected = (option) => {
    onMenuSelect(option);
    handleClose();
  };

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  return (
    <div>
     
      <Button
        variant="contained"
        id="addButton"
        color="primary"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
       
      >
        {props.children}
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              handleSelected(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default Sbutton;
