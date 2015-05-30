/**
 * Created by Stefano on 26.05.2015.
 */

// this function merely replaces the stylesheet in the DOM
function replaceStylesheet(theme) {
    if (theme.length === 0) {
        return;
    }

    if (theme === VAL_THEME_DEFAULT) {
        $("#"+ID_THEME).attr("href", STYLESHEET_DEFAULT);
    }
    else if (theme === VAL_THEME_BW) {
        $("#"+ID_THEME).attr("href", STYLESHEET_BW);
    }
}

// settings theme means three things:
// 1st: replacing the stylesheet which contains the new theme
// 2nd: setting the theme also into the combo-box as a visual cue to the user
// 3rd: persisting the theme in the storage
function setTheme(theme) {
    // replace the stylesheet here...
    replaceStylesheet(theme);

    // don't forget to set the theme on the combo-box too...
    $("#"+ID_THEME_SWITCH_CB).val(theme);

    // and now store it for good measure...
    storeTheme(theme);
}

function onThemeChanged() {
    var theme = $("#"+ID_THEME_SWITCH_CB).val();

    setTheme(theme);
}