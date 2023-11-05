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

# hosts:
frontend: http://localhost:30002
backend: http://localhost:30001
swaggerUi: http://localhost:30001/q/swagger-ui/

# manual run
frontend (app-store/frontend/app-store-ui | runs on http://localhost:4200):
	npm start 
