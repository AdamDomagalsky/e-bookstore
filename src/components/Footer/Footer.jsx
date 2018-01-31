import React from 'react';
import { Header, Container, Grid, List, Segment } from 'semantic-ui-react';

import './Footer.css';

const Footer = () =>
<div>
      <Segment inverted >
          <Container  className={'footer'}>

			<Grid divided inverted stackable>
				<Grid.Row>
					<Grid.Column width={3}>
						<Header inverted as='h4' content='About' />
						<List link inverted>
							<List.Item>Ebook store</List.Item>
							<List.Item>Poznań</List.Item>
							<List.Item>Umultowska 87</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column width={3}>
						<Header inverted as='h4' content='Connect with us' />
						<List link inverted>
							<List.Item as='a'>Facebook</List.Item>
							<List.Item as='a'>Twitter</List.Item>
							<List.Item as='a'>Instagram</List.Item>
						</List>
					</Grid.Column>
					<Grid.Column width={7}>
						<Header as='h4' inverted>John Green, The Fault in Our Stars</Header>
						<p>“Sometimes, you read a book and it fills you with this weird evangelical zeal, and you become convinced that the shattered world will never be put back together unless and until all living humans read the book.” </p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Container>
      </Segment>
      </div>
;


export default Footer;
