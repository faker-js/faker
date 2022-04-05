export function luhnCheck(number: string): boolean {
  number = number.replace(/\D/g, '');
  let split: string[] | number[] = number.split('');
  split = split.map((num) => parseInt(num));
  const check = split.pop();
  split.reverse();
  split = split.map((num, index) => {
    if (index % 2 === 0) {
      num *= 2;
      if (num > 9) {
        num -= 9;
      }
    }
    return num;
  });
  const sum = split.reduce((prev, curr) => prev + curr);
  return sum % 10 === check;
}
