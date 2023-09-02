const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phone = data.data
    displayPhone(phone, isShowAll)
}


const displayPhone = (phone, isShowAll) => {
    // console.log(phone)
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container cards before adding new cards
    phoneContainer.textContent = ''

    // display show all btn if there are more thar 12
    const showAll = document.getElementById('show-all-container')
    if (phone.length > 12 && !isShowAll) {
        showAll.classList.remove('hidden')
    }
    else {
        showAll.classList.add('hidden')
    }
    noAvailable(phone.length)
    // console.log('showAll', isShowAll)
    // display first 10
    if (!isShowAll) {
        phone = phone.slice(0, 12)
    }
    phone.forEach(phones => {
        // console.log(phones)
        // 1 create a div

        const phoneCard = document.createElement('div')
        phoneCard.className = `card p-4 bg-base-100 shadow-xl`
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phones.image}" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phones.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
            <button onclick="handleSearchDetails('${phones.slug}');" class="btn btn-primary">more details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggle(false)
}

const noAvailable = (data) => {
    const DataAvailable = document.getElementById('no-available')
    if (data == 0) {
        DataAvailable.classList.remove('hidden')
    }
    else {
        DataAvailable.classList.add('hidden')
    }
}


// 
const handleSearchDetails = async (id) => {
    // console.log('handleSearchDetails', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data)
    const phone = data.data
    showPhoneDtails(phone)
}

const showPhoneDtails = (phone) => {
    console.log(phone)

    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name


    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img  src="${phone.image}"/>
    <p><span class="font-bold">Storage : </span> ${phone?.mainFeatures?.storage} </p>
    <p><span  class="font-bold">Display Size : </span> ${phone?.mainFeatures?.displaySize} </p>
    <p><span  class="font-bold">chipSet : </span> ${phone?.mainFeatures?.chipSet} </p>
    <p><span  class="font-bold">memory : </span> ${phone?.mainFeatures?.memory} </p>
    <p><span  class="font-bold">slug : </span> ${phone?.slug} </p>
    <p><span  class="font-bold">releaseDate : </span> ${phone?.releaseDate} </p>
    <p><span  class="font-bold">brand : </span> ${phone?.brand} </p>
    <p><span  class="font-bold">GPS: </span> ${phone?.others?.GPS || 'No GPS'} </p>

    `

    show_details_modal.showModal()
}

// handle search button

const handleSearchButton = (isShowAll) => {
    toggle(true)
    // console.log('khubaib')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // searchField.value = ''
    // console.log(searchText)
    loadPhone(searchText, isShowAll)
}


// handle search recap

/* const PrimaryBtn = () => {
    toggle(true)
    const primarySearchfield = document.getElementById('primary-search')
    const primarySearchfieldValue = primarySearchfield.value
    loadPhone(primarySearchfieldValue)
}
 */

const toggle = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}


// handle show all

const handleShowAll = () => {
    handleSearchButton(true)
}

// loadPhone()
