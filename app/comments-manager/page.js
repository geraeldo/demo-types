"use client";

import React, { useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Box,
  Chip,
  Switch,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";

const dummyComments = [
  {
    id: 1,
    time: "2023-05-12 10:30:00",
    username: "user1",
    comment: "This is a great app!",
    status: "Approved",
  },
  {
    id: 2,
    time: "2023-05-11 14:45:00",
    username: "user2",
    comment: "I have a suggestion to improve the user interface.",
    status: "Approved",
  },
  {
    id: 3,
    time: "2023-05-10 08:15:00",
    username: "user3",
    comment: "This comment violates the rules.",
    status: "Quarantined",
  },
  {
    id: 4,
    time: "2023-05-09 16:20:00",
    username: "user4",
    comment: "I really appreciate the effort put into this app.",
    status: "Approved",
  },
  {
    id: 5,
    time: "2023-05-08 11:35:00",
    username: "user5",
    comment: "I encountered a bug while using the app.",
    status: "Approved",
  },
  {
    id: 6,
    time: "2023-05-07 19:45:00",
    username: "user6",
    comment: "This is an inappropriate comment.",
    status: "Quarantined",
  },
  {
    id: 7,
    time: "2023-05-06 09:10:00",
    username: "user7",
    comment: "The app needs more features to be truly useful.",
    status: "Approved",
  },
  {
    id: 8,
    time: "2023-05-05 13:25:00",
    username: "user8",
    comment: "I'm having trouble with the installation process.",
    status: "Approved",
  },
  {
    id: 9,
    time: "2023-05-04 17:40:00",
    username: "user9",
    comment: "This comment contains offensive language.",
    status: "Quarantined",
  },
  {
    id: 10,
    time: "2023-05-03 21:55:00",
    username: "user10",
    comment: "The app is running smoothly on my device.",
    status: "Approved",
  },
];

const CommentManager = () => {
  const [comments, setComments] = useState(dummyComments);
  const [editComment, setEditComment] = useState(null);
  const [deleteComment, setDeleteComment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All Statuses");
  const [filterUsername, setFilterUsername] = useState("");

  const handleEditComment = (comment) => {
    setEditComment(comment);
  };

  const handleSaveComment = () => {
    const updatedComments = comments.map((c) =>
      c.id === editComment.id ? editComment : c
    );
    setComments(updatedComments);
    setEditComment(null);
  };

  const handleDeleteComment = (comment) => {
    setDeleteComment(comment);
  };

  const handleConfirmDelete = () => {
    const updatedComments = comments.filter((c) => c.id !== deleteComment.id);
    setComments(updatedComments);
    setDeleteComment(null);
  };

  const handleToggleStatus = (comment) => {
    const updatedComment = {
      ...comment,
      status: comment.status === "Approved" ? "Quarantined" : "Approved",
    };
    const updatedComments = comments.map((c) =>
      c.id === updatedComment.id ? updatedComment : c
    );
    setComments(updatedComments);
  };

  const filteredComments = comments.filter(
    (comment) =>
      (filterStatus === "All Statuses" || comment.status === filterStatus) &&
      (filterUsername === "" ||
        comment.username.toLowerCase().includes(filterUsername.toLowerCase()))
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ marginRight: 2 }}
        >
          <MenuItem value="All Statuses">All Statuses</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Quarantined">Quarantined</MenuItem>
        </Select>
        <TextField
          label="Filter by Username"
          value={filterUsername}
          onChange={(e) => setFilterUsername(e.target.value)}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>{comment.time}</TableCell>
                <TableCell>{comment.username}</TableCell>
                <TableCell>{comment.comment}</TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={comment.status === "Approved"}
                        onChange={() => handleToggleStatus(comment)}
                      />
                    }
                    label={comment.status}
                  />
                </TableCell>
                <TableCell>
                  <LinkIcon sx={{ marginRight: 1 }} />
                  <EditIcon
                    sx={{ marginRight: 1, cursor: "pointer" }}
                    onClick={() => handleEditComment(comment)}
                  />
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDeleteComment(comment)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Comment Dialog */}
      <Dialog open={!!editComment} onClose={() => setEditComment(null)}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            value={editComment?.comment || ""}
            onChange={(e) =>
              setEditComment({ ...editComment, comment: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditComment(null)}>Cancel</Button>
          <Button onClick={handleSaveComment}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Comment Dialog */}
      <Dialog open={!!deleteComment} onClose={() => setDeleteComment(null)}>
        <DialogTitle>Delete Comment</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this comment?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteComment(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CommentManager;
