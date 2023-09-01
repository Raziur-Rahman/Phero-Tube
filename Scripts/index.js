
const handleCategories = async () => {
    const categoriesContainer = document.getElementById("Categories-Container");

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const dataObject = await response.json();
    const data = dataObject.data;
    data.forEach(element => {
        const tab = document.createElement('div');
        tab.classList = `tabs mx-1 my-2 md:mx-3 tabs-boxed bg-gray-300 hover:bg-amber-500`
        tab.innerHTML = `
                <a onclick="handleCategory('${element.category_id}')" class="tab text-black font-normal">${element.category}</a>
            `;
        categoriesContainer.appendChild(tab);
    });
    handleCategory('1000');
    // console.log(data.data);
    // console.log(data);
}

const handleCategory = async (ctgId) => {
    const btn = document.getElementById('SortByBtn');
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${ctgId}`);

    const dataObject = await response.json();
    console.log(dataObject.status);
    console.log(dataObject);
    const data = dataObject.data;
    if (dataObject.status === true) {
        categoriesDataLoad(data);
        btn.addEventListener('click', function () {
            sortByView(ctgId);
            return;
        });
    }
    else{
        categoriesDataLoad(data);
        notFound();
        console.log("data not found");
    }

}
const notFound = () =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    // const notFoundField = document.getElementById("content-container");
    cardContainer.classList =`flex flex-col justify-center items-center mt-36`;
    cardContainer.innerHTML =`
        <img src="images/Icon.png" alt="Author Image...">
        <h1 class="text-3xl text-center font-bold mt-5 ">Oops!! Sorry, There is no <br>content here</h1>
    
    `

}

const categoriesDataLoad = async (data) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.classList =`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 px-5 md:px-16`;
    cardContainer.innerHTML = '';
    // const notFoundField = document.getElementById("content-container");
    // notFoundField.innerText='';

    data.forEach(element => {
        const card = document.createElement("div");
        card.classList = `card bg-base-100 `;

        card.innerHTML = `
        <figure><img class="h-[220px] w-full rounded-2xl" src="${element?.thumbnail}" alt="image" /></figure>
        <div class="card-body px-0 flex flex-row">
            <img class="rounded-full h-16 w-16  p-0" src="${element?.authors[0]?.profile_picture}" alt="Author Image...">
            <div>
                <h2 class="card-title">${element?.title}</h2>
                <div class="flex flex-row my-2 items-center" >
                    <p class="mr-0 flex gap-4 items-center">${element?.authors[0]?.profile_name}<span> ${element?.authors[0]?.verified ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>` : ''}  </span></p>
                </div>
                <p>${element.others.views} views</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(card);
    })
    // console.log(data);

}

const sortByView = async (ctgId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${ctgId}`);

    const dataObject = await response.json();
    const data =await dataObject.data;
    data.sort(function (a, b) {
        if (parseFloat(a.others.views.slice(0, a.others.views.length - 1)) < parseFloat(b.others.views.slice(0, b.others.views.length - 1))) {
            return -1;
        }
        if (parseFloat(a.others.views.slice(0, a.others.views.length - 1)) > parseFloat(a.others.views.slice(0, b.others.views.length - 1))) {
            return 1;
        }
        return 0;

    })
    let datta = await data.reverse();
    categoriesDataLoad(datta);
}
handleCategories();
