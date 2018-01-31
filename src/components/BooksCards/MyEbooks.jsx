import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { rentalsActions } from '../../actions/rentals';

//Semantic UI
import { Header, Image, Table } from 'semantic-ui-react';

//Helpers
import { staticFilesUrl } from '../../consts/apiUrl.js';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';

class MyEbooks extends React.Component {

	componentDidMount() {
		this.getMyBooks();
	}

	getMyBooks() {
		const { dispatch } = this.props;
		dispatch(rentalsActions.getMyBooks());
	}

	onClickBookDownload = (title, id) => {
		rentalsActions.getEpubBook(title, id);
	}

	render() {
		const { mybooks } = this.props;

		return (
			<div>
				<h3>Your books</h3>
				<Table basic='very' celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Book title</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
							<Table.HeaderCell>Download</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{mybooks.mybooks.map(book =>
							<Table.Row key={book.id}>
								<Table.Cell>
									<Header as='h4' image>
										<Image src={staticFilesUrl + book.imagePath} size='mini' />
										<Header.Content>
											<Link to={`${process.env.PUBLIC_URL}/book/${book.bookId}`}>{book.title}</Link>
											<Header.Subheader>{book.author}</Header.Subheader>
										</Header.Content>
									</Header>
								</Table.Cell>
								<Table.Cell>
									{book.price}
								</Table.Cell>
								     <Table.Cell>
								     <Button onClick={() => this.onClickBookDownload(book.title,book.bookId)}>.epub</Button>
                                                                     </Table.Cell>
							</Table.Row>
						)}
					</Table.Body>
				</Table>
			</div>
		);
	}
};

function mapStateToProps(state) {
	const { mybooks } = state;
	return { mybooks };
}

export default connect(mapStateToProps)(MyEbooks);
