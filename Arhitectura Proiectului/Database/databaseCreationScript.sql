CREATE TABLE studenti(
    nr_matricol VARCHAR2(16),
    email VARCHAR2(256) UNIQUE NOT NULL,
    PRIMARY KEY (nr_matricol)
);
/

CREATE TABLE conturi(
    username VARCHAR2(32),
    password VARCHAR2(64) NOT NULL,
    email VARCHAR2(256) NOT NULL,
    PRIMARY KEY (username),
    FOREIGN KEY (email) REFERENCES studenti(email)
);
/

CREATE TABLE materii(
    id INTEGER,
    titlu VARCHAR2(32) NOT NULL,
    an INTEGER NOT NULL,
    semestru INTEGER NOT NULL,
    link_pagina_curs VARCHAR2(256),
    PRIMARY KEY (id)
);
/

CREATE TABLE profesori(
    id INTEGER,
    nume VARCHAR2(32) NOT NULL,
    prenume VARCHAR2(64) NOT NULL,
    PRIMARY KEY (id)
);
/

CREATE TABLE materii_profesori(
    profId INTEGER,
    materieId INTEGER,
    PRIMARY KEY (profId, materieId),
    FOREIGN KEY (profId) REFERENCES profesori(id),
    FOREIGN KEY (materieId) REFERENCES materii(id)
);
/

CREATE TABLE carti(
    id INTEGER,
    titlu VARCHAR2(50) NOT NULL,
    rating NUMBER(1,2) NOT NULL,
    number_of_people_that_rated INTEGER NOT NULL,
    an_publicatie INTEGER,
    link VARCHAR2(256),
    materieId INTEGER,
    isValid NUMBER(1) NOT NULL,
    added_date TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (materieId) REFERENCES materii(id)
);
/

CREATE TABLE autori(
    id INTEGER,
    nume VARCHAR2(32) NOT NULL,
    prenume VARCHAR2(64) NOT NULL,
    PRIMARY KEY (id)
);
/

CREATE TABLE autori_carti(
    autorId INTEGER,
    carteId INTEGER,
    PRIMARY KEY (autorId, carteId),
    FOREIGN KEY (autorId) REFERENCES autori(id),
    FOREIGN KEY (carteId) REFERENCES carti(id)
);
/

CREATE TABLE documentatii_online(
    id INTEGER, 
    titlu VARCHAR2(50) NOT NULL,
    link VARCHAR2(256) NOT NULL,
    materieId INTEGER,
    isValid NUMBER(1) NOT NULL,
    added_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (materieId) REFERENCES materii(id)
);
/

CREATE TABLE instrumente_software(
    id INTEGER,
    titlu VARCHAR2(50) NOT NULL,
    link VARCHAR2(256) NOT NULL,
    materieId INTEGER,
    isValid NUMBER(1) NOT NULL,
    added_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (materieId) REFERENCES materii(id)
);
/

CREATE TABLE proiecte(
    id INTEGER,
    titlu VARCHAR2(50) NOT NULL,
    link VARCHAR2(256) NOT NULL,
    materieId INTEGER,
    isValid NUMBER(1) NOT NULL,
    added_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (materieId) REFERENCES materii(id)
);
/

CREATE TABLE proiecte_studenti(
    proiectId INTEGER,
    email VARCHAR2(256),
    PRIMARY KEY (proiectId, email),
    FOREIGN KEY (proiectId) REFERENCES proiecte(id),
    FOREIGN KEY (email) REFERENCES studenti(email)
);
/

CREATE TABLE depozite_cod_sursa(
    id INTEGER,
    titlu VARCHAR2(50) NOT NULL,
    link VARCHAR2(256) NOT NULL,
    isValid NUMBER(1) NOT NULL,
    materieId INTEGER,
    added_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (materieId) REFERENCES materii(id)
);
/

CREATE TABLE persoane_importante(
    id INTEGER,
    nume VARCHAR2(32) NOT NULL,
    prenume VARCHAR2(64) NOT NULL,
    email VARCHAR2(256) NOT NULL,
    isValid NUMBER(1) NOT NULL,
    materieId INTEGER,
    added_date TIMESTAMP NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (materieId) REFERENCES materii(id)
);
/

CREATE TABLE ponturi(
    id INTEGER,
    text VARCHAR2(400) NOT NULL,
    materieId INTEGER,
    added_date TIMESTAMP NOT NULL,
    username VARCHAR2(32),
    PRIMARY KEY (id),
    FOREIGN KEY (materieId) REFERENCES materii(id),
    FOREIGN KEY (username) REFERENCES conturi(username)
);
/