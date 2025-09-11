// App.jsx
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import LoginForm from './login'
import CreateBookForm from './CreateBook'
import BookList from './BookList';
import BookDetails from './BookDetails';
//import BookDetail from './BookDetail';

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Login() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

function CreateBook() {
  return (
    <div>
      <CreateBookForm />
    </div>
  )
}

function NavItem({to,children}) {
  return (
    <NavLink to={to} className={({isActive}) =>
    `nav-link ${isActive ? "active":""}`}>
      {children}
    </NavLink>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/about">About</NavLink> |{" "}
        <NavLink to="/login">Login</NavLink> |{" "}
        <NavLink to="/book/create">Create Book</NavLink> |{" "}
        <NavLink to="/books">Explore</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/create" element={<CreateBook />} />

        <Route path="/books/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}        