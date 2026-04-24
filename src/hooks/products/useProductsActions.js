import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import useMessage from "@/hooks/useMessage";
import { createAsyncAddCart } from "@/slice/cartSlice";

export default function useProductsActions({
  setCategoryAndResetPage,
  setPageWithinRange,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showSuccess } = useMessage();
  const [sortType, setSortType] = useState("highToLow");
  const [randomSeed, setRandomSeed] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [pendingCategory, setPendingCategory] = useState("");

  useEffect(() => {
    if (!pendingCategory) {
      return;
    }

    const timer = setTimeout(() => {
      setPendingCategory("");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [pendingCategory]);

  const handleCategoryChange = useCallback(
    (category) => {
      const hasChanged = setCategoryAndResetPage(category);
      if (hasChanged) {
        setPendingCategory(category);
      }
    },
    [setCategoryAndResetPage],
  );

  const handlePageChange = useCallback(
    (page) => {
      setPageWithinRange(page);
    },
    [setPageWithinRange],
  );

  const handleSortChange = useCallback((value) => {
    setSortType(value);
    if (value === "random") {
      setRandomSeed((prev) => prev + 1);
    }
  }, []);

  const handleToggleTag = useCallback((tag) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((item) => item !== tag);
      }
      return [...prev, tag];
    });
  }, []);

  const handleViewDetail = useCallback(
    (e, id) => {
      e.preventDefault();
      navigate(`/product/${id}`);
    },
    [navigate],
  );

  const handleAddCart = useCallback(
    (e, id, qty = 1) => {
      e.preventDefault();
      dispatch(
        createAsyncAddCart({
          id,
          qty,
        }),
      );
      showSuccess("成功加入購物車");
    },
    [dispatch, showSuccess],
  );

  return {
    sortType,
    randomSeed,
    selectedTags,
    pendingCategory,
    handleCategoryChange,
    handlePageChange,
    handleSortChange,
    handleToggleTag,
    handleViewDetail,
    handleAddCart,
  };
}
