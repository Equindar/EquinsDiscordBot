import { readdirSync } from 'fs';
import path from 'path';
import { MessageAnalyzer } from '../types/MessageAnalyzer';

export function loadAnalyzers(): MessageAnalyzer[] {
  const analyzersPath = path.join(__dirname, '..', 'addons', 'analyzers');
  const files = readdirSync(analyzersPath).filter((f) => f.endsWith('.ts') || f.endsWith('.js'));

  const analyzers: MessageAnalyzer[] = [];

  for (const file of files) {
    const filePath = path.join(analyzersPath, file);
    // dynamischer Import
    const module = require(filePath);
    // alle Exports prüfen (damit shareAnalyzer UND keywordAnalyzer möglich sind)
    for (const key in module) {
      analyzers.push(module[key] as MessageAnalyzer);
      console.log(`Analyzer geladen: ${module[key].name}`);
    }
  }

  return analyzers;
}
