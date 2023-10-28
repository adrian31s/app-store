# app-store
version controll 

	backend: 
		java 17
		maven 3.8.8
	
	frontend:
		npm 10.1.0
		node v20.9.0
		ng  16.2.7


# run (need docker and kubectl) 
./microservices/script.sh 
	- postgres:
		user: store-user
		password: store-password
		database: appstore
		port: 30200
		host: localhost
		url: jdbc:postgresql://localhost:30200/appstore

# manual run
backend (app-store/backend/app-store/): 
	mvn quarkus:dev -DDB_USER=store-user -DDB_PASSWORD=store-password -DDB_URL=jdbc:postgresql://localhost:30200/appstore

frontend (app-store/frontend/app-store-ui): 
	npm start
