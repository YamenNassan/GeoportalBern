import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";

import backgroundImage from './Aufnahme.jpeg'; // import background image

function LandingPage() {
  const [open, setOpen] = useState(true); // initial state of modal

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: "absolute",
          borderRadius: 12,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWwidth: 350,
          maxHeight: 500,
          height: "100%",
          backgroundImage: `url(${backgroundImage})`, // set background image
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          bcckgroundPosition: "center bottom 50px",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          transition: "top 1s ease-in-out", // add transition to top property
          "&.MuiBox-root.MuiBox-enter": { top: "80%" }, // set final top position on enter
        }}>
          <Typography id="modal-title" variant="h4" component="h2" gutterBottom>
            Willkommen auf meiner Webseite!
          </Typography>
          <Typography id="modal-description" variant="body1" gutterBottom>
            Hier können Sie eine kurze Beschreibung Ihrer Webseite hinzufügen.
          </Typography>
          <Button  variant="text" onClick={handleClose}>Weiter zur Webseite</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default LandingPage;
