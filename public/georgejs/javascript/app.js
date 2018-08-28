(function initializePage(){
    const url = "./georgejs/routes/routes.json";
    fetch(url)
        .then(res => res.json())
        .then(getEndOfUrl)
        .then(findCurrentRoute)
        .then(fetchComponent)
})()

const state = {
    routeName: "",
    component: "Home",
    formData: {},
    pageNumber: 1
}

function getEndOfUrl(data){
    let url = window.location.href;
    for(let i = 0; i < url.length; i++){
        if (url[i] === "/"){
            state.routeName = url.substring(i + 1);
        }
    };
    return data;
}

function findCurrentRoute(data){
    let routes = data.routes;
    if (!state.routeName){
        history.pushState(state.routeName, "page 1", "home");
        return(((state.routeName = "home") && (state.component = "Home")));
    } else {
        state.pageNumber += 1;
        for(let i = 0; i < routes.length; i++){
            if (window.location.href.includes(routes[i].name)){
                history.pushState(state.routeName, `page ${state.pageNumber}`, `${routes[i].name}`);
                return((state.routeName = routes[i].name) && (state.component = routes[i].component));
            }
        };
        history.pushState(state.routeName, `page ${state.pageNumber}`, `${routes[0].name}`);
        return((state.routeName = routes[0].name) && (state.component = routes[0].component));
    }
}

function fetchComponent(){
    document.title = `gReads | ${state.component}`;
    const url = "./georgejs/components/";
    return fetch(url + state.component + ".json")
        .then(res => res.json())
        .then(res => res)
        .then(renderComponent)
}

function renderComponent(data){
    const gComponents = document.querySelector("#gComponents");
    let jsonData = data.component;
    gComponents.innerHTML = "";

    for(let i = 0; i < jsonData.length; i++){
        const elementItem = jsonData[i].element,
            classItem = jsonData[i].class,
            idItem = jsonData[i].id,
            contentItem = jsonData[i].content;
        const element = document.createElement(`${elementItem}`);

        if (idItem){
            element.id = idItem;
        }
        if (classItem){
            element.classList.add(`${classItem}`);
        }
        element.innerHTML = `${contentItem}`;
        gComponents.appendChild(element);
    }
}

function logThis(data){
    console.log(data);
    return data;
}