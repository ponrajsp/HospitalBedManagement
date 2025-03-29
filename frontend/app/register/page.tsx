"use client";
import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Typography, Box, Container, Paper, Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"; // Default fallback
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    type: "",
  });
  
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    type: "",
  });
  
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    emailId: false,
    password: false,
    confirmPassword: false,
    type: false,
  });
  
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  
  const validate = () => {
    let tempErrors: any = {};
    tempErrors.firstName = /^[A-Za-z]+$/.test(formData.firstName)
      ? ""
      : "Only alphabets allowed";
    tempErrors.lastName = /^[A-Za-z]+$/.test(formData.lastName)
      ? ""
      : "Only alphabets allowed";
    tempErrors.emailId = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      formData.emailId
    )
      ? ""
      : "Invalid email format";
    tempErrors.password =
      formData.password.length >= 6
        ? ""
        : "Password must be at least 6 characters";
    tempErrors.confirmPassword =
      formData.password === formData.confirmPassword ? "" : "Passwords do not match";
    tempErrors.type = formData.type ? "" : "User type is required";
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
  
  const handleSubmit = async () => {
    if (!isValid) return;
    
    setIsSubmitting(true);
    setApiError("");
    
    try {
      // Create the request payload according to the API requirements
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailId: formData.emailId,
        password: formData.password,
        type: formData.type
      };
      
      const response = await fetch(`${apiUrl}api/userRegister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Registration successful:', data);
        setShowSuccess(true);
        
        // Redirect to login page immediately after successful registration
        router.push('/login');
      
      } else {
        console.error('Registration failed:', data);
        setApiError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setApiError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLogin = () => {
    router.push('/login');
  };
  
  return (
    <Container 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2
      }}
      maxWidth="sm"
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 450,
          padding: 4,
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          Register
        </Typography>
        
        {apiError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}
        
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={() => handleBlur("firstName")}
          error={touched.firstName && !!errors.firstName}
          helperText={touched.firstName && errors.firstName}
          fullWidth
          margin="normal"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={() => handleBlur("lastName")}
          error={touched.lastName && !!errors.lastName}
          helperText={touched.lastName && errors.lastName}
          fullWidth
          margin="normal"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="emailId" // Changed to match API parameter
          value={formData.emailId}
          onChange={handleChange}
          onBlur={() => handleBlur("emailId")}
          error={touched.emailId && !!errors.emailId}
          helperText={touched.emailId && errors.emailId}
          fullWidth
          margin="normal"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          fullWidth
          margin="normal"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={() => handleBlur("confirmPassword")}
          error={touched.confirmPassword && !!errors.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          fullWidth
          margin="normal"
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="User Type"
          name="type" // Changed to match API parameter
          value={formData.type}
          onChange={handleChange}
          onBlur={() => handleBlur("type")}
          error={touched.type && !!errors.type}
          helperText={touched.type && errors.type}
          fullWidth
          margin="normal"
          sx={{ mb: 3 }}
        >
          <MenuItem value="doctor">Doctor</MenuItem>
         
          <MenuItem value="provider">Provider</MenuItem>
        </TextField>
        
        <Button
          variant="contained"
          color="primary"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit}
          fullWidth
          sx={{ 
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none'
          }}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
        </Button>
        
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center"
          marginTop={3}
        >
          <Button 
            onClick={handleLogin}
            color="primary"
            sx={{ textTransform: 'none' }}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
      
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Registration successful! Redirecting to login...
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;