//React & Redux
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';


//Semantic UI
import { Menu, Button, Label, Container } from 'semantic-ui-react';

//Components
import Search from './../Search/Search';

//CSS
import './Menu.css';

export const MainMenu = ({ user, cartTotalPrice}) => {
    return (
     <Menu stackable>
     <Container>
        <Menu.Item >
          <Link to={`${process.env.PUBLIC_URL}/`} title={'Home'}>Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={`${process.env.PUBLIC_URL}/cart`} title={'Cart'}>Cart</Link>
          <Label color='red'>{cartTotalPrice}</Label>
        </Menu.Item>
        {
           user.userName ?
              <Menu.Item>
                    <Link to={`${process.env.PUBLIC_URL}/mybooks`} title={'My books'}>My Books</Link>
              </Menu.Item> : null
        }
        {/*Admin Panel */}
        {
             user.roles ? user.roles.includes('Admin') &&
                <Menu.Item>
                      <Link  to={`${process.env.PUBLIC_URL}/admin`} title={'Admin panel'}>Admin panel</Link>
                </Menu.Item> :
                null
        }
        <Menu.Item>
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/`} component={Search} />
          </Switch>
        </Menu.Item>
        <Menu.Menu position='right'>
          {/* User introduction */}
          {
              user.userName ?
                  <Menu.Item>
                        <p>Hello, {user.userName}!</p>
                  </Menu.Item> : null
                  }

          {localStorage.getItem('user') === null &&
          <Menu.Item>
                <Link to={`${process.env.PUBLIC_URL}/register`} title={'register'}>
              <Button primary>
                Sign up!
              </Button>
            </Link>
          </Menu.Item>
          }
          <Menu.Item>
            <Link to={`${process.env.PUBLIC_URL}/login`}>
              <Button>
                {localStorage.getItem('user') ? 'Log out' : 'Log in'}
              </Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
        </Container>
      </Menu>
    );
}
