import React from 'react';
import BooksCards from './../BooksCards/BooksCards';

import { Switch, Route } from 'react-router-dom';

//Semantic UI
import { Segment, Grid } from 'semantic-ui-react';

import  CategoryList from '../Category/CategoryList';

const Home = props => {
    const category = props.match.params.category ? props.match.params.category : null;

    return (
            <Grid.Row>
            <Grid.Column  width={3}>
            <Segment  inverted>
            <CategoryList />
            </Segment>
            </Grid.Column>
            <Grid.Column width={13} relaxed>
            <Switch>
            <Segment basic>
            <Route path='/' render={() => <BooksCards categoryName={category} paginationPage={1} />} />
            </Segment>
            </Switch>
            </Grid.Column>
            </Grid.Row>
    );

};

export default Home;
