( function () {
  if ( !localStorage["defaultSettingsUrl"] ) {
    localStorage["defaultSettingsUrl"] = "http://chrome-cache-killer-defaults/";
  }

  let cachingEnabled = false;
  let alertThrown = false;
  let clearRunning = false;

  const clearCache = ( function () {
    if ( !clearRunning ) {
      if ( typeof ( chrome.browsingData ) !== "undefined" ) {
        clearRunning = true;
        const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
        const oneWeekAgo = ( new Date() ).getTime() - millisecondsPerWeek;

        //Chrome 19:
        chrome.browsingData.removeCache( {
          "since": oneWeekAgo
        }, function () {
          clearRunning = false;
        } );
      } else if ( !alertThrown ) {
        alertThrown = true;
        alert( "Your browser does not support cache cleaning :(" );
      }
    }
  } );

  const enableCaching = ( function () {
    cachingEnabled = true;
    chrome.browserAction.setIcon( { path: "icon-off.png" } );
    chrome.browserAction.setTitle( { title: "Cache Killer disabled" } );
    chrome.webRequest.onBeforeRequest.removeListener( clearCache );
  } );

  const disableCaching = ( function () {
    cachingEnabled = false;
    chrome.browserAction.setIcon( { path: "icon-on.png" } );
    chrome.browserAction.setTitle( { title: "Cache Killer enabled" } );
    chrome.webRequest.onBeforeRequest.addListener( clearCache, { urls: ["<all_urls>"] } );
  } );

  const flipStatus = ( function () {
    if ( cachingEnabled ) {
      disableCaching();
    } else {
      enableCaching();
    }
  } );

  chrome.browserAction.onClicked.addListener( flipStatus );

  if ( localStorage && localStorage["turnOnByDefault"] && localStorage["turnOnByDefault"] === "on" ) {
    disableCaching();
  } else {
    enableCaching();
  }

  try {
    fetch( localStorage["defaultSettingsUrl"] )
      .then( data => data.text() )
      .then( data => {
        const settings = JSON.parse( data );

        if ( settings.enableOnStart === true ) {
          disableCaching();
        }

        if ( settings.enableOnStart === false ) {
          enableCaching();
        }
      } );
  } catch ( e ) {
    // Swallow it
  }
} )();
