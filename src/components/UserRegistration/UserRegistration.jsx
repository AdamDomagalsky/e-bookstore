//React & Redux
import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../actions/users';
import { Link } from 'react-router-dom';

//Semantic UI
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

class UserRegistration extends React.Component {
    constructor(props) {
	super(props);

	this.state = {
	    user: {
		firstName: '',
		lastName: '',
		password: '',
		passwordRepeated: '',
		email: ''
	    },
	    submitted: false
	};

	this.handleChange = this.handleChange.bind(this);
   	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
	const { name, value } = event.target;
	const { user } = this.state;

	this.setState({
	    user: { ...user, [name]: value }
	});
    }

    isPasswordValid() {
	return this.state.user.passwordRepeated !== this.state.user.password ? false : true;
    }

    handleSubmit(event) {
        const { user } = this.state;
	const { dispatch } = this.props;

	event.preventDefault();

	this.setState({ submitted: true });

	if (user.firstName && user.lastName && user.password && user.email && this.isPasswordValid()) {
	    dispatch(userActions.register(user));
	}
    }

    render() {
	const { user, submitted } = this.state;
	const { registering } = this.props;

	if(localStorage.getItem('user')){
	    return(
		<h1>You are already registered!</h1>
	    )
	}

	return (
           <div className='login-form'>
                <Grid textAlign='center'>
                <Grid.Column>
                <Header as='h2'  textAlign='center'>
                    <Image src='/logo.png' />
                    Registration form
                </Header>

              <Form onSubmit={this.handleSubmit} error size='large'>
              <Segment stacked>
	      {submitted && !user.firstName && <Message error header='First name is required' />}
	      <Form.Field>
		<label>First Name</label>
		<input placeholder='Adam' name='firstName' onChange={this.handleChange}   required pattern=".*\S+.*" title="This field is required"/>
	      </Form.Field>
	      {submitted && !user.lastName && <Message error header='Last name is required' />}

	      <Form.Field>
		<label>Last Name</label>
		<input placeholder='Kowalski' name='lastName' onChange={this.handleChange}   required pattern=".*\S+.*" title="This field is required" />
	      </Form.Field>

	      {submitted && !user.email && <Message error header='Email is required' />}
	      <Form.Field>
		<label>Email (Your future login)</label>
		<input placeholder='adamkowalski@gmail.com' name='email' type="email" onChange={this.handleChange} />
	      </Form.Field>

	      {submitted && !user.password && <Message error header='Password is required' />}

	      <Form.Field>
		<label>Password</label>
		<input placeholder='Password' name='password' type="password" onChange={this.handleChange}   required pattern=".*\S+.*" title="This field is required" />
	      </Form.Field>

	      {!this.isPasswordValid() && <Message error header='Passwords are not indentical.' />}

	      <Form.Field>
		<label>Repeated password</label>
		<input placeholder='Password' name='passwordRepeated' type="password" onChange={this.handleChange}   required pattern=".*\S+.*" title="This field is required"/>
	      </Form.Field>

	      <Button type='submit'>Register!</Button>
              {
                  registering  && <p>Loading...</p>
              }

        </Segment>
        </Form>

        <Message>
         Do you already have an account? <Link to={`${process.env.PUBLIC_URL}/login`}>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
)
}
};


function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
	registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(UserRegistration);
export default connectedRegisterPage;
