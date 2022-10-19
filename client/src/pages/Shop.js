import React, { useContext, useEffect } from "react";
import { Container, Pagination } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceApi";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { devices } = useContext(Context);

  useEffect(() => {
    fetchTypes().then((data) => devices.setTypes(data));
    fetchBrands().then((data) => devices.setBrands(data));
    fetchDevices().then((data) => {
      devices.setDevices(data.rows);
      devices.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchDevices(
      devices.selectedType.id,
      devices.selectedBrand.id,
      devices.page,
    ).then((data) => {
      devices.setDevices(data.rows);
      devices.setTotalCount(data.count);
    });
  }, [devices.page, devices.selectedType, devices.selectedBrand]);
  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
