"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualDatabase = void 0;
const config_1 = require("./config");
/**
 * @description This connects to the database via fetch API
 */
class VirtualDatabase {
    /**
     * @description This initializes the VirtualDatabase class
     */
    constructor() {
        this.access_token = config_1.ENVS.CRON_SECRET_KEY;
        this.endpoint = config_1.ENVS.CRON_BACKEND_URL;
        /**
         * @description This function fetches data from the database
         * @param table
         * @param body
         * @returns Promise<any>
         * */
        this.fetchFromDb = (table, body) => __awaiter(this, void 0, void 0, function* () {
            console.log(`[POST]: Fetching data from ${table}...`);
            // fetch data from the database
            try {
                const response = yield fetch(this.endpoint + `/tables/${table}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                return yield response.json();
            }
            catch (error) {
                console.error(`[POST]: Error fetching data from ${table}...`);
                throw new Error(`Error: ${error}`);
            }
        });
        this.updateDb = (endpoint, body) => __awaiter(this, void 0, void 0, function* () {
            console.log(`[POST]: Updating data...`);
            // fetch data from the database
            try {
                const response = yield fetch(this.endpoint + `/tables/${endpoint}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${this.access_token}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                });
                return yield response.json();
            }
            catch (error) {
                console.error(`[POST]: Error updating data...`);
                throw new Error(`Error: ${error}`);
            }
        });
        /**
         * @description This function fetches all active subscriptions
         */
        this.Subscription = {
            /**
             * @description This function fetches all active subscriptions
             * @param options - Query options
             * @returns Promise<SubscriptionType[]>
             */
            findAll(options) {
                return __awaiter(this, void 0, void 0, function* () {
                    const instance = new VirtualDatabase();
                    return instance.fetchFromDb("subscriptions", options);
                });
            },
            /**
             * @description This function updates a subscription
             * @param body - Subscription data to update
             * @param options - Query options
             * @returns Promise<>
             */
            update(col, options) {
                return __awaiter(this, void 0, void 0, function* () {
                    const instance = new VirtualDatabase();
                    return instance.updateDb("subscriptions/update", { col, options });
                });
            },
        };
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
            }
            else {
                console.error("Database connection failed");
                throw new Error("Database connection failed");
            }
        });
    }
}
exports.VirtualDatabase = VirtualDatabase;
