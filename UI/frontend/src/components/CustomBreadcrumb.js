import React from "react";

const CustomBreadcrumb = ({title, description}) => {
  return (
    <div className="breadcrumbs" data-aos="fade-in">
      <div className="container">
        <h2>{title}</h2>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};

export default CustomBreadcrumb;
