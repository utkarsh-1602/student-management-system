import React from 'react';
import './App.css';
import Login from './component/Login'
import StudentList from './component/StudentList'
import AdminLogin from './component/AdminLogin'
import {AddStudent,EditStudent} from './component/AddStudent'
import NotFound from './component/NotFound'
import MyDetails from './component/MyDetails'
import { Provider } from "react-redux";
import store from "./store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import AdminRegister from './component/AdminRegister';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
       <Router>
      <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/students" component={StudentList} />
          <Route exact path="/add-student" component={AddStudent} />
          <Route exact path="/edit-student/:id" component={EditStudent} />
          <Route exact path="/my-details/:id" component={MyDetails} />
          <Route exact path='/adminLogin' component={AdminLogin}/>
          <Route exact path='/adminRegister' component={AdminRegister}/>
          <Route component={NotFound} />
        </Switch>
      {/* <h1>hii</h1> */}
      
      </Router>
      </Provider>
    </div>
  );
}

export default App;
