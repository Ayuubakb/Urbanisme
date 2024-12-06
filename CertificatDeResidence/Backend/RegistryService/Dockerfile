FROM openjdk:17-jdk-slim AS build
WORKDIR /RegistryService
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
COPY src/ src 
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /RegistryService/target/RegistryService-SNAPSHOT.jar RegistryService-SNAPSHOT.jar
EXPOSE 8761
CMD ["java","-jar","RegistryService-SNAPSHOT.jar"]

