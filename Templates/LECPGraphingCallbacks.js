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
  * @namespace GraphingCallbacks
*/
window.LiftEd.GraphingCallbacks = {
  /**
   * @memberof GraphingCallbacks
   * @function fDidLoadGraph
   * @description Call to iOS to indicate a graph is loaded. Allows user allow action after function call.
   * @param {string}  aStrVersionNumber - The version number of the graph loaded.
   */
  fDidLoadGraph: fDidLoadGraph = (aStrVersionNumber) => {
    window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage(aStrVersionNumber) -- aStrVersionNumber = ' + aStrVersionNumber);

    window.alert('Please integrate me!');

    //example of webkit integration

    // if (window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage) {
    //   window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage(aStrVersionNumber);
    // } else {
    //   window.LiftEd.API.fErrorReport("ERROR #5708221324: missing window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage ???");
    // }
  },
  /**
      * @memberof GraphingCallbacks
      * @function fUpdateGraph
      * @description Call to reload the graph with the paramaters passed in.
      * @param {object} aDictAPIargs - A dictionary to update graph defaults. Same dictionary information as fUpdateGraph. Format for top level dictionary: vDictAPIArgs = {
        typeDate: 0,1,2,3,4,5,6,99
        dateStart: unixdate,
        dateEnd: unixdate,
        uuid: string
      };
      options paramater: {
        typeChart: 0,1
        typeDisplay: 0,1,2,3
        numberHandler: 0,1,2
        tabOnLoad: 0,1,2,3,4
      };
  */
   fUpdateGraph: fUpdateGraph = (aDictAPIargs) => {
     window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage(aDictAPIargs) -- aDictAPIargs = ' + aDictAPIargs);

     window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage(aDictAPIargs) -- aDictAPIargs = ' + JSON.stringify(aDictAPIargs));

     window.alert('Please integrate me!');

     //example of webkit integration

     // if (window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage) {
     //    window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage(aDictAPIargs);
     // } else {
     //    window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage ???");
     // }
  },
  /**
      * @memberof GraphingCallbacks
      * @function fUpdateGraphDefaults
      * @description Updates graph default settings without graph reloading
      * @param {object} aDictAPIargs - A dictionary to update graph defaults. Same dictionary information as fUpdateGraph. Format for top level dictionary: vDictAPIArgs = {
        typeDate: 0,1,2,3,4,5,6,99
        dateStart: unixdate,
        dateEnd: unixdate,
        uuid: string
      };
      options paramater: {
        typeChart: 0,1
        typeDisplay: 0,1,2,3
        numberHandler: 0,1,2
        tabOnLoad: 0,1,2,3,4
      };
  */

  fUpdateGraphDefaults: fUpdateGraphDefaults = (aDictAPIargs) => {
      window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFUpdateGraphDefaults.postMessage(aDictAPIargs) -- aDictAPIargs = ' + JSON.stringify(aDictAPIargs));

      window.alert('Please integrate me!');

      //example of webkit integration

      // if (window.webkit.messageHandlers.LECallbackFUpdateGraphDefaults.postMessage) {
      //     window.webkit.messageHandlers.LECallbackFUpdateGraphDefaults.postMessage(aDictAPIargs);
      // } else {
      //     window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFUpdateGraphDefaults.postMessage ???");
      // }
  },
  /**
      * @memberof GraphingCallbacks
      * @function fCallBackAddAnnotation
      * @description Call to reload the graph with the paramaters passed in and with the addition of the new annotation.
      * @param {object} aDictAPIargs - A dictionary to update graph defaults. Same dictionary information as fUpdateGraph. Format for top level dictionary: vDictAPIArgs = {
        typeDate: 0,1,2,3,4,5,6,99 (integers)
        dateStart: unixdate,
        dateEnd: unixdate,
        uuid: string
      };
      options paramater: {
        typeChart: 0,1 (integers)
        typeDisplay: 0,1,2,3 (integers)
        numberHandler: 0,1,2 (integers)
        tabOnLoad: 0,1,2,3 (integers)
      };
      annotations parameter: [
        {
          vDictAnnotation.note = string
          vDictAnnotation.uuid = optional string. only used when editing existing annotation.
          vDictAnnotation.scopeUUID =  string
          vDictAnnotation.scopeType =  0,1,2,3
        }
      ]
    }
  */
  fCallBackAddAnnotation : fCallBackAddAnnotation = (aDictAPIargs) => {
    window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFAddAnnotation.postMessage(aDictAPIargs) -- aDictAPIargs = ' + JSON.stringify(aDictAPIargs));

    window.alert('Please integrate me!');

    //example of webkit integration

    // if (window.webkit.messageHandlers.LECallbackFAddAnnotation.postMessage) {
    //     window.webkit.messageHandlers.LECallbackFAddAnnotation.postMessage(aDictAPIargs);
    // } else {
    //     window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFAddAnnotation.postMessage ???");
    // }
   },
   /**
       * @memberof GraphingCallbacks
       * @function fShowDetailsFor
       * @description Requests information for data value point modal.
       * @param {object} aDictAPIargs - A dictionary to update graph defaults. Same dictionary information as fUpdateGraph. Format for top level dictionary: vDictAPIArgs = {
         typeDate: 0,1,2,3,4,5,6,99
         dateStart: unixdate,
         dateEnd: unixdate,
         uuid: string
       },
       options paramater: {
         typeChart: 0,1
         typeDisplay: 0,1,2,3
         numberHandler: 0,1,2
         tabOnLoad: 0,1,2,3,4
       },
       prompts parameter: {
         date: unixdate @ 12:00:00,
         uuid: string. required for regular targets/behaviors. not used for cumulative
       }
     };
   */
   fShowDetailsFor: fShowDetailsFor = (aDictAPIArgs) => {
     window.LiftEd.API.fLogDebugVerbose('calling: window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage(aDictAPIargs) -- aDictAPIargs = ' + aDictAPIargs);

     window.alert('Please integrate me!');

     //example of webkit integration

     // if (window.webkit.messageHandlers.LECallbackFShowDetailsFor.postMessage) {
     //     window.webkit.messageHandlers.LECallbackFShowDetailsFor.postMessage(aDictAPIargs));
     // } else {
     //     window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFShowDetailsFor.postMessage ???");
     // }
   }
}
