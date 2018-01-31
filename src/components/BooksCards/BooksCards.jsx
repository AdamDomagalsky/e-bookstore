//React & Redux
import React from 'react';
import { connect } from 'react-redux';
import { booksActions } from '../../actions/books';
import { cartActions } from '../../actions/cart';
import { store } from '../../helpers/store.js';

//Semantic UI
import { Card } from 'semantic-ui-react';

//Components
import BookCard from './../BookCard/BookCard';

//Pagination
import ReactPaginate from 'react-paginate';

//CSS
import './BooksCards.css';

class BooksCards extends React.Component {

    constructor(props) {
	super(props);

	this.state = {
	    dispatch: this.props.dispatch,
	    paginationPage:  store.getState().books.paginationPage,
            categoryName : this.props.categoryName
	};
        this.state.dispatch(booksActions.saveCategory(this.props.categoryName));
	this.state.dispatch(booksActions.getPaginationPagesNumber());

	this.addToCart = this.addToCart.bind(this);
	this.handlePageClick = this.handlePageClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.categoryName !== this.state.categoryName)
            this.setState({
                categoryName: newProps.categoryName,
                paginationPage: 1
            }, () => {
                this.state.dispatch(booksActions.savePaginationPage(1));
                this.state.dispatch(booksActions.saveCategory(newProps.categoryName));
                this.state.dispatch(booksActions.getPaginationPagesNumber());
                this.state.dispatch(booksActions.getBooks(1));
            });
    }


    componentDidMount() {
	this.getBooks(this.state.paginationPage);
    }

    getBooks(pageNumber) {
	this.state.dispatch(booksActions.getBooks(pageNumber));
    }

    handlePageClick(data) {
	const pageNumber = data.selected + 1;

	this.setState({ paginationPage: pageNumber }, () => {
	    this.getBooks(this.state.paginationPage);
	});
    };

    componentWillUnmount(){
        this.state.dispatch(booksActions.savePaginationPage(this.state.paginationPage));
    }

    addToCart(bookId){
        this.state.dispatch(cartActions.addBookToCart(bookId));
    }


    render() {
	const { books, pagesNumber } = this.props;

	if (books) {
	    return (
		<div>
		    <Card.Group stackable itemsPerRow={5}>
		    {books.map(book =>
			       <BookCard
				    key={book.bookId}
				    imagePath={book.imagePath}
				    id={book.bookId}
				    title={book.title}
				    author={book.author}
				    desc={book.description}
			        price={book.price}
					sold={book.sold}
                    onAddToCart={this.addToCart}
				     />
			      )}
		</Card.Group>
		    <ReactPaginate
                forcePage={this.state.paginationPage -1 }
		previousLabel={"prev"}
		nextLabel={"next"}
		breakClassName={"item break-me"}
		pageCount={pagesNumber}
		marginPagesDisplayed={2}
		pageRangeDisplayed={3}
		onPageChange={this.handlePageClick}
		containerClassName={"ui pagination menu stackable"}
		subContainerClassName={"pages"}
		activeClassName={"active"}
		pageClassName={"item"}
		pageLinkClassName={"item"}
		previousClassName={"item"}
		previousLinkClassName={"item prev"}
		nextClassName={"item"}
		nextLinkClassName={"item next"}
		    />
	            </div>
	);
	} else {
	    return <p>Loading...</p>;
	}
    }
};

function mapStateToProps(state) {
	const { books, pagesNumber } = state.books;
	return { books, pagesNumber };
}

export default connect(mapStateToProps)(BooksCards);
