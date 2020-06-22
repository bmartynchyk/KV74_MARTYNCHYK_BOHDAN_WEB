export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case "ITEMS_HAS_ERRORED":
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case "ITEMS_IS_LOADING":
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case "ITEMS_FETCH_DATA_SUCCESS":
            return action.items;
        case "DELETE_ITEM":
            return state.filter(item => item.id !== action.id);

        default:
            return state;
    }
}

export function post(state = {}, action) {
    switch (action.type) {
        case "POST_FETCH_DATA_SUCCESS":
            return action.post;
        case "EDIT_ITEM":
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}

export function createNewPost(state = {}, action) {
    switch (action.type) {
        case "CREATE_NEW_ITEM":
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
