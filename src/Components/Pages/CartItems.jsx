import React from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  minusProduct,
  removeItem,
} from "../../redux/Slices/cartSlice";

const CartItems = ({
  price,
  id,
  title,
  quantity,
  imageUrl,
  type,
  size,
}) => {
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(addProduct({ id }));
  };
  const onClickMinus = () => {
    dispatch(minusProduct({ id }));
  };
  const onClickRemove = () => {
    if (window.confirm("are u sure, bro?")) {
      dispatch(removeItem(id));
    }
  };
  return (
    <div className="cart__item">
      <div class="cart__item-img">
        <img
          class="pizza-block__image"
          src={imageUrl}
          alt="Pizza"
        />
      </div>
      <div class="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size}sm
        </p>
      </div>
      <div class="cart__item-count">
        <div
          onClick={onClickPlus}
          class="button button--outline button--circle cart__item-count-minus"></div>
        <b>{quantity}</b>
        <div
          onClick={onClickMinus}
          class="button button--outline button--circle cart__item-count-plus"></div>
      </div>
      <div class="cart__item-price">
        <b>{quantity * price}</b>
      </div>
      <div
        onClick={onClickRemove}
        class="cart__item-remove">
        <div class="button button--outline button--circle"></div>
      </div>
    </div>
  );
};

export default CartItems;
