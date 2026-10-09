--
-- PostgreSQL database dump
--

\restrict bUlaNVFwkYjfZrJreTbniju0jZvHJ2HQGGtnRlXS7T812gUsFQQmVRmGzvTWVmu

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

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
-- Name: catalog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.catalog (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    price numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.catalog_id_seq OWNED BY public.catalog.id;


--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150),
    phone character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- Name: dashboard; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dashboard (
    id integer NOT NULL,
    metric_name character varying(100) NOT NULL,
    metric_value numeric(10,2),
    recorded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: dashboard_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dashboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dashboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dashboard_id_seq OWNED BY public.dashboard.id;


--
-- Name: inquiries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inquiries (
    id integer NOT NULL,
    rfq_number character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150),
    phone character varying(50),
    company character varying(150),
    brand character varying(100),
    model character varying(100),
    message text,
    status character varying(50) DEFAULT 'new'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: inquiries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inquiries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: inquiries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inquiries_id_seq OWNED BY public.inquiries.id;


--
-- Name: inventory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inventory (
    id integer NOT NULL,
    product_id integer,
    quantity integer NOT NULL,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.inventory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.inventory_id_seq OWNED BY public.inventory.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    quotation_id integer,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    price numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: quotations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quotations (
    id integer NOT NULL,
    client_id integer,
    product_id integer,
    quantity integer NOT NULL,
    total numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: quotations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.quotations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: quotations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quotations_id_seq OWNED BY public.quotations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password_hash text NOT NULL,
    role character varying(20) DEFAULT 'client'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: catalog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog ALTER COLUMN id SET DEFAULT nextval('public.catalog_id_seq'::regclass);


--
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- Name: dashboard id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dashboard ALTER COLUMN id SET DEFAULT nextval('public.dashboard_id_seq'::regclass);


--
-- Name: inquiries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inquiries ALTER COLUMN id SET DEFAULT nextval('public.inquiries_id_seq'::regclass);


--
-- Name: inventory id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: quotations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quotations ALTER COLUMN id SET DEFAULT nextval('public.quotations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: catalog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.catalog (id, name, description, price, created_at) FROM stdin;
1	Catalog Item A	Sample catalog entry A	500.00	2026-09-12 22:07:49.339288
2	Catalog Item B	Sample catalog entry B	750.00	2026-09-12 22:07:49.339288
\.


--
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.clients (id, name, email, phone, created_at) FROM stdin;
1	Acme Corp	contact@acme.com	9876543210	2026-09-12 22:07:49.324683
2	Global Traders	info@globaltraders.com	9123456780	2026-09-12 22:07:49.324683
\.


--
-- Data for Name: dashboard; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dashboard (id, metric_name, metric_value, recorded_at) FROM stdin;
1	Monthly Sales	250000.00	2026-09-12 22:07:49.350158
2	Pending Orders	5.00	2026-09-12 22:07:49.350158
3	Inventory Value	500000.00	2026-09-12 22:07:49.350158
\.


--
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inquiries (id, rfq_number, name, email, phone, company, brand, model, message, status, created_at) FROM stdin;
1	EE-RFQ-9087	Milan More	milanmore@yahoo.com		\N	Grasso	\N	Hero Fast RFQ: Make Grasso, Part: test part, Urgency: Immediate Breakdown (24h)	new	2026-09-13 22:20:51.707932
\.


--
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.inventory (id, product_id, quantity, updated_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, quotation_id, status, created_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (id, name, description, price, created_at) FROM stdin;
1	Steel Rod	High quality steel rod	1200.00	2026-09-12 22:07:49.32986
2	Copper Wire	Industrial grade copper wire	800.00	2026-09-12 22:07:49.32986
3	Aluminium Sheet	Lightweight aluminium sheet	1500.00	2026-09-12 22:07:49.32986
\.


--
-- Data for Name: quotations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quotations (id, client_id, product_id, quantity, total, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password_hash, role, created_at) FROM stdin;
999	Admin User	admin@example.com	hashedpassword	admin	2026-09-12 22:07:49.313972
1	Flow Client	flow-1789239793@example.com	$2b$10$IMbv/Zf7/J/szBVoCln1J.3b9fzuxY8FV9YSHtM3FWMySN/W5COLa	client	2026-09-13 00:33:13.938549
3	Test User	test_1789319245298@example.com	$2b$10$DuOgARlLGTD9DVHwZyK5suYf9j.BesvwCN0MrM9dNCU.bSOxgGqUe	client	2026-09-13 22:37:25.535293
4	Test Registration	reg_1789319299767@example.com	$2b$10$itltYhZoDphAiops5MSUEexqzhuTtV1xQ/Odss42TZDEbvLikFaPa	client	2026-09-13 22:38:19.98477
5	Milan Milind More	milanmmore2025@gmail.com	$2b$10$gkRHf3y16toAwuYJtDqd6..461Vc9jeLgnooX/zN8HfXwrUuMnJgW	client	2026-09-13 22:44:18.800252
6	Milan Milind More	milanmmore2026@gmail.com	$2b$10$qug.uNs8PW2.kHRdbEpmdOtW2iLYQ5BL/WqA0uhnslrwWO7ffXSYG	client	2026-09-13 22:44:52.277653
7	Milan Milind More1	milanmmore1@gmail.com	$2b$10$oi31uZiglCG9bsgGxTCmcu2PA3oBmGAc1LQztOKVD7XimUA57dz1a	client	2026-09-13 22:50:49.421939
8	Milan Milind More1	milanmmore2@gmail.com	$2b$10$gvhIt5oxn700jCzLXy0sxeJhd4992Oguuip6GWxkF39Sw4bdPONVm	client	2026-09-13 22:56:04.48773
9	Milan Milind More1	milanmmore3@gmail.com	$2b$10$cQen0Ott7HJypwpipRYJM.iVcTbTJjLLzFBaTAJ4SbHGcM.j.9P2W	client	2026-09-13 23:00:01.285971
2	Milan Milind More	milanmmore@gmail.com	$2b$10$s3uu54mUQqpBnZmL/5oODOZieJqrcwrsWDrue1WsGq6I07N9PJaQK	client	2026-09-13 22:35:29.928646
\.


--
-- Name: catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.catalog_id_seq', 2, true);


--
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.clients_id_seq', 2, true);


--
-- Name: dashboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dashboard_id_seq', 3, true);


--
-- Name: inquiries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inquiries_id_seq', 1, true);


--
-- Name: inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.inventory_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- Name: quotations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quotations_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- Name: catalog catalog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT catalog_pkey PRIMARY KEY (id);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- Name: dashboard dashboard_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dashboard
    ADD CONSTRAINT dashboard_pkey PRIMARY KEY (id);


--
-- Name: inquiries inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (id);


--
-- Name: inquiries inquiries_rfq_number_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_rfq_number_key UNIQUE (rfq_number);


--
-- Name: inventory inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: quotations quotations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT quotations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: inventory inventory_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT inventory_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: orders orders_quotation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_quotation_id_fkey FOREIGN KEY (quotation_id) REFERENCES public.quotations(id);


--
-- Name: quotations quotations_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT quotations_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id);


--
-- Name: quotations quotations_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quotations
    ADD CONSTRAINT quotations_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

\unrestrict bUlaNVFwkYjfZrJreTbniju0jZvHJ2HQGGtnRlXS7T812gUsFQQmVRmGzvTWVmu

