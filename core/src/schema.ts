import {nexusPrismaPlugin} from "nexus-prisma";
import {intArg, makeSchema, objectType, stringArg} from "@nexus/schema";

const Account = objectType({
    name: 'Account',
    definition(t): void {
        t.model.id()
        t.model.name()
    }
})

const Query = objectType({
    name: 'Query',
    definition(t): void {
        t.crud.account()
        t.crud.accounts()
    }
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t): void {
        t.crud.createOneAccount()
        t.crud.updateManyAccount()
        t.crud.updateOneAccount()
        t.crud.upsertOneAccount()
        t.crud.deleteManyAccount()
        t.crud.deleteOneAccount()
    }
})

export const schema = makeSchema({
    types: [Query, Mutation, Account],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    plugins: [nexusPrismaPlugin()],
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma'
            },
            {
                source: require.resolve('./context'),
                alias: 'Context'
            }
        ]
    }
})