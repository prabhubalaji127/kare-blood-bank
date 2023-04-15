console.log("Script started.");

// Add an event listener to the form for adding a donor
const addDonorForm = document.querySelector("form:first-of-type");
addDonorForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting

  // Get the form data
  const name = addDonorForm.elements["name"].value;
  const age = addDonorForm.elements["age"].value;
  const bloodGroup = addDonorForm.elements["bloodGroup"].value;
  const contactNo = addDonorForm.elements["contactNo"].value;
  const email = addDonorForm.elements["email"].value;

  if ( (parseInt(age) < 18) || (parseInt(age) > 70) ) {
    alert("You are not allowed to give blood. Sorry.")
    return;
  }

  // Create a new donor object
  const newDonor = {
    name,
    age,
    bloodGroup,
    contactNo,
    email,
  };

  // Store the donor in local storage
  let donors = JSON.parse(localStorage.getItem("donors")) || [];
  donors.push(newDonor);
  localStorage.setItem("donors", JSON.stringify(donors));

  // Reset the form
  addDonorForm.reset();

  // Show a success message
  alert("Donor added successfully!");
});

// Add an event listener to the form for searching for a donor
const searchDonorForm = document.querySelector("form:last-of-type");

searchDonorForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the form from submitting

  // Get the search term
  const searchBloodGroup = searchDonorForm.elements["searchBloodGroup"].value;
  const searchName = searchDonorForm.elements["searchName"].value;
  let filteredDonors = "";
  const donors = JSON.parse(localStorage.getItem("donors")) || [];

  // Search for donors in local storage
  if (searchBloodGroup) {
    filteredDonors = donors.filter(
      (donor) =>
        donor.bloodGroup.toLowerCase() === searchBloodGroup.toLowerCase()
    );
  }

  if (searchName) {
    if (searchBloodGroup) {
      filteredDonors = filteredDonors.filter((donor) =>
        donor.name.toLowerCase().includes(searchName.toLowerCase())
      );
    } else {
      filteredDonors = donors.filter((donor) =>
        donor.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
  }

  // Clear any previous search results
  const searchResults = document.querySelector("#searchResults");
  searchResults.innerHTML = "";

  // Show the search results
  if (filteredDonors.length === 0) {
    searchResults.textContent = "No donors found.";
  } else {
    const ul = document.createElement("ul");
    for (const donor of filteredDonors) {
      const li = document.createElement("li");
      li.textContent = `${donor.name}, ${donor.age}, ${donor.bloodGroup}, ${donor.contactNo}, ${donor.email}`;
      ul.appendChild(li);
    }
    searchResults.appendChild(ul);
  }
});
