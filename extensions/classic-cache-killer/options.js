const save = document.getElementById( "save" );
const enableOnStartElement = document.getElementById( "enableOnStartElement" );
const defaultSettingsUrlElement = document.getElementById( "defaultSettingsUrlElement" );

function saveOptions () {
    console.log( '!' );
    let newValue = "off";
    if ( enableOnStartElement.checked ) {
        newValue = "on";
    }
    localStorage["turnOnByDefault"] = newValue;
    localStorage["defaultSettingsUrl"] = defaultSettingsUrlElement.value.trim();
}

// Restores select box state to saved value from localStorage.
function restoreOptions () {
    if ( localStorage["turnOnByDefault"] === "on" ) {
        enableOnStartElement.checked = true;
    }

    defaultSettingsUrlElement.value = localStorage["defaultSettingsUrl"];
}

save.addEventListener( "click", saveOptions );
restoreOptions();
