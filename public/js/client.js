console.log("Client side javascript is working");

document.querySelector("#search-form").addEventListener("submit", e => {
    e.preventDefault();

    const query = e.target.elements.place.value;
    console.log(query);
});
