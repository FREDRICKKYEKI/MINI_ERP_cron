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
   * @param table
   * @param body
   * @returns Promise<any>
   * */
  private fetchFromDb = async (table: string, body: any) => {
    console.log(`[POST]: Fetching data from ${table}...`);
    // fetch data from the database
    try {
      const response = await fetch(this.endpoint + `/tables/${table}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(`[POST]: Error fetching data from ${table}...`);
      throw new Error(`Error: ${error}`);
    }
  };

  private updateDb = async (endpoint: string, body: any) => {
    console.log(`[POST]: Updating data...`);
    // fetch data from the database
    try {
      const response = await fetch(this.endpoint + `/tables/${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      return await response.json();
    } catch (error) {
      console.error(`[POST]: Error updating data...`);
      throw new Error(`Error: ${error}`);
    }
  };

  /**
   * @description This function fetches all active subscriptions
   */
  public Subscription = {
    /**
     * @description This function fetches all active subscriptions
     * @param options - Query options
     * @returns Promise<SubscriptionType[]>
     */
    async findAll(options: any): Promise<SubscriptionType[]> {
      const instance = new VirtualDatabase();
      return instance.fetchFromDb("subscriptions", options);
    },
    /**
     * @description This function updates a subscription
     * @param body - Subscription data to update
     * @param options - Query options
     * @returns Promise<>
     */
    async update(col: any, options: any): Promise<any> {
      const instance = new VirtualDatabase();

      return instance.updateDb("subscriptions/update", { col, options });
    },
  };
}
