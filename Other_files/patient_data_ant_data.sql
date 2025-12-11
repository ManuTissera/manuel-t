--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2025-12-10 21:19:54

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4856 (class 0 OID 16589)
-- Dependencies: 220
-- Data for Name: patient_data_ant; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.patient_data_ant VALUES (3, 'Louis', 'Amstrong', NULL, 182.00, 91.00, '1975-06-24', '2024-12-27', 'M', 'Hipertension', 'Bajo Sodio', 'louisamostrong@gmail.com', '0283-8198292', 'Av. Amostrong 389', '30.000.001');
INSERT INTO public.patient_data_ant VALUES (4, 'Miles', 'Davis', NULL, 167.00, 75.00, '1996-07-14', '2024-12-27', 'M', 'Diabetes', 'Bajo Carbohidrato', 'milesdavid@gmail.com', '011-203298320', 'Av. Davis 44', '30.000.002');
INSERT INTO public.patient_data_ant VALUES (1, 'Leandro', 'Ramos', NULL, 170.00, 65.00, '1893-10-21', '2024-12-17', 'M', 'Civil', 'Deficit Calorico', 'leandroramos@gmail.com', '0351-3292920', 'Bv. Ramos 3990', '30.000.003');
INSERT INTO public.patient_data_ant VALUES (2, 'Ella', 'Fitzgerald', NULL, 162.00, 62.00, '1993-09-27', '2024-12-27', 'F', 'Deportista', 'AMM', 'ellafitzgerald@gmail.com', '93-029202', 'Av. Fitzgerald 2903', '30.000.004');
INSERT INTO public.patient_data_ant VALUES (5, 'John', 'Coltrane', NULL, 185.00, 82.00, '1985-09-23', '2024-12-27', 'M', 'Hipertension', 'Bajo Sodio', NULL, NULL, NULL, '30.000.005');
INSERT INTO public.patient_data_ant VALUES (6, 'Sarah', 'Vaughan', NULL, 160.00, 58.00, '1992-04-15', '2024-12-27', 'F', 'Deportista', 'AMM', NULL, NULL, NULL, '30.000.006');
INSERT INTO public.patient_data_ant VALUES (7, 'Charlie', 'Parker', NULL, 178.00, 74.00, '1988-03-10', '2024-12-20', 'M', 'Diabetes', 'Bajo Carbohidrato', NULL, NULL, NULL, '30.000.007');
INSERT INTO public.patient_data_ant VALUES (8, 'Nina', 'Simone', NULL, 170.00, 66.00, '1990-12-12', '2024-12-23', 'F', 'Civil', 'Déficit Calórico', NULL, NULL, NULL, '30.000.008');
INSERT INTO public.patient_data_ant VALUES (9, 'Chet', 'Baker', NULL, 173.00, 69.00, '1994-06-05', '2024-12-27', 'M', 'Hipertension', 'Bajo Sodio', NULL, NULL, NULL, '30.000.009');
INSERT INTO public.patient_data_ant VALUES (10, 'Bill', 'Evans', NULL, 182.00, 80.00, '1983-01-19', '2024-12-22', 'M', 'Deportista', 'AMM', NULL, NULL, NULL, '30.000.010');
INSERT INTO public.patient_data_ant VALUES (11, 'Ella', 'Johnson', NULL, 165.00, 60.00, '1998-03-27', '2024-12-27', 'F', 'Diabetes', 'Bajo Carbohidrato', NULL, NULL, NULL, '30.000.011');
INSERT INTO public.patient_data_ant VALUES (12, 'Duke', 'Ellington', NULL, 188.00, 90.00, '1981-05-14', '2024-12-21', 'M', 'Civil', 'Déficit Calórico', NULL, NULL, NULL, '30.000.012');
INSERT INTO public.patient_data_ant VALUES (13, 'Billie', 'Holiday', NULL, 158.00, 55.00, '1995-10-02', '2024-12-27', 'F', 'Hipertension', 'Bajo Sodio', NULL, NULL, NULL, '30.000.013');
INSERT INTO public.patient_data_ant VALUES (14, 'Herbie', 'Hancock', NULL, 180.00, 78.00, '1987-11-30', '2024-12-25', 'M', 'Deportista', 'AMM', NULL, NULL, NULL, '30.000.014');
INSERT INTO public.patient_data_ant VALUES (15, 'Dinah', 'Washington', NULL, 162.00, 59.00, '1999-07-11', '2024-12-27', 'F', 'Civil', 'Déficit Calórico', NULL, NULL, NULL, '30.000.015');
INSERT INTO public.patient_data_ant VALUES (16, 'Wayne', 'Shorter', NULL, 176.00, 72.00, '1991-02-03', '2024-12-26', 'M', 'Diabetes', 'Bajo Carbohidrato', NULL, NULL, NULL, '30.000.016');
INSERT INTO public.patient_data_ant VALUES (17, 'Cassandra', 'Wilson', NULL, 168.00, 64.00, '1993-09-19', '2024-12-27', 'F', 'Deportista', 'AMM', NULL, NULL, NULL, '30.000.017');
INSERT INTO public.patient_data_ant VALUES (18, 'Max', 'Roach', NULL, 181.00, 83.00, '1984-08-08', '2024-12-27', 'M', 'Hipertension', 'Bajo Sodio', NULL, NULL, NULL, '30.000.018');
INSERT INTO public.patient_data_ant VALUES (19, 'Anita', 'ODay', NULL, 164.00, 57.00, '1997-06-22', '2024-12-27', 'F', 'Civil', 'Déficit Calórico', NULL, NULL, NULL, '30.000.019');
INSERT INTO public.patient_data_ant VALUES (20, 'Art', 'Blakey', NULL, 183.00, 88.00, '1982-10-29', '2024-12-27', 'M', 'Deportista', 'AMM', NULL, NULL, NULL, '30.000.020');
INSERT INTO public.patient_data_ant VALUES (21, 'Betty', 'Carter', NULL, 159.00, 56.00, '1996-01-12', '2024-12-27', 'F', 'Hipertension', 'Bajo Sodio', NULL, NULL, NULL, '30.000.021');
INSERT INTO public.patient_data_ant VALUES (22, 'Stan', 'Getz', NULL, 177.00, 73.00, '1989-12-02', '2024-12-27', 'M', 'Diabetes', 'Bajo Carbohidrato', NULL, NULL, NULL, '30.000.022');
INSERT INTO public.patient_data_ant VALUES (23, 'Julie', 'London', NULL, 161.00, 58.00, '1994-03-18', '2024-12-27', 'F', 'Civil', 'Déficit Calórico', NULL, NULL, NULL, '30.000.023');
INSERT INTO public.patient_data_ant VALUES (24, 'Oscar', 'Peterson', NULL, 190.00, 95.00, '1980-04-25', '2024-12-27', 'M', 'Hipertension', 'Bajo Sodio', NULL, NULL, NULL, '30.000.024');
INSERT INTO public.patient_data_ant VALUES (26, 'Manuel', 'Tissera', 29, 178.00, 70.00, '1993-09-27', '2025-11-28', 'M', 'Civil', 'Aumento MM', 'manu@example.com', '+39 345 6677 221', 'Via Roma 123, Campobasso, Italia', '30.999.999');
INSERT INTO public.patient_data_ant VALUES (27, 'Walter', 'White', 61, 170.00, 67.00, '1964-09-27', '2025-11-28', 'M', 'Civil', 'Old maan', 'breaking.b@example.com', '+39 345 6677 329', '308 Negra Arroyo Lane, Albuquerque, Nuevo México, USA', '15.999.999');
INSERT INTO public.patient_data_ant VALUES (28, 'Rich', 'Ken', 38, 178.00, 65.50, '1991-03-04', '2025-12-03', 'M', 'Sport', 'Basic', 'rich@gmail.com', '+34 34034034', 'richstreet@gmail.com', '334.4324.23');
INSERT INTO public.patient_data_ant VALUES (29, 'Jesse', 'Pinkman', 24, 168.00, 70.00, '1084-09-24', '2025-12-03', 'M', 'Addiction', 'AMM', 'capitancook@gmail.com', '+1 6125344', '9809 Margo Street', '9.894.324');


--
-- TOC entry 4862 (class 0 OID 0)
-- Dependencies: 219
-- Name: patient_data_ant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patient_data_ant_id_seq', 29, true);


-- Completed on 2025-12-10 21:19:54

--
-- PostgreSQL database dump complete
--

