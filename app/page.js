"use client";

import MultipleCheckboxes from "@/components/MultipleCheckboxes";
import TableRadio from "@/components/TableRadio";
import ShortAnswer from "@/components/ShortAnswer";

import {
  Typography,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [puzzleType, setPuzzleType] = useState("multipleCheckboxes");

  const handleTypeChange = () => {
    setPuzzleType(event.target.value);
    console.log(puzzleType);
  };

  return (
    <main>
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          m={4}
          sx={{ fontWeight: "bold" }}
        >
          Demo Tipe-tipe Soal UTBK
        </Typography>
        {/* Control Tipe Soal */}
        <Box mb={4}>
          <FormControl>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Pilih Tipe Soal
            </Typography>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={puzzleType}
              onChange={handleTypeChange}
            >
              <FormControlLabel
                value="multipleCheckboxes"
                control={<Radio />}
                label="Multiple Checkboxes"
              />
              <FormControlLabel
                value="tableRadio"
                control={<Radio />}
                label="Table Radio"
              />
              <FormControlLabel
                value="shortAnswer"
                control={<Radio />}
                label="Short Answer"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        {puzzleType === "multipleCheckboxes" && (
          <Box>
            <Typography variant="h4" component="h3" sx={{ fontWeight: "bold" }}>
              Multiple Checkboxes
            </Typography>
            <MultipleCheckboxes />
          </Box>
        )}
        {puzzleType === "tableRadio" && (
          <Box>
            <Typography
              variant="h4"
              component="h3"
              mt={2}
              sx={{ fontWeight: "bold" }}
            >
              Table Radio
            </Typography>
            <TableRadio />
          </Box>
        )}
        {puzzleType === "shortAnswer" && (
          <Box>
            <Typography
              variant="h4"
              component="h3"
              mt={2}
              sx={{ fontWeight: "bold" }}
            >
              Short Answer
            </Typography>
            <ShortAnswer />
          </Box>
        )}
      </Container>
    </main>
  );
}
