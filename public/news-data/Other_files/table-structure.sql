CREATE TABLE public.economic_news_data (
    id_ec_data integer NOT NULL,
    numb integer,
    publication_date timestamp with time zone NOT NULL,
    publication_time time without time zone NOT NULL,
    actual_value numeric(10,4),
    expected_value numeric(10,4),
    previous_value numeric(10,4),
    acronimus character varying(100),
    id_new_name integer NOT NULL,
    import_value character varying(30),
    frequency character varying(20),
    CONSTRAINT economic_news_data_frequency_check CHECK (((frequency)::text = ANY ((ARRAY['diaria'::character varying, 'semanal'::character varying, 'quincenal'::character varying, 'mensual'::character varying, 'trimestral'::character varying, 'otro'::character varying])::text[])))
);



CREATE TABLE public.news_name (
    id_new_name integer NOT NULL,
    new_name character varying(200) NOT NULL,
    new_ac character varying(50) DEFAULT NULL::character varying,
    new_value character varying(50) DEFAULT NULL::character varying,
    new_site character varying(100)
);