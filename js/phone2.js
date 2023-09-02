const loadPhone = async (inputText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    const data = await res.json()
    const phone = data.data
    displayPhone(phone)
}

const displayPhone = (phones) => {
    // console.log(phones)
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent = ''
    const showAllBtn = document.getElementById('show-all-btn')
    if (phones.length > 10) {
        showAllBtn.classList.remove('hidden')
    }
    else {
        showAllBtn.classList.add('hidden')
    }
    phones = phones.slice(0, 9)
    for (const phone of phones) {
        // console.log(phone)
        const cardDiv = document.createElement('div')
        cardDiv.className = (`card  bg-base-100 shadow-xl`)
        cardDiv.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button class="btn btn-primary">more details</button>
                        </div>
                    </div>
        `
        cardContainer.appendChild(cardDiv)
    }
    loadSpiner(false)

}




const searchBtn = () => {
    loadSpiner(true)
    // console.log('Searching')
    const inputText = document.getElementById('input-text')
    const inputValue = inputText.value
    // console.log(inputValue)
    loadPhone(inputValue)


}


const loadSpiner = (isSpine) => {
    const loadSpiners = document.getElementById('load-spiner')
    if (isSpine) {
        loadSpiners.classList.remove('hidden')
    } else {
        loadSpiners.classList.add('hidden')
    }
}


// loadPhone()
