"use client";

import React, { useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Radio,
  Typography,
  TextField,
} from "@mui/material";

function TableRadio() {
  const [selectedValues, setSelectedValues] = useState({});
  const [correctSelectedValues, setCorrectSelectedValues] = useState({
    1: "Benar",
    2: "Benar",
    3: "Salah",
    4: "Benar",
    5: "Salah",
  });

  const [firstTableHeadName, setFirstTableHeadName] = useState("Pernyataan");
  const [secondTableHeadName, setSecondTableHeadName] = useState("Benar");
  const [thirdTableHeadName, setThirdTableHeadName] = useState("Salah");

  const handleChange = (event, rowId) => {
    setSelectedValues({
      ...selectedValues,
      [rowId]: event.target.value,
    });
  };

  const handleCorrectChange = (event, rowId) => {
    setCorrectSelectedValues({
      ...correctSelectedValues,
      [rowId]: event.target.value,
    });

    console.log(correctSelectedValues);
  };

  const handleStatementChange = (event, rowId) => {
    const newRows = rows.map((row) => {
      if (row.id === rowId) {
        return { ...row, statement: event.target.value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleFirstTableHeadNameChange = (event) => {
    setFirstTableHeadName(event.target.value);
  };
  const handleSecondTableHeadNameChange = (event) => {
    setSecondTableHeadName(event.target.value);
  };
  const handleThirdTableHeadNameChange = (event) => {
    setThirdTableHeadName(event.target.value);
  };

  const [rows, setRows] = useState([
    { id: "1", statement: "Kucing adalah mamalia" },
    { id: "2", statement: "Anjing adalah mamalia" },
    { id: "3", statement: "Ikan mas adalah mamalia" },
    { id: "4", statement: "Manusia adalah mamalia" },
    { id: "5", statement: "Burung hantu adalah mamalia" },
  ]);

  const checkAnswers = () => {
    return Object.keys(correctSelectedValues).every(
      (key) => selectedValues[key] === correctSelectedValues[key]
    );
  };

  const allAnswersCorrect = checkAnswers();

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "15px" }}
        >
          Create Soal
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "60%" }}>
                  <TextField
                    value={firstTableHeadName}
                    onChange={(event) => handleFirstTableHeadNameChange(event)}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  <TextField
                    value={secondTableHeadName}
                    onChange={(event) => handleSecondTableHeadNameChange(event)}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  <TextField
                    value={thirdTableHeadName}
                    onChange={(event) => handleThirdTableHeadNameChange(event)}
                    variant="outlined"
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <TextField
                      value={row.statement}
                      onChange={(event) => handleStatementChange(event, row.id)}
                      variant="outlined"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Radio
                      checked={correctSelectedValues[row.id] === "Benar"}
                      onChange={(event) => handleCorrectChange(event, row.id)}
                      value="Benar"
                      name={`radio-buttons-group-${row.id}`}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Radio
                      checked={correctSelectedValues[row.id] === "Salah"}
                      onChange={(event) => handleCorrectChange(event, row.id)}
                      value="Salah"
                      name={`radio-buttons-group-${row.id}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "15px", marginTop: "15px" }}
        >
          Soal
        </Typography>
        <Typography variant="body1">
          Tentukan benar atau salah dari pernyataan di bawah ini.
        </Typography>
        <Box mt={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", width: "60%" }}>
                    {firstTableHeadName}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {secondTableHeadName}
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {thirdTableHeadName}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.statement}
                    </TableCell>
                    <TableCell align="right">
                      <Radio
                        checked={selectedValues[row.id] === "Benar"}
                        onChange={(event) => handleChange(event, row.id)}
                        value="Benar"
                        name={`radio-buttons-group-${row.id}`}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Radio
                        checked={selectedValues[row.id] === "Salah"}
                        onChange={(event) => handleChange(event, row.id)}
                        value="Salah"
                        name={`radio-buttons-group-${row.id}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Typography
          variant="body1"
          fontWeight={700}
          mt={2}
          sx={{ color: "darkred", marginBottom: "20px" }}
        >
          Jawaban:
          {allAnswersCorrect ? " Benar" : " Salah"}
        </Typography>
      </Box>{" "}
    </>
  );
}

export default TableRadio;
