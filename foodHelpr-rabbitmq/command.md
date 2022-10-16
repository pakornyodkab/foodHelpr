# To run RabbitMQ via Docker.
docker run -d --name foodHelprNotification -p 5672:5672 -p 8085:15672 -d rabbitmq:3-management