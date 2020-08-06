import React, {Component} from 'react';

class Providers extends Component{

    constructor(props){
        super(props);
        this.state = {
            providersList: ''
        }
    }

    apiCall(url, handler){
        fetch(url)
        .then(response => response.json())
        .then(data => handler(data))
        .catch(error => console.log(error))
    }

    componentDidMount(){
        this.apiCall('/api/providers/', this.mostrarUsuarios)
    }

    mostrarUsuarios = (data) => {
        this.setState({
            providersList: data.data
        })
    }

    render(){
        let contenido;
        if (this.state.providersList === ''){
            contenido = <p>Cargando____...</p>
        }else{
            contenido = <ul>
                <p>{this.state.providersList.map((prov, i) => <li key={prov+i}><strong>{prov.company}</strong> - {prov.address} (TEL: {prov.contact_number}) </li>)}</p>
            </ul>
        }

        return(
            <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Proveedores</h6>
                    </div>
                    <div className="card-body">
                        <div>
                            {contenido}
                        </div>
                        <a target="_blank" rel="nofollow" href="/">Cantidad de proveedores: {this.state.providersList.length}</a>
                    </div>
                </div>
            </div>
        )
    };
}

export default Providers;