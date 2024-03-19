const { exec } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

// Caminho para o diretório do frontend e do backend
const backendDir = path.join(__dirname, "backend");
const frontendDir = path.join(__dirname, "frontend");

// Função principal para construir o frontend e iniciar o servidor
async function checkAndInstallDependencies(directory) {
  try {
    await fs.access(path.join(directory, "node_modules"));
    console.log(`Pasta 'node_modules' encontrada em ${directory}.`);
  } catch (error) {
    console.log(
      `Pasta 'node_modules' não encontrada em ${directory}. Instalando dependências...`
    );
    await npmInstall(directory);
    console.log(`Dependências instaladas com sucesso em ${directory}.`);
  }
}

async function npmInstall(directory) {
  return new Promise((resolve, reject) => {
    exec("npm install", { cwd: directory }, (error, stdout, stderr) => {
      if (error) {
        console.error(
          `Erro ao instalar dependências em ${directory}: ${error}`
        );
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function main() {
  try {
    await checkAndInstallDependencies(frontendDir);
    await checkAndInstallDependencies(backendDir);
    await buildFrontend();
    await startBackend();
  } catch (error) {
    console.error("Ocorreu um erro:", error);
  }
}

function buildFrontend() {
  return new Promise((resolve, reject) => {
    console.log("Construindo o frontend...");
    exec("npm run build", { cwd: frontendDir }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao construir o frontend: ${error}`);
        reject(error);
      } else {
        console.log("Frontend construído com sucesso!");
        resolve();
      }
    });
  });
}

function startBackend() {
  return new Promise((resolve, reject) => {
    console.log("Iniciando o servidor backend...");
    const childProcess = exec("node index.js", { cwd: backendDir });

    childProcess.stdout.on("data", (data) => {
      process.stdout.write(data); // Saída dos logs para o console do scripts.js
    });

    childProcess.stderr.on("data", (data) => {
      process.stderr.write(data); // Saída de erros para o console do scripts.js
    });

    childProcess.on("error", (error) => {
      console.error(`Erro ao iniciar o servidor backend: ${error}`);
      reject(error);
    });

    childProcess.on("exit", (code) => {
      if (code === 0) {
        console.log("Servidor backend iniciado com sucesso!");
        resolve();
      } else {
        reject(
          new Error(
            `O processo do servidor backend encerrou com código de saída ${code}`
          )
        );
      }
    });
  });
}

main();
