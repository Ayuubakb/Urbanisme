FROM openjdk:17-jdk-slim AS build
WORKDIR /RC_GatewayService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw ./
COPY ./pom.xml .
COPY src/ src
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /RC_GatewayService/target/GatewayService-SNAPSHOT.jar GatewayService-SNAPSHOT.jar
EXPOSE 8092
CMD ["java","-jar","GatewayService-SNAPSHOT.jar"]

