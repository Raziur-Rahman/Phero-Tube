const handleCategories =async () => {
    const categoriesContainer = document.getElementById("Categories-Container");

    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const dataObject =await response.json();
    const data = dataObject.data;

    data.forEach(element => {
        const btn = document.createElement("button");
        btn.classList = `bg-gray-300 px-5 py-3 mx-5 rounded-md hover:bg-amber-500 justify-center`
        btn.innerText = element.category;

        categoriesContainer.appendChild(btn);
        
    });
    console.log(data);


}
handleCategories();