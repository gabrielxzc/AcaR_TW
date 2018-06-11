create table user_rating (
    username varchar2(30) primary key,
    rating int
);

create table cod_sursa (
    titlu varchar2(128),
    platforma varchar2(128),
    link varchar2(512),
    imagine varchar2(512)
);

INSERT INTO cod_sursa VALUES (
    'Label Me',
    'Github',
    'https://github.com/danieltoncu/LabelMe',
    'https://pbs.twimg.com/profile_images/616309728688238592/pBeeJQDQ_400x400.png'
);

INSERT INTO cod_sursa VALUES (
    'Predictii Imobiliare',
    'Github',
    'https://github.com/ronesim/imobiliare-predictie',
    'https://pbs.twimg.com/profile_images/616309728688238592/pBeeJQDQ_400x400.png'
);

INSERT INTO cod_sursa VALUES (
    'Smart House',
    'Github',
    'https://github.com/lupusilviu95/-IP2016-Internet-of-Things-Smart-House',
    'https://pbs.twimg.com/profile_images/616309728688238592/pBeeJQDQ_400x400.png'
);

INSERT INTO cod_sursa VALUES (
    'Sistem Notificari',
    'Github',
    'https://github.com/robert-ciobotaru/Proiect_IP',
    'https://pbs.twimg.com/profile_images/616309728688238592/pBeeJQDQ_400x400.png'
);

INSERT INTO cod_sursa VALUES (
   'Platforma de comparare teme',
   'Github',
   'https://github.com/alexmititelu/IngineriaProgramarii-B3-Proiect',
   'https://pbs.twimg.com/profile_images/616309728688238592/pBeeJQDQ_400x400.png'
);

INSERT INTO cod_sursa VALUES (
   'Timetable maker',
   'Github',
   'https://github.com/sergiuiacob1/Timetable-Maker',
   'https://pbs.twimg.com/profile_images/616309728688238592/pBeeJQDQ_400x400.png'
);

INSERT INTO cod_sursa VALUES (
   'Flowing trip booking saga',
   'Github',
   'https://github.com/flowing/flowing-trip-booking-saga',
   'https://pbs.twimg.com/profile_images/616309728688238592/pBeeJQDQ_400x400.png'
);

