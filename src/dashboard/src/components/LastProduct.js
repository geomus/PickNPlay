import React, {Component} from 'react';

class lastProduct extends Component{

    constructor(props){
        super(props);
        this.state = {
            product: {}
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
        .then(response => response.json())
        .then(data => consecuencia(data))
        .catch(error => console.log(error))
    }

    componentDidMount(){
        this.apiCall('/api/lastProduct/', this.mostrarUltimoProducto)
    }

    mostrarUltimoProducto = (objeto) => {
        this.setState({
            product: objeto.data
        })
    }
    render(){
        let contenido;
        if (this.state.product === ''){
            contenido = <p>Cargando____...</p>
        }else{
            contenido = <ul>
                            <li><b>Producto:</b> {this.state.product.name}</li>
                            <li><b>Id del producto: </b> {this.state.product.id}</li>
                            <li><b>Precio: </b>${this.state.product.price}</li>
                            <li><b>Descuento: </b>{this.state.product.discount}%</li>
                            <li><b>Descripcion: </b>{this.state.product.description}</li>
                        </ul>
        }
        let imgLastProd = `/images/imgInstrumentos/${this.state.product.image}`;
        return(
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Ultimo producto cargado en el eComerce</h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4"  src={imgLastProd} style={{width: '18rem'}} alt=" dummy"/>
                        </div>
                        <div>
                            {contenido}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default lastProduct;