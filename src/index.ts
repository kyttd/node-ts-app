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

process.stdout.write(sayHello("Michael Jackson"));

(async () => {
  const name = await promptInput("名前を入力してください");
  console.log(name);
  const age = await promptInput("年齢を入力してください");
  console.log(age);
  process.exit();
})();
