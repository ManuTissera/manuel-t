
import pkg from 'pg';

const { Client } = pkg;

const connection = new Client({
   host: 'localhost',
   password: '3752Post',
   user: 'postgres',
   database: 'cba_pista',
   port: 5432
})


connection.connect((err) => {
   if(err){
      console.error(err)
   }else{
      console.log('Successfull connection BBDD Cba Pista')
   }
})


export default connection;

