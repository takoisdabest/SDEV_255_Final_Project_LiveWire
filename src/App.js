import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseList from './pages/CourseList';
import CourseDetail from './pages/CourseDetail';
import AddCourse from './pages/AddCourse';
import Register from './pages/Register';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={CourseList} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/add-course" component={AddCourse} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={StudentDashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;