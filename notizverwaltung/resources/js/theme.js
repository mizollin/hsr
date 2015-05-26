/**
 * Created by Stefano on 26.05.2015.
 */

// set the initial theme based on any stored "theme" value...
setInitialTheme();

function setInitialTheme() {
    var storedTheme = getTheme();
    setTheme(storedTheme);
}

function setTheme(theme) {
    if (theme.length === 0) {
        return;
    }

    if (theme === "Default") {
        document.getElementById("theme").setAttribute("href", "resources/css/default-theme.css");
    }
    else if (theme === "Black & White") {
        document.getElementById("theme").setAttribute("href", "resources/css/bw-theme.css");
    }

    var e = document.getElementById("theme-switch-cb");
    e.value = theme;
}

function updateTheme() {
    var e = document.getElementById("theme-switch-cb");
    var theme = e.options[e.selectedIndex].value;

    setTheme(theme);
    storeTheme(theme);
}