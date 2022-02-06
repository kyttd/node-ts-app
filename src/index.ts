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
  private readonly answerSource = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  private answer: string[] = [];
  private tryCount = 0;

  setting() {
    const answerLength = 3;

    while (this.answer.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length);
      const selectedItem = this.answerSource[randNum];
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem);
      }
    }
  }

  async play() {
    const inputArr = (
      await promptInput("「,」区切りで3つの数字を入力してください")
    ).split(",");

    if (!this.validate(inputArr)) {
      printLine("無効な入力です。");
      await this.play();
      return;
    }
    const result = this.check(inputArr);

    if (result.hit !== this.answer.length) {
      // 不正解だったら続行
      printLine(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`);
      this.tryCount += 1;
      await this.play();
    } else {
      // 正解だったら終了
      this.tryCount += 1;
    }
  }

  private check(input: string[]) {
    let hitCount = 0;
    let blowCount = 0;

    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1;
      } else if (this.answer.includes(val)) {
        blowCount += 1;
      }
    });

    return {
      hit: hitCount,
      blow: blowCount,
    };
  }

  end() {
    printLine(`正解です！ \n試行回数： ${this.tryCount}回`);
    process.exit();
  }

  private validate(inputArr: string[]) {
    const isLengthValid = inputArr.length === this.answer.length;
    const isAllAnswerSourceOption = inputArr.every((val) =>
      this.answerSource.includes(val)
    );
    const isAllDifferentValues = inputArr.every(
      (val, i) => inputArr.indexOf(val) === i
    );

    return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues;
  }
}

process.stdout.write(sayHello("Michael Jackson"));

(async () => {
  const hitAndBlow = new HitAndBlow();
  hitAndBlow.setting();
  await hitAndBlow.play();
  hitAndBlow.end();
})();
