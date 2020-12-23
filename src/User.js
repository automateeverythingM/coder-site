class User {
    constructor(name, scores) {
        this.name = name;
        this.scores = scores;
    }

    increment() {
        this.scores++;
    }

    decrement() {
        this.scores--;
    }
}
//bad all functions are in user object not shared between objects
function userFunc(name, scores) {
    const newUser = {};

    newUser.name = name;
    newUser.scores = scores;

    newUser.increment = function () {
        newUser.scores++;
    };

    newUser.decrement = function () {
        newUser.scores--;
    };

    return newUser;
}

function UserFunc(name, scores) {
    const newUser = Object.create(userFunctions);

    newUser.name = name;
    newUser.scores = scores;

    return newUser;
}

const userFunctions = {
    increment: function () {
        this.scores++;
    },
    decrement: function () {
        this.scores--;
    },
};

// it must be used with new key word

function UserFunction(name, scores) {
    this.name = name;
    this.scores = scores;
}

UserFunction.prototype.increment = function () {
    this.scores++;
};

UserFunction.prototype.decrement = function () {
    this.scores++;
};

const user1 = new UserFunction("Marko", 9);

let set = new Set("hey");

function userCreator(name, scores) {
    this.name = name;
    this.scores = scores;
}

userCreator.prototype.increment = function () {
    this.scores++;
};

userCreator.prototype.sayHello = function () {
    console.log("Hello");
};

function paidUserCreator(paidName, paidScore, accountBalance) {
    userCreator.call(this, paidName, paidScore);

    this.accountBalance = accountBalance;
}

paidUserCreator.prototype.increaseBalance = function () {
    this.accountBalance++;
};

paidUserCreator.prototype = Object.create(userCreator.prototype);

function game(name, scores) {
    this.name = name;
    this.scores = scores;
}

game.prototype.increment = function () {
    this.scores++;
};

function paidGameUser(pname, pscore, pbalance) {
    game.call(this, pname, pscore);
    this.pbalance = pbalance;
}
paidGameUser.prototype = Object.create(game.prototype);

paidGameUser.prototype.incrementBalance = function () {
    this.pbalance++;
};

let paidGame = new paidGameUser("marko", 25, 85);

paidGame.increment();
