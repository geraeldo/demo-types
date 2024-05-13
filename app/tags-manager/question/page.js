"use client";

import React, { useState } from "react";
import {
  Box,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Link,
  Stack,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

function TagManager() {
  const [tags, setTags] = useState([
    { id: 1, name: "logarithm", upvotes: 20 },
    { id: 2, name: "pingkaran", upvotes: 15 },
    { id: 3, name: "trigonometri", upvotes: 10 },
    { id: 3, name: "persamaan kuadrat", upvotes: 10 },
    { id: 3, name: "integral", upvotes: 10 },
  ]);
  const [editTag, setEditTag] = useState(null);
  const [deleteTag, setDeleteTag] = useState(null);
  const [newTag, setNewTag] = useState(null);

  const predefinedTags = [
    "aljabar",
    "geometri",
    "kalkulus",
    "statistika",
    "trigonometri",
  ];

  const handleEditChange = (prop) => (event) => {
    setEditTag({ ...editTag, [prop]: event.target.value });
  };

  const handleNewTagChange = (prop) => (event) => {
    setNewTag({ ...newTag, [prop]: event.target.value });
  };

  const handleOpenNewTagDialog = () => {
    setNewTag({ name: "", upvotes: 0 });
  };

  const handleAddNewTag = () => {
    const newId = Math.max(0, ...tags.map((t) => t.id)) + 1; // Generate a new ID
    const tagToAdd = { ...newTag, id: newId };
    setTags([...tags, tagToAdd]);
    setNewTag({ name: "", upvotes: 0 }); // Reset new tag state
  };

  const openEditDialog = (tag) => {
    setEditTag(tag);
  };

  const openDeleteDialog = (tag) => {
    setDeleteTag(tag);
  };

  const handleDelete = () => {
    setTags(tags.filter((tag) => tag.id !== deleteTag.id));
    setDeleteTag(null);
  };

  const handleEdit = () => {
    const updatedTags = tags.map((tag) =>
      tag.id === editTag.id ? editTag : tag
    );
    setTags(updatedTags);
    setEditTag(null);
  };

  const handleClose = () => {
    setEditTag(null);
    setDeleteTag(null);
    setNewTag(null);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ m: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          <Link href="/tags-manager">Tags Manager</Link> |{" "}
          <Link href="/tags-manager/question">Question Page</Link>
        </Typography>
      </Box>
      <Box
        component="section"
        sx={{ height: 500, mt: 5, mb: 5, p: 2, border: "1px dashed grey" }}
      >
        EDIT SOAL & PEMBAHASAN
      </Box>
      <Stack direction="row" spacing={2} marginBottom={2}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenNewTagDialog}
        >
          Add Tag
        </Button>
      </Stack>

      {tags.map((tag) => (
        <Chip
          key={tag.id}
          label={`${tag.name} (${tag.upvotes})`}
          onDelete={() => openDeleteDialog(tag)}
          deleteIcon={<DeleteIcon />}
          onClick={() => openEditDialog(tag)}
          style={{ marginRight: 8, marginBottom: 8 }}
        />
      ))}

      {/* Add Tag Dialog */}
      <Dialog open={Boolean(newTag)} onClose={handleClose}>
        <DialogTitle>Add New Tag</DialogTitle>
        <DialogContent>
          <Select
            margin="dense"
            label="Name"
            fullWidth
            variant="standard"
            value={newTag?.name}
            onChange={handleNewTagChange("name")}
          >
            {predefinedTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="Upvotes"
            type="number"
            fullWidth
            variant="standard"
            value={newTag?.upvotes}
            onChange={handleNewTagChange("upvotes")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddNewTag}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Tag Dialog */}
      <Dialog open={Boolean(editTag)} onClose={handleClose}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Upvotes"
            type="number"
            fullWidth
            variant="standard"
            value={editTag?.upvotes || ""}
            onChange={handleEditChange("upvotes")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Tag Dialog */}
      <Dialog open={Boolean(deleteTag)} onClose={handleClose}>
        <DialogTitle>Delete Tag</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {deleteTag?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default TagManager;
