"use client";

import {
  Box,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Typography,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";

function MultipleCheckboxes() {
  const [checked, setChecked] = useState({
    check0: false,
    check1: false,
    check2: false,
    check3: false,
    check4: false,
  });

  const [correctAnswer, setCorrectAnswer] = useState({
    check0: true,
    check1: true,
    check2: false,
    check3: false,
    check4: true,
  });

  const [isAnswerCorrect, setIsAnswerCorrect] = useState("Salah");
  const [pertanyaan, setPertanyaan] = useState(
    "Manakah dari binatang di bawah ini yang memiliki kaki 4?"
  );

  const checkIfAnswerCorrect = () => {
    const isCorrect = Object.keys(correctAnswer).every(
      (key) => checked[key] === correctAnswer[key]
    );
    setIsAnswerCorrect(isCorrect ? "Benar" : "Salah");
  };

  const handleChange = (event) => {
    setChecked({
      ...checked,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCorrectChange = (event) => {
    setCorrectAnswer({
      ...correctAnswer,
      [event.target.name]: event.target.checked,
    });
  };

  const [labels, setLabels] = useState({
    label0: "Anjing",
    label1: "Kucing",
    label2: "Ayam",
    label3: "Penguin",
    label4: "Gajah",
  });

  const handleLabelChange = (event) => {
    setLabels({
      ...labels,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    checkIfAnswerCorrect();
  }, [checked, correctAnswer]);

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "15px" }}
        >
          Create Soal
        </Typography>
        <Typography variant="h6">Pertanyaan</Typography>
        <TextField
          label="Enter the question here"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          variant="outlined"
          value={pertanyaan}
          onChange={(event) => setPertanyaan(event.target.value)}
        />
        <Typography variant="h6">Jawaban</Typography>
        <FormGroup>
          {Object.keys(correctAnswer).map((checkKey, index) => {
            const labelKey = `label${index}`;
            return (
              <FormControlLabel
                key={checkKey}
                control={
                  <Checkbox
                    checked={correctAnswer[checkKey]}
                    onChange={handleCorrectChange}
                    name={checkKey}
                  />
                }
                label={
                  <TextField
                    value={labels[labelKey]}
                    onChange={handleLabelChange}
                    name={labelKey}
                    size="small"
                    variant="outlined"
                  />
                }
              />
            );
          })}
        </FormGroup>
      </Box>
      <Box mb={4}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "15px" }}
        >
          Soal
        </Typography>
        <Typography variant="body1">{pertanyaan}</Typography>
        <Box mt={1}>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              {Object.keys(labels).map((labelKey, index) => {
                const checkKey = `check${index}`;
                return (
                  <FormControlLabel
                    key={checkKey}
                    control={
                      <Checkbox
                        checked={checked[checkKey]}
                        onChange={handleChange}
                        name={checkKey}
                      />
                    }
                    label={labels[labelKey]}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>Bisa pilih lebih dari satu</FormHelperText>
          </FormControl>
        </Box>
        <Typography
          variant="body1"
          fontWeight={700}
          mt={2}
          sx={{ color: "darkred" }}
        >
          Jawaban: {isAnswerCorrect}
        </Typography>
      </Box>
    </>
  );
}

export default MultipleCheckboxes;
