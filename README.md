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
*** not needed ***
docker pull adrian31s/app-store-ui:1.0.1
docker pull adrian31s/app-store:1.0.1
docker pull postgres:latest
*** not needed ***


docker network create app-store-network

docker run -d --name app_postgres -p 30200:5432 -e POSTGRES_DB=appstore -e POSTGRES_USER=store-user -e POSTGRES_PASSWORD=store-password --network app-store-network postgres:latest

### wait 30 sek 

docker run -d -e DB_URL=jdbc:postgresql://app_postgres/appstore -e DB_PASSWORD=store-password -e DB_USER=store-user -e HIBERNATE_GENERATION=update -p 30001:8080 --network app-store-network adrian31s/app-store:1.0.1

docker run -d -p 30002:80 --network app-store-network adrian31s/app-store-ui:1.0.1





# hosts:
frontend: http://localhost:30002
backend: http://localhost:30001
swaggerUi: http://localhost:30001/q/swagger-ui/

