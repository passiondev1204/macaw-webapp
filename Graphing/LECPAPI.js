//
//  LECPGraphingAPI.js
//  LECrossPlatform
//
//  Created by Yong
//  Copyright (c) 2017 LiftEd, Incorporated. All rights reserved.
//
//  Defines the API that can be called to set debug flags, show graphs, get version numbers, etc...
//


if  ( ! ( "LiftEd" in window ) ) {
    window.LiftEd = {};
} //This is our namespace for all variables and functions

//Set defaults to our variables:
window.LiftEd.pStrDataJSON = "{}";
window.LiftEd.pDictData = {};

//The API:
/**
     * @namespace API
     */
window.LiftEd.API = {
    /**
     * @memberof API
     * @function fDisplayModalHTML
     * @description A function to show the details for a specific data point in the value point modal.
     * @param {string} aStringHTMLDate - A large HTML
     Format:'
       <div class="cLEAnnotationModalDate">12-13-2017</div> Date
       <div class="cLEAnnotationModalTitle">Geometry Computer Program</div> Title
       <div class="cLEAnnotationModalValueType">Activity</div> Activity/Behavior
       <div class="cLEAnnotationValueCorrect">Correct: 3</div> Number of correct responses.
       <div class="cLEAnnotationModalValueTotal">Total: 10</div> Number of total questions. (Optional)
       <div class="cLEAnnotationModalProctors">Jane Doe, Jane Doe</div> Proctors
       <div class="cLEAnnotationModalPrompts">Physical, Gestural</div> Prompts
       <dl class="cLEValuePointDataList"> Descriptive List
       <dt class="cLEValuePointPromptDT">Prompts</dt> Descriptive List Name
         <dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
         <dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
         <dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
         <dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
         <dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
         <dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
       </dl>'
     Must not have spaces OR line breaks between HTML Elements. Please take out descriptions of each HTML tag (on the right) before sending string.
    */
    fDisplayModalHTML: fDisplayModalHTML = (aStringHTML) => {
      window.LiftEd.API.fLogDebugVerbose("aStringHTML" + aStringHTML);
      window.LiftEd.Graphing.fUpdateModalHTML(aStringHTML);
    },
    /**
        * @memberof API
        * @function fErrorReport
        * @description iOS Error debug logger. Will log in iOS error modal if error occurs, logging aStrError
        * @param {string} aStrError - A string to pass in to log on iOS on error.
    */
    fErrorReport: fErrorReport = (aStrErr) => {
        window.LiftEd.API.fLogDebug("ERROR: " + aStrErr);

        if ( ('LiftEd' in window) && ('Callbacks' in window.LiftEd) && ('fReportErrorToClient' in window.LiftEd.Callbacks) ) {
            window.LiftEd.UtilsCallbacks.fReportErrorToClient(aStrErr);
        }
    },
    /**
        * @memberof API
        * @function fGetDebug
        * @description Gets the current debug state. Can be true or false.
    */
    fGetDebug: fGetDebug = () => {
        window.LiftEd.API.fLogDebugVerbose("fGetDebug: START");

        let vOut = false;
        if ( ("LiftEd" in window) && ("gDEBUG" in window.LiftEd) && (window.LiftEd.gDEBUG) ) {
            vOut = true;
        }
        window.LiftEd.API.fLogDebugVerbose("fGetDebug: returning: " + vOut);
        return vOut;
    },
    /**
        * @memberof API
        * @function fGetDebugVerbose
        * @description Gets the current verbose debug state.
    */
    fGetDebugVerbose: fGetDebugVerbose = () => {
        window.LiftEd.API.fLogDebugVerbose("fGetDebugVerbose: START");
        let vOut = false;
        if ( ("LiftEd" in window) && ("gDEBUGVERBOSE" in window.LiftEd) && (window.LiftEd.gDEBUGVERBOSE) ) {
            vOut = true;
        }
        window.LiftEd.API.fLogDebugVerbose("fGetDebugVerbose: returning: " + vOut);
        return vOut;
    },
    /**
        * @memberof API
        * @function fGetVersionNumber
        * @description Gets the current build's version number.
    */
    fGetVersionNumber: fGetVersionNumber = () => {
        window.LiftEd.API.fLogDebugVerbose("fGetVersionNumber: START");

        let vOut = "0.0.0";
        if ( ("LiftEd" in window) && ("gVERSION" in window.LiftEd) && (window.LiftEd.gVERSION) ) {
            vOut = window.LiftEd.gVERSION;
        }
        window.LiftEd.API.fLogDebugVerbose("fGetVersionNumber: returning: " + vOut);
        return vOut;
    },
    /**
        * @memberof API
        * @function fIsDoneLoading
        * @description Calls the graph to indicate it is done loading.
    */
    fIsDoneLoading: fIsDoneLoading = () => {
    window.LiftEd.API.fLogDebugVerbose("fIsDoneLoading: returning true");

    return true;
    },
    /**
        * @memberof API
        * @function fLog
        * @description Console logs aStrLog that is passed in.
        * @param {string} aStrLog - A string to pass in to log.
    */
    fLog: fLog = (aStrLog) => {
            console.log(aStrLog);
    },
    /**
        * @memberof API
        * @function fLogDebug
        * @description Debugger version of logging. Will console log aStrLog if debug is turned on.
        * @param {string} aStrLog - A string to pass in to log.
    */
    fLogDebug: fLogDebug = (aStrLog) => {
        if (window.LiftEd.gDEBUG) {
            window.LiftEd.API.fLog("DEBUG: " + aStrLog);
        }
    },
    /**
        * @memberof API
        * @function fLogDebugVerbose
        * @description Verbose debugger version of logging. Will console log aStrLog if verbose debug is turned on.
        * @param {string} aStrLog - A string to pass in to log.
    */
    fLogDebugVerbose: fLogDebugVerbose = (aStrLog) => {
        if (window.LiftEd.gDEBUG) {
            window.LiftEd.API.fLog("DEBUGVERBOSE: " + aStrLog);
        }
    },
    /**
        * @memberof API
        * @function fSetDebug
        * @description Turns on or off debug mode.
        * @param {boolean} aDebug - True to turn on debug, false to turn off.
    */
    fSetDebug: fSetDebug = (aDebug) => {
        window.LiftEd.API.fLogDebugVerbose("fSetDebug - aDebug:" + aDebug);

        window.LiftEd.gDEBUG = aDebug;
        if (window.LiftEd.gDEBUG) {
            window.LiftEd.API.fLogDebug("DEBUG MODE (window.LiftEd.gDEBUG == true)");
        } else {
            window.LiftEd.gDEBUGVERBOSE = false;  //turning off debugging also turns off verbose debugging
        }
        return window.LiftEd.gDEBUG;
    },
    /**
        * @memberof API
        * @function fSetDebugVerbose
        * @description Turns on verbose debug mode.
        * @param {boolean} aDebugVerbose - True to turn on debug, false to turn off.
    */
    fSetDebugVerbose: fSetDebugVerbose = (aDebugVerbose) => {
        window.LiftEd.API.fLogDebugVerbose("fSetDebugVerbose - aDebugVerbose:" + aDebugVerbose);

        window.LiftEd.gDEBUGVERBOSE = aDebugVerbose;

        if (window.LiftEd.gDEBUGVERBOSE) {
            window.LiftEd.gDEBUG = true;  //turning on verbose debugging also turns on general debugging
            window.LiftEd.API.fLogDebugVerbose("DEBUGVERBOSE MODE (window.LiftEd.gDEBUGVERBOSE == true)");
        }
        return window.LiftEd.gDEBUG;
    },
    /**
        * @memberof API
        * @function fShowGraph
        * @description Loads graph with the aDictAPIArgs passed in as data.
        * @param {object} aDictAPIArgs - A dictionary  used to load the graph with the containing data. Please refer to the sepcifications
    */
    fShowGraph: fShowGraph = (aDictAPIArgs) => {
        window.LiftEd.API.fLogDebugVerbose("fShowGraph - aDictAPIArgs:" + aDictAPIArgs);
        window.LiftEd.pDictData = aDictAPIArgs;
        window.LiftEd.Graphing.fLoadGraphWithArguments(window.LiftEd.pDictData);
    },
    //
    //Graphing Functions:
    //
    /**
        * @memberof API
        * @function fShowGraphWithJSON
        * @description Loads graph with the aStrDataJSON passed in as data.
        * @param {json} aStrDataJSON - A JSON of the graph data to used to load the graph. Please refer to the Specifications folder for more details on the JSON format.
    */
    fShowGraphWithJSON: fShowGraphWithJSON = (aStrDataJSON) => {
        window.LiftEd.API.fLogDebugVerbose("fShowGraphWithJSON - aStrDataJSON:" + aStrDataJSON);

        window.LiftEd.pDictData = aStrDataJSON;
        window.LiftEd.Graphing.fLoadGraphWithArguments(window.LiftEd.pDictData);

       // window.LiftEd.pStrDataJSON = aStrDataJSON;
       // vDictData = JSON.parse(window.LiftEd.pStrDataJSON);
       // window.LiftEd.API.fShowGraph(vDictData);
    }

};
