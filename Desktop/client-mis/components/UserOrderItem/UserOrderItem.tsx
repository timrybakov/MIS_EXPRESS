"use client";

// Global
import React, { FC } from "react";
import Image from "next/image";

// Components
import { Icons } from "../Icons/Icons";

//Types
import { IUserOrderItemProps } from "@/types/types";
//styles
import "./UserOrderItem.scss";

const UserOrderItem: FC<IUserOrderItemProps> = ({
  cardTitle,
  cardPrice,
  cardSize,
}) => {
  const mapAllStart = () =>
    [1, 2, 3, 4, 5].map(number => <Icons key={number} id="star" />);

  return (
    <section className="product-card">
      <div className="product-card__image-container">
        <Image src={""} alt="" width={111} height={111} />

        <div className="product-card__info-container">
          <h5 className="product-card__title">{cardTitle}</h5>

          <div className="product-card__options-container">
            <div className="product-card__description-container-wrapper">
              <div className="product-card__description-container">
                <p className="product-card__description">Размер</p>

                <div className="product-card__option">
                  <p className="product-card__option--active font-medium">
                    {cardSize}
                  </p>
                </div>
              </div>

              <div className="product-card__description-container">
                <p className="product-card__description">Цвет</p>

                <div data-color className="product-card__option"></div>
              </div>

              <div className="product-card__description-container">
                <p className="product-card__description">Стоимость, ед.</p>

                <div className="product-card__option">
                  <p className="font-medium">${cardPrice.toFixed(2)}</p>
                </div>
              </div>

              <div data-star className="product-card__description-container">
                <p className="product-card__description">Оставить отзыв</p>

                <div className="product-card__description-star">
                  {mapAllStart()}
                </div>
              </div>
            </div>

            <div className="product-card__total-container">
              <div className="product-card__total-description-container">
                <p className="product-card__description">Количество</p>

                <div data-counter className="product-card__option">
                  <p className="font-medium">1</p>
                </div>
              </div>

              <div className="product-card__total-description-container">
                <p className="product-card__description">Стоимость, всего</p>

                <div className="product-card__option">
                  <p className="font-medium">$500.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { UserOrderItem };
