import { Client, GatewayIntentBits, Collection } from "discord.js";
import { loadEvents } from "./handlers/eventHandler";
import { loadCommands } from "./handlers/commandHandler";
import { Command } from "./types/Command";
import dotenv from "dotenv";

// --- Init
dotenv.config();
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error('Missing enviroment variables');
}

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, Command>;
  }
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


(async () => {
  await loadEvents(client);
  await loadCommands(client);
  try {
    await client.login(DISCORD_TOKEN);
  }
  catch (error) {
    console.error(error);
  }
})();

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
});
