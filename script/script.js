const loadPhone = async (phoneShow = "apple") => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneShow}`)
    const data = await res.json()
    const phone = data.data
    // console.log(phone)
    displayPhone(phone)
}

const displayPhone = phones => {
    // step 1: where append data
    const phoneContainer = document.getElementById("phone-container");
    // clear after search 
    phoneContainer.textContent = "";

    // condition here if the phone have more than 10 the button will show
    const phoneShowing = document.getElementById("phone-showing");
    if (phones.length > 10) {
        phoneShowing.classList.remove('hidden')
    } else {
        phoneShowing.classList.add('hidden')
    }

    // showing 10 result 
    phones = phones.slice(0, 10)

    phones.forEach(phone => {
        console.log(phone);
        // step 2: create a div
        const phoneDisplay = document.createElement("div");
        // step 3: write data in the div
        phoneDisplay.classList = `card bg-base-100 shadow-xl`
        phoneDisplay.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `
        // step 4: append the child
        phoneContainer.appendChild(phoneDisplay);
    });
    toggleLoadingHandler(false)
}
// handel show details
const handelShowDetails = async (id) => {
    console.log("your data is here", id);
    // data load
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phoneInfo = data.data
    showPhoneDetails(phoneInfo)
}

// show phone details
const showPhoneDetails = (phone) => {
    console.log(phone)
    // modal image
    const modalImage = document.getElementById('modal-img');
    modalImage.innerHTML = `
        <img src="${phone.image}">
    `
    // phone name show
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;
    // phone others details showing
    const phoneOthersDetails = document.getElementById('phone-others-details');
    phoneOthersDetails.innerHTML = `
        <p>${'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'}</p> 
        <p><span class="font-semibold">Storage: </span>${phone.mainFeatures?.storage}</p>
        <p><span class="font-semibold">Display Size: </span>${phone.mainFeatures?.displaySize}</p>
        <p><span class="font-semibold">chipset: </span>${phone.mainFeatures?.chipSet}</p>
        <p><span class="font-semibold">Memory: </span>${phone.mainFeatures?.memory}</p>
        <p><span class="font-semibold">slug: </span>${phone.slug}</p>
        <p><span class="font-semibold">releaseDate: </span>${phone?.releaseDate || '12,02,2022'}</p>
        <p><span class="font-semibold">Brand: </span>${phone.brand}</p>
        <p><span class="font-semibold">GPS: </span>${phone.others?.GPS || 'No GPS'}</p>
    `


    // showing phone details
    show_details_modal.showModal()
}

// search click update
const handelSearch = () => {
    toggleLoadingHandler(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText);
};

const toggleLoadingHandler = (isLoading) => {
    const loadingButton = document.getElementById("loading-button");
    if (isLoading) {
        loadingButton.classList.remove('hidden');
    } else {
        loadingButton.classList.add('hidden')
    }
}

loadPhone()