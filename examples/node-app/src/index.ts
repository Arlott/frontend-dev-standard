function greet(name: string): string {
  return `Hello, ${name}!`;
}

const message = greet('World');
// eslint-disable-next-line no-console
console.log(message);
