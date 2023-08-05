const jokeCategorySelect = document.getElementById("jokeCategory");
const getJokeBtn = document.getElementById("getJokeBtn");
const jokeCategoryDisplay = document.getElementById("jokeCategoryDisplay");
const jokeDisplay = document.getElementById("jokeDisplay");
const newJokeBtn = document.getElementById("newJokeBtn");

const apiUrl = "https://v2.jokeapi.dev/joke/";

let currentJoke = {};

function getJoke(category) {
    let apiUrlWithCategory = apiUrl;
    if (category !== "Any") {
        apiUrlWithCategory += `${category}`;
    } else {
        apiUrlWithCategory += `Any`;
    }

    fetch(apiUrlWithCategory)
        .then((response) => response.json())
        .then((data) => {
            if (data.type === "single") {
                currentJoke.setup = "";
                currentJoke.punchline = data.joke;
            } else {
                currentJoke.setup = data.setup;
                currentJoke.punchline = data.delivery;
            }

            jokeCategoryDisplay.textContent = data.category || "Miscellaneous";
            displayJoke();
        })
        .catch((error) => console.log("Error fetching joke:", error));
}

function displayJoke() {
    jokeDisplay.innerHTML = `${currentJoke.setup} <br/> ${currentJoke.punchline}`;
}

function handleGetJoke() {
    const selectedCategory = jokeCategorySelect.value.toLowerCase();
    getJoke(selectedCategory);
}

function handleNewJoke() {
    const selectedCategory = currentJoke.category ? currentJoke.category.toLowerCase() : "Any";
    getJoke(selectedCategory);
}

getJokeBtn.addEventListener("click", handleGetJoke);
newJokeBtn.addEventListener("click", handleNewJoke);

// Initial joke fetch
getJoke("Any");

