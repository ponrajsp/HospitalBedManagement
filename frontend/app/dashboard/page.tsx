"use client";  // Ensure this file is client-side
import { Box, Typography, IconButton, Menu, MenuItem, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';  // Use App Router hooks
import SideNav from './components/SideNav';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import Profile Icon

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false); // Track if we are on the client
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();  // Router to navigate to login page
  
  // Extract module from path or search params
  const moduleFromPath = pathname.split('/').pop();
  const moduleFromParams = searchParams.get('module');
  const [selectedModule, setSelectedModule] = useState<string>('dashboard');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For menu anchor element

  useEffect(() => {
    setIsClient(true);  // Set to true once the component is mounted
    
    // Update the selectedModule if the module changes in the URL
    if (moduleFromPath && moduleFromPath !== 'dashboard') {
      setSelectedModule(moduleFromPath);
    } else if (moduleFromParams) {
      setSelectedModule(moduleFromParams);
    }
  }, [moduleFromPath, moduleFromParams]);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    // Add logout logic here if required (e.g., clear local storage, session)
    router.push('/login');  // Redirect to login page
  };

  // Function to render the cards
  const renderDashboardContent = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title="Hospital Bed Availability" />
          <CardContent>
            <Typography variant="h6">Available Beds: 120</Typography>
            <Typography variant="body2">Check real-time bed availability for patients.</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardHeader title="Inventory" />
          <CardContent>
            <Typography variant="h6">Items in Stock: 80</Typography>
            <Typography variant="body2">Check the status of available inventory items.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  if (!isClient) {
    return null;  // Return null during SSR to avoid trying to use router before client-side
  }

  return (
    <Box display="flex">
      <SideNav onSelectModule={setSelectedModule} />
      <Box
        display="flex"
        flexDirection="column"
        padding={3}
        flex={1}
        marginLeft={30}
        bgcolor="background.default"
      >
        <Typography variant="h4">
          {selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1)}
        </Typography>
        {selectedModule === 'dashboard' && renderDashboardContent()}

        {/* Profile Image Icon with Dropdown Menu */}
        <Box
          position="absolute"
          top={16}
          right={16}
          zIndex={10}
        >
          <IconButton onClick={handleProfileClick}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
