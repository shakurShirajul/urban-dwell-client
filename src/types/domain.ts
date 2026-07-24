export type UserRole = "user" | "member" | "admin";

export interface SessionUser {
  email: string;
  name: string | null;
  photoURL: string | null;
  role: UserRole;
  apiToken: string;
}

export interface Apartment {
  _id: string;
  apartment_image: string;
  floor_no: number;
  block_name: string;
  apartment_no: string;
  rent: number;
}

export interface Agreement {
  _id: string;
  user_name: string;
  user_email: string;
  floor_no: number;
  block_name: string;
  apartment_no: string;
  rent: number;
  status: "pending" | "checked";
  agreement_request_date: string;
  agreement_accept_date?: string;
}

export interface UrbanUser {
  _id: string;
  user_name: string;
  user_email: string;
  user_image?: string;
  user_role: UserRole;
  user_join?: string;
}

export interface UserProfile {
  user_name: string;
  user_email: string;
  user_image: string;
  block_name: string;
  floor_no: number | "None";
  apartment_no: string;
  agreement_accept_date: string;
  rent?: number;
}

export interface Announcement {
  _id: string;
  announce_title: string;
  announce_description: string;
  announce_date: string;
  announce_author_email: string;
}

export interface Coupon {
  _id: string;
  coupon_Code: string;
  coupon_Discount: number;
  coupon_Description: string;
}

export interface Payment {
  _id: string;
  name: string;
  email: string;
  transactionId: string;
  rent: number;
  month: string;
  discount: number;
  coupon?: string;
  date: string;
}
