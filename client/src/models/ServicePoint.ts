export interface ServicePoint {
  name: string;
  servicePointId: string;
  pudoId: string;
  routingCode: null;
  handlingOffice: null;
  locationDetail: null;
  routeDistance: null;
  pickup: Pickup;
  visitingAddress: Address;
  deliveryAddress: Address;
  notificationArea: NotificationArea;
  coordinates: Coordinate[];
  openingHours: OpeningHours;
  type: Type;
}

export interface Coordinate {
  countryCode: string;
  northing: number;
  easting: number;
  srId: string;
}

export interface Address {
  countryCode: string;
  city: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  additionalDescription: null;
}

export interface NotificationArea {
  postalCodes: string[];
}

export interface OpeningHours {
  postalServices: PostalService[];
  specialDates: any[];
}

export interface PostalService {
  closeDay: string;
  closeTime: string;
  openDay: string;
  openTime: string;
}

export interface Pickup {
  cashOnDelivery: null;
  heavyGoodsProducts: any[];
  products: Product[];
}

export interface Product {
  name: string;
  timeSlots: TimeSlots;
}

export interface TimeSlots {
  availableForPickupEarlyCollect: any[];
  availableForPickupStandard: AvailableForPickupStandard[];
}

export interface AvailableForPickupStandard {
  earliestTime: null;
  day: string;
}

export interface Type {
  groupTypeId: number;
  groupTypeName: string;
  typeId: number;
  typeName: string;
  boxType: null;
}
