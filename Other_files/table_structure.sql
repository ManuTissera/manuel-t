

CREATE TABLE proveedores (
   id_prov SERIAL,
   nombre_fantacia VARCHAR(100) NOT NULL,
   razon_social VARCHAR(100) NOT NULL,
   cuit VARCHAR(50),
   direccion VARCHAR(50),
   telefono VARCHAR(50),
   email VARCHAR(50),
   PRIMARY KEY (id_prov)
);

CREATE TABLE personal (
   id_personal SERIAL PRIMARY KEY,
   nombre VARCHAR(50) NOT NULL,
   apellido VARCHAR(50) NOT NULL,
   cargo VARCHAR(50) NOT NULL,
   fecha_ingreso DATE NOT NULL,
   telefono VARCHAR(50),
   direccion VARCHAR(100)
);

CREATE TABLE comercios (
   id_local SERIAL PRIMARY KEY,
   nombre VARCHAR(50) NOT NULL,
   direccion VARCHAR(100) NOT NULL,
   telefono VARCHAR(50)
);

CREATE TABLE ventas (
   id SERIAL PRIMARY KEY,
   fecha DATE NOT NULL,
   personal VARCHAR(50) NOT NULL,
   comercio VARCHAR(100) NOT NULL,
   venta_efectivo INT NOT NULL,
   venta_tarjeta INT NOT NULL,
   venta_cuenta_corriente INT NOT NULL
);


CREATE TABLE clientes (
   id_cliente SERIAL PRIMARY KEY,
   nombre_fantacia_cl VARCHAR(100) NOT NULL,
   razon_social_cl VARCHAR(100) NOT NULL,
   cuit_cl VARCHAR(50),
   direccion_cl VARCHAR(100),
   telefono_cl VARCHAR(50),
   email_cl VARCHAR(50),
   fecha_ingreso_cl DATE NOT NULL,
   facturacion VARCHAR(50) NOT NULL
);

CREATE TABLE gastos (
   id_gasto SERIAL PRIMARY KEY,
   fecha DATE NOT NULL,
   categoria VARCHAR(50) NOT NULL,
   subcategoria VARCHAR(50) NOT NULL,
   descripcion TEXT,
   monto NUMERIC(12, 2) NOT NULL,
   forma_pago VARCHAR(50),
   proveedor VARCHAR(100)
);

CREATE TABLE compras (
   id_compra SERIAL PRIMARY KEY,
   fecha DATE NOT NULL,
   proveedor VARCHAR(100) NOT NULL,
   categoria VARCHAR(50),
   descripcion TEXT,
   monto NUMERIC(12, 2) NOT NULL,
   forma_pago VARCHAR(50) NOT NULL,
   tipo_factura CHAR(1) NOT NULL,
   numero_factura VARCHAR(50) NOT NULL
);

