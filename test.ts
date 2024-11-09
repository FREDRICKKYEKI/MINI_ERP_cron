import { VirtualDatabase } from "./db";

const testDB = async () => {
  const db = new VirtualDatabase();

  const subscriptions = await db.Subscription.findAll({
    include: "User",
  });

  return subscriptions;
};

testDB().then((subscriptions) => {
  console.log(subscriptions);
});
