import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { ImLinkedin2 } from "react-icons/im";
import "./Footer.css";
import { FaBootstrap } from "react-icons/fa";

const MobbFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Home</h4>
            <ul>
              <li>
                <a href="#">Ir para Home Page</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Cadastre-se</h4>
            <ul>
              <li>
                <a href="#">Realizar o cadastro</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contato/Suporte</h4>
            <ul>
              <li>
                <a href="#">mobb@hotmail.com</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Siga-nos</h4>
            <div className="social-links">
              {/* <!--<a href="#"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i className="fab fa-twitter"></i></a>--> */}
              <a href="#" >
                {/* <i className="fab fa-instagram"></i>                 */}
                <AiOutlineInstagram size={35}  />
              </a>
              <a href="#">
              <ImLinkedin2 size={33} />
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MobbFooter;
