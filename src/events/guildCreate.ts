import { Events, Guild } from 'discord.js';
import { Event } from '../types/Event';

const event: Event<typeof Events.GuildCreate> = {
  name: Events.GuildCreate,
  once: false, // mehrfach möglich (jedes Mal, wenn der Bot einer Guild beitritt)
  execute(guild: Guild) {
    console.log(`Server '${guild.name}' (ID: ${guild.id}) beigetreten.`);
  },
};

export default event;
