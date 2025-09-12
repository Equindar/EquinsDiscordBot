import { Notifier } from '../types/Notifier';

export class ErrorHandler {
  private notifiers: Notifier[];

  constructor(...notifiers: Notifier[]) {
    this.notifiers = notifiers;
  }

  async handle(error: unknown, context: string): Promise<void> {
    const message = `Fehler in ${context}`;
    for (const notifier of this.notifiers) {
      await notifier.notify(message, error);
    }
  }
}
