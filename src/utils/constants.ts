import { DefaultEventsMap } from "socket.io/dist/typed-events";
export const wahaEndpoint = process.env.WHATSAPP_MIDDLEWARE_ENDPOINT!;

export const stoppedSession = "STOPPED";

export const webhookEndpoint = process.env.WEBHOOK_ENDPOINT!;

export const getDefaultSessionConfig = (userId: string) => {
  return {
    name: userId,
    config: {
      proxy: null,
      webhooks: [
        {
          url: `${webhookEndpoint}/message`,
          events: ["message.any"],
          hmac: null,
          retries: null,
          customHeaders: null,
        },
        {
          url: `${webhookEndpoint}/whatsapp/qr`,
          events: ["state.change"],
          hmac: null,
          retries: null,
          customHeaders: null,
        },
      ],
    },
  };
};
