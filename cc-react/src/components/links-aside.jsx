
import { Link } from 'react-router-dom'

const hadleClick = (pageChange) =>{
   console.log(pageChange)
}

const LinkAside = ({textLink}) =>{
   let tableName = textLink.toLowerCase()
   console.log('Link tableName = ',tableName)
   return(
      <Link 
         className="href-link"
         to={`/table/${tableName}`}>
            {textLink}
      </Link>
   )
}

export default LinkAside;