// seu código aqui
const vitrine = document.querySelector('ul')
const searchBtn = document.querySelector('.estiloGeralBotoes.estiloGeralBotoes--botaoBuscaPorNome')
const searchInput = document.querySelector('.campoBuscaPorNome')
const btnFilterHort = document.querySelector('#Hortifruti')
const btnFilterPani = document.querySelector('#Panificadora')
const btnFilterLati = document.querySelector('#Laticínios')
const btnFilterAll = document.querySelector('#Todos')
const cartList = document.querySelector('.cartList')
const totais = document.querySelector('.totais')
const newCart = []

function listItems(list){
    vitrine.innerHTML = ''

    list.forEach((element) => {

        createCard(element)
    })
}
listItems(produtos)

function createCard(list){

    let card = document.createElement('li')
    let imgCard = document.createElement('img')
    let itemName = document.createElement('h3')
    let itemSection = document.createElement('span')
    let itemPrice = document.createElement('p')
    let nutriList = document.createElement('ol')
    nutriList.className = 'nutriList'
    let buyBtn = document.createElement('button')
    buyBtn.id = `${list.id}`

    let components = list.componentes
    components.map((element) => {

        let nutrients = document.createElement('li')

        nutrients.innerHTML = element

        nutriList.appendChild(nutrients)
    })

    imgCard.src = list.img
    itemName.innerText = list.nome 
    itemSection.innerText = list.secao
    itemPrice.innerText = `R$ ${list.preco}`
    buyBtn.innerText = `Comprar`

    card.append(imgCard, itemName, itemSection, nutriList, itemPrice, buyBtn)
    vitrine.appendChild(card)
}
//campo de busca
function search(list, searchValue){
    let result = []

    function remove(str) {
        return str.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
    }

    let search = list.filter((element) => {

        let itemName = element.nome.toLowerCase()
        let itemNameFinal = remove(itemName)
        let itemSection = element.secao.toLowerCase()
        let itemSectionFinal = remove(itemSection)
        let itemCategory = element.categoria.toLowerCase()
        let itemCategoryFinal = remove(itemCategory)
        result = itemNameFinal.includes(searchValue) || itemSectionFinal.includes(searchValue) || itemCategoryFinal.includes(searchValue)
        if(result === true){
            return element
           }
    })
    listItems(search)
    return search
}

searchBtn.addEventListener('click', () => {

    let searchValue = (searchInput.value).toLowerCase()
    search(produtos, searchValue)

})

searchInput.addEventListener('keyup', (event) => {
    if(event.key == 'Enter'){
        let searchValue = (searchInput.value).toLowerCase()
        search(produtos, searchValue)
    }
})
//filtrar pelos botões
function filter(list, btnValue){
    let result = []

    let filter = list.filter((element) => {
       result = element.secao == btnValue
       if(result === true){
        return element
       }
    })
    return filter 
}

btnFilterHort.addEventListener('click', () => {

    let filterValue = btnFilterHort.innerText
    let arg = filter(produtos, filterValue)
    listItems(arg)
})

btnFilterPani.addEventListener('click', () => {

    let filterValue = btnFilterPani.innerText
    let arg = filter(produtos, filterValue)
    listItems(arg)
})

btnFilterLati.addEventListener('click', () => {

    let filterValue = btnFilterLati.innerText
    let arg = filter(produtos, filterValue)
    listItems(arg)
})

btnFilterAll.addEventListener('click', () => {

    listItems(produtos)
})

function createCardCart(list, index){

    let card = document.createElement('li')
    let imgCard = document.createElement('img')
    imgCard.className = 'cadrImg'
    let itemName = document.createElement('h3')
    let itemSection = document.createElement('span')
    let itemPrice = document.createElement('p')
    let trashButton = document.createElement('button')
    trashButton.id = index
    let trashIcon = document.createElement('img')
    trashIcon.id = index
    trashIcon.className = 'trash'

    imgCard.src = list.img
    itemName.innerText = list.nome 
    itemSection.innerText = list.secao
    itemPrice.innerText = `R$ ${list.preco}`
    trashIcon.src = "./src/img/trash.png"

    trashButton.appendChild(trashIcon)
    card.append(imgCard, itemName, itemSection, itemPrice, trashButton)
    cartList.appendChild(card)

    // return card
}

function listCartItems(list){
    cartList.innerHTML = ''

    list.forEach((element, index) => {

        createCardCart(element, index)

    })
    cardInfo(list)
}

vitrine.addEventListener('click', selectItems)

function selectItems(event){

    let btnAddCart = event.target

    if(btnAddCart.tagName === 'BUTTON'){

        let items = produtos.find((item) => {
            if(item.id == btnAddCart.id){
                return item
            }
        })
        addCart(items)
    }
}

function addCart(items){
    
    newCart.push(items)
    listCartItems(newCart)
}
//remove cart
cartList.addEventListener('click', removeCart)

function removeCart(event){
    
    let btnRemoveCart = event.target
    
    if(btnRemoveCart.tagName === 'BUTTON' || btnRemoveCart.tagName === 'IMG'){
        
        newCart.splice(btnRemoveCart.id, 1)
        listCartItems(newCart)
        if(newCart.length == 0){
            totais.innerHTML = ''
        }
    }
}

function cardInfo(list){
    totais.innerHTML = ''

    if(list.length == 0){

        let img = document.createElement('img')
        img.src ='./src/img/shopping-bag.png'
        
        let h1 = document.createElement('h1')
        h1.innerText = 'Por enquanto não temos produtos no Carrinho'

        cartList.append(img, h1)
    }

    let qntd = document.createElement('span')
    qntd.id = 'quantidade'
    let qntdValue = document.createElement('span')
    qntdValue.className = 'quantidade'
    let total = document.createElement('span')
    total.id = 'price'
    let totalValue = document.createElement('span')
    totalValue.className = 'price'

    qntd.innerText = 'Quantidade'
    total.innerText = 'Total'

    let valorTotal = 0
    let quantidadeTotal = 0

    list.forEach(element => {
        let priceNumber = parseFloat(element.preco)
        valorTotal += priceNumber
        quantidadeTotal += 1
    })

    qntdValue.innerText = quantidadeTotal
    totalValue.innerText = `R$ ${valorTotal}`

    totais.append(qntd, qntdValue, total, totalValue)
}