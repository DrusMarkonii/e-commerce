import React from "react";
import { observer } from "mobx-react-lite";
import { Card, Row } from "react-bootstrap";
import { Context } from "..";
import { useContext } from "react";

const BrandBar = observer(() => {
  const { devices } = useContext(Context);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {devices.brands.map((brand) => (
        <Card
          key={brand.id}
          className="p-2"
          style={{
            marginRight: "4px",
            marginBottom: "4px",
            cursor: "pointer",
            width: 90,
          }}
          onClick={() =>
            devices.selectedBrand.id && devices.selectedBrand.id === brand.id
              ? devices.setSelectedBrand({})
              : devices.setSelectedBrand(brand)
          }
          border={
            brand.id === devices.selectedBrand.id ? "danger" : "dark-light"
          }
        >
          {brand.name}
        </Card>
      ))}
    </div>
  );
});

export default BrandBar;
