

import pkg from "pg";

const { Client } = pkg;

const connection = new Client({
   host: 'localhost',
   password: '3752Post',
   user: 'postgres',
   database: 'nutri-pro',
   port: 5432,
});

connection.connect((err) => {
   if(err){
      console.error('Fail connection PostgreSQL');
   }else{
      console.log('Connection BBDD PostgreSQL');
   }
});

export default connection;



