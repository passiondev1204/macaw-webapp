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

    if (window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage) {
      window.webkit.messageHandlers.LECallbackFDidLoadGraph.postMessage(aStrVersionNumber);
    } else {
      window.LiftEd.API.fErrorReport("ERROR #5708221324: missing window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage ???");
    }
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

     // if (window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage) {
     //    window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage(aDictAPIargs);
     // } else {
     //    window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFUpdateGraph.postMessage ???");
     // }

     vDictPercentageData = {
     "dateLatest" : 1504421999,
     "dateStart" : 1513411199,
     "dateEnd" : 1514015999,
     "title" : "Identifies X/Y Coordinates",
     "dataLabel" : "Activity Data",
     "prompts":{
       "e234-sf12-a3c4": 'Physical',
       "a938-k123-c184": 'Verbal',
       "a938-k123-c185": 'Gestural',
     },
     "annotations" : [
       {
         "scopeType" : 1,
         "author" : "LiftEd, Yong",
         "dateStart" : 1513340820,
         "note" : "Test all targets",
         "scopeUUID" : "",
         "uuid" : "bf7e56ea-9a4a-4448-9ebd-5efad0b77e04"
       },
       {
         "scopeType" : 0,
         "author" : "LiftEd, Yong",
         "dateStart" : 1511924580,
         "note" : "Test 4",
         "scopeUUID" : "",
         "uuid" : "f9dc67c6-7c2e-40ee-8c30-a122df17c220"
       }
     ],
     "options" : {
       "numberHandler" : 0,
       "typeDisplay" : "0",
       "tabOnLoad" : 3,
       "typeChart" : 0
     },
     "labelX" : "Date",
     "summaryColumns" : [
       "Target",
       "Mastered",
       "Baseline %",
       "Avg. Probe %",
       "Avg. Maint. %"
     ],
     "uuid" : "8ccf2973-16c8-48ea-b7ee-56a01564eab4",
     "visibility" : {
       "scope" : {
         "3" : 1,
         "1" : 1,
         "2" : 1,
         "0" : 1
       }
     },
     "name" : "Identifies X/Y Coordinates",
     "canvasX" : 773,
     "tactics" : [
       {
        "date" : 1513843199,
        "author" : "Demo, LiftEd",
        "note" : "Changed graph type."
       },
       {
        "date" : 1513843199,
        "author" : "Demo, LiftEd",
        "note" : "Changed Y Axis."
       },
     ],
     "canvasY" : 704,
     "hasDataNum" : true,
     "typeDate" : 0,
     "notes" : [
       {
        "date" : 1513756799,
        "author" : "Demo, LiftEd",
        "note" : "Sample DT note"
        }
     ],
     "labelY" : "Number of correct responses",
     "data" : [
       {
         "uuid" : "d5e3a82f-0aa5-4a7b-840c-b38b1722af80",
         "summaryData" : [
           "t1",
           "--",
           "--",
           "--",
           "--"
         ],
         "name" : "Target 1",
         "coordinates" : [
           {
           "date": 1513497599,
           "value": 2,
           "max": 5,
           "prompts": {
             "e234-sf12-a3c4": 1,
             "a938-k123-c184": 8,
             "a938-k123-c185": 0
            }
           },
           {
           "date": 1513583999,
           "value": 3,
           "max": 8,
           "prompts": {
             "e234-sf12-a3c4": 4,
             "a938-k123-c184": 5,
             "a938-k123-c185": 3
             }
           }
         ]
       },
       {
         "uuid" : "d5e3a82f-0aa5-4a7b-840c-b38b1722af90",
         "summaryData" : [
           "t1",
           "--",
           "--",
           "--",
           "--"
         ],
         "name" : "Target 2",
         "coordinates" : [
           {
           "date": 1513756799,
           "value": 2,
           "max": 5,
           "prompts": {
             "e234-sf12-a3c4": 4,
             "a938-k123-c184": 1,
             "a938-k123-c185": 5
            }
           },
           {
           "date": 1513843199,
           "value": 2,
           "max": 5,
           "prompts": {
             "e234-sf12-a3c4": 0,
             "a938-k123-c184": 3,
             "a938-k123-c185": 7
            }
           },
           {
           "date": 1513929599,
           "value": 2,
           "max": 5,
           "prompts": {
             "e234-sf12-a3c4": 4,
             "a938-k123-c184": 4,
             "a938-k123-c185": 4
            }
           }
         ]
       }
     ],
     "dateEarliest" : 1494618466
   }


   window.LiftEd.API.fShowGraph(vDictPercentageData);
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


      if (window.webkit.messageHandlers.LECallbackFUpdateGraphDefaults.postMessage) {
          window.webkit.messageHandlers.LECallbackFUpdateGraphDefaults.postMessage(aDictAPIargs);
      } else {
          window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFUpdateGraphDefaults.postMessage ???");
      }
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

    // if (window.webkit.messageHandlers.LECallbackFAddAnnotation.postMessage) {
    //     window.webkit.messageHandlers.LECallbackFAddAnnotation.postMessage(aDictAPIargs);
    // } else {
    //     window.LiftEd.API.fErrorReport("ERROR #5708221323: missing window.webkit.messageHandlers.LECallbackFAddAnnotation.postMessage ???");
    // }

    vDictPercentageData = {
    "dateLatest" : 1504421999,
    "dateStart" : 1513411199,
    "title" : "Identifies X/Y Coordinates",
    "dataLabel" : "Activity Data",
    "prompts":{
      "e234-sf12-a3c4": 'Gestural',
      "a938-k123-c184": 'Physical'
    },
    "annotations" : [
      {
        "scopeType" : 1,
        "author" : "LiftEd, Yong",
        "dateStart" : 1513340820,
        "note" : "Test all targets",
        "scopeUUID" : "",
        "uuid" : "bf7e56ea-9a4a-4448-9ebd-5efad0b77e04"
      },
      {
        "scopeType" : 0,
        "author" : "LiftEd, Yong",
        "dateStart" : 1511924580,
        "note" : "Test 4",
        "scopeUUID" : "",
        "uuid" : "f9dc67c6-7c2e-40ee-8c30-a122df17c220"
      }
    ],
    "options" : {
      "numberHandler" : 0,
      "typeDisplay" : "0",
      "tabOnLoad" : 3,
      "typeChart" : 0
    },
    "labelX" : "Date",
    "summaryColumns" : [
      "Target",
      "Mastered",
      "Baseline %",
      "Avg. Probe %",
      "Avg. Maint. %"
    ],
    "uuid" : "8ccf2973-16c8-48ea-b7ee-56a01564eab4",
    "visibility" : {
      "scope" : {
        "3" : 1,
        "1" : 1,
        "2" : 1,
        "0" : 1
      }
    },
    "name" : "Identifies X/Y Coordinates",
    "dateEnd" : 1514015999,
    "canvasX" : 773,
    "tactics" : [
      {
       "date" : 1513843199,
       "author" : "Demo, LiftEd",
       "note" : "Changed graph type."
      },
      {
       "date" : 1513843199,
       "author" : "Demo, LiftEd",
       "note" : "Changed Y Axis."
      },
    ],
    "canvasY" : 704,
    "hasDataNum" : true,
    "typeDate" : 0,
    "notes" : [
      {
       "date" : 1513756799,
       "author" : "Demo, LiftEd",
       "note" : "Sample DT note"
       }
    ],
    "labelY" : "Number of correct responses",
    "data" : [
      {
        "uuid" : "d5e3a82f-0aa5-4a7b-840c-b38b1722af80",
        "summaryData" : [
          "t1",
          "--",
          "--",
          "--",
          "--"
        ],
        "name" : "Target 1",
        "coordinates" : [
          {
          "date": 1513497599,
          "value": 2,
          "max": 5,
          "prompts": {
            "e234-sf12-a3c4": 1,
            "a938-k123-c184": 5
           }
          },
          {
          "date": 1513583999,
          "value": 3,
          "max": 8,
          "prompts": {
            "e234-sf12-a3c4": 1,
            "a938-k123-c184": 2
            }
          }
        ]
      },
      {
        "uuid" : "d5e3a82f-0aa5-4a7b-840c-b38b1722af90",
        "summaryData" : [
          "t1",
          "--",
          "--",
          "--",
          "--"
        ],
        "name" : "Target 2",
        "coordinates" : [
          {
          "date": 1513756799,
          "value": 2,
          "max": 5,
          "prompts": {
            "e234-sf12-a3c4": 4,
            "a938-k123-c184": 0
           }
          },
          {
          "date": 1513843199,
          "value": 2,
          "max": 5,
          "prompts": {
            "e234-sf12-a3c4": 0,
            "a938-k123-c184": 4
           }
          },
          {
          "date": 1513929599,
          "value": 2,
          "max": 5,
          "prompts": {
            "e234-sf12-a3c4": 4,
            "a938-k123-c184": 4
           }
          }
        ]
      }
    ],
    "dateEarliest" : 1494618466
  }



    window.LiftEd.API.fShowGraph(vDictPercentageData);
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
     //fill in callback here.
     window.LiftEd.API.fDisplayModalHTML('<div class="cLEAnnotationModalDate">12-13-2017</div><div class="cLEAnnotationModalTitle">Geometry Computer Program</div> <div class="cLEAnnotationModalValueType">Activity</div><div class="cLEAnnotationValueCorrect">Correct: 3</div><div class="cLEAnnotationModalValueTotal">Total: 10</div><div class="cLEAnnotationModalProctors">Jane Doe, Jane Doe</div><div class="cLEAnnotationModalPrompts">Physical, Gestural</div><dl class="cLEValuePointDataList"><dt class="cLEValuePointPromptDT">Prompts:</dt><dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd><dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd><dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd><dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd><dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd><dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd></dl>')
   }
}
