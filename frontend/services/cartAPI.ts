//Hosts
import { $authHost } from "./index";

//Global Types
import { IPostCartApi, IPutCart } from "@/types/types";

export const getCart = async (id: number) => {
  try {
    const { data } = await $authHost.get(`/api/cart/${id}/`);

    return data;
  } catch (error) {
    console.error("Failed get user cart:" + error);
    throw error;
  }
};

export const postToCart = async (obj: IPostCartApi) => {
  try {
    const { data: orderData } = await $authHost.post("/api/order/", obj),
      { data: cartData } = await $authHost.post("/api/cart/", {
        order_products: [orderData.id],
      });

    return cartData;
  } catch (error) {
    console.error("Failed post to user cart:" + error);
    throw error;
  }
};

export const deleteFromCartById = async (id: number) => {
  try {
    const { data } = await $authHost.delete(`/api/order/${id}/`);

    return data;
  } catch (error) {
    console.error("Failed delete from user cart:" + error);
    throw error;
  }
};

export const patchCartItem = async (product: IPutCart, id: number) => {
  const newOptions: IPutCart = product;

  try {
    const { data } = await $authHost.put(`/api/order/${id}/`, newOptions);

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const postUserOrder = async (total_sum: number) => {
  try {
    const { data } = await $authHost.post("/api/cart/confirm_order/", {
      total_sum,
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
