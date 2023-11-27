export interface SetTelegramChatIdInterface {
  (token: string, chatId: number, user: string): Promise<void>;
}
