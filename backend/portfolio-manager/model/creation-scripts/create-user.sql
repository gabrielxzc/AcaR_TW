CONN / AS SYSDBA	
CREATE USER portfolio_manager IDENTIFIED BY portfolio_manager DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
ALTER USER portfolio_manager QUOTA 100M ON USERS;
GRANT CONNECT TO portfolio_manager;
GRANT CREATE TABLE TO portfolio_manager;
GRANT CREATE VIEW TO portfolio_manager;
GRANT CREATE SEQUENCE TO portfolio_manager;
GRANT CREATE TRIGGER TO portfolio_manager;
GRANT CREATE SYNONYM TO portfolio_manager;
GRANT CREATE PROCEDURE TO portfolio_manager;
disconnect;