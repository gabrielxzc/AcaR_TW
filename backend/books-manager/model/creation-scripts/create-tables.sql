create table user_rating (
    username varchar2(30) primary key,
    rating int
);

create table carti (
    titlu varchar2(128) primary key,
    autor varchar2(128),
    anul_publicarii int,
    link varchar2(512),
    imagine varchar2(512)
);

create table trends (
    titlu varchar2(128), 
    text varchar2(512), 
    rating_boost number(10, 2),
    CONSTRAINT titlu_carte FOREIGN KEY (titlu) REFERENCES carti(titlu)
);

INSERT INTO carti VALUES (
    'Design Patterns, Elements of Reusable Object-Oriented Software', 
    'Erich Gamma, Richard Helm, Ralph Johnson, John Vissides', 
    2004,
    'https://sophia.javeriana.edu.co/~cbustaca/docencia/DSBP-2018-01/recursos/Erich%20Gamma,%20Richard%20Helm,%20Ralph%20Johnson,%20John%20M.%20Vlissides-Design%20Patterns_%20Elements%20of%20Reusable%20Object-Oriented%20Software%20%20-Addison-Wesley%20Professional%20(1994).pdf',
    'http://www.vincehuston.org/dp/gof_cover.jpg'
);

INSERT INTO carti VALUES (
    'Applying UML and Patterns', 
    'Craig Larman', 
    2004,
    'https://aanimesh.files.wordpress.com/2013/09/applying-uml-and-patterns-3rd.pdf',
    'http://images.pearsoned-ema.com/jpeg/large/9780131489066.jpg'
);

INSERT INTO carti VALUES (
    'Software Engineering 8th edition', 
    'Ian Sommerville', 
    2004,
    'http://stst.elia.pub.ro/news/IS/IS_PPT/Software%20engineering%208th%20ed.pdf',
    'https://pictures.abebooks.com/isbn/9780321210265-uk.jpg'
);

INSERT INTO carti VALUES (
    'The Art of Computer Programming', 
    'Donald Knuth',
    1968,
    'http://broiler.astrometry.net/~kilian/The_Art_of_Computer_Programming%20-%20Vl%201.pdf',
    'https://upload.wikimedia.org/wikipedia/en/6/62/ArtOfComputerProgramming.jpg'
);

INSERT INTO carti VALUES (
    'The Hidden Language of Computer Hardware and Software', 
    'Charles Petzold',
    1999,
    'https://bobcarp.files.wordpress.com/2014/07/code-charles-petzold.pdf',
    'https://www.expertlychosen.com/images/1327-code-the-hidden-language-of-computer-hardware-and-software.jpg'
);

INSERT INTO carti VALUES (
    'Clean Code',
    'Robert Martin',
    2008,
    'https://www.investigatii.md/uploads/resurse/Clean_Code.pdf',
    'http://ecx.images-amazon.com/images/I/512NzCU0wfL.jpg'
);

create or replace function rating_boost(p_titlu varchar2)
return number as
    v_rating_boost number(10, 2);
begin
    SELECT rating_boost INTO v_rating_boost FROM trends WHERE titlu like p_titlu;
    return v_rating_boost;
end;

create or replace function user_preference(p_titlu varchar2, p_username varchar2)
return number as
    v_user_preference number;
begin
    SELECT action INTO v_user_preference FROM user_history WHERE username like p_username and titlu like p_titlu;
    return v_user_preference - 3;
end;