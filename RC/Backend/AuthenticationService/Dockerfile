FROM openjdk:17-jdk-slim AS build
WORKDIR /RC_AuthenticationService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
COPY src/ src
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /RC_AuthenticationService/target/AuthenticationService-SNAPSHOT.jar AuthenticationService-SNAPSHOT.jar
EXPOSE 8093
CMD ["java","-jar","AuthenticationService-SNAPSHOT.jar"]

