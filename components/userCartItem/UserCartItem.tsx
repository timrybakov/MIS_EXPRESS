"use client";
// Global
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
//Hooks
import { useCart } from "@/hooks/useCart";
import { useTranslate } from "@/hooks/useTranslate";
//Images
import noImage from '@/public/assets/other/no_picture_create.png';
//Components
import { Icons } from "../Icons/Icons";
//Component Types
import { IProductCart } from "@/types/componentTypes";
//Global Types
import { IPutCart } from "@/types/types";
//Styles
import "./UserCartItem.scss";

const UserCartItem: FC<{product: IProductCart;}> = ({ product }) => {

  const translate = useTranslate();
  const { deleteCardFromBasket, onChangeCardCounter,onFetchCart } = useCart();

  const handleChangeProductCounter = (action: "inc" | "dec") => {
    if (action === "dec" && product?.amount <= 1) return;

    const patchObject: IPutCart = {
      amount: action === "dec" ? product?.amount - 1 : product?.amount + 1,
      color: product?.color?.id,
    };
    onFetchCart();
    onChangeCardCounter(patchObject, product?.id);
  };


  const imageUrl = product?.product?.images[0]?.image_file ? product?.product?.images[0]?.image_file : noImage;

  return (
    <div id={String(product?.product?.id)} className="product-card">
      <div className="product-card__image-container">
        <Link className="imgWrapper" href={`/product/${product?.product?.article_number}`}>
          <Image
            className="img"
            src={imageUrl}
            alt={product?.product?.name}
            width={111}
            height={111}
          />
        </Link>

        <div className="product-card__info-container">
          <Link
            href={`/product/${product?.product?.article_number}`}
            className="product-card__title"
          >
            {product?.product?.name}
          </Link>

          <div className="product-card__options-container">
            <div className="product-card__description-container-wrapper">

              <div className="product-card__description-container">
                <p className="product-card__description">{translate.filterColor}</p>

                <div
                  data-color
                  className="product-card__option"
                  style={{ background: product?.color?.color }}
                ></div>
              </div>

              <div className="product-card__description-container">
                <p className="product-card__description">{translate.cartItemPrice}</p>

                <div className="product-card__option">
                  <p className="font-medium">${product?.product?.price}</p>
                </div>
              </div>
            </div>

            <div className="product-card__total-container">
              <div className="product-card__total-description-container">
                <p className="product-card__description">
                  {translate.cartItemCounterText}
                </p>

                <div className="flex">
                  <button
                    onClick={() => handleChangeProductCounter("dec")}
                    className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer border-1 border-black"
                  >
                    <Icons id="minus" />
                  </button>

                  <span className="w-[40px] h-[30px] flex items-center justify-center border-t-1 border-b-1 border-black">
                    {product?.amount}
                  </span>

                  <button
                    onClick={() => handleChangeProductCounter("inc")}
                    className="w-[30px] h-[30px] flex items-center justify-center cursor-pointer border-1 border-black"
                  >
                    <Icons id="plusMini" />
                  </button>
                </div>
              </div>

              <div className="product-card__total-description-container">
                <p className="product-card__description">
                  {translate.cartItemTotalPrice}
                </p>

                <div className="product-card__option">
                  <p className="font-medium">
                    ${product?.sum}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteCardFromBasket(product.id)}
        className="deleteItem"
      >
        <Icons id="deleteCard" />
      </button>
    </div>
  );
};

export { UserCartItem };
