create table sessions (
	token varchar2(64) primary key,
	username varchar2(30) unique,
	creation_date date
);
