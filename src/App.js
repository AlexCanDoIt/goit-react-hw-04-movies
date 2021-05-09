/* Modules */
import { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

/* Components */
import routes from './routes';
import AppBar from './components/AppBar';
import Loader from './components/Loader';
import NotFoundView from './views/NotFoundView';

const HomeView = lazy(() =>
  import('./views/HomeView/HomeView' /* webpackChunkName: "home-view" */),
);

const MoviesView = lazy(() =>
  import('./views/MoviesView/MoviesView' /* webpackChunkName: "movies-view" */),
);

const MovieDetailsView = lazy(() =>
  import(
    './views/MovieDetailsView' /* webpackChunkName: "movie-details-view" */
  ),
);

const App = () => (
  <>
    <AppBar />

    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={routes.home} component={HomeView} />
        <Route exact path={routes.movies} component={MoviesView} />
        <Route path={routes.movieDetails} component={MovieDetailsView} />
        <Route component={NotFoundView} />
      </Switch>
    </Suspense>
  </>
);

export default App;
