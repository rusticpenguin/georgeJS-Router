(function initializePage(){
    const url = "./georgejs/routes/routes.json"
    fetch(url)
        .then(res => res.json())
        .then(routePage)
})()

const state = {
    routeName: "",
    component: "",
    pageData: [
    ],
    formData: { 
        
    }
}

function routePage(data){
    let routes = data.routes;
    findCurrentRoute(routes);
    fetchComponent();
    renderPage();
    console.log(state.pageData)
}

function findCurrentRoute(data){
    let routes = data;
    for(let i = 0; i < routes.length; i++){
        if (window.location.href.includes(routes[i].name)){
            return((state.routeName = routes[i].name) && (state.component = routes[i].component));
        }
    };
    return((state.routeName = routes[0].name) && (state.component = routes[0].component));
}

function renderPage(){
    document.title = state.routeName;
    gComponent = document.getElementById("gComponents");
    gComponent.innerhtml = "";
}

function fetchComponent(){
    const url = "./georgejs/components/";
    return fetch(url + state.component + ".json")
        .then(res => res.json())
        .then(res => res)
        .then(jsonToHtml)
}

function jsonToHtml(data){
    const gComponents = document.querySelector("#gComponents");
    let jsonData = data.component
    for(let i = 0; i < jsonData.length; i++){
        const elementItem = jsonData[i].element,
            classItem = jsonData[i].class,
            idItem = jsonData[i].id,
            contentItem = jsonData[i].content;
        const element = document.createElement(`${elementItem}`)
        if (idItem !== ""){ 
            element.id = idItem;
        }
        if (classItem !== ""){
            element.classList.add(`${classItem}`)
        }
        element.innerHTML = `${contentItem}`
        gComponents.appendChild(element)
    }
}

function logThis(data){
    console.log(data);

    return data
}
