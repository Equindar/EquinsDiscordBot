import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../types/Command";

export function inGuild(command: Command): Command {
    return {
        ...command,
        async execute(interaction: ChatInputCommandInteraction) {
            if (!interaction.guild) {
                await interaction.reply({
                    content: "Dieser Command ist nur innerhalb eines Servers nutzbar.",
                    ephemeral: true,
                });
                return;
            }

            return command.execute(interaction);
        },
    };
}
