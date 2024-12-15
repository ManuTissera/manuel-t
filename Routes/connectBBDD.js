
import pkg from 'pg';
const { Client } = pkg
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const connectionStructure = isProduction
   ?{
      connectionString: process.env.DATABASE_URL, 
      ssl: {
  
          rejectUnauthorized: false 
      }
   }
   :{
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.POSTGRES_PORT,
   }

const connection = new Client(connectionStructure);

connection.connect((err)=>{
   if(err){
      console.error('Connection error',err.stack);
   }else{
      console.log(`Enviorment detected = ${process.env.NODE_ENV}`)
      console.log('Connected to PostgreSQL');
   }
})

export default connection;