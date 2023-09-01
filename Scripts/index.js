const handleCategories =async () => {
    const categoriesContainer = document.getElementById("Categories-Container");

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const dataObject =await response.json();
    const data = dataObject.data;

    data.forEach(element => {
        const tab = document.createElement('div');
        tab.classList = `tabs mx-1 my-2 md:mx-3 tabs-boxed bg-gray-300 hover:bg-amber-500`
        tab.innerHTML= `
            <a onclick="categoriesDataLoad('${element.category_id}')" class="tab text-black font-normal">${element.category}</a>
        `
        categoriesContainer.appendChild(tab);
    });
    // console.log(data);


}

const categoriesDataLoad =async (categoryId ) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML ='';

    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);

    const dataObject = await response.json();
    console.log(dataObject);
    const data = dataObject.data;
    data.forEach(element => {
        const card = document.createElement("div");
        card.classList =`card bg-base-100 shadow-md`;

        card.innerHTML =`
        <figure><img class="h-[220px] w-full" src="${element?.thumbnail}" alt="image" /></figure>
        <div class="card-body px-0 flex flex-row">
            <img class="rounded-full h-16 w-16  p-0" src="${element?.authors[0]?.profile_picture}" alt="Author Image...">
            <div>
                <h2 class="card-title">${element?.title}</h2>
                <div class="flex flex-row my-5 items-center" >
                    <p class="mr-5 flex gap-4 items-center">${element?.authors[0]?.profile_name} <span> ${element?.authors[0]?.verified ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>` : ''}  </span></p>
                </div>
                <p>${element.others.views}</p>
            </div>
        </div>
        `;
        cardContainer.appendChild(card);
    })
    console.log(data);
}

handleCategories();
// categoriesDataLoad("1000");