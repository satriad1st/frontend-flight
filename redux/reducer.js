import { actionTypes } from "./actions";

/* EXAMPLE INITIAL STATE */
export const exampleInitialState = {
  error: false,
  lastUpdate: 0,
  settingData: null,
  dataUser: null,
  product: null,
  category : null,
  loading : null,
  loading2 : null,
  loading3 : null,
  detailProduct : null,
  home : null,
  order : null,
  profile : null,
  setting : null,
  users : null,
  data1 : null,
  data2 : null,
  data3 : null,
};

function reducer(state = exampleInitialState, action) {
  switch (action.type) {
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error },
      };

    case actionTypes.SETTING:
      return {
        ...state,
        ...{ setting: action.data },
      };
    
    case actionTypes.USERS:
      return {
        ...state,
        ...{ user: action.data },
      };

    case actionTypes.SET_DATA_USER:
      return {
        ...state,
        ...{ dataUser: action.data },
      };
    
    case actionTypes.PROFILE:
      return {
        ...state,
        ...{ profile: action.data },
      };

    case actionTypes.LOAD_DATA_ORDER:
    return {
      ...state,
      ...{ order: action.data },
    };
    
    case actionTypes.HOME:
      return {
        ...state,
        ...{ home: action.data },
      };

    case actionTypes.DATA1:
        return {
          ...state,
          ...{ data1: action.data },
        };

    case actionTypes.DATA2:
      return {
        ...state,
        ...{ data2: action.data },
      };
      
    case actionTypes.DATA3:
      return {
        ...state,
        ...{ data3: action.data },
      };
    case actionTypes.SET_LOADING:
    return {
      ...state,
      ...{ loading: action.data },
    };

    case actionTypes.SET_LOADING2:
      return {
        ...state,
        ...{ loading2: action.data },
      };

    case actionTypes.SET_LOADING3:
      return {
        ...state,
        ...{ loading3: action.data },
      };

    case actionTypes.DETAIL_PRODUCT:
    return {
      ...state,
      ...{ detailProduct: action.data },
    };

    case actionTypes.TICK_CLOCK:
      return {
        ...state,
        ...{ lastUpdate: action.ts },
      };
    
    case actionTypes.LOAD_DATA_SUCCESS:
      return {
        ...state,
        ...{ settingData: action.data },
      };
    
    case actionTypes.LOAD_DATA_PRODUCT:
      return {
        ...state,
        ...{ product: action.data },
      };
    
    case actionTypes.LOAD_DATA_CATEGORY:
      return {
        ...state,
        ...{ category: action.data },
      };
    
      default:
      return state;
  }
}

export default reducer;
