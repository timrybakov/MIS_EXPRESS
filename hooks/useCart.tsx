"use client";
// Global
import { showToastMessage } from "@/app/toastsChange";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
// Components
import { Button } from "@nextui-org/react";
import { UserCartItem } from "@/components/userCartItem/UserCartItem";
import { EmptyComponent } from "@/components/EmptyComponent/EmptyComponent";
// Actions
import {
  addToCart,
  changeItemCounter,
  deleteFromCart,
  fetchCart,
  resetCart,
} from "@/redux/reducers/cartSlice";
import { setPaymenPageNumber } from "@/redux/reducers/userSlice";
// Utils
import { CATALOG_ROUTE, LOGIN_ROUTE, ORDER_ROUTE } from "@/utils/Consts";
// Hooks
import { useTranslate } from "./useTranslate";
import { useAppDispatch, useTypedSelector } from "./useReduxHooks";
// Global Types
import { IPostCartApi } from "@/types/types";

const useCart = () => {
  //Hooks
  const { cart } = useTypedSelector((state) => state.cart);
  const { isAuth } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const { push } = useRouter();

  // Get user cart data
  const onFetchCart = useCallback(async () => {
    try {
      const response = await dispatch(fetchCart());

    } catch (error) {
      showToastMessage("error", translate.messageGetCartError);
    }
  }, [dispatch]);

  const onChangeCardCounter = useCallback(
    async (obj: Omit<IPostCartApi, "product">, id: number) => {
      try {
        const response = await dispatch(
          changeItemCounter({ options: obj, id })
        );

        if (response.meta.requestStatus === "rejected") {
          showToastMessage("error", translate.messageCartError);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const addItemToCart = useCallback(
    (obj: IPostCartApi) => {
      if (!isAuth) {
        showToastMessage("warn", translate.messageCartNotAuth);
        push(LOGIN_ROUTE);
        return;
      }

      const checkProductInCart = cart?.order_products?.find(
        (product) =>
          product?.product?.id === obj?.product &&
          product?.color?.id === obj?.color
      );

      if (checkProductInCart) {
        showToastMessage("warn", translate.messageCartItemInCart);
        return;
      }

      if (!obj?.color) {
        showToastMessage("warn", translate.messageCartColorChoose);
        return;
      }

       return dispatch(addToCart(obj));

    },
    [cart, dispatch, fetchCart, push]
  );

  const deleteCardFromBasket = useCallback(
    async (id: number) => {
      try {
        const response = await dispatch(deleteFromCart(id));
        if (response.meta.requestStatus === "rejected") {
          showToastMessage("error", translate.messageCartDeleteError);
          return;
        }

        await onFetchCart();
        showToastMessage("success", translate.messageCartDeleted);
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  const onResetCart = useCallback(() => dispatch(resetCart()), [dispatch]);

  const returnAllProductsCounter = useCallback((): number => {
    return cart?.order_products.reduce(
      (total, currentItem) => total + currentItem?.amount,
      0
    );
  }, [cart]);

  const redirectToOrder = () => {
    push(ORDER_ROUTE);
    setPaymenPageNumber(1);
  }



  const renderUserCart = useCallback(() => {
    if (!cart?.order_products?.length)
      return (
        <EmptyComponent
          title={translate.emptyBasketTitle}
          text={translate.emptyBasketText}
          route={CATALOG_ROUTE}
          buttonText={translate.emptyBasketButtonText}
        />
      );

    return (
      <>
        <h5 className="text-[24px] leading-none">{translate.headerCart}</h5>

        <div className="flex flex-col gap-[30px]">
          {cart?.order_products.map((item) => (
            <UserCartItem product={item} key={item?.product?.id} />
          ))}

          <div className="basket_confirm">
            <Button
              onClick={() => redirectToOrder()}
              className="basket_button text-white rounded-md w-[278px] h-[51px] py-[10px]"
            >
              {translate.cartContinue}
            </Button>
            <p className="text-[24px] leading-none">
              {`${
                translate.cartTotalPriceText
              } $${cart?.total_sum}`}
            </p>
          </div>
        </div>
      </>
    );
  }, [cart?.order_products]);

  return {
    onFetchCart,
    onChangeCardCounter,
    addItemToCart,
    deleteCardFromBasket,
    returnAllProductsCounter,
    onResetCart,
    renderUserCart,
  };
};

export { useCart };
