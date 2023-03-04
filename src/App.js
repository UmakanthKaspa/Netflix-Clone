import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './Components/Login'
import Home from './Components/Home'
import Account from './Components/Account'
import Search from './Components/Search'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtuctedRoute'
import MovieItemDetails from './Components/MovieItemDetails'
import Popular from './Components/Popular'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/search" component={Search} />
    <ProtectedRoute exact path="/account" component={Account} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
