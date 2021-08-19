const fetch = require("isomorphic-unfetch");
const config = require("../../config/config.json");

const ping = function (ctx) {
  ctx.respond = true;
  ctx.message = "Admin App Running...";
  ctx.statusCode = 200;
  return;
};

const getTiket = async function (ctx) {
  const URL = `${config.core.private_gateway.base_url}${config.core.private_gateway.tiket}`;
  let response = await fetch(`${URL}?` + new URLSearchParams(ctx.request.query), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      let errorResponse = {
        code: 500,
        code_message: error.message,
        code_type: "error",
        data: null,
      };
      return errorResponse;
    });

  ctx.body = response;
};

const getPegiPegi = async function (ctx) {
  const URL = `${config.core.private_gateway.base_url}${config.core.private_gateway.pegipegi}`;
  let response = await fetch(`${URL}?` + new URLSearchParams(ctx.request.query), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      let errorResponse = {
        code: 500,
        code_message: error.message,
        code_type: "error",
        data: null,
      };
      return errorResponse;
    });

  ctx.body = response;
};

const getMisterAladin = async function (ctx) {
  const URL = `${config.core.private_gateway.base_url}${config.core.private_gateway.misteraladin}`;
  let response = await fetch(`${URL}?` + new URLSearchParams(ctx.request.query), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      let errorResponse = {
        code: 500,
        code_message: error.message,
        code_type: "error",
        data: null,
      };
      return errorResponse;
    });

  ctx.body = response;
};

const getAgoda = async function (ctx) {
  const URL = `${config.core.private_gateway.base_url}${config.core.private_gateway.agoda}`;
  let response = await fetch(`${URL}?` + new URLSearchParams(ctx.request.query), {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      let errorResponse = {
        code: 500,
        code_message: error.message,
        code_type: "error",
        data: null,
      };
      return errorResponse;
    });

  ctx.body = response;
};

module.exports = {
  ping,
  getMisterAladin,
  getTiket,
  getPegiPegi,
  getAgoda
};
