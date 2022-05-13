import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BASE_URL,
  emptyStar,
  filledStar,
  IMG_URL,
} from "../constants/constants";
import { AppContext } from "../store/AppProvider";
import "./Home.css";
import ModalComponent from "./ModalComponent";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [modalData, setModalData] = useState(null);
  const {
    navData: { country },
    setNavData,
  } = useContext(AppContext);

  useEffect(() => {
    fetchData();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;

    setIsFetching(true);
  };
  console.log("country.length > 0 ", country.length > 0);
  useEffect(() => {
    if (!isFetching || country.length > 0) return;
    fetchMoreListItems();
  }, [isFetching, country.length]);

  const fetchMoreListItems = () => {
    setData(() => {
      return [...data, ...data.slice(0, 10)];
    });
    setIsFetching(false);
  };

  const fetchData = async () => {
    const url = BASE_URL;
    const imgurl = IMG_URL;
    setTimeout(async () => {
      let [response, images] = await Promise.all([fetch(url), fetch(imgurl)]);
      let noodleData = await response.json();
      let imgdata = await images.json();

      noodleData.forEach((element) => {
        element.img = imgdata[Math.floor((Math.random() * imgdata.length) | 0)];
      });
      // setData(data);
      setData(() => {
        return [...data, ...noodleData];
      });
      const contries = [...new Set(noodleData.map((ele) => ele.Country))];
      setNavData({ type: "ADD_COUNTRIES", payload: contries });
    }, 1700);
  };

  const openModal = (data) => {
    setModalData(data);
    setModalShow(true);
  };

  const renderData =
    country !== "" ? data.filter((ele) => ele.Country === country) : data;

  return (
    <div>
      {data.length === 0 && (
        <div className="center">
          <h1>Fetching items...</h1>
          <Spinner animation="border" role="status">
            <span className="visually-hidden" variant={"primary"}>
              Loading...
            </span>
          </Spinner>
        </div>
      )}
      <div className="grid-container">
        {renderData.length > 0 &&
          renderData.map((datam) => (
            <div
              className="grid-item"
              key={datam.Brand + Math.random()}
              onClick={(event) => navigate("/Brand", { state: datam })}
            >
              <Card style={{ width: "18rem" }} href="#/action-1">
                <Card.Img
                  variant="top"
                  src={datam.img.Image}
                  style={{ height: 250, width: "auto" }}
                />
                <Card.Body>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: "40%",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ fontSize: 30, fontWeight: "bold" }}>
                        {datam.Stars | "0"}
                      </div>
                      <div>
                        {datam.Stars && datam.Stars !== "NaN"
                          ? [...Array(datam.Stars | 0)].map((elem) => (
                              <img
                                alt={elem}
                                src={elem === 0 ? emptyStar : filledStar}
                                style={{
                                  height: 15,
                                  width: 15,
                                  marginLeft: 5,
                                  marginBottom: 5,
                                }}
                              />
                            ))
                          : [...Array(5)].map((elem) => (
                              <img
                                alt={elem}
                                src={emptyStar}
                                style={{
                                  height: 15,
                                  width: 15,
                                  marginLeft: 5,
                                  marginBottom: 5,
                                }}
                              />
                            ))}
                      </div>
                    </div>
                    <div style={{ width: "60%" }}>
                      <Card.Title>{datam.Brand}</Card.Title>
                      <div>country:&nbsp;{datam.Country}</div>
                    </div>
                  </div>

                  <Card.Text style={{ height: 40 }}>{datam.Variety}</Card.Text>
                  <Button variant="primary" onClick={() => openModal(datam)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
      {country.length === 0 && isFetching && (
        <>
          <h1>Fetching more items...</h1>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
      )}
      <ModalComponent
        show={modalShow}
        data={modalData}
        onHide={() => {
          setModalShow(false);
          setModalData(null);
        }}
      />
    </div>
  );
}

export default Home;
