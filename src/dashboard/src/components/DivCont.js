import React, {Component} from 'react';
import Card from './Card';
import CategoryCard from './CategoryCard';
import AllUsers from './AllUsers';
import AllProductsTable from './AllProductsTable';
import LastProductNew from './LastProductNew';





class  DivCont extends Component {

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
        this.apiCall('/api/users/', this.mostrarUsuariosCantidad)
    }
    mostrarUsuariosCantidad = (data) => {
        console.log(data.data[0].name);
        this.setState({
            stringUsers: data.data 
        })
    }

    componentDidUpdate(){
        console.log('Updated');
    }
    render(){
        console.log('Rendered');

       

        return(

<div className="container-fluid">

{/*<!-- Page Heading -->*/}
<div className="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
</div>

{/*<!-- Content Row -->*/}
<div className="row">

    {/*<!-- Amount of Products in DB -->*/}
    <Card cardName='Products in Data Base' amount='55' icon='fas fa-clipboard-list fa-2x text-gray-300' color='primary'/>

    {/*<!-- $$$ of all products in DB -->*/}
    <Card cardName='Amount in products' amount='$190.000' icon='fas fa-dollar-sign fa-2x text-gray-300' color='success'/>

    {/*<!-- Amount of users in DB -->*/}
    <Card cardName='Users quantity' amount={this.state.stringUsers.length} icon='fas fa-user-check fa-2x text-gray-300' color='warning'/>
    </div>
    {/*<!-- Content Row -->*/}
    <div className="row">
    
    {/*<!-- All users in DB -->*/}
    <AllUsers/>

    {/*<!-- Last Product in DB -->*/}
    <LastProductNew/>

    {/*<!-- All products table in DB -->*/}
    <AllProductsTable/>

    {/*<!-- Categories in DB -->*/}
    <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
            </div>
            <div className="card-body">
                {/*<!-- Categorie Cards -->*/}
                <div className="row">
                <CategoryCard categorie='01'/>
                <CategoryCard categorie='02'/>
                <CategoryCard categorie='03'/>
                <CategoryCard categorie='04'/>
                <CategoryCard categorie='05'/>
                <CategoryCard categorie='06'/>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


             
        
    );
  }
}

export default DivCont;