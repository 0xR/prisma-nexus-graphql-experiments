import { prisma } from "./generated/prisma-client";

async function create() {
  const newUser = await prisma.createUser({
    name: "Alice",
    password: "qwerty"
  });
  console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
}

async function list() {
  // Read all users from the database and print them to the console
  const allUsers = await prisma.users();
  console.log('All users', allUsers);
}


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

// const operation = list;
// const operation = create;
const operation = subscribe;
operation().catch(e => console.error(e));
