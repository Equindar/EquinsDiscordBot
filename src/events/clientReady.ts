import { Client, Events } from "discord.js";
import { Event } from "../types/Event";

const event: Event<typeof Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`Client '${client.user?.tag}' ist eingelogged!`);
  },
};

export default event;
