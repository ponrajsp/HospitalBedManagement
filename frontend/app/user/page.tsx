
"use client";
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SideNav from '../dashboard/components/SideNav';

export default function UsersPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Box display="flex">
      {/* <SideNav /> */}
      <Box
        display="flex"
        flexDirection="column"
        padding={3}
        flex={1}
        marginLeft={30}
        bgcolor="background.default"
      >
        <Typography variant="h4">Users</Typography>
        <Typography variant="body1" mt={2}>
          This is the Users section.
        </Typography>
      </Box>
    </Box>
  );
}