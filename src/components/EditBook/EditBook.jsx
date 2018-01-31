//React & Redux
import React from 'react';
import { connect } from 'react-redux';

//Semantic UI
import { Form, Modal, Button, Message } from 'semantic-ui-react';

//Components
import { booksActions } from '../../actions/books';

class EditBook  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : true,
            book : this.props.bookInfo,
            submitted: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        const { book } = this.state;
        const { dispatch } = this.props;

        if (book)
            dispatch(booksActions.editBook(book));

        this.close();
    }

    show = dimmer => () => this.setState({ dimmer, open: true })

    close = () =>  {
        this.setState({ open: false });
        this.props.handleModalClose();
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { book } = this.state;

        this.setState({
            book: {...book,[name]: value }
        });
    }

    render() {
        const { open, dimmer,book,submitted } = this.state;
        const { bookInfo } = this.props;

        return (
                <div>
                  <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Edit book information</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Form onSubmit={this.handleSubmit} error>
                          {submitted && !book.title && <Message error header='Book title is required.' />}
                          <Form.Field>
                            <label>Book title</label>
                <input defaultValue={bookInfo.title} name="title" onChange={this.handleChange} required pattern=".*\S+.*" title="This field is required"  />
                          </Form.Field>

                          <Form.Field>
                            <label>Book author</label>
                <input defaultValue={bookInfo.author} name="author" onChange={this.handleChange} requiredrequired pattern=".*\S+.*" title="This field is required" />
                          </Form.Field>

                          <Form.Field>
                            <label>Book description</label>
                            <textarea defaultValue={bookInfo.description} name="description" onChange={this.handleChange} required pattern=".*\S+.*" title="This field is required" ></textarea>
                          </Form.Field>

                          <Form.Field>
                            <label>Book genre</label>
                            <input defaultValue={bookInfo.genre} name="genre" onChange={this.handleChange}  required pattern=".*\S+.*" title="This field is required" />
                          </Form.Field>

                          <Form.Field>
                            <label>Book price</label>
                            <input defaultValue={bookInfo.price} type="number" step="any"  name="price" onChange={this.handleChange}  required pattern=".*\S+.*" title="This field is required" />
                          </Form.Field>

                          <Button type='submit' color='green' >Edit!</Button>
                        </Form>
                      </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='red' onClick={this.close}>
                        Cancel!
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </div>
        );
    }
}

const connectedEditBook = connect()(EditBook);
export default connectedEditBook;
