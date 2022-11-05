FROM rabbitmq:latest
COPY rabbitmq.conf /etc/rabbitmq
RUN rabbitmq-plugins enable --offline rabbitmq_peer_discovery_consul
