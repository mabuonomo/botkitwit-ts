export interface IBotKitWit {
    heard(bot: any, message: any, next: () => void): void;
    receive(bot: any, message: any, next: () => void): void;
}
