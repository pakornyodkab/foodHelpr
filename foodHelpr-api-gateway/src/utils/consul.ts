import * as Consul from 'consul';
import { config } from 'dotenv';

config();

export default async (serviceName: string) => {
  const consul = new Consul({
    host: process.env.CONSUL_HOST,
    port: process.env.CONSUL_PORT,
  });

  const serviceList = await consul.agent.service.list();
  let service = serviceList[serviceName];

  if (!service) {
    Object.keys(serviceList).forEach((key) => {
      if (key.includes(serviceName)) {
        service = serviceList[key];
      }
    });
  }

  return {
    host: service.Address,
    port: service.Port,
  };
};
