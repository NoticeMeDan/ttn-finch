# Getting started with TTN-Finch

This guide will walk you through how to install and use TTN-Finch.

## Installation

In order to get started with TTN-Finch, you need the following:
* A machine with [Docker](https://www.docker.com/) and Docker Compose installed.
* A [The Things Stack](https://thethingsstack.io/v3.7.0/) installation running via Docker Compose on the machine.

TTN-Finch is being distributed as two Docker containers, a webservice and a webapp, and depends on a PostgreSQL connection.

In order to install the TTN-Finch integration on your machine, add the following snippet to the `docker-compose.yml` file, containing the configuration for your The Things Stack setup.

```yaml
  finch_postgres:
    image: postgres:12.1-alpine
    container_name: finch_postgres
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=ttn_finch
    expose:
      - 5432

  finch_webservice:
    image: noticemedan/finch-webservice:latest
    container_name: finch.local
    expose:
      - 80
    depends_on:
      - finch_postgres
    environment:
      - DB_HOST=finch_postgres
      - DB_PORT=5432
      - DB_USER=postgres
      - DB_PASS=postgres

  finch_webapp:
    image: noticemedan/finch-webapp:latest
    container_name: finch_webapp
    ports:
      - 8080:80
    depends_on:
      - finch_webservice
```

You can find the latest releases of the webservice and webapp [here](https://hub.docker.com/r/noticemedan/finch-webservice) and [here](https://hub.docker.com/r/noticemedan/finch-webapp).

If you wish to use an exisiting PostgreSQL instance, you can omit that part from the snippet and instead configure the `finch_webservice` environment variables to use your existing database. You do however need to make sure, that an empty `ttn_finch` database exists, before `finch_webservice` connects to it.

By default the webapp will be exposed on port 8080, but you can change this by changing the `ports` on `finch_webapp`.

## Usage

TTN-Finch has been designed around the notion of "Flows" and "EventData". A Flow consists of the following:
* A name
* The application ID of an application in The Things Stack
* A Schedule, in the form of a [Spring Cron Expression](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html)
* A Result, being what you want to do with your data whenever the schedule triggers

An EventData is simply what we have dubbed a message, when it enters the system from the TTN Stack.

It is possible to have multiple Flows per application.

Before you create a flow, you need to have created an application in your The Things Stack, that you want to use.

When this is done, access the `finch_webapp` from your browser, and press "Create new Flow". This should take you to the following screen:

![image](https://user-images.githubusercontent.com/3519438/79569367-c0c92680-80b7-11ea-93d5-f8f342402e2c.png)

Here you will need to enter a number of values, like what you want to name your Flow, and the application ID of the The Things Stack application you want to handle data from. You will then need to write a [Spring Cron Expression](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html), deciding when you want the Flow to trigger. Finally, you need choose what you want to do with your EventData whenever the Flow triggers, configure your chosen Result, and decide whether or not you want to enable the Activity Log for your Flow. From the Activity Log you will be able to see when your Flow has been triggered, as well as additional information from the Result.

When you have configured your Flow, you need to add TTN-Finch as a webhook for your application. To do this, go to the Integrations -> Webhooks part of your application, in The Things Stack.

![image](https://user-images.githubusercontent.com/3519438/79570114-236ef200-80b9-11ea-8a55-cde52df2600f.png)

Here you need to enter the following information:
* The Webhook ID: A name for your webhook
* The Webhook Format: Here you need to choose JSON
* The Base URL: Here you need to type `http://finch.local/webhook`

When this has been entered, you need to check the `Uplink Message` checkbox.  
At the moment TTN-Finch only supports receiving Uplink Messages.

Now you just need to save the webhook, and TTN-Finch will start to receive messages and save them in the database. 

That's all! Now TTN-Finch will trigger your flow whenever your schedule has prescribed, and do with your data what you have configured it to do.