"use client";  // Ensure this file is client-side
import { Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';  // Use App Router hooks
import SideNav from './components/SideNav';

const DashboardPage = () => {
  const [isClient, setIsClient] = useState(false); // Track if we are on the client
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  // Extract module from path or search params
  const moduleFromPath = pathname.split('/').pop();
  const moduleFromParams = searchParams.get('module');
  const [selectedModule, setSelectedModule] = useState<string>('dashboard');

  useEffect(() => {
    setIsClient(true);  // Set to true once the component is mounted
    
    // Update the selectedModule if the module changes in the URL
    if (moduleFromPath && moduleFromPath !== 'dashboard') {
      setSelectedModule(moduleFromPath);
    } else if (moduleFromParams) {
      setSelectedModule(moduleFromParams);
    }
  }, [moduleFromPath, moduleFromParams]);

  const renderModuleContent = (module: string) => {
    switch (module) {
      case 'users':
        return <Typography variant="body1">This is the Users section.</Typography>;
      case 'bed':
        return <Typography variant="body1">This is the Bed section.</Typography>;
      case 'inventory':
        return <Typography variant="body1">This is the Inventory section.</Typography>;
      case 'notifications':
        return <Typography variant="body1">This is the Notifications section.</Typography>;
      case 'patients':
        return <Typography variant="body1">This is the Patients section.</Typography>;
      default:
        return <Typography variant="body1">This is the Dashboard section.</Typography>;
    }
  };

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
        {renderModuleContent(selectedModule)}
      </Box>
    </Box>
  );
};

export default DashboardPage;