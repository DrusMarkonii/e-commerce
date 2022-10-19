import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "..";

const TypeBar = observer(() => {
  const { devices } = useContext(Context);
  return (
    <ListGroup>
      {devices.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === devices.selectedType.id}
          key={type.id}
          onClick={() =>
            devices.selectedType.id && devices.selectedType.id === type.id
              ? devices.setSelectedType({})
              : devices.setSelectedType(type)
          }
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
