const fetchDelete = (
    id = "",
    url = `https://bloggy-api.herokuapp.com/posts`
) => {
    const trueUrl = `${url}/${id}`;
    return fetch(trueUrl, {
        method: "delete"
    }).then(res => res.json());
};

export { fetchDelete };
export default fetchDelete;
