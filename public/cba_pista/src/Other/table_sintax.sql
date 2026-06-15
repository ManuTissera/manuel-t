CREATE TABLE IF NOT EXISTS users_admin (
  id_admin SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  second_name VARCHAR(100) NOT NULL,
  user_rol VARCHAR(50) NOT NULL CHECK (user_rol IN ('Manager', 'Administrador', 'Auditor', 'Publico')),
  guid VARCHAR(100) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  users_name VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users_admin (first_name, second_name, user_rol, email, users_name, password)
VALUES 
('Manuel','Tissera','Manager','manuel@gmail.com','ManuelT','1234Test'),
('Ivo','Vicentini','Administrador','ivo@gmail.com','IvoV','1234Test'),
('Lucas','Rodriguez','Auditor','lucas@gmail.com','LucasR','1234Test');

CREATE TABLE events (
  id          SERIAL PRIMARY KEY,
  event_name        VARCHAR(100),        -- "Carrera 2", etc.
  id_auditor  INTEGER,             -- quien cargó los datos
  is_locked   BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT NOW(),
  locked_at   TIMESTAMP            -- cuando se finalizó
);



1) Ejecutar script SQL en Postgres (crear tabla)

2) Insertar un Manager manualmente (con bcrypt para hashear password)

3) Levantar backend → npm run dev (o nodemon)

4) Probar login desde Postman o frontend: POST /api/login

5) Conectar Login.jsx de React al endpoint /api/login

6) Guardar token en localStorage desde el frontend

7) teger rutas existentes con authMiddleware



Pages/AddPilots.jsx - importa la funcion NewPilot()
helpers/pilots.js  - creo la funcion NewPilot()
helpers/pilots.js le pega a Routes/routes-cba_pista.js donde se encuentra "requestRouter.post('/new_pilot', async (req,res) => {...})"
Ene este ultimo es donde se encuetnra la sintaxis SQL 
Decime si me entendes hasta aca


