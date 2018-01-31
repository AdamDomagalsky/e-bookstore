//React & Redux
import React from 'react';
import { Link } from 'react-router-dom';

//Semantic
import { Card, Icon, Image, Button, Rating } from 'semantic-ui-react';

//helpers
import { staticFilesUrl } from '../../consts/apiUrl.js';

//CSS
import './BookCard.css';

const BookCard = props => {
	let clicked = false;
	return (
		<Card>
			<Link to={`${process.env.PUBLIC_URL}/book/${props.id}`}>
				<Image
					onError={ev => ev.target.src = `${staticFilesUrl}/images/booksImages/stock.jpg`}
					src={staticFilesUrl + props.imagePath}
					centered
				/>
			</Link>
			<Card.Content>
				<div>
					<Rating defaultRating={Math.floor(props.sold * 1597 % 5 + 1)} maxRating={5} disabled />
					({props.sold})
					<br />
					Sold ({props.sold})<Icon name="users" />
				</div>
				<Card.Header>
					<Link to={`${process.env.PUBLIC_URL}/book/${props.id}`}>{props.title.slice(0, 30)}</Link>
				</Card.Header>
				<Card.Meta>
					<span>
						{props.author}
					</span>
				</Card.Meta>
				<Card.Description>
					{/*{props.desc && props.desc.length > 80 ?  props.desc.substring(0,80) + ' ...' : props.desc} */}
				</Card.Description>
			</Card.Content>
			<Button animated onClick={() => {
				if (!clicked) {
					props.onAddToCart(props.id)
					clicked = true
				}
			}}>
				<Button.Content visible>
					<Icon name='usd' />
					{props.price}
				</Button.Content>
				<Button.Content hidden>
					Add to cart!
			</Button.Content>
			</Button>
		</Card>
	)
};

export default BookCard;
