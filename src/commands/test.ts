import { SlashCommandBuilder } from 'discord.js';
import { Command } from '../types/Command';
import { isGuild } from '../utils/isGuild';

const { DISCORD_SERVER_ID } = process.env;

let testCommand: Command = {
    data: new SlashCommandBuilder().setName('test').setDescription('Nur in ausführbar'),
    async execute(interaction) {
        await interaction.reply('✅ Richtig! Dieser Command darf hier ausgeführt werden.');
    },
};

testCommand = isGuild(DISCORD_SERVER_ID!)(testCommand);

export default testCommand;
