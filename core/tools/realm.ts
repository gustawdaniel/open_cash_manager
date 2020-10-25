// const Realm = require("realm");
//
// const appId = "opencashmanager-yoehg"; // Set Realm app ID here.
// const appConfig = {
//     id: appId,
//     timeout: 10000,
// };
//
// const main = async () => {
//     const app = new Realm.App(appConfig);
//
//     const credentials = Realm.Credentials.anonymous();
//     const user = await app.logIn(credentials);
//
//     const mongoClient = user.remoteMongoClient("<atlas service name>");
//
//     const DogSchema = {
//         name: 'Dog',
//         properties: {
//             name: 'string',
//             age: 'int',
//         }
//     };
//
//     realm.write(() => {
//         realm.create('Dog', {name: 'Fido', age: 12});
//     });
//
//     const dogs = realm.objects("Dog");
//
// };
//
// main().then(() => {
//     console.log("Finished");
// })
