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

SELECT rs.is_locked
FROM tires_registry tr
INNER JOIN race_status rs ON tr.id_event = rs.id_event
WHERE tr.id IN(560,561,564);  -- id del registro en tires_registry

CREATE TABLE tires_used (
    id            SERIAL PRIMARY KEY,
    registry_id   INTEGER NOT NULL REFERENCES tires_registry(id) ON DELETE CASCADE,
    id_event      INTEGER NOT NULL,
    tire_number   INTEGER NOT NULL,
    rim_size      INTEGER NOT NULL,
    position      TEXT    NOT NULL,

    CONSTRAINT tires_used_unique_tire_event UNIQUE (tire_number, rim_size, id_event)
);


--SELECT * FROM race_status WHERE is_locked = true;
--INSERT INTO
--	RACE_STATUS (ID_EVENT, ID_AUDITOR)
--VALUES (2, 3);
--	(2, 3),
--	(3, 3);
--UPDATE race_status 
--SET is_locked = true, locked_at = NOW()
--WHERE id_event IN (1);


------------------------------------------------------------------
------------------------------------------------------------------


-- 1. Creamos un tipo ENUM para restringir las actividades a los valores de la imagen
CREATE TYPE activity_type AS ENUM (
    'Delete', 
    'Edit', 
    'Start Run', 
    'End Run', 
    'Log In', 
    'Log Out',
    'Create Account',
    'Add Pilot',

    'Password',
    'New User'
);

-- 2. Creamos la tabla user_activity
CREATE TABLE user_activity (
    id_activity SERIAL PRIMARY KEY,
    id_user INT NOT NULL, -- Reemplazar por UUID si usas ese estándar
    activity activity_type NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    detail TEXT
    id_event INT NULL
);

-- 3. INSERTAR DATOS 
INSERT INTO user_activity (id_user, activity, detail) 
VALUES ($1, $2, $3);

-------------------------------------------------------------------

-------------------------------------------------------------------


1) Ejecutar script SQL en Postgres (crear tabla)

2) Insertar un Manager manualmente (con bcrypt para hashear password)

3) Levantar backend → npm run dev (o nodemon)

4) Probar login desde Postman o frontend: POST /api/login

5) Conectar Login.jsx de React al endpoint /api/login

6) Guardar token en localStorage desde el frontend

7) teger rutas existentes con authMiddleware



SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'tires_used'
ORDER BY ordinal_position;


Pages/AddPilots.jsx - importa la funcion NewPilot()
helpers/pilots.js  - creo la funcion NewPilot()
helpers/pilots.js le pega a Routes/routes-cba_pista.js donde se encuentra "requestRouter.post('/new_pilot', async (req,res) => {...})"
Ene este ultimo es donde se encuetnra la sintaxis SQL 
Decime si me entendes hasta aca



CREATE TABLE category_table (
    id_category   SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    rim_size      NUMERIC(5,2)
);


CREATE TABLE tires_registry (
    id          SERIAL PRIMARY KEY,
    id_pilot    INTEGER NOT NULL REFERENCES users_pista(id),
    id_event    INTEGER NOT NULL REFERENCES circuits_calendar(id_event),
    event_date  DATE NOT NULL,
    tire_n1     INTEGER NOT NULL,
    tire_n2     INTEGER NOT NULL,
    tire_n3     INTEGER NOT NULL,
    tire_n4     INTEGER NOT NULL,
    tire_n5     INTEGER NOT NULL,
    tire_n6     INTEGER NOT NULL,
    created_by  INTEGER NOT NULL REFERENCES users_admin(id_admin),

    CONSTRAINT tires_registry_unique_pilot_day UNIQUE (id_pilot, event_date)
);






