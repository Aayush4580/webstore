export const navInitialState = {
  countries: [],
  country: "",
};
export const ADD_COUNTRIES = "ADD_COUNTRIES";
export const navReducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };
    case "FILTER_COUNTRY":
      return {
        ...state,
        country: payload,
      };
    default:
      return state;
  }
};
