import React from "react";

const Categories = ({ categoryId, onClickCategory }) => {
  const data = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {data.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={
              categoryId === index ? "active" : " "
            }>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
