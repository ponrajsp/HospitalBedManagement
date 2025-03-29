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
    setIsPasswordValid(password.length >= 6); // example: password should be at least 6 characters
  };

  // Check if the form is valid
  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isEmailValid, isPasswordValid]);

  const handleLogin = () => {
    // Handle login logic here, e.g., making API requests
    console.log('Logging in...');
  };

  const handleRegister = () => {
    // Navigate to register page
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

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={handleEmailChange}
        error={!isEmailValid && email.length > 0}
        helperText={!isEmailValid && email.length > 0 ? 'Enter a valid email' : ''}
        variant="outlined"
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
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        disabled={!isFormValid}
      >
        Login
      </Button>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={2}>
        <Button onClick={handleRegister} color="primary">
          New User? Register
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
