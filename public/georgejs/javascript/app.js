(function initializePage(){
    initialFetch();
})()

const state = {
    routeName: "",
    component: "Home",
    formData: {},
    pageNumber: 1
}

function initialFetch(){
    const url = "./georgejs/routes/routes.json";
    fetch(url)
        .then(res => res.json())
        .then(getEndOfUrl)
        .then(findCurrentRoute)
        .then(fetchHeaderFooter)
        .then(fetchComponent)
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
    let stateRoute = state.routeName;
    if (!stateRoute){
        history.pushState(stateRoute, "page 1", "home");
        return(((stateRoute = "home") && (state.component = "Home")));
    } else {
        state.pageNumber += 1;
        for(let i = 0; i < routes.length; i++){
            if (stateRoute == (routes[i].name)){
                history.pushState(stateRoute, `page ${state.pageNumber}`, `${routes[i].name}`);
                return((stateRoute = routes[i].name) && (state.component = routes[i].component));
            }
        };
        history.pushState(stateRoute, `page ${state.pageNumber}`, `${routes[0].name}`);
        return((stateRoute = routes[0].name) && (state.component = routes[0].component));
    }
}

function fetchHeaderFooter(){
    const header = document.querySelector("#gHeader");
    const footer = document.querySelector("#gFooter")
    const url = "/georgejs/components/"
    if (header){
        fetch(url + "Header.json")
            .then(res => res.json())
            .then(logThis())
            .then(res => renderComponent(res, "gHeader"))
    }
    if (footer){
        fetch(url + "Footer.json")
            .then(res => res.json())
            .then(res => renderComponent(res, "gFooter"))
    }
}

function fetchComponent(){
    document.title = `gReads | ${state.component}`;
    const url = "./georgejs/components/";
    return fetch(url + state.component + ".json")
        .then(res => res.json())
        .then(res => renderComponent(res, "gComponents"))
}

function renderComponent(data, targetComponent){
    const component = document.querySelector(`#${targetComponent}`);
    let jsonData = data.component;
    component.innerHTML = "";

    for(let i = 0; i < jsonData.length; i++){
        const elementItem = jsonData[i].element,
            classItem = jsonData[i].class,
            idItem = jsonData[i].id,
            contentItem = jsonData[i].content;
            scriptItem = jsonData[i].script;
        const element = document.createElement(`${elementItem}`);

        if (idItem){
            element.id = idItem;
        }
        if (classItem){
            for(let j = 0; j < classItem.length; j++){
                element.classList.add(`${classItem[j]}`);
            }
        }
        element.innerHTML = `${contentItem}`;
        component.appendChild(element);

    };
}

function goToPage(page){
    const url = "./georgejs/routes/routes.json";
    state.routeName = page;
    fetch(url)
        .then(res => res.json())
        .then(findCurrentRoute)
        .then(fetchComponent)
}

window.onpopstate = function(){
    initialFetch()
}

function logThis(data){
    console.log(data);
    return data;
}