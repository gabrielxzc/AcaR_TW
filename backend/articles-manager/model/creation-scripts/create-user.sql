CONN / AS SYSDBA	
CREATE USER articles_manager IDENTIFIED BY articles_manager DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER articles_manager QUOTA 100M ON USERS;
GRANT CONNECT TO articles_manager;
GRANT CREATE TABLE TO articles_manager;
GRANT CREATE VIEW TO articles_manager;
GRANT CREATE SEQUENCE TO articles_manager;
GRANT CREATE TRIGGER TO articles_manager;
GRANT CREATE SYNONYM TO articles_manager;
GRANT CREATE PROCEDURE TO articles_manager;
disconnect;
