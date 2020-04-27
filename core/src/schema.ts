import {nexusPrismaPlugin} from "nexus-prisma";
import {makeSchema, objectType, enumType} from "@nexus/schema";
import {ObjectDefinitionBlock} from "@nexus/schema/dist/definitions/objectType";
import {CategoryClient} from "@prisma/client";

const Account = objectType({
    name: 'Account',
    definition(t): void {
        t.model.id()
        t.model.name()
        t.model.currency()
    }
})

const Transaction = objectType({
    name: 'Transaction',
    definition(t): void {
        t.model.id()
        t.model.value()
        // t.model.date()
        t.model.accountId()
        t.model.Account()
        t.model.name()
        t.model.categoryId()
        t.model.Category()
        t.model.description()
        t.field('date', {
            type: "String",
            // @ts-ignore
            resolve(root, args, ctx) {
                return new Intl.DateTimeFormat(
                    'pl-PL',
                    {year: 'numeric', month: '2-digit', day: '2-digit'}
                ).format(root.date)
            }
        })
    }
})

const Currency = enumType({
    name: 'Currency',
    members: ["USD", "PLN", "GBP", "EUR", "BTC", "GOLD"],
    description: "Possible Currencies"
})

const Category = objectType({
    name: 'Category',
    definition(t): void {
        t.model.id()
        t.model.name()
        t.model.color()
        // t.model.Category({alias: 'parent'})
        t.model.parentId()
    }
})

const Query = objectType({
    name: 'Query',
    definition(t): void {
        t.crud.account()
        t.crud.accounts()

        t.crud.transaction()
        t.crud.transactions({filtering: true})

        t.crud.category()
        t.crud.categories({filtering: true})

        t.list.field('currencies', {
            type: 'Currency',
            // @ts-ignore
            resolve: (_, args, ctx) => {
                return Currency.value.members
            },
        })
    }
})

const allCrud = (t: ObjectDefinitionBlock<"Mutation">, name: String) => {
    // @ts-ignore
    t.crud['createOne' + name]()
    // @ts-ignore
    t.crud['updateMany' + name]()
    // @ts-ignore
    t.crud['updateOne' + name]()
    // @ts-ignore
    t.crud['upsertOne' + name]()
    // @ts-ignore
    t.crud['deleteMany' + name]()
    // @ts-ignore
    t.crud['deleteOne' + name]()
}

const Mutation = objectType({
    name: 'Mutation',
    definition(t): void {
        allCrud(t, 'Account')
        allCrud(t, 'Transaction')
        allCrud(t, 'Category')
    }
})

export const schema = makeSchema({
    types: [Query, Mutation, Account, Currency, Transaction, Category],
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