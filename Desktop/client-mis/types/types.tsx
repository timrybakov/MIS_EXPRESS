import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AxiosError } from "axios";
export type FunctionDispatch<T> = Dispatch<SetStateAction<T>>;

export interface IIconsProps {
  id: string;
}

export interface IProductCart {
  id: number;
  product: {
    id: number;
    name: string;
    description: string;
    image: string;
    vendor_code: string;
    amount: number;
    compound: string;
    price: number;
    season: string;
    pattern: string;
    slug: string;
    brand: number;
    color: number;
    manufacturerCountry: number;
    size: number;
  };
  amount: number;
  order: number;
}

interface IProductMainPageField {
  id: number;
  name: string;
}

export interface IProductMainPageSubType extends IProductMainPageField {
  type: number;
}

export interface IProductMainPage {
  id: number;
  name: string;
  description: string;
  image: string;
  vendor_code: string;
  amount: number;
  compound: string;
  price: number;
  season: string;
  pattern: string;
  slug: string;
  brand: IProductMainPageField;
  color: IProductMainPageField;
  manufacturerCountry: IProductMainPageField;
  size: IProductMainPageField;
  subTypes: IProductMainPageSubType[];
}

export interface ICategories {
  id: number;
  name: string;
}

export interface IContext {
  filters: IFiltersState;
  setFilters: Dispatch<SetStateAction<IFiltersState>>;
  favorites: IProductMainPage[];
  setFavorites: Dispatch<SetStateAction<IProductMainPage[]>>;
  filtered: IContext["allProducts"];
  userCart: IProductCart[];
  setUserCart: Dispatch<SetStateAction<IProductCart[]>>;
  allProducts: IProductMainPage[];
  allCategories: ICategories[];
  isActive: boolean;
  setIsActive: FunctionDispatch<boolean>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface IPostCartApi {
  amount: number;
  product: number;
}

export interface IuserInformationApi {
  password: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface IInputsLength {
  password: number;
  username: number;
  first_name: number;
  last_name: number;
  email: number;
}

export interface IInputsLogin {
  password: string;
  username: string;
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

export interface IAdminCardItemProps {
  cardTitle: string;
  cardImage: string;
  cardPrice: number;
  cardArticle: number;
  cardDate: string;
  cardTime: string;
}

export interface IUserResponse {
  status: number;
  error: AxiosError | null | unknown;
}

export interface IHeaderProps {
  favorites: IProductMainPage[];
  allCategories: ICategories[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isActive: boolean;
  userCart: IProductCart[];
  handleSearch: (value: string) => void;
}

export interface ISubtypes {
  [key: string]: string[];
}

export interface ICategoriesObject {
  [key: string]: ISubtypes;
}

export interface IPutCart {
  amount: number;
  productId: number;
}

export interface IUserCartItem {
  product: IProductCart;
  setBasket: Dispatch<SetStateAction<IProductCart[]>>;
}

export interface IEmptyComponentProps {
  title: string;
  text: string;
  route: string;
  buttonText: string;
}

export interface IUserDataFromServer {
  first_name: string | null;
  id: number;
  username: string;
  last_name: string;
  email: string;
  address: string;
  company: string;
  favorites: number[];
  phone_number: string;
}

export interface IProfileInputs {
  first_name: string;
  last_name: string;
  company: string;
  phone_number: string;
  address: string;
}

export interface IModalChangeProps {
  setIsChange: Dispatch<SetStateAction<boolean>>;
  isChange: boolean;
  inputsValue: IProfileInputs;
  handleInputsChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setUserState: Dispatch<SetStateAction<IUserDataFromServer | null>>;
  userState: IUserDataFromServer | null;
  setInputsValue: Dispatch<SetStateAction<IProfileInputs>>;
}

export interface ISearchModalProps extends IHeaderSearchProps {
  setSearchModal: Dispatch<SetStateAction<boolean>>;
  searchModal: boolean;
}

export interface IHeaderSearchProps {
  isHidden: boolean;
  allCategories: ICategories[];
  handleSearch: IHeaderProps["handleSearch"];
  value: IHeaderProps["value"];
  setValue: IHeaderProps["setValue"];
}

export interface IUserOrdersState {
  id: number;
  order_products: IUserOrderProduct[];
  address: string;
  payment_method: "BT" | "CC" | "COD" | "Other";
  status: "CR" | "PD" | "SH" | "DL";
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

export interface IFiltersState {
  size: string | null;
  brand: string | null;
  color: string | null;
  lbprice: number | null;
  hbprice: number | null;
}
