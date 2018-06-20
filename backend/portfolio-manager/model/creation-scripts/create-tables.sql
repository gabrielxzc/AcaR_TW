create table carti (
    username varchar2(50) ,
    titlu varchar2(128) ,
    autor varchar2(128),
    anul_publicarii int,
    link varchar2(512),
    imagine varchar2(512),
    materie VARCHAR2(128) ,
    primary key(username,titlu)
);