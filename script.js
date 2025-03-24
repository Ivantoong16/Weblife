// Toggle background music
function toggleMusic() {
    var music = document.getElementById("bg-music");
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Toggle navigation menu
function toggleMenu() {
    let navLinks = document.getElementById("nav-links");
    if (navLinks.style.display === "block") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.location.pathname;

    // If not on the home page, hide the menu links
    if (!currentPage.includes("index.html") && currentPage !== "/") {
        document.body.classList.add("hide-menu");
    }
});

let weeklyRoutine = JSON.parse(localStorage.getItem("weeklyRoutine")) || {};

function addExercise() {
    let day = document.getElementById('day').value;
    let exerciseName = document.getElementById('exercise').value;
    let duration = document.getElementById('duration').value;

    if (exerciseName && duration) {
        if (!weeklyRoutine[day]) {
            weeklyRoutine[day] = [];
        }
        weeklyRoutine[day].push({ name: exerciseName, duration: duration });
        saveRoutine();
        displayRoutine();
        document.getElementById('exercise').value = '';
        document.getElementById('duration').value = '';
    } else {
        alert('Please enter both exercise name and duration');
    }
}

function displayRoutine() {
    let routineDiv = document.getElementById('routine');
    routineDiv.innerHTML = '';

    let selectedDay = document.getElementById('day').value;
    let allExercises = [];

    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let selectedIndex = days.indexOf(selectedDay);

    for (let i = 0; i <= selectedIndex; i++) {
        let day = days[i];
        if (weeklyRoutine[day]) {
            allExercises.push({ day: day, exercises: weeklyRoutine[day] });
        }
    }

    allExercises.forEach(entry => {
        let daySection = document.createElement('div');
        daySection.innerHTML = `<h3>${entry.day}</h3>`;
        let ul = document.createElement('ul');

        entry.exercises.forEach((exercise, index) => {
            let li = document.createElement('li');
            li.innerHTML = `${exercise.name} - ${exercise.duration} min 
                <button onclick="removeExercise('${entry.day}', ${index})">Remove</button>`;
            ul.appendChild(li);
        });

        daySection.appendChild(ul);
        routineDiv.appendChild(daySection);
    });
}

function removeExercise(day, index) {
    weeklyRoutine[day].splice(index, 1);
    if (weeklyRoutine[day].length === 0) {
        delete weeklyRoutine[day];
    }
    saveRoutine();
    displayRoutine();
}

function clearRoutine() {
    weeklyRoutine = {};
    saveRoutine();
    displayRoutine();
}

function saveRoutine() {
    localStorage.setItem("weeklyRoutine", JSON.stringify(weeklyRoutine));
}

// Load and display routine on page load
window.onload = displayRoutine;
