//React & Redux
import React from 'react';
import CartContainer from './CartContainer';

//Semantic UI
import { Grid } from 'semantic-ui-react';

const CartTab = () => (
    <Grid.Column width={16}>
      <CartContainer />
    </Grid.Column>
);

export default CartTab;
