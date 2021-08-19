export const actionTypes = {
  FAILURE: "FAILURE",
  LOAD_DATA: "LOAD_DATA",
  LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
  START_CLOCK: "START_CLOCK",
  TICK_CLOCK: "TICK_CLOCK",
  SET_DATA_USER: "SET_DATA_USER",
  LOAD_DATA_PRODUCT: "LOAD_DATA_PRODUCT",
  LOAD_DATA_ORDER: "LOAD_DATA_ORDER",
  LOAD_DATA_CATEGORY: "LOAD_DATA_CATEGORY",
  SET_LOADING: "SET_LOADING",
  SET_LOADING2: "SET_LOADING2",
  SET_LOADING3: "SET_LOADING3",
  DETAIL_PRODUCT: "DETAIL_PRODUCT",
  HOME: "HOME",
  PROFILE: "PROFILE",
  SETTING: "SETTING",
  USERS: "USERS",
  DATA1: "DATA1",
  DATA3: "DATA3",
  DATA2 : "DATA2"
};

export function setDataUser(data) {
  return {
    type: actionTypes.SET_DATA_USER,
    data,
  };
}

export function setDataUsers(data) {
  return {
    type: actionTypes.USERS,
    data,
  };
}

export function setDataSetting(data) {
  return {
    type: actionTypes.SETTING,
    data,
  };
}

export function setDataProfile(data) {
  return {
    type: actionTypes.PROFILE,
    data,
  };
}

export function loadDataProduct(data) {
  return {
    type: actionTypes.LOAD_DATA_PRODUCT,
    data,
  };
}

export function loadDataOrder(data) {
  return {
    type: actionTypes.LOAD_DATA_ORDER,
    data,
  };
}

export function loadDataHome(data) {
  return {
    type: actionTypes.HOME,
    data,
  };
}

export function loadData1(data) {
  return {
    type: actionTypes.DATA1,
    data,
  };
}

export function loadData3(data) {
  return {
    type: actionTypes.DATA3,
    data,
  };
}

export function loadData2(data) {
  return {
    type: actionTypes.DATA2,
    data,
  };
}

export function loadDetailProduct(data) {
  return {
    type: actionTypes.DETAIL_PRODUCT,
    data,
  };
}

export function loadDataCategory(data) {
  return {
    type: actionTypes.LOAD_DATA_CATEGORY,
    data,
  };
}

export function setLoading(data) {
  return {
    type: actionTypes.SET_LOADING,
    data,
  };
}

export function setLoading2(data) {
  return {
    type: actionTypes.SET_LOADING2,
    data,
  };
}

export function setLoading3(data) {
  return {
    type: actionTypes.SET_LOADING3,
    data,
  };
}


export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  };
}

export function loadData() {
  return { type: actionTypes.LOAD_DATA };
}


/* EXAMPLE: START CLOCK */
export function startClock() {
  return { type: actionTypes.START_CLOCK };
}

/* EXAMPLE: TICK CLOCK */
export function tickClock(isServer) {
  return {
    type: actionTypes.TICK_CLOCK,
    light: !isServer,
    ts: Date.now(),
  };
}

export function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data,
  };
}
