import { Client, Events, MessageReaction, MessageReactionEventDetails, PartialMessageReaction, PartialUser, User } from "discord.js"
import { Event } from "../types/Event"

const event: Event<typeof Events.MessageReactionAdd> = {
    name: Events.MessageReactionAdd,
    once: false,
    execute: function (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser, details: MessageReactionEventDetails): void {
        throw new Error("Function not implemented.");
        reaction.emoji.name
    },
};

export default event;