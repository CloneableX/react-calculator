import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';

const App = () => {
  const keys = [];
  for (let i = 0; i < 12; i++) {
    keys[i] = (
      <Grid item className="key" xs={4} component={Button}>
        {i}
      </Grid>
    );
  }

  return (
    <Container maxWidth="xs">
      <Paper sx={{ p: 2 }}>
        <Grid id="keyboard" container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="right">
              0
            </Typography>
          </Grid>
          {...keys}
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;
