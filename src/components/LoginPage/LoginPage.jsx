//React & Redux
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions/users';

//Semantic UI
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

//Helpers
import { history } from '../../helpers/history';

//CSS
import './LoginPage.css';


class LoginPage extends React.Component {
    constructor(props) {
	super(props);

	// reset login status
	if(localStorage.getItem('user')){
            history.push(`${process.env.PUBLIC_URL}/`);
	    this.props.dispatch(userActions.logout());
	}

	this.state = {
	    username: '',
	    password: '',
	    submitted: false
	};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
	const { name, value } = e.target;

	this.setState({ [name]: value });
    }

    handleSubmit(e) {
      	const { username, password } = this.state;
	const { dispatch } = this.props;

	e.preventDefault();
	this.setState({ submitted: true });

	if (username && password) {
	    dispatch(userActions.login(username, password));
	}
    }

    render() {
	const { loggingIn } = this.props;
	const { username, password, submitted } = this.state;

	return (
            <div className='login-form'>
                <Grid textAlign='center'>
                <Grid.Column>
                <Header as='h2'  textAlign='center'>
                <Image src='/logo.png' />
                Log-in to your account
            </Header>
                <Form size='large'  onSubmit={this.handleSubmit} error>
                <Segment stacked>
		{submitted && !username && <Message error header='Username is required.' />}
		<Form.Field>
                <label>Username</label>
		<input placeholder='adamkowalski@gmail.com' name='username' onChange={this.handleChange} required pattern=".*\S+.*" title="This field is required"/>
		</Form.Field>

	        {submitted && !password && <Message error header='Password is required.' />}
		<Form.Field>
                <label>Password</label>
		<input  placeholder='password' name='password' type='password' onChange={this.handleChange} required  />
		</Form.Field>

                <Button  fluid size='large'>Login</Button>

		{
                    loggingIn && <p>Loading...</p>
                }
          </Segment>
        </Form>
        <Message>
          New to us? <Link to={`${process.env.PUBLIC_URL}/register`}>Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
	);
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.user;
    return {
	loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export default connectedLoginPage;
