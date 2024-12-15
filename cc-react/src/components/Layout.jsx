import { children, useState } from "react";
import LinkAside from "./links-aside";
import { Link, useParams } from "react-router-dom";
import avatarIcon from '../Assets/avatar-svgrepo-com.png'
import burgerMenu from '../Assets/icons/menu.svg'
import chevronBack from '../Assets/icons/chevron_back.svg'


const Layout = ({children}) => {

   const { tableName } = useParams()
   const h2Header = (tableName === undefined)?'Inicio':tableName.toUpperCase();

   const [isVisibleAside,setIsVisibleAside] = useState('');
   // const [currentTable,setCurrentTable] = useState('')

   // const setTable = (nameTable) =>{
   //   setCurrentTable(nameTable)
   // }


   const toggleAside = () =>{
      console.log(isVisibleAside);
      let cssAside = (isVisibleAside === '' || isVisibleAside === 'aside_hidden')?'aside_visible':'aside_hidden';
      setIsVisibleAside(cssAside);
    }
   
    const hrefPage  = ['Inicio','Proveedores','Compras','Gastos','Cajas','Clientes','Personal']



   return(
      <>
                          {/* <!--------- ASIDE ---------> */}

         <aside className={`aside aside_inicio ${isVisibleAside}`}>
             <div>
              <img className="close-aside close_aside" onClick={toggleAside}src={chevronBack} alt=""/>
              </div>

           <section className="aside-header-container">
                {/* <img className="logo-cc-aside" src="../Assets/Loco Comercee.png" alt=""> */}
                <div className="logo-profile">
                   {/* <img className="img-logo-profile" src="../Assets/avatar-svgrepo-com.png" alt=""> */}
                </div>
                <article className="data-profile">
                   <h4 className="name-profile-aside"></h4>
                   <p className="category-profile-aside"></p>
                </article>
             </section>

           <section className="aside-body-container">
                <article className="aside-list-links">
                  {hrefPage.map((namePage,index) =>{
                     let nameTable = namePage.toLocaleLowerCase()
                     let routeName = (nameTable === 'inicio')?`/`:`/table/${nameTable}`
                    return(
                        <Link
                           key={index}
                           className="href-text"
                           to={`${routeName}`}>
                              {namePage}
                        </Link>
                    )
                  })}
                </article>
             </section>
         </aside>

                         {/*-------     HEADER    --------*/}
   
         <header className="header">
            <div className="container-header">
               <img className="menu-burger menu_burger" onClick={toggleAside}src={burgerMenu} alt=""/>
               <h2 className="h2-header">{`${h2Header}`}</h2>
                                    
               <section className="header-profile-container">
                         {/* <!-- <img classname="logo-cc-aside" src="../Assets/Loco Comercee.png" alt=""> --> */}
                                    
                  <article className="data-profile">
                     <h4 className="name-profile-header"></h4>
                     <p className="category-profile-header"></p>
                  </article>
                  <div className="logo-profile">
                     <img className="img-logo-profile" src={avatarIcon} alt=""/>
                  </div>
               </section>
            </div>
         </header>

                  {/* <!--------- MAIN ---------> */}


         <main className="main_structure_table">
            {children}
         </main> 

      </>
   )
}


export default Layout;