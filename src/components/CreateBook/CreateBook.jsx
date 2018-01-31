//React & Redux
import React from 'react';
import { connect } from 'react-redux';

//Semantic UI
import { Form, Modal, Button, Message } from 'semantic-ui-react';

//Components
import { booksActions } from '../../actions/books';

class CreateBook  extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dispatch : this.props.dispatch,
            open : true,
            submitted: false,
            book : {},
            image : null
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.state.dispatch(booksActions.getGenres());
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        const { book, image, ebook } = this.state;
        const { dispatch } = this.props;

        const form = new FormData();

        if(image)
            form.append("Image", image);

        if(ebook)
            form.append("Ebook", ebook);

        for (let key in book )
            form.append(key, book[key]);

        if(book)
            dispatch(booksActions.addBook(form));

        this.close();
    }

    show = dimmer => () => this.setState({ dimmer, open: true })

    close = () =>  {
        this.setState({ open: false });
        this.props.handleModalClose();
    }

    handleChange(e) {
        let { name, value } = e.target;
        const { book } = this.state;

        value = name === 'price' ? parseFloat(value) : value;

        if(name === 'Image'){
            const files = e.target.files;
            this.setState({image : files[0]});
        }
        else if(name === 'Ebook'){
            const files = e.target.files;
            this.setState({ebook : files[0]});
        } else{

            this.setState({
                book: {...book,[name]: value }
            });

        }
    }
1
    render() {
        const { open, dimmer,book,submitted } = this.state;
        const { genres } = this.props;

        return (
                <div>
                  <Modal dimmer={dimmer} open={open} onClose={this.close}>
                    <Modal.Header>Fill in the form below.</Modal.Header>
                    <Modal.Content>
                      <Modal.Description>
                        <Form onSubmit={this.handleSubmit} error>
                          {submitted && !book.title && <Message error header='Book title is required.' />}
                          <Form.Field>
                            <label>Book title</label>
                            <input  name="Title" onChange={this.handleChange}  required pattern=".*\S+.*" title="This field is required"/>
                          </Form.Field>

                          {submitted && !book.author && <Message error header='Book author is required.' />}
                          <Form.Field>
                            <label>Book author</label>
                            <input name="Author" onChange={this.handleChange}  required pattern=".*\S+.*" title="This field is required" />
                          </Form.Field>

                          {submitted && !book.description && <Message error header='Book description is  required pattern=".*\S+.*" title="This field is required".' />}
                          <Form.Field>
                            <label>Book description</label>
                            <textarea  name="Description" onChange={this.handleChange}  required pattern=".*\S+.*" title="This field is required" >
                            </textarea>
                          </Form.Field>

                          {submitted && !book.genre && <Message error header='Book genre is  required pattern=".*\S+.*" title="This field is required".' />}
                          <Form.Field>
                            <label>Book genre</label>
                            <input list='genres' name="Genre" onChange={this.handleChange}   required pattern=".*\S+.*" title="This field is required" />
                          </Form.Field>

                          <datalist id='genres'>
                            { genres.map((item,i) => <option key={i} value={item} />)}
                          </datalist>

                          {submitted && !book.price && <Message error header='Book price is  required pattern=".*\S+.*" title="This field is required".' />}
                          <Form.Field>
                            <label>Book price</label>
                            <input type="number" step="any" min="0" name="Price" onChange={this.handleChange}   required pattern=".*\S+.*" title="This field is required" />
                          </Form.Field>

                          <Form.Field>
                            <label>Book image</label>
                            <input type="file"   name="Image" onChange={this.handleChange}   />
                          </Form.Field>

                          <Form.Field>
                            <label>Ebook file</label>
                            <input type="file"   name="Ebook" onChange={this.handleChange}   accept=".mobi,.epub,pdf"  />
                          </Form.Field>

                          <Button type='submit' color='green' >Add book!</Button>
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
};


function mapStateToProps(state) {
    return { ...state.books };
}

const connectedCreateBook = connect(mapStateToProps)(CreateBook);
export default connectedCreateBook;
