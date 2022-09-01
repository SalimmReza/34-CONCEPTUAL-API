const loadAllProduts = async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();

    return data;
}
// ----------left menu--------------
const showMenu = async () => {
    const data = await loadAllProduts();
    console.log(data);

    const menuCardContainer = document.getElementById('menu-card-container');

    const array = [];
    for (const product of data) {
        // console.log(product.category);
        if (array.indexOf(product.category) === -1) {
            array.push(product.category);
            const createUl = document.createElement('ul');
            createUl.innerHTML = `
        <li   onclick="menuItems(event)">${product.category}</li>
    `;
            menuCardContainer.appendChild(createUl);

        }
    }
}

showMenu();

const searchField = document.getElementById('searchField');

// -------search-------------
searchField.addEventListener('keypress', async (e) => {
    if (e.key === "Enter") {
        const searchText = searchField.value;

        const allProducts = await loadAllProduts();


        const foundProducts = allProducts.filter(product => product.category.includes(searchText))


        // console.log(foundProducts);


        const cardDetailsContainer = document.getElementById('card-details-container');
        cardDetailsContainer.innerHTML = ``;
        foundProducts.forEach(product => {
            const { description, image } = product
            const createDiv = document.createElement('div')
            createDiv.innerHTML = `
            <div class="card card-compact w-full bg-base-100 shadow-xl ">
            <figure>
            <img src=${product.image} alt="Shoes" class="h-60 w-full" /></figure>
            <div class="card-body">
              <h2 class="card-title">${product.category}</h2>
              <p>${product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</p>
              <div class="card-actions justify-end">
              <label for="my-modal-3" 
              onclick="showModal('${description}','${image}')"  class="btn btn-primary modal-button">Show Detail</label>
            </div>
            </div>
          </div>
            
            `;
            cardDetailsContainer.appendChild(createDiv);
        });
    }
})
// -------------search2----------
const menuItems = async (event) => {
    const text = event.target.innerText;

    const allProducts = await loadAllProduts();
    const foundProducts = allProducts.filter(product => product.category.includes(text));

    const cardDetailsContainer = document.getElementById('card-details-container');
    cardDetailsContainer.innerHTML = ``;
    foundProducts.forEach(product => {
        const { description, image } = product
        const createDiv = document.createElement('div')
        createDiv.innerHTML = `
        <div class="card card-compact w-full bg-base-100 shadow-xl ">
        <figure>
        <img src=${product.image} alt="Shoes" class="h-60 w-full" /></figure>
        <div class="card-body">
          <h2 class="card-title">${product.category}</h2>
          <p>${product.title.length > 20 ? product.title.slice(0, 20) + "..." : product.title}</p>
          <div class="card-actions justify-end">
          <label for="my-modal-3" 
          onclick="showModal('${description}','${image}')"  class="btn btn-primary modal-button">Show Detail</label>
        </div>
        </div>
      </div>
        
        `;
        cardDetailsContainer.appendChild(createDiv);
    });

}





// -----------modal-------------
const showModal = (description, image) => {
    // console.log(showModal);
    const modalBody = document.getElementById("modal-body");
    modalBody.textContent = "";
    modalBody.innerHTML = `
    <p class="py-4">
    ${description}
    </p>
    <img src="${image}"/> 
    `


}