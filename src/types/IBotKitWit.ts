export interface IBotKitWit {
    // capture(bot, message, convo, next: () => void): void
    heard(bot, message, next: () => void): void
    receive(bot, message, next: () => void): void
    // send(bot, message, next: () => void): void
}