export interface IUser {
  [x: string]: any;
  _id: number;
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  avatar: string;
  token: string;
  first_name : string;
  last_name: string;
  role: string
  age: number
  archived: boolean
}
export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Meta {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Response {
  message: string;
  payload:  IUser;
  token: string;
  image: string;
  university: string;
  gender: string;
  email: string;
  products: IProduct[],
  description: string;
  quantity: number;
  price: number;
  total: number;
  title: string;
  body: string;
  postId: number;
  id: number;
  thumbnail: string;
  role: string;
}


export type FieldType = {
  first_name?: string;
  last_name?: string;
  phone?: string;
  age?: number;
  avatar?: string;
  password?: string;
  name?: string;
  price?: number;
  image?: string;
  _id?: string;
  rating: string;
  start: string;
  end: string;
  service: string;
  barber: string;
  client: string;
  date: string
};