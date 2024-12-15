FROM openjdk:17-jdk-slim AS build
WORKDIR /geographyService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
RUN ./mvnw dependency:go-offline
COPY src/ src
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /geographyService/target/GeographyService-SNAPSHOT.jar GeographyService-SNAPSHOT.jar
EXPOSE 8085
CMD ["java","-jar","GeographyService-SNAPSHOT.jar"]


