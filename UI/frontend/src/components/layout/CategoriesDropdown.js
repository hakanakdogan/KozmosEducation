import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../api/agent";

const CategoriesDropdown = () => {
  const [categories, setCategories] = useState(null);

  const loadCategories = async () => {
    const response = await getAllCategories();
    setCategories(response.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <li className="dropdown cursor-pointer">
      <span className="mx-2">Kategoriler</span>
      <ul>
        {categories &&
          categories.map((category) => (
            <Link
              key={category.id}
              className="black"
              to={`/categories/${category.id}`}
            >
              <li>{category.name}</li>
            </Link>
          ))}
      </ul>
    </li>
  );
};

export default CategoriesDropdown;
