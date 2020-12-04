# PayU payment plugin
This plugin provides additional handling for payu payments.
Plugin exposes REST endpoints:
- GET /payu/url/:orderId - get a payment url link by orderId
- GET /payu/status/:orderId - get a payment status by orderId

## Entry point
Entry point for plugin is a /src/index.js file. It contains a template function
for api plugin.

## Usage
- Get link
```shell script
curl -X GET "http://localhost:8080/api/vendor/payu/url/{{orderId}}"
```

- Get status
```shell script
curl -X GET "http://localhost:8080/api/vendor/payu/status/{{orderId}}"
```
