
import React from 'react';
import { Row, Form, Col, Button } from 'react-bootstrap';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      userId: '',
      title: '',
      body: '',
       
    }

    if(props.product){
      this.state = props.product
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onFormSubmit(this.state);
    this.setState(this.initialState);
  }

  render() {

    let pageTitle;
    if(this.state.userId) {
      pageTitle = <h2>Edit Product</h2>
    } else {
      pageTitle = <h2>Add Product</h2>
    }

    return(
      <div>
        {pageTitle}
        <Row>
          <Col sm={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controluserId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="Titel"/>
              </Form.Group>
            
              <Form.Group controluserId="body">
                <Form.Label>body</Form.Label>
                <Form.Control
                  type="text"
                  name="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                  placeholder="body" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="huserIdden" name="userId" value={this.state.userId} />
                <Button variant="success" type="submit">Save</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default AddProduct;
