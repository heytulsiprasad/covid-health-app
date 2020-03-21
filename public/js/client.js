console.log("Client side javascript is working");

const form = document.querySelector("#search-form");

form.addEventListener("submit", e => {
    e.preventDefault();
    // console.log(e);

    const input = e.target.elements.search.value;
    // console.log(input);

    fetch("http://localhost:5000/covid?search=" + encodeURIComponent(input))
        .then(response => {
            response.json().then(res => {
                console.log(res);
                // do something with res data in object
                const bg1 = document.querySelector(".main__default--bg1");
                bg1.style.backgroundImage = `url(${res.image1})`;

                const bg2 = document.querySelector(".footer--bg2");
                bg2.style.backgroundImage = `url(${res.image2})`;

                const title = document.querySelector(".result__title");
                if (res.place) {
                    title.textContent = res.place;
                } else {
                    title.textContent = "Latest Updates";
                }
            });
        })
        .catch(error => {
            console.log("No address provided!");
        });
});
