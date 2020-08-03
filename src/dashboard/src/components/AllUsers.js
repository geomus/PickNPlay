import React, {Component} from 'react';

class AllUsers extends Component{

    constructor(props){
        super(props);
        this.state = {
            stringUsers: ''
        }
    }

    apiCall(url, consecuencia){
        fetch(url)
        .then(response => response.json())
        .then(data => consecuencia(data))
        .catch(error => console.log(error))
    }

    componentDidMount(){
        console.log('Mounted');
        this.apiCall('/api/users/', this.mostrarUsuarios)
    }

    mostrarUsuarios = (data) => {
        //console.log(data.data[0].firstName);
        this.setState({
            stringUsers: data.data 
        })
    }

    componentDidUpdate(){
        console.log('Updated');
    }
    render(){
        console.log('Rendered');

        let contenido;
        if (this.state.stringUsers === ''){
            contenido = <p>Cargando____...</p>
        }else{
            contenido = <ul>
                            <p>{this.state.stringUsers.map((unUser, i) => <li key={unUser+i}>{unUser.firstName} {unUser.lastName} - ({unUser.email})  </li>)}</p>
                        </ul>
        }

        return(
        <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Total de Usuarios en DB</h6>
            </div>
            <div className="card-body">
                <div className="text-center">
                    {/**/}
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4"  src="/product_dummy.svg" style={{width: '25rem'}} alt=" dummy"/>
                </div>
                <div>
                    Users:
                    {contenido}
                </div>
        <a target="_blank" rel="nofollow" href="/">Cantidad total de usuarios: {this.state.stringUsers.length}</a>
            </div>
        </div>
    </div>
    )
    };
}

export default AllUsers;