export const getTiket = async function (payload) {
    let response = fetch("/api/flight/tiket?" + new URLSearchParams(payload), {
      method: "GET",
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return null;
      });
  
    return response;
};

export const getPegiPegi = async function (payload) {
  let response = fetch("/api/flight/pegipegi?" + new URLSearchParams(payload), {
    method: "GET",
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return null;
    });

  return response;
};

export const getMisterALadin = async function (payload) {
  let response = fetch("/api/flight/misteraladin?" + new URLSearchParams(payload), {
    method: "GET",
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return null;
    });

  return response;
};

export const getAgoda = async function (payload) {
  let response = fetch("/api/flight/agoda?" + new URLSearchParams(payload), {
    method: "GET",
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return null;
    });

  return response;
};
