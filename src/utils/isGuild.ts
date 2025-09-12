import { ChatInputCommandInteraction } from 'discord.js';
import { Command } from '../types/Command';

export function isGuild(guildIdentifier: string) {
  return (command: Command): Command => ({
    ...command,
    async execute(interaction: ChatInputCommandInteraction) {
      if (!interaction.guild) {
        await interaction.reply({
          content: 'Dieser Command kann nur innerhalb eines Servers genutzt werden.',
          ephemeral: true,
        });
        return;
      }

      const matches =
        interaction.guild.id === guildIdentifier || interaction.guild.name === guildIdentifier;

      if (!matches) {
        await interaction.reply({
          content: `Dieser Command ist server-spezifisch für **${guildIdentifier}**.`,
          ephemeral: true,
        });
        return;
      }

      return command.execute(interaction);
    },
  });
}
