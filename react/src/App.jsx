import Description from "./components/Description";
import HomeIntro from "./components/HomeIntro";
import MyAccount from "./components/MyAccount";
import Directory from "./components/Directory";
import AdvancedSearch from "./components/AdvancedSearch";

import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Duck Enterprise Directory</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/account">My Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/directory">Directory</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/advanced-search">Advanced Search</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <Routes>
          <Route path="/" element={
            <div className="home-intro-container">
              <HomeIntro />
            </div>
          } />
          <Route path="/account" element={<MyAccount />} />
          {/* Add other routes as needed */}
          <Route path="/login" element={<div className="home-intro-container"><h2>Login Page</h2></div>} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/advanced-search" element={<AdvancedSearch />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App;