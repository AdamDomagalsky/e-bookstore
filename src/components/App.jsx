//React & Redux
import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { alertActions } from '../actions/alerts';
import { getTotal } from '../reducers/';

//Semantic UI
import { Grid, Container } from 'semantic-ui-react';
import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.min.css';

//Components
import LoginPage from './LoginPage/LoginPage';
import { MainMenu } from './Menu/Menu.jsx';
import Home from './Home/Home';
import Book from './Book/Book';
import AdminPanel from './AdminPanel/AdminPanel';
import UserRegistration from './UserRegistration/UserRegistration';
import CartTab from './ShoppingCart/CartTab';
import MyBooks from './BooksCards/MyEbooks';
import NotFound from './NotFound/NotFound';
import Footer from './Footer/Footer';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = { user: {} };
		this.messageHandler = this.messageHandler.bind(this);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.alert.message)
			this.props.dispatch(alertActions.clear());

		this.setState({ user: newProps.user });
	}

	messageHandler(msg) {
		toast(msg);
	};

	render() {
		const { alert, user, cartTotalPrice } = this.props;

        return (
          <div className={'app'}>
              <MainMenu user={user} cartTotalPrice={cartTotalPrice}/>
                <Container>
                {alert.message && this.messageHandler(alert.message) }
                <ToastContainer
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar={true}
                  newestOnTop={true}
                  closeOnClick
                  pauseOnHover
                  />
                <Grid stackable>
                <Switch>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home}/>
                  <Route path='/category/:category' component={Home}/>
                  <Route path={`${process.env.PUBLIC_URL}/cart`} component={CartTab}/>
                  <Route path={`${process.env.PUBLIC_URL}/register`} component={UserRegistration}/>
                  <Route path={`${process.env.PUBLIC_URL}/login`} component={LoginPage}/>
                  <Route path={`${process.env.PUBLIC_URL}/book/:id`} component={Book}/>
                  <PrivateRoute path={`${process.env.PUBLIC_URL}/mybooks`} component={MyBooks}/>
                  <PrivateRoute path={`${process.env.PUBLIC_URL}/admin`} component={AdminPanel} user={this.state.user}/>
                  <Route path="*" component={NotFound} />
                </Switch>
                </Grid>
            </Container>
            <Footer/>
           </div>
        );
    }
};

function mapStateToProps(state) {
	return {
		...state,
		cartTotalPrice: getTotal(state.cart)
	};
}
const connectedApp = connect(mapStateToProps)(App);
export default withRouter(connectedApp);
