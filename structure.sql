--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.5
-- Dumped by pg_dump version 9.5.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: cities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE cities (
    id integer NOT NULL,
    name character varying,
    country_id integer
);


--
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE cities_id_seq OWNED BY cities.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    commentable_type character varying NOT NULL,
    commentable_id integer NOT NULL,
    body character varying(500) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE comments_id_seq OWNED BY comments.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE countries (
    id integer NOT NULL,
    name character varying
);


--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE countries_id_seq OWNED BY countries.id;


--
-- Name: error_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE error_logs (
    id integer NOT NULL,
    platform character varying,
    stack text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: error_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE error_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: error_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE error_logs_id_seq OWNED BY error_logs.id;


--
-- Name: gyms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE gyms (
    id integer NOT NULL,
    name character varying NOT NULL,
    facebook_id bigint,
    graph_token character varying,
    owner_id integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    about character varying,
    description character varying,
    website character varying,
    picture character varying,
    location_id integer,
    cover character varying,
    votes_count integer DEFAULT 0,
    rating double precision DEFAULT 0.0,
    hours character varying,
    parking character varying
);


--
-- Name: gyms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE gyms_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gyms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE gyms_id_seq OWNED BY gyms.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE locations (
    id integer NOT NULL,
    street character varying,
    latitude double precision,
    longitude double precision,
    city_id integer,
    gym_id integer
);


--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE locations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE locations_id_seq OWNED BY locations.id;


--
-- Name: mailers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mailers (
    id integer NOT NULL,
    gym_id integer,
    body text,
    receivers integer DEFAULT 0,
    created_at timestamp without time zone,
    send timestamp without time zone
);


--
-- Name: mailers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE mailers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mailers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE mailers_id_seq OWNED BY mailers.id;


--
-- Name: mailers_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE mailers_users (
    mailer_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE members (
    id integer NOT NULL,
    membership_level integer,
    approved boolean DEFAULT false,
    user_id integer,
    gym_id integer,
    created_at timestamp without time zone,
    mailing boolean DEFAULT false NOT NULL
);


--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE members_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE members_id_seq OWNED BY members.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE posts (
    id integer NOT NULL,
    author_id integer NOT NULL,
    title character varying(55) NOT NULL,
    heading character varying NOT NULL,
    body text NOT NULL,
    votes_count integer DEFAULT 0,
    rating double precision DEFAULT 0.0,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE posts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE posts_id_seq OWNED BY posts.id;


--
-- Name: posts_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE posts_tags (
    post_id integer NOT NULL,
    tag_id integer NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE schema_migrations (
    version character varying NOT NULL
);


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tags (
    id integer NOT NULL,
    name character varying
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tags_id_seq OWNED BY tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE users (
    id integer NOT NULL,
    name character varying NOT NULL,
    phone character varying,
    email character varying,
    facebook_id bigint,
    graph_token character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    cover character varying,
    picture character varying,
    is_trainer boolean DEFAULT false,
    votes_count integer DEFAULT 0,
    rating double precision DEFAULT 0.0,
    about character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE votes (
    id integer NOT NULL,
    user_id integer NOT NULL,
    voteable_type character varying NOT NULL,
    voteable_id integer NOT NULL,
    rating double precision DEFAULT 0.0 NOT NULL
);


--
-- Name: votes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: votes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE votes_id_seq OWNED BY votes.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY cities ALTER COLUMN id SET DEFAULT nextval('cities_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments ALTER COLUMN id SET DEFAULT nextval('comments_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY countries ALTER COLUMN id SET DEFAULT nextval('countries_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY error_logs ALTER COLUMN id SET DEFAULT nextval('error_logs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY gyms ALTER COLUMN id SET DEFAULT nextval('gyms_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY locations ALTER COLUMN id SET DEFAULT nextval('locations_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailers ALTER COLUMN id SET DEFAULT nextval('mailers_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY members ALTER COLUMN id SET DEFAULT nextval('members_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts ALTER COLUMN id SET DEFAULT nextval('posts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tags ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY votes ALTER COLUMN id SET DEFAULT nextval('votes_id_seq'::regclass);


--
-- Name: ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: cities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- Name: comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: countries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: error_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY error_logs
    ADD CONSTRAINT error_logs_pkey PRIMARY KEY (id);


--
-- Name: gyms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY gyms
    ADD CONSTRAINT gyms_pkey PRIMARY KEY (id);


--
-- Name: locations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: mailers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailers
    ADD CONSTRAINT mailers_pkey PRIMARY KEY (id);


--
-- Name: members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: index_cities_on_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_cities_on_country_id ON cities USING btree (country_id);


--
-- Name: index_cities_on_name_and_country_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_cities_on_name_and_country_id ON cities USING btree (name, country_id);


--
-- Name: index_comments_on_commentable_type_and_commentable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_commentable_type_and_commentable_id ON comments USING btree (commentable_type, commentable_id);


--
-- Name: index_comments_on_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_created_at ON comments USING btree (created_at);


--
-- Name: index_comments_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_comments_on_user_id ON comments USING btree (user_id);


--
-- Name: index_countries_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_countries_on_name ON countries USING btree (name);


--
-- Name: index_gyms_on_facebook_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_gyms_on_facebook_id ON gyms USING btree (facebook_id);


--
-- Name: index_gyms_on_location_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_gyms_on_location_id ON gyms USING btree (location_id);


--
-- Name: index_gyms_on_owner_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_gyms_on_owner_id ON gyms USING btree (owner_id);


--
-- Name: index_locations_on_city_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_locations_on_city_id ON locations USING btree (city_id);


--
-- Name: index_locations_on_gym_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_locations_on_gym_id ON locations USING btree (gym_id);


--
-- Name: index_mailers_on_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailers_on_created_at ON mailers USING btree (created_at);


--
-- Name: index_mailers_on_gym_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_mailers_on_gym_id ON mailers USING btree (gym_id);


--
-- Name: index_mailers_users_on_mailer_id_and_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_mailers_users_on_mailer_id_and_user_id ON mailers_users USING btree (mailer_id, user_id);


--
-- Name: index_members_on_gym_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_members_on_gym_id ON members USING btree (gym_id);


--
-- Name: index_members_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_members_on_user_id ON members USING btree (user_id);


--
-- Name: index_members_on_user_id_and_gym_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_members_on_user_id_and_gym_id ON members USING btree (user_id, gym_id);


--
-- Name: index_posts_on_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_posts_on_author_id ON posts USING btree (author_id);


--
-- Name: index_posts_tags_on_post_id_and_tag_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_posts_tags_on_post_id_and_tag_id ON posts_tags USING btree (post_id, tag_id);


--
-- Name: index_users_on_facebook_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_on_facebook_id ON users USING btree (facebook_id);


--
-- Name: index_votes_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_votes_on_user_id ON votes USING btree (user_id);


--
-- Name: index_votes_on_user_id_and_voteable_type_and_voteable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_votes_on_user_id_and_voteable_type_and_voteable_id ON votes USING btree (user_id, voteable_type, voteable_id);


--
-- Name: index_votes_on_voteable_type_and_voteable_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_votes_on_voteable_type_and_voteable_id ON votes USING btree (voteable_type, voteable_id);


--
-- Name: fk_rails_03de2dc08c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY comments
    ADD CONSTRAINT fk_rails_03de2dc08c FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: fk_rails_07fc65c276; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts_tags
    ADD CONSTRAINT fk_rails_07fc65c276 FOREIGN KEY (post_id) REFERENCES posts(id);


--
-- Name: fk_rails_1997ccaabe; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY posts_tags
    ADD CONSTRAINT fk_rails_1997ccaabe FOREIGN KEY (tag_id) REFERENCES tags(id);


--
-- Name: fk_rails_1e76c57a8f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailers
    ADD CONSTRAINT fk_rails_1e76c57a8f FOREIGN KEY (gym_id) REFERENCES gyms(id);


--
-- Name: fk_rails_4228970668; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailers_users
    ADD CONSTRAINT fk_rails_4228970668 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: fk_rails_7b9a64127d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY mailers_users
    ADD CONSTRAINT fk_rails_7b9a64127d FOREIGN KEY (mailer_id) REFERENCES mailers(id);


--
-- Name: fk_rails_c9b3bef597; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY votes
    ADD CONSTRAINT fk_rails_c9b3bef597 FOREIGN KEY (user_id) REFERENCES users(id);


--
-- Name: fk_rails_e9daf2c3d9; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY gyms
    ADD CONSTRAINT fk_rails_e9daf2c3d9 FOREIGN KEY (location_id) REFERENCES locations(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO schema_migrations (version) VALUES ('20161012124255'), ('20161015134449'), ('20161019114527'), ('20161026143629'), ('20161027133149'), ('20161027133158'), ('20161027133204'), ('20161027134412'), ('20161027194215'), ('20161027194558'), ('20161027200436'), ('20161030130500'), ('20161111164931'), ('20161111165224'), ('20161111173550'), ('20161112183203'), ('20161112183738'), ('20161113171757'), ('20161120123510'), ('20161124130649'), ('20161124134829'), ('20161124143606'), ('20161124144100'), ('20161130115232'), ('20161201105913'), ('20161201110531'), ('20161201200838'), ('20161201205024'), ('20161201210100'), ('20161202200355'), ('20161202201638'), ('20161208131426'), ('20161208133402'), ('20161214120927'), ('20161218181333'), ('20161218181644'), ('20170103164135'), ('20170103172259'), ('20170104165644'), ('20170105075542'), ('20170105083351'), ('20170107150230');


