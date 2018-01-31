//React & Redux
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Semantic UI
import { Search } from 'semantic-ui-react';

//Helpers
import { apiUrl } from '../../consts/apiUrl.js';

export default class SearchBooks extends Component {
  componentWillMount() {
      this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {

        this.setState({ isLoading: true, value });

        fetch(apiUrl + '/books' )
            .then(res => res.json())
            .then(booksArray => {
                const re = new RegExp(this.state.value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
                const isMatch = result => re.test(result.title);

                this.setState({
                    isLoading: false,
                    results: booksArray.filter(x => isMatch(x))
                });
            });
  }

  resultRenderer = ({ title,bookId }) => <Link to={`${process.env.PUBLIC_URL}/book/${bookId}`}>{title}</Link>

  render() {
      const { isLoading, value, results } = this.state;
      return (
          <div>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={this.handleSearchChange}
                  results={results}
                  value={value}
                  resultRenderer={this.resultRenderer}
                  />
          </div>
      );
  }
};
