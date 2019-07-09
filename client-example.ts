import { prisma } from "./generated/prisma-client";

// A `main` function so that we can use async/await
async function create() {
  // Create a new user called `Alice`
  const newUser = await prisma.createUser({
    name: "Alice",
    password: "qwerty"
  });
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);

  // Read all users from the database and print them to the console
  const allUsers = await prisma.users();
  console.log(allUsers);
}

// create().catch(e => console.error(e));

async function subscribe() {
  // Create a new user called `Alice`
  const updatedUser = await prisma.$subscribe.user();
  for await (const user of {
    [Symbol.asyncIterator]() {
      return updatedUser;
    }
  }) {
    console.log(`Update user ${JSON.stringify(user, null, 2)}`);
  }
}
subscribe().catch(e => console.error(e));
