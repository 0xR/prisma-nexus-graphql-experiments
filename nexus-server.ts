import { prisma } from "./generated/prisma-client";
import datamodelInfo from "./generated/nexus-prisma";
import * as path from "path";
import { prismaObjectType, makePrismaSchema } from "nexus-prisma";
import { GraphQLServer } from "graphql-yoga";

const Query = prismaObjectType({
  name: "Query",
  definition(t) {
    t.prismaFields(["*"]);
  }
});

const Mutation = prismaObjectType({
  name: "Mutation",
  definition(t) {
    t.prismaFields(["*"]);
    // t.field("createUser", {
    //   ...t.prismaType.createUser,
    //   args: {
    //     ...t.prismaType.createUser.args
    //   },
    //   resolve(root, args, ctx) {
    //     if (args.data.password !== "asdf") {
    //       throw new Error("invalid password");
    //     }
    //     return t.prismaType.createUser.resolve(root, args, ctx);
    //   }
    // });
  }
});

const User = prismaObjectType({
  name: "User",
  definition(t) {
    t.prismaFields(["*"]);
    // t.prismaFields({ filter: ['password']});
    t.string("uppercaseName", {
      resolve: user => user.name.toUpperCase()
    });
  }
});

const schema = makePrismaSchema({
  types: [Query, Mutation, User],

  prisma: {
    datamodelInfo,
    client: prisma
  },

  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts")
  }
});

const server = new GraphQLServer({
  schema,
  context: { prisma }
});
server.start(() => console.log("Server is running on http://localhost:4000"));
