import React from "react";
import Categories from "../Categories";
import Pizza from "../Pizza";
import Sort, { sortTypes } from "../Sort";
import Sceleton from "../Sceleton";
import Paggination from "../Paggination";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/Slices/filterSlice";
import { fetchPizzas } from "../../redux/Slices/pizzasSlice";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const categoryId = useSelector(
    (state) => state.filter.categoryId
  );

  const dispatch = useDispatch();

  const sort = useSelector(
    (state) => state.filter.sort.sort
  );

  const currentPage = useSelector(
    (state) => state.filter.currentPage
  );

  const items = useSelector((state) => state.pizzas.items);

  const [isLoading, setIsLoading] = React.useState(false);
  const { searchValue } = React.useContext(SearchContext);

  const onChangeCategory = (i) => {
    dispatch(setCategoryId(i));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      );
      const sort = sortTypes.find(
        (obj) => obj.sort === params.sort
      );
      dispatch(setFilters({ ...params, sort }));
    }
    isGet.current = true;
  }, []);

  const isGet = React.useRef(false);
  const isRendered = React.useRef(false);
  const getPizzaData = async () => {
    setIsLoading(true);
    const search = searchValue
      ? `&search=${searchValue}`
      : "";
    // axios
    //   .get(
    //     `https://63241a5cbb2321cba924b436.mockapi.io/data?page=${currentPage}&limit=4&${
    //       categoryId > 0 ? `category=${categoryId}` : ""
    //     }&sortBy=${sort.replace("-", "")}&order=${
    //       sort.includes("-") ? "asc" : "desc"
    //     } ${search}`
    //   )
    //   .then((res) => {
    //     setData(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });

    try {
      dispatch(
        fetchPizzas({
          search,
          currentPage,
          categoryId,
          sort,
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isGet.current) {
      getPizzaData();
    }
    isGet.current = false;
  }, [categoryId, sort, searchValue, currentPage]);

  React.useEffect(() => {
    if (isRendered.current) {
      const queryString = qs.stringify({
        sort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isRendered.current = true;
  }, [categoryId, sort, currentPage, navigate]);

  const pizza = items.map((value) => (
    <Pizza key={value.id} {...value} />
  ));

  const onChangeCurrentPage = (num) => {
    dispatch(setCurrentPage(num));
  };

  return (
    <div>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title"> All Pizza</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <Sceleton key={index} />
            ))
          : pizza}
      </div>
      <Paggination
        value={currentPage}
        onChangeCurrentPage={onChangeCurrentPage}
      />
    </div>
  );
};

export default Home;
