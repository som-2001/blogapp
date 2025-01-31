
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { Login } from './pages/Login';
import { Read } from './pages/Read';
import { Blog } from './pages/Blog';
import { Myblog } from './pages/Myblog';
import { Create } from './pages/Create';
import { Edit } from './pages/Edit';
import { TopicBlogs } from './pages/TopicBlogs';
import { UserBlogs } from './pages/admin/UserBlogs.js';
import { AdminHome } from './pages/admin/AdminHome.js';
import { Users } from './pages/admin/Users.js';
import { AdminRead } from './pages/admin/AdminRead.js';
import { NotFoundPage } from './pages/admin/Error.js';
import { NotAuth } from './pages/NotAuth.js';
import { Profile } from './pages/Profile.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<SignIn/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/read-blog/:encoded' element={<Read/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/my-blog/:id' element={<Myblog/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit-blog/:id' element={<Edit/>}/>
        <Route path='/topic-blogs/:name' element={<TopicBlogs/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        {/* admin */}
       
        <Route path='/user-blogs' element={<UserBlogs/>}/>
        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/admin-read-blog/:encoded' element={<AdminRead/>}/>
        <Route path='/500' element={<NotAuth/>}/>


        <Route path='*' element={<NotFoundPage/>}/>
      </Routes> 
    </Router>
  );
}

export default App;
