import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';

const Routes = () => {
    return (
        <section>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/Home' component={Home} />
            </Switch>
        </section>
    );
}

export default Routes;