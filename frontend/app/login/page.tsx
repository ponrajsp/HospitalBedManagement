'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Box, Typography } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Ensure API URL is set in .env.local

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle input changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setIsEmailValid(validateEmail(email));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    setIsPasswordValid(password.length >= 6);
  };

  // Check if the form is valid
  useEffect(() => {
    setIsFormValid(isEmailValid && isPasswordValid);
  }, [isEmailValid, isPasswordValid]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form reload

    if (!isFormValid) return; // Stop if form is invalid

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        router.push('/dashboard'); // Redirect on success
      } else {
        console.error('Login failed:', data.message);
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={400}
      margin="auto"
      gap={2}
      padding={3}
      border="1px solid #ddd"
      borderRadius={2}
    >
      <Typography variant="h5" align="center">Login</Typography>

      {/* Form Element */}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          error={!isEmailValid && email.length > 0}
          helperText={!isEmailValid && email.length > 0 ? 'Enter a valid email' : ''}
          variant="outlined"
          required
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={handlePasswordChange}
          error={!isPasswordValid && password.length > 0}
          helperText={!isPasswordValid && password.length > 0 ? 'Password must be at least 6 characters' : ''}
          variant="outlined"
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isFormValid}
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
        <Button onClick={handleRegister} color="primary">
          New User? Register
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
