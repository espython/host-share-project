export interface Listing {
  source: string;
  type: string;
  categories?: (CategoriesEntity)[] | null;
  data?: (DataEntity)[] | null;
  count: number;
}
export interface CategoriesEntity {
  id: string;
  type: string;
  title: string;
}
export interface DataEntity {
  ref: string;
  info: Info;
  category?: string | null;
}
export interface Info {
  type: string;
  images: Images;
  details: Details;
  description: string;
  mainImage: DataEntityOrAvatarOrMainImage;
  maxGuestCapacity: number;
  host?: Host | null;
  amenities: Amenities;
  title: string;
  id: string;
  location: Location;
  ratings: Ratings;
  visibleReviewCount: number;
  available: boolean;
  price: number;
  currency: Currency;
  sleepingArrangements: SleepingArrangements;
}
export interface Images {
  type: string;
  data?: (DataEntityOrAvatarOrMainImage)[] | null;
  count: number;
}
export interface DataEntityOrAvatarOrMainImage {
  url: string;
  width: number;
  height: number;
  mimeType: string;
  orientation: string;
  aspectRatio: number;
  type: string;
}
export interface Details {
  type: string;
  data?: (DataEntity1 | null)[] | null;
  count: number;
}
export interface DataEntity1 {
  type: string;
  value: number;
}
export interface Host {
  name: string;
  avatar: DataEntityOrAvatarOrMainImage;
  isSuperhost: boolean;
}
export interface Amenities {
  type: string;
  data?: (DataEntity2)[] | null;
  count: number;
}
export interface DataEntity2 {
  group: string;
  available: boolean;
  title: string;
  type: string;
}
export interface Location {
  lat: number;
  long: number;
  address: string;
  city: string;
  country: Country;
  zip: string;
}
export interface Country {
  code: string;
  title: string;
}
export interface Ratings {
  accuracy: number;
  checkin: number;
  cleanliness: number;
  communication: number;
  location: number;
  value: number;
  guestSatisfactionOverall: number;
}
export interface Currency {
  code: string;
  symbol: string;
  name: string;
}
export interface SleepingArrangements {
  type: string;
  data?: (DataEntity3 | null)[] | null;
  count: number;
}
export interface DataEntity3 {
  title: string;
  subTitle: string;
  icons?: (string)[] | null;
}

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<Info,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};
