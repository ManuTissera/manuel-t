


-- Table: public.patient_data

-- DROP TABLE IF EXISTS public.patient_data;

CREATE SEQUENCE IF NOT EXISTS patient_data_id_seq;


CREATE TABLE IF NOT EXISTS public.patient_data
(
    id integer NOT NULL DEFAULT nextval('patient_data_id_seq'::regclass),
    first_name character varying(50) COLLATE pg_catalog."default",
    last_name character varying(50) COLLATE pg_catalog."default",
    age integer,
    height numeric(5,2),
    weight numeric(5,2),
    birth_date date,
    admission_date date,
    gender character(1) COLLATE pg_catalog."default",
    category character varying(100) COLLATE pg_catalog."default",
    plan character varying(100) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    phone character varying(100) COLLATE pg_catalog."default",
    address character varying(100) COLLATE pg_catalog."default",
    nationalid character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT patient_data_pkey PRIMARY KEY (id),
    CONSTRAINT nationalid_unique UNIQUE (nationalid),
    CONSTRAINT patient_data_gender_check CHECK (gender = ANY (ARRAY['M'::bpchar, 'F'::bpchar]))
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.patient_data
    OWNER to postgres;













-- Table: public.measurements

-- DROP TABLE IF EXISTS public.measurements;

CREATE SEQUENCE IF NOT EXISTS mediciones_id_seq;


CREATE TABLE IF NOT EXISTS public.measurements
(
    id integer NOT NULL DEFAULT nextval('mediciones_id_seq'::regclass),
    patient_id integer,
    measurement_date date,
    series integer,
    pes_bru numeric(10,3),
    ta_cor numeric(7,3),
    humeral numeric(8,3),
    femoral numeric(8,3),
    br_rel numeric(8,3),
    br_fle numeric(8,3),
    cintura numeric(8,3),
    cadera numeric(8,3),
    pant_per numeric(8,3),
    triceps numeric(8,3),
    sub_esc numeric(8,3),
    biceps numeric(8,3),
    cre_ili numeric(8,3),
    sup_esp numeric(8,3),
    abdominal numeric(8,3),
    mus_med numeric(8,3),
    pant_plie numeric(8,3),
    peso_kg numeric(8,3),
    talla numeric(8,3),
    CONSTRAINT mediciones_pkey PRIMARY KEY (id),
    CONSTRAINT uq_measurements_patient_series UNIQUE (patient_id, series),
    CONSTRAINT mediciones_patient_id_fkey FOREIGN KEY (patient_id)
        REFERENCES public.patient_data (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.measurements
    OWNER to postgres;
-- Index: idx_measurements_patient_date

-- DROP INDEX IF EXISTS public.idx_measurements_patient_date;

CREATE INDEX IF NOT EXISTS idx_measurements_patient_date
    ON public.measurements USING btree
    (patient_id ASC NULLS LAST, measurement_date ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_measurements_patient_series_date

-- DROP INDEX IF EXISTS public.idx_measurements_patient_series_date;

CREATE INDEX IF NOT EXISTS idx_measurements_patient_series_date
    ON public.measurements USING btree
    (patient_id ASC NULLS LAST, series ASC NULLS LAST, measurement_date DESC NULLS FIRST)
    TABLESPACE pg_default;
-- Index: idx_measurements_series

-- DROP INDEX IF EXISTS public.idx_measurements_series;

CREATE INDEX IF NOT EXISTS idx_measurements_series
    ON public.measurements USING btree
    (series ASC NULLS LAST)
    TABLESPACE pg_default;