import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sidebar from './Sidebar';
import Content from './Content';
import Providers from './Providers';
import NotFound from './404';

function App() {
  return (
    <React.Fragment>
      <Sidebar/>
      <Switch>
				<Route exact path='/dashboard' component={Content} />
				<Route path='/dashboard/providers' component={Providers} />
        {/* <Route path='/products' component={} /> */}
				<Route component={NotFound} />
			</Switch>
    </React.Fragment>
  );
}

export default App;