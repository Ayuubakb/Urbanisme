--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-09 01:30:58

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
DROP DATABASE IF EXISTS Urbanisme_Residence;

CREATE DATABASE Urbanisme_Residence;

\c Urbanisme_Residence

CREATE TABLE public.demandes (
    id_demande integer NOT NULL,
    status character varying(255),
    date_demande date,
    id_zone integer,
    nom_emetteur character varying(255),
    prenom_emetteur character varying(255),
    address character varying(255),
    cin character varying(255),
    facture_electricite character varying(255),
    certif_propriete character varying(255),
    document_emploie character varying(255),
    certif_presence character varying(255),
    payment_reference character varying(255),
    email character varying(255),
    telephone character varying(10)
);


ALTER TABLE public.demandes OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24927)
-- Name: employes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.employes (
    id_employe integer NOT NULL,
    nom character varying(255),
    prenom character varying(255),
    telephone character varying(10),
    cin character varying(15),
    type_employe character varying(25),
    password character varying(255),
    num_immatriculation character varying(255),
    id_zone integer
);


ALTER TABLE public.employes OWNER TO postgres;

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
-- TOC entry 4875 (class 0 OID 24964)
-- Dependencies: 222
-- Data for Name: demandes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.demandes (id_demande, status, date_demande, id_zone, nom_emetteur, prenom_emetteur, address, cin, facture_electricite, certif_propriete, document_emploie, certif_presence, payment_reference, email, telephone) FROM stdin;
\.


--
-- TOC entry 4871 (class 0 OID 24927)
-- Dependencies: 218
-- Data for Name: employes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.employes (id_employe, nom, prenom, telephone, cin, type_employe, password, num_immatriculation, id_zone) FROM stdin;
\.


--
-- TOC entry 4872 (class 0 OID 24934)
-- Dependencies: 219
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.region (id_region, nom_region) FROM stdin;
\.


--
-- TOC entry 4873 (class 0 OID 24939)
-- Dependencies: 220
-- Data for Name: ville; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ville (id_ville, nom_ville, id_region) FROM stdin;
\.


--
-- TOC entry 4874 (class 0 OID 24949)
-- Dependencies: 221
-- Data for Name: zones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zones (id_zone, id_ville, nom_zone) FROM stdin;
\.


--
-- TOC entry 4881 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seq', 51, true);


--
-- TOC entry 4720 (class 2606 OID 24970)
-- Name: demandes demandes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demandes
    ADD CONSTRAINT demandes_pkey PRIMARY KEY (id_demande);


--
-- TOC entry 4712 (class 2606 OID 24933)
-- Name: employes employes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employes
    ADD CONSTRAINT employes_pkey PRIMARY KEY (id_employe);


--
-- TOC entry 4714 (class 2606 OID 24938)
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id_region);


--
-- TOC entry 4716 (class 2606 OID 24943)
-- Name: ville ville_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ville
    ADD CONSTRAINT ville_pkey PRIMARY KEY (id_ville);


--
-- TOC entry 4718 (class 2606 OID 24953)
-- Name: zones zones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT zones_pkey PRIMARY KEY (id_zone);


--
-- TOC entry 4722 (class 2606 OID 24944)
-- Name: ville fk_region; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ville
    ADD CONSTRAINT fk_region FOREIGN KEY (id_region) REFERENCES public.region(id_region);


--
-- TOC entry 4723 (class 2606 OID 24954)
-- Name: zones fk_ville; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zones
    ADD CONSTRAINT fk_ville FOREIGN KEY (id_ville) REFERENCES public.ville(id_ville);


--
-- TOC entry 4721 (class 2606 OID 24959)
-- Name: employes fk_zone; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.employes
    ADD CONSTRAINT fk_zone FOREIGN KEY (id_zone) REFERENCES public.zones(id_zone);


--
-- TOC entry 4724 (class 2606 OID 24971)
-- Name: demandes fk_zone_demande; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.demandes
    ADD CONSTRAINT fk_zone_demande FOREIGN KEY (id_zone) REFERENCES public.zones(id_zone);


-- Completed on 2024-12-09 01:30:58

--
-- PostgreSQL database dump complete
--

