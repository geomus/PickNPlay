import React from 'react';
import Widgets from './Widgets';
import LastProduct from './LastProduct';
import AllUsers from './AllUsers';
import AllProductsTable from './AllProductsTable';
import CategoriesTable from './CategoriesTable'

function DivCont (props) {
    return(
        <div className="container-fluid">

            {/*<!-- Page Heading -->*/}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
            </div>

            {/*<!-- Content Row -->*/}
            <div className="row">
                <Widgets/>
            </div>

            {/*<!-- Content Row -->*/}
            <div className="row">
                {/*<!-- Last Product in DB -->*/}
                <LastProduct/>

                {/*<!-- All users in DB -->*/}
                <AllUsers/>

                {/*<!-- All products table in DB -->*/}
                <AllProductsTable/>

                {/*<!-- Categories in DB -->*/}
                <CategoriesTable/>
            </div>
        </div>
    );
}

export default DivCont;