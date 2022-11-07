const MissionUtils = require("@woowacourse/mission-utils");
const Computer = require("./Computer");
const EdgeCase = require("./EdgeCase");
const Compare = require("./Compare");
class App {
  constructor() {
    this.CORRECT = "3개의 숫자를 모두 맞히셨습니다! 게임 종료";
    this.computer = new Computer().createNumber();
    this.edgeCase = new EdgeCase();
    this.compare = new Compare();
  }
  play() {
    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    this.start();
  }
  start() {
    const computer = this.computer;
    let user = [];
    let result = "";
    MissionUtils.Console.readLine("숫자를 입력해주세요: ", (answer) => {
      if (this.edgeCase.isValid(answer)) {
        answer.split("").forEach((x) => user.push(+x));
        result = this.compare.printHint(computer, user);
        MissionUtils.Console.print(result);
        if (result.split("\n")[1] == this.CORRECT) {
          this.restartOrShutdown();
        } else this.start();
      }
    });
  }
  restartOrShutdown() {
    MissionUtils.Console.readLine(
      "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.",
      (answer) => {
        if (answer === "1") {
          this.computer = new Computer().createNumber();
          this.start();
        }
        if (answer === "2") {
          MissionUtils.Console.print("게임 종료");
          MissionUtils.Console.close();
        }
        if (answer !== "1" && answer !== "2") this.restartOrShutdown();
      }
    );
  }
}
const app = new App();
app.play();
module.exports = App;
