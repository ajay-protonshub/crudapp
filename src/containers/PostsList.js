import React from 'react';
import { Table, Button, Alert } from 'react-bootstrap';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      Isloading:true,
      products: [],
      response: {}
    }
  }

  componentDidMount() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            products: result,
            Isloading:false
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  deleteProduct(productId) {
     this.setState({Isloading:true})
    const { products, Isloading } = this.state;
  
    if(Isloading){
        return <div>Loading...</div>
    }
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const formData = new FormData();
    formData.append('productId', productId);

    const options = {
      method: 'DELETE',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            products: products.filter(product => product.id !== productId),
            Isloading:false
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    const { error, products, Isloading} = this.state;
if(Isloading){
    return(
        <div style={{textAlign:'center'}}>Loading....</div>
    )
}
    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div style={{textAlign:'center'}}>
          <h2>Product List</h2>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Title</th>
                 <th>body</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>{product.body}</td>
                  
                  <td>
                    <Button variant="info" onClick={() => this.props.editProduct(product.id)}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(product.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default ProductList;
 

 
 