import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid  d-none d-lg-block">
        <div className="container">
          <div className="row"></div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm px-5 py-3 py-lg-0 sticky-top">
      <button
              onClick={() => navigate("/")}
              className="nav-item nav-link btn-primary"
            >
              Novo Anúncio
            </button>
        {/* <a href="index.html" className="navbar-brand p-0">
          <h1 className="m-0 text-uppercase text-primary">
            <i className="fa fa-paint-roller text-secondary me-3"></i>MOBB
          </h1>
        </a> */}
        <button
          className="navbar-toggler teste"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0 pe-4 border-5 border-primary">          
            <button
              onClick={() => navigate("/cadastro")}
              className="nav-item nav-link btn-primary"
            >
              Novo Anúncio
            </button>

            
            <button
              onClick={() => navigate("/meus-anuncios")}
              className="nav-item nav-link btn-primary"
            >
              Meus Anúncios
            </button>


            <button
              onClick={() => navigate("/meus-anuncios")}
              style={{ width: "120px" }}
              className="nav-item nav-link btn-primary"
            >
              Meu Perfil
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
