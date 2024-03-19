const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;
const readline = require("readline");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

const secretKey = generateSecretKey();

function generateSecretKey() {
  return crypto.randomBytes(64).toString("hex");
}

async function chooseDatabase() {
  return new Promise((resolve, reject) => {
    const databases = [];
    fs.readdir(".", (err, files) => {
      if (err) {
        reject(err);
      } else {
        files.forEach((file) => {
          if (file.endsWith(".db")) {
            databases.push(file);
          }
        });
        resolve(databases);
      }
    });
  });
}

async function selectOrCreateDatabase() {
  try {
    const databases = await chooseDatabase();

    if (databases.length === 0) {
      console.log("Nenhum banco de dados encontrado. Criando um novo...");
      await createDatabase("test.db");
      return connectToDatabase("test.db");
    } else {
      const dbName = databases[0]; // Assume o primeiro banco de dados encontrado
      console.log(`Conectando ao banco de dados existente: ${dbName}`);
      return connectToDatabase(dbName);
    }
  } catch (error) {
    throw error;
  }
}
async function createDatabase(dbName) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbName, (err) => {
      if (err) {
        reject(err);
      } else {
        db.serialize(() => {
          db.run(
            "CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)"
          );
          db.close();
          console.log(`Banco de dados '${dbName}' criado com sucesso!`);
          resolve();
        });
      }
    });
  });
}

async function connectToDatabase(dbName) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbName, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}

async function main() {
  try {
    const db = await selectOrCreateDatabase(); // Espera até que o banco de dados seja inicializado
    await startServer(db); // Passa o banco de dados como parâmetro para a função startServer
  } catch (error) {
    console.error("Erro ao selecionar ou criar o banco de dados:", error);
    rl.close();
  }
}

function startServer(db) {
  app.post("/register", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      db.run(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [req.body.username, hashedPassword],
        (err) => {
          if (err) {
            res.status(500).send("Erro ao registrar usuário");
          } else {
            res.status(201).send("Usuário registrado com sucesso");
          }
        }
      );
    } catch {
      res.status(500).send("Erro ao registrar usuário");
    }
  });

  app.post("/login", async (req, res) => {
    db.get(
      "SELECT * FROM users WHERE username = ?",
      [req.body.username],
      async (err, row) => {
        if (err || !row) {
          return res.status(400).send("Usuário não encontrado");
        }
        try {
          if (await bcrypt.compare(req.body.password, row.password)) {
            const accessToken = jwt.sign({ username: row.username }, secretKey);
            res.json({ accessToken: accessToken });
          } else {
            res.status(401).send("Senha incorreta");
          }
        } catch {
          res.status(500).send("Erro ao fazer login, usuário nao cadastrado.");
        }
      }
    );
  });

  app.get("/database", (req, res) => {
    db.all("SELECT * FROM users", (err, rows) => {
      if (err) {
        res.status(500).send("Erro ao acessar o banco de dados");
      } else {
        res.json(rows);
      }
    });
  });

  console.log("Configurando rotas...");

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
  });

  console.log("Iniciando servidor...");

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  console.log("Servidor iniciado com sucesso!");
}

main();
