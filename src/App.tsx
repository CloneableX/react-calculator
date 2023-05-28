import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import { Button, Container, Grid } from '@mui/material';

const App = () => {
  const keys = [];
  for (let i = 0; i < 12; i++) {
    keys[i] = (
      <Grid item className="key" xs={4}>
        <Button variant="contained">{i}</Button>
      </Grid>
    );
  }

  return (
    <Container maxWidth="xs">
      <div>0</div>
      <Grid id="keyboard" container rowSpacing={2}>
        {...keys}
      </Grid>
    </Container>
  );
};

export default App;
