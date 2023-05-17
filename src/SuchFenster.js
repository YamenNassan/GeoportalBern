import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton, InputAdornment, TextField, AppBar } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

function SuchFenster() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };

  return (
    <AppBar
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10px',
        zIndex: 1,
        backgroundColor: 'transparent',
        boxShadow: 'none'
      }}
    >
      <Autocomplete
        freeSolo
        value={searchValue}
        onChange={handleSearchChange}
        options={[] /* Replace with your search options */}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="large">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                width: '400px',
                backgroundColor: 'white',
                borderRadius: '12px',
                border: '1px solid white',
              },
            }}
          />
        )}
      />
    </AppBar>
  );
}

export default SuchFenster;
