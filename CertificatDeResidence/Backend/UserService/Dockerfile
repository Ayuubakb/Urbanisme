FROM openjdk:17-jdk-slim AS build
WORKDIR /userService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
COPY src/ src 
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /userService/target/UserService-SNAPSHOT.jar UserService-SNAPSHOT.jar
EXPOSE 8084
CMD ["java","-jar","UserService-SNAPSHOT.jar"]


