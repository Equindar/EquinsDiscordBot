import { Command } from '../types/Command';
import { ChatInputCommandInteraction } from 'discord.js';

export function isServerOwner(command: Command): Command {
  return {
    ...command,
    async execute(interaction: ChatInputCommandInteraction) {
      if (!interaction.guild) {
        await interaction.reply({
          content: 'Dieser Command kann nur in einer Guild genutzt werden.',
          ephemeral: true,
        });
        return;
      }

      const isOwner = interaction.user.id === interaction.guild.ownerId;
      if (!isOwner) {
        await interaction.reply({
          content: 'Nur der Server-Owner darf diesen Command ausführen.',
          ephemeral: true,
        });
        return;
      }

      return command.execute(interaction);
    },
  };
}
