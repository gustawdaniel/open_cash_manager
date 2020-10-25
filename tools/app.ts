// import Realm from "realm";
// import BSON from 'bson';
//
// const appId = "opencashmanager-yoehg"; // Set Realm app ID here.
//
// type Task = {
//     _id: BSON.ObjectId;
//     _partition?: string;
//     name: string;
//     status: string;
// };
//
// const TaskSchema = {
//     name: 'Task',
//     properties: {
//         _id: 'objectId',
//         _partition: 'string?',
//         name: 'string',
//         status: 'string',
//     },
//     primaryKey: '_id',
// };
//
// const main = async ():Promise<void> => {
//     //@ts-ignore
//     const app = new Realm.App({ id: appId });
//
//     async function run() {
//         // Create a Credentials object to identify the user.
//         // Anonymous credentials don't have any identifying information, but other
//         // authentication providers accept additional data, like a user's email and
//         // password.
//         const credentials: Realm.Credentials = Realm.Credentials.anonymous();
//         // You can log in wuxi  ith any set of credentials using `app.logIn()`
//         const user: Realm.User = await app.logIn(credentials);
//         console.log(`Logged in with the user id: ${user.id}`);
//     }
//     run().catch(err => {
//         console.error("Failed to log in:", err)
//     });
//
// }
//
// main().then(() => {
//     console.log("Finished");
// })
