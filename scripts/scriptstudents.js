const studentsURL = "http://petlatkea.dk/2019/students1991.json";

const template = document.querySelector("#myTemp").content;
const parent = document.querySelector("main");
const modal = document.querySelector(".modal-bg");

loadDataStudents(studentsURL);

function loadDataStudents(link) {
  fetch(link)
    .then(e => e.json())
    .then(data => sorting(data));
}

// function sortData(data) {
//   data.sort(function(a, b) {
//     var nameA = a.name; // ignore upper and lowercase
//     var nameB = b.name; // ignore upper and lowercase
//     if (nameA < nameB) {
//       return -1;
//     }
//     if (nameA > nameB) {
//       return 1;
//     }
//   });
//   showStudents(data);
// }
function showDetails(data) {
  modal.querySelector(".modal-name").textContent = data.fullname;
  modal.classList.remove("hide");
}
function sorting() {
  fetch(studentsURL)
    .then(e => e.json())
    .then(data => sortAsc(data));
}
function sortAsc(data) {
  function compareStrings(a, b) {
    // Assuming you want case-insensitive comparison
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
  }

  data.sort(function(a, b) {
    return compareStrings(a.fullname, b.fullname);
  });

  showStudents(data);
}
function showStudents(data) {
  data.forEach(loadDataStudents => {
    console.log(event);
    //clone the template
    const clone = template.cloneNode(true);
    clone.querySelector("button").addEventListener("click", () => {
      showDetails(loadDataStudents);
    });

    modal.addEventListener("click", () => modal.classList.add("hide"));

    //populate it
    const firstName = clone.querySelector("h1");
    const secondName = clone.querySelector("h2");
    const house = clone.querySelector("h3");
    const splitName = loadDataStudents.fullname.split(" ");
    const firstNameValue = splitName[0];
    const secondNameValue = splitName[splitName.length - 1];

    firstName.textContent = "First name: " + firstNameValue + ".";
    secondName.textContent = "Second name: " + secondNameValue + ".";

    house.textContent = "House name: " + loadDataStudents.house + ".";

    //append to DOM
    parent.appendChild(clone);
  });
}
