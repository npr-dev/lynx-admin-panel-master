import React, { Fragment } from "react";
import "./shimmerStyle.css";
import {
  Form,
  FormGroup,
  Row,
  Col,
  Card,
  CardBody,
  Container
} from "reactstrap";

// add product form
export function AddProductShimmer() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <Form>
                <FormGroup style={{ width: "20%" }}>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <div className="wrapper p10">
                  <div className="button br animate"></div>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// products list
export function ProductListShimmer() {
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <Form>
                <FormGroup style={{ width: "20%" }}>
                  <div className="wrapper p10">
                    <div className="table-header br animate"></div>
                  </div>
                </FormGroup>
                <hr/>
                <FormGroup>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                  <div className="wrapper p10">
                    <div className="table-content-item br animate"></div>
                  </div>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

//                                      DASHBOARD SHIMMERs

export const DashboardAndTableCardHeader = () => {
  return (
    <Fragment>
      <div className="wrapper">
        <div className="dashboard-card-title br animate"></div>
      </div>
      <div className="btn-actions-pane-right">
        <div className="btns-flex-wrapper">
          <ButtonComp />
          <div className="w10" />
          <ButtonComp />
        </div>
      </div>
    </Fragment>
  );
};

export const DashboardGraphCardTitle = () => {
  return (
    <div className="wrapper">
      <div className="dashboard-card-title br animate"></div>
    </div>
  );
};

export const DashboardGraphCardRightBtns = () => {
  return (
    <div className="btn-actions-pane-right">
      <div className="btns-flex-wrapper">
        <ButtonComp />
        <div className="w10" />
        <ButtonComp />
      </div>
    </div>
  );
};

export const DashboardGraphCardLeftBtns = () => {
  return (
    <div className="btn-actions-pane-left">
      <div className="btns-flex-wrapper">
        <ButtonComp />
        <div className="w10" />
        <ButtonComp />
        <div className="w10" />
        <ButtonComp />
        <div className="w10" />
        <ButtonComp />
      </div>
    </div>
  );
};

export const ButtonComp = () => {
  return (
    <div className="wrapper">
      <div className="button br animate"></div>
    </div>
  );
};

export const DashboardAreaGraph = () => {
  return (
    <div className="wrapper p10">
      <div className="dashboard-area-graph br animate"></div>
    </div>
  );
};

//                                       TABLE COMPONENT FOR TOP TOKEN ETHER HOLDERS

export const TableComp = () => {
  return (
    <div className="p10">
      <div className="wrapper p10">
        <div className="table-header br animate"></div>
      </div>

      <div className="wrapper p10">
        <div className="table-content-item br animate"></div>
      </div>
    </div>
  );
};

//                                       TABLE COMPONENT FOR TOP TIPPERS AND RAINERS

export const TableContentForTopTippersRainers = () => {
  return (
    <div className="p10">
      <div className="wrapper p10">
        <div className="table-content-item br animate"></div>
      </div>
    </div>
  );
};

//                                       PAGINATION COMPONENT

export const PaginationComp = () => {
  return (
    <div className="wrapper p10">
      <div className="table-footer br animate"></div>
    </div>
  );
};

// Group

//                                       GROUP SEARCH COMPONENT

export const GroupSearchBarComp = () => {
  return (
    <div className="wrapper p10">
      <div className="group-search-bar-content br50 animate"></div>
    </div>
  );
};

export const GroupComp = () => {
  return (
    <div className="wrapper p10">
      <div className="group-content br animate"></div>
      <div className="hrLine" />
      <div className="group-content br animate"></div>
    </div>
  );
};

// Review Withdraw

export const ReviewWithdrawComp = () => {
  return (
    <div className="wrapper p10">
      <div className="dashboard-card-title br animate"></div>
      <div className="hrLine" />
      <div className="group-content br animate"></div>
    </div>
  );
};
