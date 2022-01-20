import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate({block}) {
  const [progress, setProgress] = React.useState(0);
  const [disp, setDisp] = React.useState(block)
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  setInterval(() => {
      setDisp('none')
  }, 2000);

  return (
    <Box sx={{ width: '100%' }} style={{display: disp}}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}