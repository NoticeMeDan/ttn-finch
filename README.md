<p align="center">
    <img src="https://user-images.githubusercontent.com/3519438/75177718-019b6380-5737-11ea-9362-72da2d09e535.png" alt="Finch" height="200" />
</p>
<h2 align="center">TTN-Finch</h2>

TTN-Finch is an extendable "store-and-action" integration, built for [The Things Stack](https://thethingsstack.io/) setups in constrained network environments. It allows you to store all the incoming uplink traffic in a database, and do what you see fit with it, on a set schedule.

An example of use could be, that your The Things Stack setup resides in a remote location, where it is only possible to get an internet connection every other Friday. In order to facilitate automatic retrieval of the uplink data, you install the TTN-Finch integration and configure it forward the data to your server via the [HTTP Result](./docs/results/http.md) with a schedule of every other Friday at 4 PM. When this has been configured, your incoming uplink data will be stored in a database, and forwarded to you on your wanted schedule. Nice and simple.

The integration has been built in such a way, that it is very easy to extend the system with another Result, such that the integration can better support the needs of the individual, through the support of the community.

TTN-Finch has been designed around the notion of "Flows". A Flow consists of the following:
* A name
* The application ID of an application in The Things Stack
* A Schedule, in the form of a [Spring Cron Expression](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/scheduling/support/CronSequenceGenerator.html)
* A Result, being what you want to do with your data whenever the schedule triggers

## Getting started
For information on how to get started with TTN-Finch, [click here](./docs/getting-started.md).

## Result development
The TTN-Finch webservice is built with Spring Boot and Kotlin.
For information on how to get started with developing your own Result, [click here](./docs/development/result-development.md).
