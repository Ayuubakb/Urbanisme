--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-16 15:38:35

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

DROP DATABASE IF EXISTS "Urbanisme";
--
-- TOC entry 4896 (class 1262 OID 16732)
-- Name: Urbanisme; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Urbanisme" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'French_Morocco.1252';


ALTER DATABASE "Urbanisme" OWNER TO postgres;

\connect "Urbanisme"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 24964)
-- Name: demandes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.demandes (
    id_demande integer NOT NULL,
    status character varying(255),
    date_demande timestamp(6) without time zone,
    id_zone integer,
    nom_emetteur character varying(255),
    prenom_emetteur character varying(255),
    address character varying(255),
    cin character varying(255),
    payment_reference character varying(255),
    email character varying(255),
    telephone character varying(255),
    file_id integer,
    motif_refus character varying(255) DEFAULT ''::character varying
);


ALTER TABLE public.demandes OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 25000)
-- Name: demandes_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.demandes_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.demandes_seq OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24927)
-- Name: employes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employes (
    id_employe integer NOT NULL,
    nom character varying(255),
    prenom character varying(255),
    telephone character varying(255),
    cin character varying(255),
    type_employe character varying(255),
    password character varying(255),
    num_immatriculation character varying(255),
    id_zone integer
);


ALTER TABLE public.employes OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24977)
-- Name: employes_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.employes_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.employes_seq OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24988)
-- Name: files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.files (
    id_file integer NOT NULL,
    fe_contenttype character varying(255),
    cpr_contenttype character varying(255),
    de_contenttype character varying(255),
    cp_contenttype character varying(255),
    facture_electricite oid,
    certif_priorite oid,
    certif_presence oid,
    document_emploie oid
);


ALTER TABLE public.files OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 25001)
-- Name: files_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.files_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_seq OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24934)
-- Name: region; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.region (
    id_region integer NOT NULL,
    nom_region character varying(255)
);


ALTER TABLE public.region OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 24978)
-- Name: region_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.region_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.region_seq OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16746)
-- Name: users_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_seq OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24939)
-- Name: ville; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ville (
    id_ville integer NOT NULL,
    nom_ville character varying(255),
    id_region integer
);


ALTER TABLE public.ville OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24979)
-- Name: ville_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ville_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ville_seq OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24949)
-- Name: zones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zones (
    id_zone integer NOT NULL,
    id_ville integer,
    nom_zone character varying(255)
);


ALTER TABLE public.zones OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 24980)
-- Name: zones_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.zones_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.zones_seq OWNER TO postgres;

--
-- TOC entry 4725 (class 2606 OID 24970)
-- Name: demandes demandes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demandes
    ADD CONSTRAINT demandes_pkey PRIMARY KEY (id_demande);


--
-- TOC entry 4717 (class 2606 OID 24933)
-- Name: employes employes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employes
    ADD CONSTRAINT employes_pkey PRIMARY KEY (id_employe);


--
-- TOC entry 4727 (class 2606 OID 24994)
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);


--
-- TOC entry 4719 (class 2606 OID 24938)
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id_region);


--
-- TOC entry 4721 (class 2606 OID 24943)
-- Name: ville ville_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ville
    ADD CONSTRAINT ville_pkey PRIMARY KEY (id_ville);


--
-- TOC entry 4723 (class 2606 OID 24953)
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (id_zone);


--
-- TOC entry 4731 (class 2606 OID 25063)
-- Name: demandes fk_file; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demandes
    ADD CONSTRAINT fk_file FOREIGN KEY (file_id) REFERENCES public.files(id_file);


--
-- TOC entry 4729 (class 2606 OID 24944)
-- Name: ville fk_region; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ville
    ADD CONSTRAINT fk_region FOREIGN KEY (id_region) REFERENCES public.region(id_region);


--
-- TOC entry 4730 (class 2606 OID 24954)
-- Name: zones fk_ville; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT fk_ville FOREIGN KEY (id_ville) REFERENCES public.ville(id_ville);


--
-- TOC entry 4728 (class 2606 OID 24959)
-- Name: employes fk_zone; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employes
    ADD CONSTRAINT fk_zone FOREIGN KEY (id_zone) REFERENCES public.zones(id_zone);


