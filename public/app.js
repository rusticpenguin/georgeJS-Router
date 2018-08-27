(function initializePage(){
    const url = "./georgejs/routes/routes.json"
    fetch(url)
        .then(res => res.json())
        .then(routePage)
})()

const state = {
    routeName: "",
    component: "",
    formData: {
        
    }
}

function routePage(data){
    let routes = data.routes;
    findCurrentRoute(routes)
    renderPage();
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
    gComponent = document.getElementById("gComponent");
    gComponent.innerhtml = fetchComponent();
}


function logThis(data){
    console.log(data);
    return data
}
