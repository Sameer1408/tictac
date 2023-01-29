import {  } from "../actionTypes/actionType";

const initialState = {
    numbers:0
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_ITEM:
    //   return {
    //     ...state,
    //     numOfItems: state.numOfItems + 1,
    //   };

  
    default:
      return state;
  }
};

export default reducers;