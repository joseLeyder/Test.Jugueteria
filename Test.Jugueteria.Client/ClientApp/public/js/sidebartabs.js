/* Control para navs de tipo sidebar */

if(document.querySelector(".sidebar-tabs")){
    if(!document.querySelector(".toggle-sidebar-tabs")){
        console.error("No existe el botón de cambio para accionar el sidebar-navs");
    }
}

let body = document.querySelector("body");

body.addEventListener("click", function(e) {
    if(e.target.classList.contains("toggle-sidebar-tabs") || e.target.parentNode.classList.contains("toggle-sidebar-tabs")){
        let element = e.target.tagName === "BUTTON" ? e.target : e.target.parentNode;
        if(element.classList.contains("active"))
            element.classList.remove("active");
        else
            element.classList.add("active");

        let parent = element.parentNode;
        if(parent.querySelector(".nav-tabs").classList.contains("active"))
            parent.querySelector(".nav-tabs").classList.remove("active")
        else
            parent.querySelector(".nav-tabs").classList.add("active")
    }
})

/* */