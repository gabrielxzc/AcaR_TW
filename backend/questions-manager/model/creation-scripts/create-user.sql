CONN / AS SYSDBA	
CREATE USER questions_manager IDENTIFIED BY questions_manager DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER questions_manager QUOTA 100M ON USERS;
GRANT CONNECT TO questions_manager;
GRANT CREATE TABLE TO questions_manager;
GRANT CREATE VIEW TO questions_manager;
GRANT CREATE SEQUENCE TO questions_manager;
GRANT CREATE TRIGGER TO questions_manager;
GRANT CREATE SYNONYM TO questions_manager;
GRANT CREATE PROCEDURE TO questions_manager;
disconnect;
