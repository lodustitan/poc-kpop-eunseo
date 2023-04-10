# POC - Eunseo (Browser Game)

## Sobre

Eunseo é um Browser Game Online totalmente inspirado no BOT Eunseo do Discord, um jogo de colecionar, trocar e gachar Cards de K-POP.

## Guia de Instalação

1. Instale as dependencias.
```sh
npm install
```

2. Crie o arquivo de environments `.env` na raiz, usando como exemplo o `.env.exemple`

3. Gere o banco de dados Postgres SQL e use o prisma.
```sh
npm run migration:run
```

4. Para rodar o servidor
```bash
npm run dev:start
```