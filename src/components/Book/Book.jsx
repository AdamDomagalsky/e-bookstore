//React & Redux
import React from 'react';
import { connect } from 'react-redux';
import { booksActions } from '../../actions/books';
import { cartActions } from '../../actions/cart';

//Semantic UI
import { Button, Icon, Grid, Item, Confirm } from 'semantic-ui-react';

//Components
import EditBook from '../EditBook/EditBook';

//Helpers
import { staticFilesUrl } from '../../consts/apiUrl.js';

class Book extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			book: this.props.book,
			bookId: this.props.match.params.id,
			userRoles: [],
			showEditModal: false,
			showRemoveConfirmation: false,
			dispatch: this.props.dispatch,
			clicked: false
		};

		this.onEditButtonClick = this.onEditButtonClick.bind(this);
		this.onRemoveBookCancel = this.onRemoveBookCancel.bind(this);
		this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
		this.onBookDelete = this.onBookDelete.bind(this);
		this.addToCart = this.addToCart.bind(this);
	}

	onEditButtonClick = () => {
		this.setState({ showEditModal: !this.state.showEditModal });
	}

	onDeleteButtonClick = () => {
		this.setState({ showRemoveConfirmation: !this.state.showRemoveConfirmation });
	}

	onRemoveBookCancel = () => {
		this.setState({ showRemoveConfirmation: false });
	}

	onBookDelete() {
		this.state.dispatch(booksActions.deleteBook(this.state.bookId));
	}

	onEditModalClose = () => {
		this.setState({ showEditModal: false });
	}

	componentWillReceiveProps(newProps) {
		if (newProps.match.params.id !== this.state.bookId)
			this.setState({ bookId: newProps.match.params.id }, () => this.getBook());

		if (newProps.userName) {
			this.setState({ userRoles: newProps.roles });
		}
	}

	componentDidMount() {
		this.getBook();
	}

	getBook() {
		this.state.dispatch(booksActions.getBook(this.state.bookId));
	}

	addToCart() {
		this.state.dispatch(cartActions.addBookToCart(this.state.bookId));
	}

	render() {
		const { userRoles, showEditModal, showRemoveConfirmation } = this.state;
		const buttonWrapperClasses = `ui centered card`;
		const { book, status } = this.props;

		if (status === 'done') {
			return (
				<Grid stackable>
					<Grid.Row >
						<Grid.Column width={13} >
							<Item.Group>
								<Item>
									<Item.Image
										size='medium'
										src={staticFilesUrl + book.imagePath}
										onError={ev => ev.target.src = `${staticFilesUrl}/images/booksImages/stock.jpg`}
									/>
									<Item.Content>
										<Item.Header>
											{book.title}
										</Item.Header>
										<Item.Meta>Author: {book.author}</Item.Meta>
										<Item.Description>
											{book.description}
										</Item.Description>
										<Item.Extra>Price: {book.price}</Item.Extra>
										<Item.Extra>
											<Button color='facebook'>
												<Icon name='facebook' /> Facebook
						</Button>
											<Button color='twitter'>
												<Icon name='twitter' /> Twitter
						</Button>
										</Item.Extra>
									</Item.Content>
								</Item>
							</Item.Group>

						</Grid.Column>
						<Grid.Column width={3}>
							<div className={buttonWrapperClasses}>
								<Button className={'buy'} animated='vertical' onClick={() => {
									if (!this.state.clicked) {
										this.addToCart(book.bookId)
										this.state.clicked = true
									}
								}}>
									<Button.Content hidden>Shop</Button.Content>
									<Button.Content visible >
										<Icon name='shop' />
										Buy now!
					  </Button.Content>
								</Button>
								{
									userRoles.includes('Admin') &&
									[<Button className={'edit'} primary onClick={this.onEditButtonClick} key={1}>Edit</Button>,
									<Button className={'delete'} onClick={this.onDeleteButtonClick} key={2}>Remove</Button>]
								}
								{
									showEditModal ? <EditBook handleModalClose={this.onEditModalClose} bookInfo={book} /> : null
								}
								{
									showRemoveConfirmation ? <Confirm
										open={true}
										onCancel={this.onRemoveBookCancel}
										onConfirm={this.onBookDelete}
									/>
										: null
								}
							</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			);
		} else {
			return <p>Loading...</p>;
		}
	}
}


function mapStateToProps(state) {
	return { ...state.books, ...state.user };
}

export default connect(mapStateToProps)(Book);
