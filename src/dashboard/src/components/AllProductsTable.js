import React, {Component} from 'react';
import TableRow from './TableRow';


class AllProductsTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            arrayProducts: [],
            amountOfProducts: 0
        }
        //console.log(state);
    }

    apiCall(url, consecuencia){
        fetch(url)
        .then(response => response.json())
        .then(data => consecuencia(data))
        .catch(error => console.log(error))
    }

    componentDidMount(){
        console.log('Mounted');
        this.apiCall('/api/products/', this.mostrarProductos)
    }

    mostrarProductos = (data) => {
        this.setState({
            arrayProducts: data.data.productsList
        })
    }

    componentDidUpdate(){
        console.log('Updated');
    }
    render(){
        console.log('Rendered');

        return(
        <div className="col-lg-12 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Todos los Productos en DB</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className='table table-bordered' id='dataTable' width='100%' cellSpacing='0'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Product Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrayProducts.map((oneProduct, i) => (
                                <TableRow key={oneProduct + i}{...oneProduct}/>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
    )
    };
}

export default AllProductsTable;