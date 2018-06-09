CONN / AS SYSDBA	
CREATE USER subjects_manager IDENTIFIED BY subjects_manager DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER subjects_manager QUOTA 100M ON USERS;
GRANT CONNECT TO subjects_manager;
GRANT CREATE TABLE TO subjects_manager;
GRANT CREATE VIEW TO subjects_manager;
GRANT CREATE SEQUENCE TO subjects_manager;
GRANT CREATE TRIGGER TO subjects_manager;
GRANT CREATE SYNONYM TO subjects_manager;
GRANT CREATE PROCEDURE TO subjects_manager;
disconnect;
