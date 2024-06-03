import React, { useState } from "react";
import { Container, Row, Col, Carousel, Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"; // Importe o ícone da seta para esquerda

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showFirstColumn, setShowFirstColumn] = useState(true); // Estado para controlar a visibilidade da primeira coluna

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleFirstColumn = () => {
    setShowFirstColumn(!showFirstColumn); // Alterna o estado da visibilidade da primeira coluna
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Container fluid className="carousel-container">
        <Row className="vh100">
          <Col
            md={8}
            className={`p-0 position-relative   ${
              showFirstColumn ? "d-xs-block car" : "d-none "
            } `}
          >
            {" "}
            {/* Adiciona a classe d-none d-md-block para ocultar a primeira coluna quando showFirstColumn for falso */}
            <div className="shadow-carousel"></div>
            <Carousel
              nextIcon={<span className="carousel-control-next-icon" />}
              prevIcon={<span className="carousel-control-prev-icon" />}
            >
              <Carousel.Item>
                <img
                  alt="good"
                  style={{
                    display: "block",
                    margin: "auto",
                    cursor: "zoom-in",
                    backgroundColor: "hsl(0, 0%, 90%)",
                    transition: "background-color:300ms",
                  }}
                  src="bg.jfif"
                />
                <Carousel.Caption>
                  <Button
                    variant="primary"
                    type="button"
                    className="cursos btn btn-primary"
                  >
                    Cursos
                  </Button>
                  <h3>Plataforma de cursos completa</h3>
                  <p>
                    Lorem ipsum nisl etiam himenaeos ligula augue vehicula
                    gravida tincidunt, etiam magna sapien gravida sodales sed
                    vel pulvinar suspendisse, morbi mi proin urna ornare posuere
                    donec aptent. orci vivamus primis fusce lacinia libero
                    nostra aliquam vestibulum
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  alt="good"
                  style={{
                    alt: "good",
                    display: "block",
                    margin: "auto",
                    cursor: "zoom-in",
                    backgroundColor: "hsl(0, 0%, 90%)",
                    transition: "background-color:300ms",
                  }}
                  src="bg.jfif"
                />
                <Carousel.Caption>
                  <Button
                    variant="primary"
                    type="button"
                    className="cursos btn btn-primary"
                  >
                    Cursos
                  </Button>
                  <h3>Plataforma de cursos completa</h3>
                  <p>
                    Lorem ipsum nisl etiam himenaeos ligula augue vehicula
                    gravida tincidunt, etiam magna sapien gravida sodales sed
                    vel pulvinar suspendisse, morbi mi proin urna ornare posuere
                    donec aptent. orci vivamus primis fusce lacinia libero
                    nostra aliquam vestibulum
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  alt="good"
                  style={{
                    alt: "good",
                    display: "block",
                    margin: "auto",
                    cursor: "zoom-in",
                    backgroundColor: "hsl(0, 0%, 90%)",
                    transition: "background-color:300ms",
                  }}
                  src="bg.jfif"
                />
                <Carousel.Caption>
                  <Button
                    variant="primary"
                    type="button"
                    className="cursos btn btn-primary"
                  >
                    Cursos
                  </Button>
                  <h3>Plataforma de cursos completa</h3>
                  <p>
                    Lorem ipsum nisl etiam himenaeos ligula augue vehicula
                    gravida tincidunt, etiam magna sapien gravida sodales sed
                    vel pulvinar suspendisse, morbi mi proin urna ornare posuere
                    donec aptent. orci vivamus primis fusce lacinia libero
                    nostra aliquam vestibulum
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={4} className="p-4 mx-auto my-0">
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Login />} />
              </Routes>
            </Router>
          </Col>
        </Row>
      </Container>
      {/* Botão para alternar a visibilidade da primeira coluna */}
      <Button
        className="toggle-column-button car"
        onClick={toggleFirstColumn}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          borderRadius: "50%",
          backgroundColor: "transparent",
          // border: "none",
          zIndex: "10000",
          border: "1px solid #fff",
        }}
      >
        {showFirstColumn ? (
          <BsArrowLeft size={24} />
        ) : (
          <BsArrowRight size={24} />
        )}
      </Button>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default App;
