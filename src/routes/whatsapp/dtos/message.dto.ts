export interface WhatsappMessage {
  body: string;
  fromMe: boolean;
  to: string;
  viewed: boolean;
  session: string;
  sentAt: Date;
}

export interface WhatsappChat {
  name: string;
  lastMessage: LastMessage;
  user: string;
  contactImage?: string;
}

export interface LastMessage {
  body: string;
  from: string;
  sentAt: Date;
}
