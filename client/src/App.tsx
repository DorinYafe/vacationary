import React, { useEffect, Suspense, } from 'react';
import { withRouter, Switch, Route, Redirect, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './redux/actions/index';
import Layout from './components/Layout/Layout';
import Vacations from './components/Vacations/Vacations';
import Logout from './components/Auth/Logout/Logout';

const Auth = React.lazy(() => {
  return import('./components/Auth/Auth');
});

// const AddVacation = React.lazy(() => {
// return import('./components/Vacation/AddVacation');
// });

const Chart = React.lazy(() => {
  return import('./components/UI/Chart/Chart');
});

// const FavoritesVacations = React.lazy(() => {
// return import('./containers/Vacations/FavoritesVacations');
// });

const App: React.FC = () => {

  const dispatch = useDispatch();
  const onTryAutoSignin = () => dispatch(actions.authCheckState());
  const isAuthenticated = useSelector((state: any) => state.auth.token !== null);

  useEffect(() => {
    onTryAutoSignin();
  }, [isAuthenticated]);

  let routes = (
    <Switch>
      <Route path='/auth' render={() => <Auth />} />
      <Route path='/' exact component={Vacations} />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/auth' render={() => <Auth />} />
        {/* <Route path='/add-vacation' render={() => <AddVacation />} /> */}
        <Route path='/chart' render={() => <Chart />} />
        {/* <Route path='/profile' render={() => <FavoritesVacations />} /> */}
        <Route path='/logout' component={Logout} />
        <Route path='/' exact component={Vacations} />
        <Redirect to='/' />
      </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

export default withRouter(App);
