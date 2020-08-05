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
        //console.log('Mounted');
        this.apiCall('/api/lastProduct/', this.mostrarUltimoProducto)
    }

    mostrarUltimoProducto = (objeto) => {
        console.log(objeto.data.name);
        this.setState({
            product: objeto.data
        })
    }

    componentDidUpdate(){
        //console.log('Updated');
    }
    render(){
        //console.log('Rendered');

        let contenido;
        if (this.state.product === ''){
            contenido = <p>Cargando____...</p>
        }else{
            contenido = <ul>
                            <p>{this.state.product.name}</p>
                            <p>{this.state.product.price}</p>
                            <p>{this.state.product.discount}</p>
                            <p>{this.state.product.description}</p>



                        </ul>
        }

        return(
        <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Ultimo producto cargado en el eComerce</h6>
            </div>
            <div className="card-body">
                <div className="text-center">
                    {/**/}
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4"  src="/tama1.jpg" style={{width: '20rem'}} alt=" dummy"/>
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