import { combineReducers } from "redux";
import {
    items,
    itemsHasErrored,
    itemsIsLoading,
    post,
    createNewPost
} from "./items";

export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    post,
    newPost: createNewPost
});
