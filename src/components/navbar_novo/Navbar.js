import { React, useState } from 'react';
import styles from './Navbar.module.css';
import Logo from '../images/logo.png';
import {
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';
import {MdAddBox} from 'react-icons/md';
import {RiFolderUserFill, RiLoginBoxFill} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import {  
  Navbar as Nav 
} from "reactstrap";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  return (
    // <Nav className={"fixed-top"}>
    <header className={styles.navbar} style={{backgroundColor: "#FF8C00"}}>
      <img src={Logo} alt='Logo' className={styles.logo} onClick={() => navigate("/")} />
      <nav>
        <ul className={nav ? [styles.menu, styles.active].join(' ') : [styles.menu]} >
          <li>            
            <a href='/cadastro'> <MdAddBox size={30} style={{ marginTop: '-5px' }} /> Novo Anúncio</a>
          </li>
          <li>
            <a href='/meus-anuncios'> <RiFolderUserFill size={30} style={{ marginTop: '-10px' }} /> Meus Anúncios</a>
          </li>
          <li>
            <a href='/login'> <RiLoginBoxFill size={30} style={{ marginTop: '-10px' }} /> Entrar</a>
          </li>
          <li>
            <AiOutlineSearch size={25}  />
          </li>
          <li>
            <AiOutlineUser size={25} />
          </li>
        </ul>
      </nav>
      <div onClick={()=> setNav(!nav)} className={styles.mobile_btn}>
        {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}        
      </div>
    </header>
    // </Nav>
  );
};

export default Navbar;
