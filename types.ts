interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface SubscriptionType {
  id: string;
  type: "Free" | "Pro" | "Enterprise";
  transaction_id: string;
  start_date: string;
  expiry_date: string;
  user_id: string;
  status: "active" | "expired";
  User: UserType;
}
