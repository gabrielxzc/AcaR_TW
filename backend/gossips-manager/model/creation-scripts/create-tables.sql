create table user_rating (
    username varchar2(30) primary key,
    rating int
);

create table barfe (
    categorie varchar2(32),
    text varchar2(512),
    imagine varchar2(512)
);

INSERT INTO barfe values ('Examen','Examenul este corectat de profesorul de la seminar','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Profesor, Laborator','Profesorul x puncteaza mai putin in prima parte a semestrului, dar mai mult la proiect','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Proiect','Cel mai bun proiect este premiat de Amazon','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Curs','Se pun uneori puncte bonus la curs pe raspunsuri','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Curs, Examen','Se dau la curs informatii care nu sunt in curs si se pot da la examen','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Profesor, Laborator','Profesorul X poate pune puncte bonus la laborator','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Profesor, Proiect','Profesorul X este interesat mai mult de partea de front-end a proiectului','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Curs','Cursurile predate in prima parte sunt mai interesante','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
INSERT INTO barfe values ('Proiect','Framework-ul Bootstrap este super bun pentru front-end','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlO_fQQ9mZuWaQ8h1Yyi_NXPV1xzLwYP-f1wzu_nsMFyGMm35DR6rnw');
