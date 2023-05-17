import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import html2canvas from 'html2canvas';
import {saveAs} from 'file-saver';
import './App.css';


function BasicSpeedDial() {
  const handleSave = () => {
    const mapContainer = document.getElementById('map');
      html2canvas(mapContainer).then(function(canvas) {
        canvas.toBlob (function(blob) {
        saveAs(canvas.toDataURL('image/png'), 'print.png');
      });
    });  
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // HTML-Element, das die Karte enthält, auswählen
    const mapContainer = document.getElementById('map');
  
    // Karte als Bilddatei exportieren
    html2canvas(mapContainer).then(function(canvas) {
      canvas.toBlob(function(blob) {
        // Anhang für die Mail erstellen
        const attachment = new File([blob], 'map.png', { type: 'image/png' });
  
        // Mail-Link mit Anhang erstellen
        const email = 'empfaenger@example.com';
        const subject = 'Karte teilen';
        const body = 'Hallo,\n\nich möchte diese Karte mit dir teilen:';
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
        // Mail-Link anklicken, um das Standard-Mailprogramm zu öffnen
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.download = attachment.name;
        link.click();
      });
    });
  };

  const actions = [
    { icon: <SaveIcon />, name: 'Save', action: handleSave },
    { icon: <PrintIcon />, name: 'Print', action: handlePrint },
    { icon: <ShareIcon />, name: 'Share', action: handleShare},
  ];

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ paddingRight:'340px',paddingBottom: '1px', position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}


export default BasicSpeedDial;