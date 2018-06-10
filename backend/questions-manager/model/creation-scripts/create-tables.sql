create table questions (
    id int primary key,
    text varchar2(512),
    resource_type varchar2(128)
);


INSERT INTO questions VALUES (1, 'Cat de mult iti place sa te documentezi folosind cartile?', 'books');
INSERT INTO questions VALUES (2,'Cat de des citesti articole online?','articles');
INSERT INTO questions VALUES (3,'Cat de mult iti manifesti interesul in legatura cu instrumentele software?','software');
INSERT INTO questions VALUES (4,'Cat de usor iti este sa intelegi problemele uitandu-te pe codul sursa scris de alte persoane?','code');
INSERT INTO questions VALUES (5,'Cat de sociabil, deschis te consideri?','people');
INSERT INTO questions VALUES (6,'Cat de mult obisnuiesti sa te increzi in zvonurile lansate de colegii tai?','gossips');
