function loadTheme(){
    var stored = localStorage.getItem("theme");
    if (stored === null) {
        return "light";
    }
    return stored;
}

function storeTheme(theme){
    localStorage.setItem("theme", theme);
}

function setTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
}

function initTheme(){
    var theme = loadTheme();
    setTheme(theme);

    var toggle = document.querySelector("#toggle");
    if (theme === "dark") {
        toggle.checked = true;
    }

    toggle.addEventListener("change", function(ev){
        if (ev.target.checked) {
            setTheme("dark");
            storeTheme("dark");
        } else {
            setTheme("light");
            storeTheme("light");
        }
    });
}

function initHighlight(){
    hljs && hljs.initHighlightingOnLoad();
}

initTheme();
initHighlight();

