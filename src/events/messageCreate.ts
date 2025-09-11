import { Events, Message } from "discord.js";
import { Event } from "../types/Event";

const event: Event<typeof Events.MessageCreate> = {
    name: Events.MessageCreate,
    once: false,
    execute(message: Message) {
        // Ignoriere Nachrichten von Bots
        if (message.author.bot) return;

        console.log(`${message.author} schrieb: ${message.content}`);
    },
};

export default event;