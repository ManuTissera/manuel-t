

import Logo_cba_pista from '../assets/Logo_cba_pista.png';
import menuIcon from '../assets/menu-hamburgesa.svg';

const HeaderApp = ({ onMenuClick }) => {

   return(
      <header className="header">
         <img src={Logo_cba_pista} alt="Cba Pista" className="header-logo"/>
         <img
           src={menuIcon}
           alt="Menu"
           className="header-menu"
           onClick = {onMenuClick}
         />
      </header>
   )
};

export default HeaderApp;