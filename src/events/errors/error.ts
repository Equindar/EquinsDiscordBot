import { Events, Message } from "discord.js";
import { Event } from "../../types/Event";

const event: Event<typeof Events.Error> = {
    name: Events.Error,
    execute: function (error: Error): void {
        throw new Error("Function not implemented.");
    }
};

export default event;