--
-- TOC entry 4732 (class 2606 OID 24971)
-- Name: demandes fk_zone_demande; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demandes
    ADD CONSTRAINT fk_zone_demande FOREIGN KEY (id_zone) REFERENCES public.zones(id_zone);

INSERT INTO public.region (id_region, nom_region) 
VALUES 
    (1, 'tanger-tetouan-houceima'),
    (2, 'casablanca-setate'),
    (3, 'rabat-sale'),
    (4, 'marrakech-safi');


INSERT INTO public.ville (id_ville, nom_ville, id_region) 
VALUES 
    -- Cities for Tanger-Tetouan-Houceima
    (1, 'Tanger', 1),
    (2, 'Tetouan', 1),
    (3, 'Hoceima', 1),

    -- Cities for Casablanca-Settat
    (4, 'Casablanca', 2),
    (5, 'Settat', 2),
    (6, 'Mohammedia', 2),

    -- Cities for Rabat-Sale
    (7, 'Rabat', 3),
    (8, 'Sale', 3),
    (9, 'Temara', 3),

    -- Cities for Marrakech-Safi
    (10, 'Marrakech', 4),
    (11, 'Safi', 4),
    (12, 'Essaouira', 4);


INSERT INTO public.zones (id_zone, id_ville, nom_zone) 
VALUES
    -- Zones for Tanger (id_ville = 1)
    (1, 1, 'Zone Industrielle Tanger Free Zone'),
    (2, 1, 'Zone Portuaire Tanger'),

    -- Zones for Tetouan (id_ville = 2)
    (3, 2, 'Zone Industrielle Tetouan Park'),
    (4, 2, 'Zone Urbaine Tetouan Centre'),

    -- Zones for Hoceima (id_ville = 3)
    (5, 3, 'Zone Urbaine Hoceima Nord'),
    (6, 3, 'Zone Portuaire Hoceima'),

    -- Zones for Casablanca (id_ville = 4)
    (7, 4, 'Zone Industrielle Aïn Sebaa'),
    (8, 4, 'Zone Portuaire Casablanca'),

    -- Zones for Settat (id_ville = 5)
    (9, 5, 'Zone Agricole Settat Ouest'),
    (10, 5, 'Zone Industrielle Settat Est'),

    -- Zones for Mohammedia (id_ville = 6)
    (11, 6, 'Zone Portuaire Mohammedia'),
    (12, 6, 'Zone Résidentielle Mohammedia'),

    -- Zones for Rabat (id_ville = 7)
    (13, 7, 'Zone Administrative Rabat'),
    (14, 7, 'Zone Résidentielle Agdal'),

    -- Zones for Sale (id_ville = 8)
    (15, 8, 'Zone Résidentielle Sale El Jadida'),
    (16, 8, 'Zone Industrielle Sale'),

    -- Zones for Temara (id_ville = 9)
    (17, 9, 'Zone Résidentielle Harhoura'),
    (18, 9, 'Zone Urbaine Temara Centre'),

    -- Zones for Marrakech (id_ville = 10)
    (19, 10, 'Zone Touristique Guéliz'),
    (20, 10, 'Zone Résidentielle Menara'),

    -- Zones for Safi (id_ville = 11)
    (21, 11, 'Zone Industrielle Safi Port'),
    (22, 11, 'Zone Résidentielle Safi'),

    -- Zones for Essaouira (id_ville = 12)
    (23, 12, 'Zone Portuaire Essaouira'),
    (24, 12, 'Zone Touristique Essaouira Centre');


INSERT INTO public.employes (id_employe, nom, prenom, telephone, cin, type_employe, password, num_immatriculation, id_zone) 
VALUES 
    (3, 'Akoubri', 'Ayoub', '0700821400', 'EE69140', 'Mqadem', '$2a$10$CYYlmhU6GksgjutmfUC4/.KQNhweya38XoXTfrR1N/WoWnYmip/0a', 'T01', 1),
    (102, 'ahmed', 'mustafa', '0700821400', 'EE6940', 'Caïd', '$2a$10$8rqbcYko/NH8v638oWbk/.M7Dv.7i4zAf.5/0qY8vMYp8I7pvQpuq', 'T02', 1);


-- Completed on 2024-12-16 15:38:35

--
-- PostgreSQL database dump complete
--

