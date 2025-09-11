import { Client, Events } from 'discord.js';
import { Event } from '../types/Event';

const event: Event<typeof Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    console.log(`Client '${client.user?.tag}' eingeloggt.`);

    console.log("Client-Cache (Server):");
    client.guilds.cache.forEach(guild => {
      console.log(`- ${guild.name} (ID: ${guild.id})`);
    });
  },
};

export default event;
