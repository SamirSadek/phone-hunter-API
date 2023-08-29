const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = phones => {
    // console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    // clear container cards before adding new cards

    phoneContainer.textContent = '';
    // display Show All Btn
    const showAllContainer = document.getElementById('show-all-container');

    if(phones.length>12){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add('hidden')
    }

    phones = phones.slice(0,12);


    phones.forEach(phone =>{
        console.log(phone);
        //2 create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;

        // 3 set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>`;
        // 4 append child
        phoneContainer.appendChild(phoneCard);


    });
}

// Handle Search Button

const handleSearch = () =>{
 const searchField = document.getElementById('search-field'); 
 const searchText = searchField.value;
 console.log(searchText);
 loadPhone(searchText);
}


