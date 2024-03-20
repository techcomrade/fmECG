# How to run server-web
1. Install mysql server community via link https://dev.mysql.com/downloads/installer/
2. the first init mysql, should change security of mysql workbench by run query `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';` (change "yourpassword" to your password, note: please remember this)
1. change 'DB_PASSWORD' in env file to your local sql password
2. run 'npm run migration' to migration sql 
3. run 'npm start' to run server-web