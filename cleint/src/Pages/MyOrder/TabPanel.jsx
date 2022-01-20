import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({title1, title2, tabPanelContent1, tabPanelContent2}) {
 
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box >
      {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
        <Tabs indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example" textColor="secondary">
          <Tab  label={title1} {...a11yProps(0)} />
          <Tab label={title2} {...a11yProps(1)} />
        </Tabs>
      <TabPanel value={value} index={0}>
        {tabPanelContent1()}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {tabPanelContent2()}
      </TabPanel>
    </Box>
  );
}