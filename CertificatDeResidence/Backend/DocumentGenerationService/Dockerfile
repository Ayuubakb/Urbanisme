FROM openjdk:17-jdk-slim AS build
WORKDIR /DocumentGenerationService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
RUN ./mvnw dependency:go-offline
COPY src/ src
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /DocumentGenerationService/target/DocumentGenerationService-SNAPSHOT.jar DocumentGenerationService-SNAPSHOT.jar
EXPOSE 8087
CMD ["java","-jar","DocumentGenerationService-SNAPSHOT.jar"]

