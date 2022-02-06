const sayHello = (name: string) => {
  return `Hello, ${name}!`;
};

// 受け取った値を出力
const printLine = (text: string, breakline: boolean = true) => {
  process.stdout.write(text + (breakline ? "\n" : ""));
};

// 対話用の関数
const promptInput = async (text: string) => {
  printLine(`\n${text}\n> `, false);
  const input: string = await new Promise((resolve) =>
    process.stdin.once("data", (data) => resolve(data.toString()))
  );

  return input.trim();
};

class HitAndBlow {
  answerSource: string[];
  answer: string[];
  tryCount: number;

  constructor() {
    this.answerSource = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    this.answer = [];
    this.tryCount = 0;
  }
}

process.stdout.write(sayHello("Michael Jackson"));

(async () => {
  const hitAndBlow = new HitAndBlow();
})();
