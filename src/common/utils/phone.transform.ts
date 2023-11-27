export function phoneTransform(phone: string): string {
  const regex = new RegExp(/\D/g);
  return phone.replace(regex, '');
}
