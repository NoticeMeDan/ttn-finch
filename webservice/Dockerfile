FROM openjdk:12

ADD build/distributions/ttn-finch-1.0-SNAPSHOT.tar ./
WORKDIR ./ttn-finch-1.0-SNAPSHOT
EXPOSE 8080
EXPOSE 6001

ENTRYPOINT ["bin/ttn-finch"]
