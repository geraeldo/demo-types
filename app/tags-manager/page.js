"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Select,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Link from "next/link";

export default function TagsManager() {
  const [subtest, setSubtest] = useState("PU"); // Assuming "PU" is a default valid subtest
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([
    { name: "algebra" },
    { name: "geometry" },
    { name: "logaritma" },
    { name: "integral" },
  ]);
  const [editTagData, setEditTagData] = useState({ index: -1, name: "" });
  const [deleteTagIndex, setDeleteTagIndex] = useState(-1);

  const addTag = () => {
    if (newTag !== "") {
      const newTagsList = [...tags, { name: newTag }];
      setTags(newTagsList);
      setNewTag(""); // Clear the TextField after adding the tag
    }
  };

  // Handlers for modals:
  const openEditModal = (index) => {
    setEditTagData({ index, name: tags[index].name });
  };

  const closeEditModal = () => {
    setEditTagData({ index: -1, name: "" });
  };

  const saveEditTag = () => {
    if (editTagData.index !== -1) {
      const newTags = [...tags];
      newTags[editTagData.index].name = editTagData.name;
      setTags(newTags);
    }
    closeEditModal();
  };

  const openDeleteModal = (index) => {
    setDeleteTagIndex(index);
  };

  const closeDeleteModal = () => {
    setDeleteTagIndex(-1);
  };

  const confirmDeleteTag = () => {
    const newTags = tags.filter((_, i) => i !== deleteTagIndex);
    setTags(newTags);
    closeDeleteModal();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ m: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          <Link href="/tags-manager">Tags Manager</Link> |{" "}
          <Link href="/tags-manager/question">Question Page</Link>
        </Typography>
      </Box>
      <Select
        value={subtest}
        onChange={(e) => setSubtest(e.target.value)}
        fullWidth
      >
        <MenuItem value="PU">Penalaran Umum</MenuItem>
        <MenuItem value="PK">Kemampuan Kuantitatif</MenuItem>
        <MenuItem value="PPU">Pengetahuan dan Pemahaman Umum</MenuItem>
        <MenuItem value="KMBM">Kemampuan Memahami Bacaan dan Menulis</MenuItem>
        <MenuItem value="LitBing">Literasi Bahasa Inggris</MenuItem>
        <MenuItem value="LitBind">Literasi Bahasa Indonesia</MenuItem>
        <MenuItem value="PenMat">Penalaran Matematika</MenuItem>
      </Select>

      <TextField
        label="New tag name..."
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button variant="contained" onClick={addTag}>
        Add Tag
      </Button>
      <TableContainer sx={{ mt: 4 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: "#757575", color: "#fff" }}>
                Tag Name
              </TableCell>
              <TableCell sx={{ bgcolor: "#757575", color: "#fff" }}>
                Jumlah Soal
              </TableCell>
              <TableCell sx={{ bgcolor: "#757575", color: "#fff" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag, index) => (
              <TableRow key={index}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>
                  <Tooltip title="Link to Master Admin">
                    <Link href="#">28</Link>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Edit
                    onClick={() => openEditModal(index)}
                    style={{ cursor: "pointer", marginRight: 10 }}
                  />
                  <Delete
                    onClick={() => openDeleteModal(index)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={editTagData.index !== -1} onClose={closeEditModal}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tag Name"
            type="text"
            fullWidth
            value={editTagData.name}
            onChange={(e) =>
              setEditTagData({ ...editTagData, name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button onClick={saveEditTag}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteTagIndex !== -1} onClose={closeDeleteModal}>
        <DialogTitle>Delete Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this tag?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button onClick={confirmDeleteTag} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
