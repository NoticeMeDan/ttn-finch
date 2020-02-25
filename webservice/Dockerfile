FROM openjdk:12

ADD build/distributions/webservice-1.0-SNAPSHOT.tar ./
WORKDIR ./webservice-1.0-SNAPSHOT
EXPOSE 8080
EXPOSE 6001

ENTRYPOINT ["bin/webservice"]
