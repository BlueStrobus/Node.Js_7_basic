// Class: RPG 게임 캐릭터 만들기
// 과제 내용:
// 1. RPG 게임에서 사용할 캐릭터 클래스를 설계하세요.
// 2. 캐릭터 클래스는 아래 조건을 만족해야 합니다:
class Character {
    //  캐릭터의 이름, 레벨, 체력, 공격력 속성을 가질 것.
    constructor(name, health, power) {
        this.name = name;
        this.level = 1;
        this.health = health;
        this.power = power;
    }

    // attack 메서드를 구현하여, 호출 시 “<캐릭터 이름>가 공격을 시도합니다!“를 출력할 것.
    attack() {
        console.log(`${this.name}가 공격을 시도합니다!`);
    }

    // heal 메서드를 구현하여, 호출 시 체력이 회복되고 “(이름)의 체력이 (Y)만큼 회복되었습니다.“를 출력할 것.
    heal(Y) {
        this.health += Y;
        console.log(`${this.name}의 체력이 ${Y}만큼 회복되었습니다.`);
    }

    // levelUp 메서드를 구현하여 레벨업을 하면 렌덤으로 체력, 공격력을 추가해줄 것.
    levelUP() {
        this.level++;
        const randomUp = Math.floor(Math.random() * 100);
        this.health += randomUp;
        this.power += randomUp;
    }
}

// 3. 설계한 클래스를 사용하여 3명의 캐릭터 객체를 만드세요.
// (name, level, health, power)
const calyCharacter = new Character("Caly", 100, 30);
const malisaCharacter = new Character("Malisa", 100, 30);
const julCharacter = new Character("Jul", 100, 30);

// 4. 각 캐릭터 객체에서 attack과 heal 메서드를 실행해 보세요.
calyCharacter.heal(100); // Caly의 체력이 100만큼 회복되었습니다.
malisaCharacter.attack(); // Malisa가 공격을 시도합니다!

// 레벡 2  jul의 체력 : 138, 공격력 : 68

console.log(`레벨 ${julCharacter.level} jul의 체력 : ${julCharacter.health}, 공격력 : ${julCharacter.power}`);
// 레벨 1 jul의 체력 : 100, 공격력 : 30

julCharacter.levelUP();
console.log(`레벡 ${julCharacter.level} jul의 체력 : ${julCharacter.health}, 공격력 : ${julCharacter.power}`);
// 레벨 2  jul의 체력 : 138, 공격력 : 68
