import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DataTable from './components/DataTable';
import { headColumns, documents1, documents2 } from './MocData/mocData';
import { Box, Button } from '@mui/material';





function App() {
  
  const [rows, setRows] = useState(documents1);
  const [currentDoc, setDoc] = useState('documents 1');
  const handleChangeRows = (docNum: number) => {
    if(docNum == 2) {
      setRows(documents2);
      setDoc('documents 2');
      return;
    } 

    setRows(documents1);
    setDoc('documents 1');
  }
  return (
    <div className="App">
      <Box className='control-btns'>
        <Button variant="contained" onClick={() => handleChangeRows(1)}>Documents 1</Button>
        <Button variant="contained" onClick={() => handleChangeRows(2)}>Documents 2</Button>
      </Box>
      <DataTable rows={rows} columns={headColumns} currentDoc={currentDoc} />
      
    </div>
  );
}

export default App;
