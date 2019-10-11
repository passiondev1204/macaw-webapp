/**
 * Creates a unique array
*/
Array.prototype.unique = function() {
    let a = this.concat();
    for(let i=0; i<a.length; ++i) {
        for(let j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};


/**
 * @memberof Utils
 * @function fErrorReport
 * @description This reports graphing errors on the iOS client.
 * @param {string} aStrErrorCode - The error code. #571113412 (personal number, last digit of current year, 2 digit month, 2 digit date, 24 military time).
 * @param {string} aStrMessage - The error message.
*/
window.LiftEd.Utils.fErrorReport = ( aStrErrorCode, aStrMessage ) => {
  try {
    if (   !('LiftEd' in window)
        || !('Utils' in window.LiftEd)
        || !('Callbacks' in window.LiftEd)
        || !('fReportErrorToClient' in window.LiftEd.Callbacks)
    ) {
      //TODO: should we do something else for this?
    } else {
      window.LiftEd.Callbacks.fReportErrorToClient(aStrErrorCode + ": " + aStrMessage);
    }
  } catch (e) {
    throw 'ERROR #5711161204: ' + e;
  }
};


/**
 * @memberof Utils
 * @function fGetVar
 * @description Error handling for requesting global variables.
 * @param {string} aStrErrorCodeIfError - The error code if an error occurs when using fGetVar.
 * @param {string} aStrVarName - The string name of the variable to get from the global object.
*/
window.LiftEd.Utils.fGetVar = ( aStrErrorCodeIfError, aStrVarName ) => {
  try {
    let vOut = null;

    if (   !('LiftEd' in window)
        && !('Utils' in window.LiftEd)
        && !('Callbacks' in window.LiftEd)
        && !('fReportErrorToClient' in window.LiftEd.Callbacks)
    ) {
      window.LiftEd.Utils.fErrorReport( aStrErrorCodeIfError, 'fGetVar failed for' + aStrVarName);
    } else {
      vOut = window.LiftEd.Vars[aStrVarName];
    }
    return vOut;
  } catch (e) {
    throw 'ERROR #5711161203: ' + e;
  }
};

/**
    * @memberof Utils
    * @function fDidLoad
    * @description Call to iOS to indicate a graph is loaded. Allows user allow action after function call.
    * @param {string}  aStrVersionNumber - The version number of the graph loaded.
*/
window.LiftEd.Utils.fDidLoad = (aStrVersionNumber) => {
  window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage(aStrVersionNumber) -- aStrVersionNumber = ' + aStrVersionNumber);

  if (window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage) {
    window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage(aStrVersionNumber);
  } else {
    window.LiftEd.API.fErrorReport("ERROR #5708221324: missing window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage ???");
  }
};


/**
 * @memberof Utils
 * @function fGetConst
 * @description Error handling for requesting global constants.
 * @param {string} aStrErrorCodeIfError - The error code if an error occurs when using fGetVar.
 * @param {string} aStrVarName - The string name of the constant to get from the global object.
*/
window.LiftEd.Utils.fGetConst = ( aStrErrorCodeIfError, aStrVarName ) => {
  try {
    let vOut = null;

    if (   !('LiftEd' in window)
        && !('Utils' in window.LiftEd)
        && !('Callbacks' in window.LiftEd)
        && !('fReportErrorToClient' in window.LiftEd.Callbacks)
    ) {
      window.LiftEd.Utils.fErrorReport( aStrErrorCodeIfError, 'fGetConstant failed for' + aStrVarName);
    } else {
      vOut = window.LiftEd.Const[aStrVarName];
    }
    return vOut;
  } catch (e) {
    throw 'ERROR #5711161204: ' + e;
  }
};

/**
 * @memberof Utils
 * @function fConvertDate
 * @description Sets up regular and hidden days button in the options modal.
 * @param {integer} aDate - A integer representing a date in Unix or Javascript type time.
 * @param {string} aStringConversionType - A string to say which Date type to convert aDate to. Can be "To JS Date Format" or ''.
*/
window.LiftEd.Utils.fConvertDate = (aDate, aStringConversionType) => {
  try {
    let vDate = null;

    if (aDate) {
      vDate = aDate;
    } else {
      throw 'ERROR #5708221349: aDate missing';
    }

    if (aStringConversionType === 'To JS Date Format') {
      return vDate * 1000;
    } else {
      return vDate/1000;
    }
  } catch(e) {
    throw 'ERROR #5711161410: ' + e;
  }
};
