import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import AuthState, {useAuth} from './context/auth/AuthState'
import AttendanceState from './context/attendance/AttendanceState'

//Layouts
import Header from './components/shared/Header'

//Auth Routes
import SecretaryRoute from './routes/SecretaryRoute'

//Pages
import Hero from './pages/hero/Hero'
import Login from './pages/Login'
import SecretaryHome from './pages/secretary/SecretaryHome'
import ParentRoute from './routes/ParentRoute'
import TeacherRoute from './routes/TeacherRoute'
import ParentHome from './pages/parent/ParentHome'
import TeacherHome from './pages/teacher/TeacherHome'
import TeacherClass from './pages/teacher/TeacherClass'
import ChildrenCalendar from './pages/parent/ChildrenCalendar'
import ChildrenClasses from './pages/parent/ChildrenClasses'
import SecretaryAll from './pages/secretary/SecretaryAll'
import SecretaryNotify from './pages/secretary/SecretaryNotify'
import SecretarySupply from './pages/secretary/SecretarySupply'
import SecretaryStudent from './pages/secretary/SecretaryStudent';


const Providers = ({ children }) =>
  <AuthState>
    <AttendanceState>
    {children}
    </AttendanceState>
  </AuthState>


//Because we need the auth context
const Group7App = () => {
  const { checkLoggedIn } = useAuth()

  useEffect(() => {
    checkLoggedIn()
   }, [])

  return (
    <Router>
      <Header />
        <ToastContainer />
      <Switch>
        <Route exact path="/">
          <Hero />
        </Route>
        <Route exact path="/login/:role" component={Login} />
        <TeacherRoute exact path="/teacher" component={TeacherHome} />
        <TeacherRoute exact path="/teacher/course/:id" component={TeacherClass} />
        <ParentRoute exact path="/parent" component={ParentHome} />
        <ParentRoute exact path ="/parent/child/:id" component={ChildrenCalendar} />
        <ParentRoute exact path="/parent/child/:id/attendance" component={ChildrenClasses} />
        <SecretaryRoute exact path="/secretary" component={SecretaryHome} />
        <SecretaryRoute exact path="/secretary/all" component={SecretaryAll} />
        <SecretaryRoute exact path="/secretary/notify" component={SecretaryNotify} />
        <SecretaryRoute exact path="/secretary/supply" component={SecretarySupply} />
        <SecretaryRoute exact path="/secretary/student" component={SecretaryStudent}/>      
      </Switch>
    </Router>
  )
}

const App = () => {

  return (
    <Providers>
      <Group7App />
    </Providers>
  );
}

export default App;
