//Global
import { Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";

export type CustomFormType =
  | IInputsLogin
  | IInputsRegistration
  | IInputsChangeProfile;

export interface IProductCart {
  id: number;
  product: {
    id: number;
    brand: {
      id: number;
      image: string;
      name: string;
    };
    color: {
      id: number;
      name: string;
      color: string;
    };
    size: {
      id: number;
      name: string;
    };
    manufacturerCountry: {
      id: number;
      name: string;
    };
    subTypes: {
      id: number;
      name: string;
      type: number;
    }[];
    name: string;
    description: string;
    image: string;
    article_number: string;
    amount: number;
    compound: string;
    price: string;
    season: string;
    pattern: string;
    slug: string;
    is_famous: boolean;
    date_and_time: string;
  };
  amount: number;
  date: string;
  order: number;
}

export interface IProductMainPage {
  id: number;
  brand: {
    id: number;
    image: string;
    name: string;
  };
  color: {
    id: number;
    name: string;
    color: string;
  };
  size: {
    id: number;
    name: string;
  };
  manufacturerCountry: {
    id: number;
    name: string;
  };
  subTypes: {
    id: number;
    name: string;
    type: number;
  }[];
  first_image: string;
  second_image: string;
  third_image: string;
  fourth_image: string;
  fifth_image: string;
  name: string;
  description: string;
  article_number: string;
  amount: number;
  compound: string;
  price: string;
  season: string;
  pattern: string;
  slug: string;
  is_famous: boolean;
  date_and_time: string;
}

export interface ICategoriesState {
  categories: {
    id: number;
    name: string;
  }[];
  types: {
    category: number;
    id: number;
    name: string;
    image: string;
  }[];
  subtypes: {
    type: number;
    id: number;
    name: string;
  }[];
  status: "pending" | "fulfilled";
}

export interface IPostCartApi {
  amount: number;
  product: number;
}

export interface IUserInformationApi {
  user: {
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_provider: boolean;
  };
  phone_number: string;
}

export interface IChangeUserData {
  user: {
    first_name: string;
    last_name: string;
  };
  company: string;
  address: string;
  phone_number: string;
}

export interface IInputsLength {
  phone_number: number;
  password: number;
  username: number;
  first_name: number;
  last_name: number;
  email: number;
  address: number;
  company: number;
  mersis: number;
  inspection: number;
}

export interface IInputsLogin {
  password: string;
  username: string;
}

export interface IInputsRegistration extends IInputsLogin {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface IInputsChangeProfile {
  first_name: string;
  last_name: string;
  company: string;
  phone_number: string;
  address: string;
}

export interface IUserOrderWrapperProps {
  orderNumber: number;
  orderDate: string;
  orderPrice: string;
  orderStatus: IUserOrdersState["status"];
}

export interface IUserReviewItemProps {
  reviewStatus: "published" | "moderation";
  reviewTitle: string;
  reviewText: string;
}

export interface IUserOrderItemProps {
  cardTitle: string;
  cardPrice: number;
  cardSize: string;
}

export interface IUserResponse {
  status: number;
  error: AxiosError | null | unknown;
}

export interface IPutCart {
  amount: number;
  productId: number;
}

export interface IUserCartItem {
  product: IProductCart;
}

export interface IEmptyComponentProps {
  title: string;
  text: string;
  route: string;
  buttonText: string;
}

export interface IModalChangeProps {
  setIsChange: Dispatch<SetStateAction<boolean>>;
  isChange: boolean;
}

export interface ISearchModalProps extends IHeaderSearchProps {
  setSearchModal: Dispatch<SetStateAction<boolean>>;
  searchModal: boolean;
}

export interface IHeaderSearchProps {
  category: string;
  onSetCategory: (category: string) => void;
  isHidden: boolean;
  allCategories: ICategoriesState["categories"];
}

export interface IUserOrdersState {
  id: number;
  order_products: IUserOrderProduct[];
  address: string;
  payment_method: "BT" | "CC" | "COD" | "Other";
  status: "processing" | "delivered";
  created_date: string;
  total_sum: string;
  user: number;
}

interface IUserOrderProduct {
  id: number;
  product: IOrderProduct;
  amount: number;
  order: number;
}

interface IOrderProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  vendor_code: string;
  amount: number;
  compound: string;
  price: string;
  season: string;
  pattern: string;
  slug: string;
  is_famous: boolean;
  brand: number;
  color: number;
  manufacturerCountry: number;
  size: number;
  subTypes: number[];
}

export interface IUserReviewState {
  id: number;
  product: IOrderProduct;
  text: string;
  created_datetime: string;
  user: number;
}

export interface IProductsState {
  products: IProductMainPage[];
  filtered: IProductMainPage[];
  category: string;
  status: IFavoritesState["status"];
  searchText: string;
  filters: {
    size: string | null;
    brand: string | null;
    color: string | null;
    lbprice: number | null;
    hbprice: number | null;
  };
}

export interface IFavoritesState {
  favorites: IProductMainPage[];
  status: "pending" | "fulfilled";
}

export interface IProductPageProducts {
  isSimilar: boolean;
  products: IProductMainPage[];
}

interface IUserData extends IUserInformationApi {
  company: string;
  address: string;
}

export interface IUserState {
  userState: IUserData | null;
  userReviews: IUserReviewState[];
  userOrders: IUserOrdersState[];
  isAuth: boolean;
  status: "pending" | "fulfilled";
}

export interface ICartState {
  cart: IProductCart[];
  status: "pending" | "fulfilled";
}
