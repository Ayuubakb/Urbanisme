FROM openjdk:17-jdk-slim AS build
WORKDIR /AuthenticationService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
RUN ./mvnw dependency:go-offline
COPY src/ src 
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /AuthenticationService/target/AuthenticationService-SNAPSHOT.jar AuthenticationService-SNAPSHOT.jar
EXPOSE 8083
CMD ["java","-jar","AuthenticationService-SNAPSHOT.jar"]

