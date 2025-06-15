import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Tab, Tabs, Box, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import ImageUpload from './components/ImageUpload';
import Performance from './components/Performance';

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{
                flexGrow: 1,
                fontFamily: 'Times New Roman',
                fontWeight: 'bold',
                color: 'white'
              }}>
                Shree Swaminarayan Gadi
              </Typography>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Box sx={{
              borderBottom: 1,
              borderColor: 'divider',
              mb: 3,
              '& .MuiTab-root': {
                color: 'primary.main',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 'bold'
                }
              }
            }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="navigation tabs"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Image Upload" component={Link} to="/" />
                <Tab label="Performance" component={Link} to="/performance" />
              </Tabs>
            </Box>

            <Routes>
              <Route path="/" element={<ImageUpload />} />
              <Route path="/performance" element={<Performance />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
