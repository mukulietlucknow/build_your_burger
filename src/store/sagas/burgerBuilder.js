import { put } from "redux-saga/effects";

import axios from 'axios';
import * as actions from "../actions/index";

export function* initIngredientSaga(action) {
  try {
    const response = yield axios.get(
      "https://burger-f0ba1.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredient(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientFailed());
  }
}
