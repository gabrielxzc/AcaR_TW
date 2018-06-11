create table user_rating (
    username varchar2(30) primary key,
    rating int
);

create table articole (
    titlu varchar2(128),
    autor varchar2(128),
    link varchar2(512),
    data_publicare varchar2(32),
    imagine varchar2(512)
);

insert into articole values('GDPR','Abdallah Abu-Ghazaleh','https://softwareengineeringdaily.com/2018/06/07/gdpr-behind-the-curtains-of-we-updated-our-privacy-policy-email-floods/','June 7 2018','https://i1.wp.com/softwareengineeringdaily.com/wp-content/uploads/2018/06/GDPR.jpg?zoom=2&resize=730%2C389');
insert into articole values('Journal of Systems and Software','Christian Manteuffel, Paris Avgeriou, Roelof Hamberg','https://www.sciencedirect.com/science/article/pii/S0164121218301110','October 2018','https://ars.els-cdn.com/content/image/X01641212.jpg');
insert into articole values('Career Paths for Programmers','John Bennett, Jr.','http://www.developerdotstar.com/mag/articles/programmer_career.html','August 21, 2006','https://2.bp.blogspot.com/-SyYsE6lCBK4/WpbnmkKnvjI/AAAAAAAAFG4/iALBir1-WU0NzVTf-83eo3MB0kvaHZliQCLcBGAs/s1600/ad_logo_twitter_card.png');
insert into articole values('The Gravity of Kubernetes','Jeff Crablar','https://softwareengineeringdaily.com/2018/01/13/the-gravity-of-kubernetes/','January 13 2018','https://i1.wp.com/softwareengineeringdaily.com/wp-content/uploads/2018/01/pasted-image-0.png?zoom=2&resize=469%2C250');
insert into articole values('Our editorial','Jeff Crablar','https://softwareengineeringdaily.com/2017/02/05/our-editorial-philosophy/','June 11 2018','https://i2.wp.com/softwareengineeringdaily.com/wp-content/uploads/2017/02/SEDeverywhere.png?zoom=2&resize=730%2C389');
insert into articole values('Poker and Software Engineering','Jeff Crablar','https://softwareengineeringdaily.com/2016/02/12/10-philosophies-for-developers/','February 12 2016','https://i1.wp.com/cdn7.pokertrikz.com/wp-content/uploads/HUD-stats.jpg?zoom=1.25&resize=550%2C401');
insert into articole values('Competition in the Open Source Ecosystem','Jeff Crablar','https://softwareengineeringdaily.com/2016/03/10/competition-in-the-open-source-ecosystem/','March 10 2016','https://i0.wp.com/softwareengineeringdaily.com/wp-content/uploads/2016/02/Contributions2011.png?zoom=2&resize=730%2C389');
insert into articole values('Teaching Tech','Harry de Quetteville','https://www.telegraph.co.uk/technology/teaching-tech/','20 March 2018','https://cf.eip.telegraph.co.uk/embeds/technology-intelligence/img/part2/1.gif');
