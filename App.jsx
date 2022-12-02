import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { MainLayout } from './layouts/MainLayout';
import { FilmDetail } from './Pages/filmDetails';
import { Home } from './Pages/home';
import { Favorites } from './Pages/favorites';
import { useFilms } from './hooks/useGetFilms';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { films, isLoading, hadleLike } = useFilms();

  return (
    <Router>
      <MainLayout>
        {isLoading ? (
          <Spinner />
        ) : (
          <Switch>
            <Route path="/" exact>
              <Home films={films} onLike={hadleLike} />
            </Route>
            <Route path="/favorites">
              <Favorites films={films} onLike={hadleLike} />
            </Route>
            <Route path="/film/:id">
              <FilmDetail films={films} onLike={hadleLike} />
            </Route>
          </Switch>
        )}
      </MainLayout>
    </Router>
  );
}

export default App;
