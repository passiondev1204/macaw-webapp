//
//  LECPGraphingCallbacks.js
//  LECrossPlatform
//
//  Created by Yong
//  Copyright (c) 2017 LiftEd, Incorporated. All rights reserved.
//
// This is the bridge back to iOS from the JS
//
/**
  * @namespace UtilsCallbacks
*/
window.LiftEd.UtilsCallbacks = {
  /**
      * @memberof UtilsCallbacks
      * @function fShowSpinner
      * @description Call to start the spinner function.
  */
 fShowSpinner: fShowSpinner = () =>{
   
   if (window.webkit.messageHandlers.LECallbackFStartSpinner) {
       window.webkit.messageHandlers.LECallbackFStartSpinner();
   } else {
       window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFStartSpinner");
   }
 },
  /**
      * @memberof UtilsCallbacks
      * @function fHideSpinner
      * @description Call to hide the spinner function.
      * @param {string} aStrVersionNumber - A string indicating graph version number.
  */
  fHideSpinner: fHideSpinner = () => {


    if (window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage) {
      window.webkit.messageHandlers.LECallbackFDidLoadGraph();
    } else {
      window.LiftEd.API.fErrorReport("ERROR #5708221324: missing window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage ???");
    }
  },
  /**
      * @memberof UtilsCallbacks
      * @function fReportErrorToClient
      * @description A call to iOS to show an alert on iOS side's alert message box.
      * @param {string} aStrError - A string with the error to report. Includes version number.
  */
  fReportErrorToClient: fReportErrorToClient = (aStrError) => {
    window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFErrorReport.postMessage(aStrError) -- aStrError = ' + aStrError);

    if (window.webkit.messageHandlers.LECallbackFErrorReport.postMessage) {
      window.webkit.messageHandlers.LECallbackFErrorReport.postMessage(aStrError);
    } else {
      window.LiftEd.API.fErrorReport("ERROR #5708221325: missing window.webkit.messageHandlers.LECallbackFErrorReport.postMessage ???");
    }
  },
  /**
      * @memberof UtilsCallbacks
      * @function fShowAlert
      * @description A call to iOS to show an alert on iOS side's alert message box.
      * @param {object} aDictAlert- A dictionary of the alert to show on iOS. Format is:
      {
      "title": string,
      "message": string
    }
  */
  fShowAlert: fShowAlert = (aDictAlert) => {  // aDictAlert = { "title": "some title", "message": "some message" }
  window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFShowAlert.postMessage(aStrAlertText) -- aDictAlert = ' + aDictAlert);

    if (window.webkit.messageHandlers.LECallbackFShowAlert.postMessage) {
      window.webkit.messageHandlers.LECallbackFShowAlert.postMessage(aDictAlert);
    } else {
      window.LiftEd.API.fErrorReport("ERROR #3708310104: missing window.webkit.messageHandlers.LECallbackFShowAlert.postMessage ???");
    }
  }
}
