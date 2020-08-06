import React, {Component} from 'react';
import CategoryCard from './CategoryCard';

class CategoriesTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            countByCategory: []
        }
    }
    apiCall(url, handler){
        fetch(url)
        .then(response => response.json())
        .then(data => handler(data))
        .catch(error => console.log(error))
    }

    componentDidMount(){
        console.log('Mounted');
        this.apiCall('/api/products/', this.categoryList)

    }
    categoryList = (data) => {
        this.setState({
            countByCategory: data.meta.countByCategory
        })
    }

    componentDidUpdate(){
        console.log('Updated');
    }

    render (){
        return (
            <div className="col-lg-12 mb-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Productos por categoría:</h6>
                    </div>
                    <div className="card-body">
                        {/*<!-- Categorie Cards -->*/}
                        <div className="row">

                            {this.state.countByCategory.map((cat, i)=>(
                                <CategoryCard key={i}{...cat}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CategoriesTable;