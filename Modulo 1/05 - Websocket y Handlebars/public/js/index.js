const socket = io()
socket.on("products", (data)=>{
  render(data)
})

document.on

function render(data){
    let html = ''
    data.forEach(element => {
        html = html + `
            <div class="col">
                <div class="card h-100">
                    <div id="product${element.id}" class="carousel slide">
                        <div class="carousel-inner">
                `
        element.thumbnails.forEach((item, index) => {
            html = html + `
            <div class="carousel-item ${index == 0 ? 'active' : ''}">
                <img src="${item}" class="d-block w-100" alt="">
            </div>
            `
        });
        html = html + `
            </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#product${element.id}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Anterior</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#product${element.id}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Siguiente</span>
                </button>
            </div>
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.description}</p>
                <p class="text-end m-0"><i>$${element.price}</i></p>
            </div>
            <div class="card-footer text-center">
                <span class="delete-product" onClick="deleteProduct(this);" data-id="${element.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                    Eliminar
                </span>
            </div>
        </div>
    </div>
        `
    })

  document.getElementById('productsList').innerHTML = html
}

function addproduct(){
    const product = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      code: document.getElementById('code').value,
      price: document.getElementById('price').value,
      stock: document.getElementById('stock').value,
      category: document.getElementById('category').value,
      thumbnails: document.getElementById('thumbnails').value.split(';')
    }
    socket.emit('addProduct', product)

    return false
}

function deleteProduct(product){
    socket.emit('deleteProduct', product.getAttribute("data-id"))
}
