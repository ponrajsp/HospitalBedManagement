"use client";
import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Typography, Box } from "@mui/material";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    userType: false,
  });

  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    let tempErrors: any = {};
    tempErrors.firstName = /^[A-Za-z]+$/.test(formData.firstName)
      ? ""
      : "Only alphabets allowed";
    tempErrors.lastName = /^[A-Za-z]+$/.test(formData.lastName)
      ? ""
      : "Only alphabets allowed";
    tempErrors.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      formData.email
    )
      ? ""
      : "Invalid email format";
    tempErrors.password =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
        ? ""
        : "At least 8 characters, one number, and one symbol";
    tempErrors.confirmPassword =
      formData.password === formData.confirmPassword ? "" : "Passwords do not match";
    tempErrors.userType = formData.userType ? "" : "User type is required";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validate(); // Validate on blur for the touched field
  };

  useEffect(() => {
    setIsValid(validate()); // Run validation when formData changes
  }, [formData]);

  const handleSubmit = () => {
    if (isValid) {
      console.log("Form Data: ", JSON.stringify(formData, null, 2));
    }
  };

  return (
    <Box display="flex" flexDirection="column" width={400} margin="auto" gap={2}>
      <Typography variant="h5">Register</Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        onBlur={() => handleBlur("firstName")} // Trigger blur handler
        error={touched.firstName && !!errors.firstName} // Show error if touched and has error
        helperText={touched.firstName && errors.firstName} // Show error message if touched
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        onBlur={() => handleBlur("lastName")} // Trigger blur handler
        error={touched.lastName && !!errors.lastName} // Show error if touched and has error
        helperText={touched.lastName && errors.lastName} // Show error message if touched
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        onBlur={() => handleBlur("email")} // Trigger blur handler
        error={touched.email && !!errors.email} // Show error if touched and has error
        helperText={touched.email && errors.email} // Show error message if touched
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        onBlur={() => handleBlur("password")} // Trigger blur handler
        error={touched.password && !!errors.password} // Show error if touched and has error
        helperText={touched.password && errors.password} // Show error message if touched
      />
      <TextField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        onBlur={() => handleBlur("confirmPassword")} // Trigger blur handler
        error={touched.confirmPassword && !!errors.confirmPassword} // Show error if touched and has error
        helperText={touched.confirmPassword && errors.confirmPassword} // Show error message if touched
      />
      <TextField
        select
        label="User Type"
        name="userType"
        value={formData.userType}
        onChange={handleChange}
        onBlur={() => handleBlur("userType")} // Trigger blur handler
        error={touched.userType && !!errors.userType} // Show error if touched and has error
        helperText={touched.userType && errors.userType} // Show error message if touched
      >
        <MenuItem value="provider">Provider</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <Button
        variant="contained"
        color="primary"
        disabled={!isValid}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Register;
