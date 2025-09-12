import { Client, GatewayIntentBits, Collection, Partials } from "discord.js";
import { loadEvents } from "./handlers/eventHandler";
import { loadCommands } from "./handlers/commandHandler";
import { Command } from "./types/Command";
import { ErrorHandler } from "./handlers/errorHandler";
import { ConsoleNotifier } from "./addons/notifiers/ConsoleNotifier";
import { DiscordNotifier } from "./addons/notifiers/DiscordNotifier";
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
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// --- Error handling
export const errorHandler = new ErrorHandler(
  new ConsoleNotifier(),
  new DiscordNotifier(client, process.env.ERROR_CHANNEL_ID!)
);


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

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

