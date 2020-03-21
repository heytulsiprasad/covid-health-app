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

const panicForm = document.querySelector("#panic-form");

panicForm.addEventListener("submit", e => {
    e.preventDefault();

    const box = document.querySelector("#result");

    const cough = e.target.elements.cough.checked;
    const fever = e.target.elements.fever.checked;
    const tired = e.target.elements.tired.checked;
    const breathe = e.target.elements.breathe.checked;
    const days = e.target.elements.since.value;

    if (days <= 4) {
        if (cough || fever) {
            box.textContent =
                "These are very mild symptomps which may even be just cold. So have patience and faith, there's nothing to worry. ✌";
        } else if (tired) {
            box.textContent =
                "It's been hell of a pandemic, maybe you just need to rest a little bit more. We're here for you ❤";
        } else if (breathe) {
            box.textContent =
                "This is a very rare symptom and its just been a while. Stay calm for a few days and come back again. 😉";
        } else {
            box.textContent =
                "Sorry, we gave our best, but still its hard saying your situation. Prefer to contact our specialists below. 😕";
        }
    } else if (days > 4 && days <= 10) {
        box.textContent =
            "You shall prefer by a doctor or any medical practinioner immediately. 🏥😷🔜";
    } else {
        box.textContent =
            "Um...somethings not right with us. Maybe you could give us call. 📞";
    }
});
