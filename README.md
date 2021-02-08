# OnlineIDE

To run the OnlineIDE locally  use the application-dev.yml instead of the application.yml file in the api-gateway and the project microservice. The application-dev.yml file can be enabled by writing `spring.profiles.active: "dev"` in the respective application.yml file.  This implies using a H2 database and another GitLab application that redirects to localhost:8000/login. In order to prevent a forwarding error in the api-gateway service it is best to run the microservices by the command `./mvnw spring-boot:run` in the following order:
1. discovery-service
2. ui-service, project-service, compiler-service, darkmode-service
3. api-gateway-service


