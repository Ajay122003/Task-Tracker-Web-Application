import React, { useState, useEffect } from "react";
import { loginUser, registerUser } from "../api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null); 


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await loginUser({ email, password });
      const loggedUser = { email: email }; 
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      alert(" Login Successful!");
      setShowLogin(false);
    } catch (err) {
      alert(" Invalid credentials!");
    }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await registerUser({ username, email, password });
      alert(" Registration Successful! Please Login.");
      setShowRegister(false);
    } catch (err) {
      alert(" Error during registration!");
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    alert(" Logged out successfully!");
  };

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/">
            Task<span className="text-warning">Manager</span>
          </a>


          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>


          <div
            className="collapse navbar-collapse justify-content-end text-center"
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              <li className="nav-item mx-2">
                <a className="nav-link fw-medium active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link fw-medium" href="#tasks">
                  Tasks
                </a>
              </li>

            
              {user ? (
                <>
                  <li className="nav-item mx-2 text-light fw-semibold">
                    Hello, {user.email.split("@")[0]}
                  </li>
                  <li className="nav-item mx-2 my-2 my-lg-0">
                    <button
                      className="btn btn-outline-warning btn-sm px-3"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                 
                  <li className="nav-item mx-2 my-2 my-lg-0">
                    <button
                      className="btn btn-outline-light btn-sm px-3"
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item mx-2 my-2 my-lg-0">
                    <button
                      className="btn btn-warning btn-sm px-3"
                      onClick={() => setShowRegister(true)}
                    >
                      Register
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {showLogin && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">Login</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowLogin(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-dark w-100">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Register Modal */}
      {showRegister && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">Register</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRegister(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter a password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-warning w-100">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;


