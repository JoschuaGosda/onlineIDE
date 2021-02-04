FROM openjdk:11-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8090
CMD java -jar /app/app.jar