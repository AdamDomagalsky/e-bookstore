//React & Redux
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { booksActions } from '../../actions/books';

//Semantic
import { List } from 'semantic-ui-react';


class CategoryList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dispatch: this.props.dispatch
		};
	}

	componentDidMount() {
		this.state.dispatch(booksActions.getGenres());
	}

	render() {
		const { genres } = this.props;

		return (
			<List divided inverted relaxed >

				{
					genres.map(genre =>
						<List.Item key={genre}>
							<List.Content>
								<Link to={`/category/${genre}`}>{genre.replace('-',' ')}</Link>
							</List.Content>
						</List.Item>
					)
				}
			</List>
		);
	}
};

function mapStateToProps(state) {
	const { genres } = state.books;
	return { genres };
}

export default connect(mapStateToProps)(CategoryList);
