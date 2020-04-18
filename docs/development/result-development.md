# Result Development

In order to develop a TTN-Finch Result, it is a prerequisite that you have some experience with Java/Kotlin, as the system is developed in [Kotlin](https://kotlinlang.org/) and [Spring Boot](https://spring.io/projects/spring-boot).

TTN-Finch has been designed to make it as easy as possible to create new Results. An example of this, is that the system is built in such a way, that you do not need to edit the webapp in any way, when you create a new Result.

In this guide we will go through creating `ExampleResult`, an incredibly simple Result which merely writes the payload of all new EventData to the Activity Log, as well as a message configured by the user when setting up the Result.

## Adding a new Result

A Result consists of three things:
* A constant in the `ResultKind` enum
* A schema data class, describing what configuration the Result needs
* A class extending the `Result<T: Any>` abstract class, `T` being your schema, implementing the Result's logic
* A description, used for presenting the Result in the webapp

First off, we'll add an `EXAMPLE` constant to the `com.noticemedan.finch.dto.ResultKind` enum:
```kotlin
enum class ResultKind {
    HTTP,
    EXAMPLE
}
```

Next up, we will create our schema containing the message we want to be able to write to the activity log. We will create a data class `com.noticemedan.finch.result.schema.ExampleSchema` containing the following:
```kotlin
data class ExampleSchema (
        @JsonSchema(
                title = "Message",
                description = "The message we want to write to the Activity Log",
                required = true
        )
        var message: String
)
```

This schema will later be used to generate a [JSON Schema](https://json-schema.org/), that the webapp will read and create the Result configuration UI from. Therefore we use the `@JsonSchema` annotation to let us write a description for a field, decide whether it is required or not, etc.

Now that we have a schema, we can create our Result class. We will do this by creating a class `com.noticemedan.finch.result.ExampleResult`, extending the `Result<T: Any>` abstract class:
```kotlin
@Component
class ExampleResult(
        flowDao: FlowDao, 
      	eventDataDao: EventDataDao,
        activityLogHelper: ActivityLogHelper, 
        objectMapper: ObjectMapper
) : Result<ExampleSchema>(flowDao, eventDataDao, activityLogHelper, objectMapper, ExampleSchema::class) {
    override fun process(flow: Flow, config: ExampleSchema, eventData: Set<EventData>) {
        TODO("Not yet implemented")
    }

    override fun getDescription(): ResultDescription {
        TODO("Not yet implemented")
    }
}
```

Let's walk through it. The `Result<T: Any>` constructor looks like this:
```kotlin
Result <T: Any> (
        private val flowDao: FlowDao,
        private val eventDataDao: EventDataDao,
        private val activityLogHelper: ActivityLogHelper,
        private val objectMapper: ObjectMapper,
        private val schemaClass: KClass<T>
)
```

It needs the `FlowDao` to get the `Flow` entity from the database whenever the result triggers, as well as the `EventDataDao` to get all the latest `EventData` entities. It needs the `ActivityLogHelper` to write entries to the Activity Log whenever the Result starts and stops. Lastly, it needs the `ObjectMapper` and `KClass<T>` to read the configured `ExampleSchema` JSON object from the `Flow` entity.

The arguments in our `ExampleResult` will be injected via [Dependency Injection](https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-factory-collaborators). We annotate our `ExampleResult` with the [`@Component`](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/stereotype/Component.html) annotation, such that we can also inject our Result into other classes.

It also requires us to implement two methods, `process` and `getDescription`, so let us do that. First off, `getDescription`:

```kotlin
override fun getDescription(): ResultDescription {
    return ResultDescription(
            ResultKind.EXAMPLE,
            "Example Result",
            "Writes the EventData payload and a message to the Activity Log",
            JsonSchemaUtil.generateJsonSchema(ExampleSchema::class)
    )
}
```

The ResultDescription is what the webapp will receive, and use to build the UI for choosing and configuring Results. Here we give it our `EXAMPLE` enum constant, the name of our result, a description of what it does, and lastly we generate a JSON Schema from our `ExampleSchema` class, using the static `JsonSchemaUtil.generateJsonSchema` method.

Now let's implement the `process` method:
```kotlin
@Transactional(propagation = Propagation.MANDATORY)
override fun process(flow: Flow, config: ExampleSchema, eventData: Set<EventData>) {
    eventData.forEach {
        activityLogHelper.addLogLineToFlow(config.message, flow)
        activityLogHelper.addLogLineToFlow("Payload: ${it.framePayload}", flow)
    }
}
```

As we are adding to the Activity Log, and thus writing to the database, we need to wrap our method in a Spring `@Transactional` annotation. As the `Result` abstract class is running the method inside of a database transaction proxy, we add the `Propagation.MANDATORY` propagation to it, such that it uses the already existing transaction proxy, instead of creating a new one. 

In the body of the `process` method, we simply iterate through all the `EventData` we have received since last time the Result was triggered, and add 2 log lines: one for our message, and one with our `EventData` payload.

The finished Result should look like this:
```kotlin
@Component
class ExampleResult (
        flowDao: FlowDao,
        eventDataDao: EventDataDao,
        private val activityLogHelper: ActivityLogHelper,
        objectMapper: ObjectMapper
) : Result<ExampleSchema>(flowDao, eventDataDao, activityLogHelper, objectMapper, ExampleSchema::class) {

    override fun getDescription(): ResultDescription {
        return ResultDescription(
                ResultKind.EXAMPLE,
                "Example Result",
                "Writes the EventData payload and a message to the Activity Log",
                JsonSchemaUtil.generateJsonSchema(ExampleSchema::class)
        )
    }

    @Transactional(propagation = Propagation.MANDATORY)
    override fun process(flow: Flow, config: ExampleSchema, eventData: Set<EventData>) {
        eventData.forEach {
            activityLogHelper.addLogLineToFlow(config.message, flow)
            activityLogHelper.addLogLineToFlow(it.framePayload, flow)
        }
    }
}
```

Now we only have *one* thing left. We need to register the `ExampleResult` in the `ResultService`. We will do this by injecting the `ExampleResult` into the `ResultService` constructor, and adding it to the `resultMap`:
```kotlin
@Service
class ResultService (
        ...
        httpResult: HttpResult,
        exampleResult: ExampleResult
        ...
) {
	...

    private val resultMap: Map<ResultKind, Result<*>> = mapOf(
            ResultKind.HTTP to httpResult,
            ResultKind.EXAMPLE to exampleResult
    )
    
    ...
}
```

And we're done!

## Testing your Result manually
The TTN-Finch development environment includes a TTN Stack, that can be used for testing your result, before deploying it to a real life scenario.

Start by running the bootstrap script: `./bootstrap.sh`  
This initializes the database and the TTN stack, and creates an admin user for you.
Enter your admin user's password when prompted.

Now you need to compile the TTN-Finch webservice and webapp. To do this, simple run: `./gradlew build` from the project root.

When this is done, run `docker-compose up`, and access the TTN Stack at [https://localhost](https://localhost).  
The TTN-Finch webapp can be accessed at [http://localhost:8080](http://localhost:8080).

If you do not have a gateway hooked up that can supply you with some test data, see the guide in [Other guides](#other-guides) for simulating uplink requests.

## Testing your Result with Unit testing
TTN-Finch includes a unit test suite for the `HTTP` result out of the box, that you can use for inspiration. See the `com.noticemedan.finch.result.HttpResultTest` class.

## Other guides
Here you will find other helpful guides, useful when developing TTN-Finch Results:  
* [How to simulate uplink messages for an application](./simulate-device-messages.md)