# **UBOTS Desafio Técnico  - Dev (Lucas Vieira)**
Desafio técnico, desenvolvimento de uma **API Rest** como solução para uma fintech de central de relacionamento

</br>

### Link da Documentação para uso da API: https://documenter.getpostman.com/view/10732905/2s9Xy3qqnX

</br>

![Diagrama UML - Modelo Conceitual API Ubots-Invext](./public/UML.png)

</br>

# Introdução
A automatização da Central de Relacionamento foi proposta baseada em três regras crucias, que constam em detalhe na documentação da API, necessária para sua boa utilização: https://documenter.getpostman.com/view/10732905/2s9Xy3qqnX

- Atendes organizados em grupos que são designados para atender assuntos específicos
- Limite de até 3 solicitações em atendimento por atendente
- Lógica de atribuição de solicitações pendetes após a conclusão das solicitações vinculadas

</br>


## Organização do Código

O código da API foi desenvolvido em NODE **JS**, e sua organização foi estruturada em um padrão de arquitetura orientada a microserviços.

</br>

## Instruções de Execução do Projeto

### **AMBIENTE DE DESENVOLVIMENTO**

Primeiro, clone este reposiótio:

```bash
$ git clone git@github.com:lkasvr/ubots.git
```
Segundo, execute os comandos abaixo na raíz do projeto:

```bash
npm install
```

Após isso, e antes de executar o servidor, você deve fazer a migração e criação da **base de dados**; Para facilitar a API utiliza o **Prisma** como ORM que está configurado com o SQLite em um arquivo na prória estrutura do projeto, logo execute os seguintes comandos em sequência:

```bash
npx prisma migrate dev
```

```bash
npm run dev
```

</br>
