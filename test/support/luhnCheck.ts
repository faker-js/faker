export function luhnCheck(ccNumber: string): boolean {
  ccNumber = ccNumber.replace(/\s+/g, '').replace(/-/g, '');
  let sum = 0;
  let alternate = false;
  for (let i = ccNumber.length - 1; i >= 0; i--) {
    let n = parseInt(ccNumber.substring(i, i + 1));
    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}
