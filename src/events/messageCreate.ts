import { Events, Message } from 'discord.js';
import { Event } from '../types/Event';
import { loadAnalyzers } from '../utils/analyzerLoader';

const analyzers = loadAnalyzers();

const event: Event<typeof Events.MessageCreate> = {
  name: Events.MessageCreate,
  once: false,
  async execute(message: Message) {
    // Ignoriere Nachrichten von Bots
    if (message.author.bot) return;

    for (const analyzer of analyzers) {
      try {
        await analyzer.analyze(message);
      } catch (err) {
        console.error(`Fehler im Analyzer "${analyzer.name}":`, err);
      }
    }

    console.log(`${message.author.tag} schrieb: ${message.content}`);
  },
};

export default event;
