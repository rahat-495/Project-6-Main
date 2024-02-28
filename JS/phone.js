

const loadPhone = async (phoneName , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`) ;
    const data = await res.json() ;
    const phones = data.data ;
    displayPhones(phones , isShowAll);
}

const displayPhones = (phones , isShowAll) => {
    const phoneContainer = document.getElementById('phone-container') ;
    phoneContainer.innerHTML = `` ;

    const showBtnContainer = document.getElementById('show-btn-container') ;
    if(phones.length >= 12){
        showBtnContainer.classList.remove('hidden')
    }
    else{
        showBtnContainer.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0,12)
    }

    const sec1 = document.getElementById('sec1')
    const sec2 = document.getElementById('sec2')
    const header = document.getElementById('header')
    const alertSec = document.getElementById('alert-sec') ;
    if(phones.length === 0){
        header.classList.add('hidden')
        sec1.classList.add('hidden')
        sec2.classList.add('hidden')
        alertSec.classList.remove('hidden') ;
    }

    phones.forEach(phone => {

        const phoneCard = document.createElement('div') ;
        phoneCard.classList = 'card w-96 shadow-xl border pt-4 bg-white flex-1 mx-auto' ;

        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
                <div class="card-body text-center">
                    <h2 class="card-title text-center mx-auto">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
                    </div>
            </div>
        ` ;

        phoneContainer.appendChild(phoneCard) ;
    });
    loadingSpinner(false)
}

const continuebtn = () => {
    const alertSec = document.getElementById('alert-sec') ;
    const sec1 = document.getElementById('sec1')
    const sec2 = document.getElementById('sec2')
    const header = document.getElementById('header')

    alertSec.classList.add('hidden') ;
    header.classList.remove('hidden')
    sec1.classList.remove('hidden')
    sec2.classList.remove('hidden')
    window.location.reload()
}

const handleShowDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json() ;
    const phoneData = data.data ; 
    console.log(phoneData);

    const showPhoneDetailsContainer = document.getElementById('show-details-container') ;
    showPhoneDetailsContainer.innerHTML = `
        <img src="${phoneData.image}">
        <h1 class="font-bold text-4xl">${phoneData.name}</h1>
        <p><span class="font-bold">Storage : </span>${phoneData?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display size : </span>${phoneData?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Memory : </span>${phoneData?.mainFeatures?.memory}</p>
        <p><span class="font-bold">ID : </span>${phoneData?.slug}</p>
        <p><span class="font-bold">Release Date : </span>${phoneData?.releaseDate}</p>
        <p><span class="font-bold">Brand : </span>${phoneData?.brand}</p>
        <p><span class="font-bold">GPS : </span>${phoneData?.others?.GPS || ' No GPS Available ! '}</p>
    `

    showPhoneDetails() ;
}

const showPhoneDetails = () => {
    show_detalis_modal.showModal() ;
}

const handlesearch = (isShowAll) => {
    loadingSpinner(true) ;
    const searchFeild = document.getElementById('search-field')
    const searchText = searchFeild.value ;
    loadPhone(searchText , isShowAll) ;
}

const loadingSpinner = (isloading) => {
    const loadingContainer = document.getElementById('loading-container') ;
    if(isloading){
        loadingContainer.classList.remove('hidden') ;
    }
    else{
        loadingContainer.classList.add('hidden') ;
    }
}

const handleShowAll = () => {
    handlesearch(true) ;
}

