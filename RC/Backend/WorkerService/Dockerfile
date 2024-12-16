FROM openjdk:17-jdk-slim AS build
WORKDIR /RC_workerService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
COPY src/ src
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /RC_workerService/target/WorkerService-SNAPSHOT.jar WorkerService-SNAPSHOT.jar
EXPOSE 8095
CMD ["java","-jar","WorkerService-SNAPSHOT.jar"]
