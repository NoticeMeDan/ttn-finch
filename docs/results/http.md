# HTTP Result

The HTTP Result sends EventData messages to a remote URL via a series of POST requests.
Each request contains a JSON array with a number of EventData JSON objects.
It allows you to define the maximum number of EventData messages in a given request, in order to compensate for flaky connections and reduce the amount of lost data, if a request corrupts on it's way to the remote URL.  

The HTTP Result requires the following values:
* Size: The maximum number of EventData messages per request
* URL: The remote URL where you want to receive the data