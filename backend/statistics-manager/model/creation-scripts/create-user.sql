CONN / AS SYSDBA	
CREATE USER statistics_manager IDENTIFIED BY statistics_manager DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER statistics_manager QUOTA 100M ON USERS;
GRANT CONNECT TO statistics_manager;
GRANT CREATE TABLE TO statistics_manager;
GRANT CREATE VIEW TO statistics_manager;
GRANT CREATE SEQUENCE TO statistics_manager;
GRANT CREATE TRIGGER TO statistics_manager;
GRANT CREATE SYNONYM TO statistics_manager;
GRANT CREATE PROCEDURE TO statistics_manager;
disconnect;
