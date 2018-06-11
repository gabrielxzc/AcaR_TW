create table user_rating (
    username varchar2(30) primary key,
    rating int
);

create table instrumente (
    titlu varchar2(128),
    link varchar2(512),
    platforma varchar2(128),
    imagine varchar2(512),
    online_use int
)

insert into instrumente values ('Creately','https://creately.com/Draw-UML-and-Class-Diagrams-Online','Windows Linux MAC','https://assets.pcmag.com/media/images/438383-creately.jpg?width=810&height=456',1);
insert into instrumente values ('Java Decompiler','https://github.com/fesh0r/fernflower ','Windows Linux MAC','https://is4-ssl.mzstatic.com/image/thumb/Purple118/v4/9c/81/6c/9c816c5a-234b-4cea-27c2-c98d964927e3/pr_source.png/300x0w.png',1);
insert into instrumente values('ArgoUML','http://argouml-downloads.tigris.org/argouml-0.34/','https://pbs.twimg.com/profile_images/580415073/argologo200x190_400x400.png',0);
insert into instrumente values('Modelio','https://www.modelio.org/','https://yt3.ggpht.com/a-/ACSszfGpShRo16cFd_7RVTkiQN3yb-xU1-xZmtWiyw=s900-mo-c-c0xffffffff-rj-k-no',0);
insert into instrumente values('Github','https://github.com/','https://image.flaticon.com/icons/svg/25/25231.svg',1);
insert into instrumente values('BitBucket','https://bitbucket.org/','https://cdn.logojoy.com/wp-content/uploads/2017/07/bitbucket_rgb_darkblue_atlassian_1200x630.png',0);
insert into instrumente values('IntelliJ','https://www.jetbrains.com/idea/','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/IntelliJ_IDEA_Logo.svg/2000px-IntelliJ_IDEA_Logo.svg.png',0);