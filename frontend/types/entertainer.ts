export type Entertainer = {
  entertainerId: number;
  entStageName: string;
  entSSN: string;
  numberOfBookings: number;
  lastBookingDate: string | null;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage?: string;
  entEMailAddress?: string;
  dateEntered: string;
};

// entertainer.ts (or wherever your types are defined)
export type EntertainerAddRequest = {
  entertainerId: number;
  entStageName: string;
  entSSN: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage?: string;
  entEMailAddress?: string;
  dateEntered: string;
};
