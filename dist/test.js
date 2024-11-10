"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
// const testDB = async () => {
//   const db = new VirtualDatabase();
//   const subscriptions = await db.Subscription.findAll({
//     include: "User",
//   });
//   return subscriptions;
// };
// testDB().then((subscriptions) => {
//   console.log(subscriptions);
// });
(0, utils_1.checkSubscriptions)();
