import { ENVS } from "./config";
import { SubscriptionType } from "./types";

/**
 * @description This connects to the database via fetch API
 */
export class VirtualDatabase {
  access_token: string = ENVS.CRON_SECRET_KEY;
  endpoint: string = ENVS.CRON_BACKEND_URL;
  /**
   * @description This initializes the VirtualDatabase class
   */
  constructor() {
    // try accessing the database
    fetch(this.endpoint + "/test", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        console.log("Database connection successful...");
      } else {
        console.error("Database connection failed");
        throw new Error("Database connection failed");
      }
    });
  }

  /**
   * @description This function fetches data from the database
   * @param access_token
   * @param table
   * @param body
   * @returns Promise<any>
   * */
  private fetchFromDb = async (
    access_token: string,
    table: string,
    body: any
  ) => {
    console.log(`[POST]: Fetching data from ${table}...`);
    //   fetch data from the database
    const response = await fetch(this.endpoint + `/${table}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  };

  /**
   * @description This function fetches all active subscriptions
   */
  public Subscription = {
    async findAll(options: any): Promise<SubscriptionType[]> {
      const instance = new VirtualDatabase();

      return instance.fetchFromDb(
        instance.access_token,
        "subscriptions",
        options
      );
    },
  };
}
