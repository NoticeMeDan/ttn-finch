FROM openjdk:12

ADD build/distributions/finch-webservice.tar ./
WORKDIR ./finch-webservice
EXPOSE 8080
EXPOSE 6001

ENTRYPOINT ["bin/ttn-finch"]
