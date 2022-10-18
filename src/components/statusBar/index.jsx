import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const StatusBar = ({
  theme,
  setThemeHandler,
  language,
  setLanguageHandler,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) =>
    reason !== "backdropClick" && setOpen(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Select Language and Theme</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Language & Theme For Editor</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="language-selection">Language</InputLabel>
              <Select
                labelId="language-dialog-select-label"
                id="language-dialog-select"
                value={language}
                onChange={(event) => setLanguageHandler(event.target.value)}
                input={
                  <OutlinedInput label="Language" id="language-selection" />
                }
              >
                <MenuItem value={"xml"}>xml</MenuItem>
                <MenuItem value={"css"}>css</MenuItem>
                <MenuItem value={"javascript"}>javascript</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="theme-selection">Theme</InputLabel>
              <Select
                labelId="theme-dialog-select-label"
                id="theme-dialog-select"
                value={theme}
                onChange={(event) => setThemeHandler(event.target.value)}
                input={<OutlinedInput label="Theme" id="theme-selection" />}
              >
                <MenuItem value={"dracula"}>dracula</MenuItem>
                <MenuItem value={"material"}>material</MenuItem>
                <MenuItem value={"mdn-like"}>mdn-like</MenuItem>
                <MenuItem value={"the-matrix"}>the-matrix</MenuItem>
                <MenuItem value={"night"}>night</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatusBar;
