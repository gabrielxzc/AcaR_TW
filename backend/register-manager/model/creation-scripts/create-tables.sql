create table studenti (
    nume varchar2(30),
    prenume varchar2(60),
    nr_matricol varchar2(16) primary key,
    email varchar2(255) unique,
    este_inregistrat int default 0
);

create table register_tokens (
    token varchar2(64) primary key,
    nr_matricol varchar2(16),
    creation_date date,
    constraint FK_StudentRegister foreign key (nr_matricol) references studenti(nr_matricol)
);
