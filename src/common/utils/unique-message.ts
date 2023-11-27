export function uniqueMessage(fieldName: string, errorMsg: string): Record<string, string> {
  const message = {};
  message[`${fieldName}`] = errorMsg;
  return message;
}
