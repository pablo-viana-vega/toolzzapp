import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Logo from "../images/logo192.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      alert("Usuário registrado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar usuário");
    }
  };

  return (
    <Container>
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
            to="/login"
          >
            Voltar para o login
          </Link>
        </Col>
      </Row>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          Registrar
        </button>
      </form>
    </Container>
  );
};

export default Register;
