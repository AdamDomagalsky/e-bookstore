//React & Redux
import React from 'react';
import { Link } from 'react-router-dom';

//Semantic UI
import { Header, Image, Table, Button } from 'semantic-ui-react';

//Helpers
import { staticFilesUrl } from '../../consts/apiUrl.js';

const Product = ({ id, price, quantity, title, author, srcImage, onRemove }) => (
    <Table.Row>
      <Table.Cell>
        <Header as='h4' image>
          <Image src={staticFilesUrl + srcImage}  size='mini' />
          <Header.Content>
            <Link to={`${process.env.PUBLIC_URL}/book/${id}`}>{title}</Link>
            <Header.Subheader>{author}</Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>
        {price}
      </Table.Cell>
      <Table.Cell>
        <Button onClick={() => onRemove(id)}>Remove</Button>
      </Table.Cell>
    </Table.Row>
);

export default Product;
