//React & Redux
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

//Semantic UI
import { Button, Icon, Grid, Header } from 'semantic-ui-react';

//Components
import CreateBook from './../CreateBook/CreateBook';
import Search from './../Search/Search';

class AdminPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showCreateBookModal: false,
			searchField: false
		};

		this.onCreateBookButtonClick = this.onCreateBookButtonClick.bind(this);
	}

	onCreateBookButtonClick = () => {
		this.setState({ showCreateBookModal: !this.state.showCreateBookModal });
	}

	onCreateBookModalClose = () => {
		this.setState({ showCreateBookModal: false });
	}

	onDeleteButtonClick = () => {
		this.setState({ searchField: true});
	}


	render() {
		const { showCreateBookModal, searchField } = this.state;
		return (
			<Grid centered>
				<Grid.Row>
					<Grid.Column width={16} >
						<Header as='h2' icon centered>
							<Icon name='settings' />
							Admin Panel
							<Header.Subheader>
								Manage your store!
							</Header.Subheader>
						</Header>

					</Grid.Column>
					<Grid.Column width={16}>
						<Button primary onClick={this.onCreateBookButtonClick} key={1}>Add book!</Button>
						{
							showCreateBookModal ? <CreateBook handleModalClose={this.onCreateBookModalClose} /> : null
						}

					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}


function mapStateToProps(state) {
	return { ...state.books };
}

export default connect(mapStateToProps)(AdminPanel);
