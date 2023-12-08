"use client";

import { Box, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";

function ShortAnswer() {
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("1500");
  const [pertanyaan, setPertanyaan] = useState("Berapa 1450 + 50?");

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
          rows={1}
          fullWidth
          margin="normal"
          variant="outlined"
          value={pertanyaan}
          onChange={(event) => setPertanyaan(event.target.value)}
        />
        <Typography variant="h6">Jawaban</Typography>
        <TextField
          label="Enter the answer here"
          rows={1}
          fullWidth
          margin="normal"
          variant="outlined"
          value={correctAnswer}
          onChange={(event) => setCorrectAnswer(event.target.value)}
        />
      </Box>
      <Box>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "15px", marginTop: "15px" }}
          >
            Soal
          </Typography>
          <Typography variant="body1">{pertanyaan}</Typography>
          <Box my={2}>
            <TextField
              label="Isi jawaban di sini.."
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
            />
          </Box>
          <Typography
            variant="body1"
            fontWeight={700}
            mt={2}
            sx={{ color: "darkred" }}
          >
            Jawaban: {answer === correctAnswer ? "Benar" : "Salah"}
          </Typography>
        </Box>
      </Box>{" "}
    </>
  );
}

export default ShortAnswer;
