import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect() {
  const [color, setColor] = React.useState("");

  const handleChange = (event) => {
    setColor(event.target.value);
    document.getElementsByClassName("pet-container")[0].style.backgroundColor =
      event.target.value;
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">BG</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={color}
          label="Color"
          onChange={handleChange}
        >
          <MenuItem value={"#F5BABB"}>Pink</MenuItem>
          <MenuItem value={"#568F87"}>Green</MenuItem>
          <MenuItem value={"#FFE100"}>Mango</MenuItem>
          <MenuItem value={"#e0f7fa"}>Default</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
