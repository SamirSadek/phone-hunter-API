const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  //   console.log(phones);
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
  // clear container cards before adding new cards

  phoneContainer.textContent = "";
  // display Show All Btn
  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  //   console.log("is show all", isShowAll);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // console.log(phone);
    //2 create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl`;

    // 3 set inner html
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="" /></figure>
            <div class="card-body ">
                <h2 class="card-title justify-center">${phone.phone_name}</h2>
                <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
                <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                </div>
            </div>`;
    // 4 append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};
// handle show details
const showDetails = async (id) => {
  //   console.log(id);
  // load single phone data

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  //   console.log(data);
  showPhoneDetails(phone);
};
//
const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = phone.name;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
     
     <img class="mx-auto my-8" src="${phone.image}" alt="" />
     
     <p><span class="font-semibold">Storage :</span>${phone.mainFeatures.storage}</p>
  
  `;
  // show the modal
  show_details_modal.showModal();
};
// Handle Search Button

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handle show all

const handleShowAll = () => {
  handleSearch(true);
};
