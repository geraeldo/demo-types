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
  const [puzzleType, setPuzzleType] = useState("tableRadio");

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
              name="radio-buttons-group"
              value={puzzleType}
              onChange={handleTypeChange}
            >
              <FormControlLabel
                value="tableRadio"
                control={<Radio />}
                label="Majemuk Kompleks"
              />
              <FormControlLabel
                value="shortAnswer"
                control={<Radio />}
                label="Isian"
              />
              <FormControlLabel
                value="multipleCheckboxes"
                control={<Radio />}
                label="Multiple Checkboxes (ternyata udah gak dipake)"
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
              Majemuk Kompleks
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
              Isian
            </Typography>
            <ShortAnswer />
          </Box>
        )}
      </Container>
    </main>
  );
}
