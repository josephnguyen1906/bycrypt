"use client";
import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { updatePassword } from "@/services/User.service";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    await updatePassword(currentPassword, newPassword, confirmPassword)
      .then((response: any) => {
        if (response.status === true) {
          toast.success("Password changed successfully!");
        } else {
          toast.error("Failed to change password. Please try again.");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Change login password
      </Typography>
      <Typography variant="caption" color="textSecondary" gutterBottom>
        * Please ensure that the new password is strong enough and different
        from the old password.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Old Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          margin="normal"
          required
          helperText="Please enter the old password"
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
          required
          helperText="Please enter a new password"
        />
        <TextField
          fullWidth
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
          helperText="Please confirm the new password"
        />
        <Button
          type="submit"
          sx={{
            mt: 2,
            backgroundColor: "#000",
            color: "white",
            width: "250px",
            height: "50px",
            borderRadius: "15px",
          }}
        >
          Change Password
        </Button>
      </form>
    </Box>
  );
}
