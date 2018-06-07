CONN / AS SYSDBA	
CREATE USER register_manager IDENTIFIED BY register_manager DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER register_manager QUOTA 100M ON USERS;
GRANT CONNECT TO register_manager;
GRANT CREATE TABLE TO register_manager;
GRANT CREATE VIEW TO register_manager;
GRANT CREATE SEQUENCE TO register_manager;
GRANT CREATE TRIGGER TO register_manager;
GRANT CREATE SYNONYM TO register_manager;
GRANT CREATE PROCEDURE TO register_manager;
disconnect;
