FROM openjdk:17-jdk-slim AS build
WORKDIR /RC_userEspace
COPY .mvn/ .mvn
COPY --chmod=744 ./mvnw .
COPY ./pom.xml .
COPY src/ src
RUN ./mvnw clean install -DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /RC_userEspace/target/UserEspace-SNAPSHOT.jar UserEspace-SNAPSHOT.jar
EXPOSE 8094
CMD ["java","-jar","UserEspace-SNAPSHOT.jar"]


