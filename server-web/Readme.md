# How to run server-web
1. Install mysql server community via link https://dev.mysql.com/downloads/installer/
2. In the first init mysql, should change security of mysql workbench by run query `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';` (change "your_password" is your password config when install MySQL server, note: please remember this)
3. Change 'DB_PASSWORD' in .env file to your local sql password
4. Run 'npm run migration' to migration sql 
5. Run 'npm start' to run server-web

## Note
Password for all of account is "123456a@"

<!-- Run -->
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sparclab';
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'sparclab';
FLUSH PRIVILEGES;

