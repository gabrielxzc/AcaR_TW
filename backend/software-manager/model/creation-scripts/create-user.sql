CONN / AS SYSDBA	
CREATE USER software_manager IDENTIFIED BY software_manager DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER software_manager QUOTA 100M ON USERS;
GRANT CONNECT TO software_manager;
GRANT CREATE TABLE TO software_manager;
GRANT CREATE VIEW TO software_manager;
GRANT CREATE SEQUENCE TO software_manager;
GRANT CREATE TRIGGER TO software_manager;
GRANT CREATE SYNONYM TO software_manager;
GRANT CREATE PROCEDURE TO software_manager;
disconnect;
