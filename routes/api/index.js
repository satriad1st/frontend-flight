const handler = require("../handler");

module.exports = function (router) {
  router.get("/ping", handler.ping);
  router.get("/api/flight/tiket", handler.getTiket);
  router.get("/api/flight/pegipegi", handler.getPegiPegi);
  router.get("/api/flight/misteraladin", handler.getMisterAladin);
  router.get("/api/flight/agoda", handler.getAgoda);
};
