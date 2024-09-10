"use client";
//Global
import { showToastMessage } from "@/app/toastsChange";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
//Components
import { EmptyComponent } from "@/components/EmptyComponent/EmptyComponent";
import { ProductCard } from "@/components/ProductCard/productCard";
//Actions
import {
  addToFavorites as onAddToFavorites,
  deleteFromFavorites as onDeleteFromFavorites,
  fetchFavorites as onFetchFavorites,
  resetFavorites,
} from "@/redux/reducers/favoritesSlice";
//Hooks
import { useAppDispatch, useTypedSelector } from "./useReduxHooks";
import { useTranslate } from "./useTranslate";
//Utils
import { CATALOG_ROUTE, LOGIN_ROUTE } from "@/utils/Consts";
//Component Types
import { IProductMainPage } from "@/types/componentTypes";

const useFavorites = () => {
  //Hooks
  const { favorites } = useTypedSelector((state) => state.favorites);
  const { isAuth } = useTypedSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const { push } = useRouter();

  const fetchFavorites = useCallback(
    () => dispatch(onFetchFavorites()),
    [dispatch]
  );

  const addToFavorites = (product: IProductMainPage) => {
      if(!isAuth){
        showToastMessage("warn", translate.messageFavoritesWarn);
        push(LOGIN_ROUTE);
        return;
      }

      dispatch(onAddToFavorites(product))
      .then((data) => {
        if ("error" in data && data.error.message === "Rejected") {
          showToastMessage("error", translate.messageFavoritesAddError);
          return;
        }
        showToastMessage("success", translate.messageFavoritesSuccess);
      })
      .catch((error) => console.log(error));
 
  };

  const onResetFavorites = () => dispatch(resetFavorites());

  const deleteFromFavorites = async (product: IProductMainPage) => {
    try {
      const response = await dispatch(onDeleteFromFavorites(product));
      if (response.meta.requestStatus === "rejected") {
        showToastMessage("error", translate.messageFavoritesDeleteError);
        return;
      }
      showToastMessage("success", translate.messageFavoritesDeleted);
    } catch (error) {
      console.error(error);
    }
  };

  const renderFavorites = () =>
    favorites?.map((item) => <ProductCard key={item?.id} productInfo={item} />);

  const renderUserFavorites = () => {
    if (!favorites.length)
      return (
        <EmptyComponent
          title={translate.emptyFavoritesTitle}
          text={translate.emptyBasketText}
          route={CATALOG_ROUTE}
          buttonText={translate.emptyBasketButtonText}
        />
      );

    return (
      <>
        <h5 className="text-[24px] mb-[25px]">{translate.headerFavorites}</h5>

        <div className="favorites_wrapper">{renderFavorites()}</div>
      </>
    );
  };

  return {
    addToFavorites,
    deleteFromFavorites,
    fetchFavorites,
    onResetFavorites,
    renderUserFavorites,
  };
};

export { useFavorites };
