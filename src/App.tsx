import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Container, Grid, Paper } from '@mui/material';

import { ConsoleProvider } from '@/contexts/ConsoleContext';
import { Console } from '@/components/Console';
import { KeyBoard } from '@/components/KeyBoard';

import './App.css';

const App = () => {
  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 2 }}>
        <Grid id="calculator" container rowSpacing={2}>
          <ConsoleProvider>
            <Grid item xs={12}>
              <Console />
            </Grid>
            <KeyBoard />
          </ConsoleProvider>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
