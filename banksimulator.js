


const readline = require("readline");


let balance = 100; 


function checkBalance(amount) {
  return new Promise((resolve, reject) => {
    if (balance >= amount) {
      resolve("Balance is enough");
    } else {
      reject("Insufficient funds");
    }
  });
}


function deductAmount(amount) {
  return new Promise((resolve, reject) => {
    if (balance >= amount) {
      balance -= amount;
      resolve("Amount deducted");
    } else {
      reject("Insufficient funds during deduction");
    }
  });
}


function confirmTransaction() {
  return new Promise((resolve, reject) => {
    // 10% chance of failure
    if (Math.random() < 0.1) {
      reject("Confirmation failed");
    } else {
      resolve("Transaction complete");
    }
  });
}


function transfer(amount) {
  checkBalance(amount)
    .then(() => deductAmount(amount))
    .then(() => confirmTransaction())
    .then((message) => {
      console.log(message);
      rl.close();
    })
    .catch((error) => {
      console.error("Error:", error);
      rl.close();
    });
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Your current balance is: $" + balance);

rl.question("Enter amount to transfer: $", (input) => {
  const amount = parseFloat(input);

  if (isNaN(amount) || amount <= 0) {
    console.log("Invalid amount.");
    rl.close();
  } else {
    transfer(amount);
  }
});
