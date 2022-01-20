import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import {Link} from 'react-router-dom'
import {FaBars} from 'react-icons/fa';
import {GrClose} from 'react-icons/gr'
export default function SwipeableTemporaryDrawer({authed}) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <Divider />
      <List>
        {['All mail'].map((text, index) => (
          <ListItem button key={text} className="d_flex_between" >
                <div className="navbar_logo" style={{marginRight: '200px'}}>
                    <img src="../../../Images/logo.svg" alt=""/>
                </div>
                <div onClick={toggleDrawer(anchor, false)}>
                  <GrClose />
                </div>
          </ListItem>
        ))}
      </List>
      <List>
        {['All mail'].map((text, index) => (
          <ListItem button key={text}>
            <Link style={{textDecoration: 'none'}} to="/">
              <div style={{fontWeight: '700', fontSize: '24px'}} className="navbar_nav_item" onClick={toggleDrawer(anchor, false)}>Главная</div>
            </Link>
          </ListItem>
        ))}
      </List>
      <List>
        {['All mail'].map((text, index) => (
            <ListItem button key={text}>
              <Link style={{textDecoration: 'none'}} to="/brunches">
                <div style={{fontWeight: '700', fontSize: '24px'}}  className="navbar_nav_item" onClick={toggleDrawer(anchor, false)}>Филиалы</div>
              </Link>
          </ListItem>
        ))}
      </List>
      <List>
        {['All mail'].map((text, index) => (
            <ListItem button key={text}>
              <Link style={{textDecoration: 'none'}} to="/about">
                <div style={{fontWeight: '700', fontSize: '24px'}} className="navbar_nav_item" onClick={toggleDrawer(anchor, false)}>О нас</div>
              </Link>
          </ListItem>
        ))}
      </List>
      <List>
        {['All mail'].map((text, index) => (
            <ListItem button key={text}>
              <Link style={{textDecoration: 'none'}} to="/contact">
                <div style={{fontWeight: '700', fontSize: '24px'}} className="navbar_nav_item" onClick={toggleDrawer(anchor, false)}>Контакты</div>
              </Link>
          </ListItem>
        ))}
      </List>
      {
        authed ?  <List>
        {['All mail'].map((text, index) => (
            <ListItem button key={text}>
              <Link style={{textDecoration: 'none'}} to="/myOrders">
                <div style={{fontWeight: '700', fontSize: '24px'}} className="navbar_nav_item" onClick={toggleDrawer(anchor, false)}>Мои заказы</div>
              </Link>
          </ListItem>
        ))}
      </List> : null
      }
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{<FaBars size="25px" color="rgb(81, 38, 125)" />}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            elevation={16}
            transitionDuration={{enter: 1000, exit: 1000}}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
