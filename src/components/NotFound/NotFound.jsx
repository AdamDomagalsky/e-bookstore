import React from 'react';
import { Header, Container } from 'semantic-ui-react';

//CSS
import './NotFound.css';

const NotFound = () =>
	<Container textAlign='center'>
		<Header as='h1' icon className={404}>
			404 page not found
			<Header.Subheader>
				<p>We are sorry but the page you are looking for does not exist.</p>
			</Header.Subheader>
		</Header>
	</Container>;

export default NotFound;
