import { Events, Guild } from 'discord.js';
import { Event } from '../types/Event';
import { logger } from '../utils/logger';

const event: Event<typeof Events.GuildCreate> = {
  name: Events.GuildCreate,
  once: false, // mehrfach möglich (jedes Mal, wenn der Bot einer Guild beitritt)
  execute(guild: Guild) {
    logger.info(`Server '${guild.name}' (ID: ${guild.id}) beigetreten.`);
  },
};

export default event;
