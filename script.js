let sessions = JSON.parse(localStorage.getItem("studySessions")) || [];

const subject = document.getElementById("subject");
const topic = document.getElementById("topic");
const hours = document.getElementById("hours");

const addBtn = document.getElementById("addBtn");
const sessionList = document.getElementById("sessionList");
const totalHoursElement = document.getElementById("totalHours");


// Display saved sessions when page opens
displaySessions();


addBtn.addEventListener("click", function () {

    const subjectValue = subject.value.trim();
    const topicValue = topic.value.trim();
    const hoursValue = Number(hours.value);

    // Don't allow empty values
    if (subjectValue === "" || topicValue === "" || hoursValue <= 0) {
        alert("Please enter valid session details.");
        return;
    }

    // Create session object
    const session = {
        id: Date.now(),
        subject: subjectValue,
        topic: topicValue,
        hours: hoursValue
    };

    // Add session to array
    sessions.push(session);

    // Save to localStorage
    saveSessions();

    // Display sessions
    displaySessions();

    // Clear inputs
    subject.value = "";
    topic.value = "";
    hours.value = "";
});


// Save sessions
function saveSessions() {
    localStorage.setItem("studySessions", JSON.stringify(sessions));
}


// Display sessions
function displaySessions() {

    sessionList.innerHTML = "";

    let totalHours = 0;

    sessions.forEach(function(session) {

        totalHours += session.hours;

        const sessionDiv = document.createElement("div");
        sessionDiv.className = "session";

        sessionDiv.innerHTML = `
            <div>
                <strong>${session.subject}</strong>
                <p>${session.topic}</p>
            </div>

            <span>${session.hours} hours</span>

            <button class="delete-button">
                Delete
            </button>
        `;

        // Delete session
        const deleteButton =
            sessionDiv.querySelector(".delete-button");

        deleteButton.addEventListener("click", function() {

            sessions = sessions.filter(function(item) {
                return item.id !== session.id;
            });

            saveSessions();
            displaySessions();
        });

        sessionList.appendChild(sessionDiv);
    });

    totalHoursElement.textContent =
        totalHours + " hours";
}