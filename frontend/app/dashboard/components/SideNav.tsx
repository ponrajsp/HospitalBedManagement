"use client";
import { Box, List, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SideNavProps {
  onSelectModule: (module: string) => void;
  selectedModule?: string;
}

const SideNav: React.FC<SideNavProps> = ({ onSelectModule, selectedModule: propSelectedModule }) => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine the current module based on the pathname
  const pathModule = pathname === '/' ? 'dashboard' : pathname.split('/').pop() || 'dashboard';
  const [selectedModule, setSelectedModule] = useState<string>(pathModule);

  // Menu items configuration
  const menuItems = [
    { label: 'Dashboard', module: 'dashboard', path: '/' },
    // { label: 'Users', module: 'user', path: '/users' },
    { label: 'Bed', module: 'bed', path: '/bed' },
    { label: 'Inventory', module: 'inventory', path: '/inventory' },
    { label: 'Notifications', module: 'notifications', path: '/notifications' },
    { label: 'Patients', module: 'patients', path: '/patients' }
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update selected module when pathname changes
  useEffect(() => {
    const currentModule = pathname === '/' ? 'dashboard' : pathname.split('/').pop() || 'dashboard';
    setSelectedModule(currentModule);
    onSelectModule(currentModule);
  }, [pathname, onSelectModule]);

  // Handle module selection
  const handleModuleSelect = (module: string, path: string) => {
    setSelectedModule(module);
    onSelectModule(module);
    router.push(path);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: 'primary.main',
        color: 'white',
        paddingTop: 4,
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
        zIndex: 1,
      }}
    >
      <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <List sx={{ padding: 0, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <Box
            key={item.module}
            onClick={() => handleModuleSelect(item.module, item.path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                selectedModule === item.module ? 'secondary.main' : 'transparent',
              '&:hover': {
                backgroundColor: 'secondary.dark',
              },
              marginBottom: 1,
              padding: 1.5,
              borderRadius: 1,
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            <Typography
              sx={{
                fontWeight: selectedModule === item.module ? 'bold' : 'normal',
                color: 'white',
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default SideNav;