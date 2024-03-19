import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs"; // Importa ícones do Bootstrap
import { FaFacebook, FaApple, FaTwitter, FaSignInAlt } from "react-icons/fa";
import Logo from "../images/logo192.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const server = "http://localhost:5000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("accessToken", response.data.accessToken); // Armazene o token de acesso no localStorage
      // Faça algo com o token, como redirecionar o usuário para a página inicial
      alert("Login bem-sucedido! Teste completo");
      console.log(
        "Login bem-sucedido! Token de acesso:",
        response.data.accessToken
      );
    } catch (error) {
      alert("Erro ao fazer login", error);
      console.error(error);
    }
  };

  return (
    <Container>
      {/* Linha com a logo e o nome da empresa */}
      <Row
        className="justify-content-between align-items-center"
        style={{ marginBottom: "3rem" }}
      >
        <Col xs="auto">
          <Row className="align-items-center">
            <Col xs="auto" className="p-0 mr-2">
              <img
                className="img-fluid"
                src={Logo}
                alt="Logo"
                style={{ width: "35px", marginRight: "10px" }}
              />
            </Col>
            <Col xs="auto" className="p-0">
              <h3 className="m-0">
                Toolzz<sup>&reg;</sup>
              </h3>
            </Col>
          </Row>
        </Col>
        <Col xs="auto" className="p-0">
          {/* <a
            href="/register"
            className="text-decoration-none"
            style={{ fontWeight: "bold" }}
          >
            Criar conta
          </a> */}
          <Link
            className="text-decoration-none"
            style={{ fontWeight: "bold" }}
            to="/register"
          >
            Criar conta
          </Link>
        </Col>
      </Row>

      {/* Linha com título e subtítulo */}
      <Row className="mb-4">
        <Col className="p-0">
          <h4>Boas-vindas!</h4>
          <p style={{ color: "#585858" }}>
            Entre utilizando uma das opções abaixo:
          </p>
        </Col>
      </Row>
      {/* Linha com botões de login com redes sociais */}

      <Row className="mb-4 justify-content-around">
        <Button
          variant="outline-dark"
          className="mr-2 col-auto d-flex justify-content-center align-items-center social-button "
          style={{ width: "24%" }}
        >
          <div className="rounded-lg tz social-button">TZ</div>
        </Button>
        <Button
          variant="outline-dark"
          className="mr-2 col-auto d-flex justify-content-center align-items-center social-button"
          style={{ width: "24%" }}
        >
          <FaFacebook />
        </Button>
        <Button
          variant="outline-dark"
          className="mr-2 col-auto d-flex justify-content-center align-items-center social-button"
          style={{ width: "24%" }}
        >
          <FaApple />
        </Button>
        <Button
          variant="outline-dark"
          className="col-auto d-flex justify-content-center align-items-center social-button"
          style={{ width: "24%" }}
        >
          <FaTwitter />
        </Button>
      </Row>
      {/* Linha com separadores "ou" */}
      <Row className="mb-4">
        <Col className="text-center d-flex justify-content-aroundp-0 text-center d-flex justify-content-between p-0">
          <hr style={{ width: "45%" }} />
          <p>ou</p>
          <hr style={{ width: "45%" }} />
        </Col>
      </Row>
      {/* Linha com formulário de login e senha */}
      <Row className="mb-4">
        <Col className="p-0">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Usuário</Form.Label>
              <div
                className="input-group"
                style={{
                  border: "var(--bs-border-width) solid var(--bs-border-color)",
                  borderRadius: "var(--bs-border-radius)",
                }}
              >
                <div className="input-group-append border-0 d-flex justify-content-center">
                  <span
                    className="input-group-text border-0"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <BsFillPersonFill
                      className="border-0"
                      fill="#fff"
                      strokeWidth="1"
                    />
                  </span>
                </div>
                <Form.Control
                  className="border-0"
                  type="text"
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <div
                className="input-group"
                style={{
                  border: "var(--bs-border-width) solid var(--bs-border-color)",
                  borderRadius: "var(--bs-border-radius)",
                }}
              >
                <div className="input-group-append border-0 d-flex justify-content-center">
                  <span
                    className="input-group-text border-0"
                    style={{ backgroundColor: "transparent" }}
                  >
                    <BsFillLockFill
                      className="border-0"
                      fill="#fff"
                      strokeWidth="1"
                    />
                  </span>
                </div>
                <Form.Control
                  className="border-0"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Manter conectado" />
            </Form.Group>

            <Form.Group controlId="formBasicCaptcha">
              {/* Aqui você pode adicionar o campo para o CAPTCHA */}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="d-flex justify-content-center align-items-center w-100 mt-2 btn btn-primary"
            >
              <FaSignInAlt className="ml-1" />
              &nbsp; Entrar
            </Button>
          </Form>
        </Col>
      </Row>
      {/* Linha com a frase "Esqueceu sua senha?" */}
      <Row>
        <Col className="mt-3">
          <p>
            Esqueceu sua senha?{" "}
            <a
              href="/#"
              className="text-decoration-none"
              style={{ fontWeight: "bold" }}
            >
              Recuperar Senha
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
