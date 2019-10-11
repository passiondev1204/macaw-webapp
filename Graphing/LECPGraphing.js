//
//  LECPGraphingUtils.js
//  LiftEd-CrossPlatform
//
//  Created by Yong
//  Copyright © 2017 LiftEd, Inc. All rights reserved.
//
//
// import {timeFormat} from "./d3.min";

let gD3 = d3;

//[] try/catch for every  function 1-2 hours.
//TODO: ENG-1020 Refactoring. OKed


//sets global vars.
window.LiftEd.Vars.gObjectMargin = {top: 20, right: 0, bottom: 50, left: 50};
window.LiftEd.Vars.gObjectHTMLElementSVG = gD3.select("#svgcontainer")
                                          .attr('preserveAspectRatio','xMinYMin');
//dont return result of computation. return vars.
//[] create vars for return variables
Object.defineProperty(window.LiftEd.Vars, 'gSVGGraphContainer', {
  get: function() {
    // noinspection UnnecessaryLocalVariableJS
    let vOut = this.gObjectHTMLElementSVG.append("g").attr("transform", "translate(" + window.LiftEd.Utils.fGetVar('#5709181922', 'gObjectMargin').left + "," + window.LiftEd.Utils.fGetVar('#5709181923', 'gObjectMargin').top + ")");
    return vOut;
  },
  configurable: true
});

window.LiftEd.Vars.gDateMonthDayParse = gD3.timeFormat('%m/%d/%Y');

window.LiftEd.Vars.pArrStrMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


/**
 * @memberof Graphing
 * @function fCreateDropDown
 * @description Creates dropdown element.
 * @param {HTMLElement} vHTMLElement - HTML Element to turn into a dropdown.
*/
window.LiftEd.Graphing.fCreateDropDown = function (vHTMLElement) {
  try {
      this.dropDown = vHTMLElement;
      this.initEvents();
  } catch (e) {
    throw 'ERROR #5711161205: ' + e;
  }
};


//[] Check all arguments to all functions and make sure they are aXYXArgName where XYZ = Str, Int, Dict, Arr, etc...



/**
 * @memberof Graphing
 * @function fOpenTab
 * @description Error handling for requesting global constants.
 * @param {string} aEvent - JS Event
 * @param {string} aStrTabName - String with the name of the tab to open, possiblities: "tactics", "data", "notes", "annotations"
*/
window.LiftEd.Graphing.fOpenTab = (aEvent, aStrTabName) => {
//[] aTableName no longer exists -- replace aTabName with aStrTabName
    try {
      let vStrTabName = aStrTabName;
       // declare all variables
      let vTabContents,
          vTabLinks;

      // get all elements with class="tabcontent" and hide them
      vTabContents = document.getElementsByClassName("cLETabContent");
      for (let i = 0; i < vTabContents.length; i++) {
          vTabContents[i].style.display = "none";
      }

      // get all elements with class="tablinks" and remove the class "active"
      vTabLinks = document.getElementsByClassName("cLETabLinks");
    for (let i = 0; i < vTabLinks.length; i++) {
          vTabLinks[i].className = vTabLinks[i].className.replace(" active", "");
      }

      // show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(aStrTabName).style.display = "block";
      aEvent.currentTarget.className += " active";

      if (vStrTabName === 'idLEData') {
        window.LiftEd.Vars.tabOnLoad = 0;
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      } else if (vStrTabName === 'idLETactics') {
        window.LiftEd.Vars.tabOnLoad = 1;
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      } else if (vStrTabName === 'idLENotes') {
        window.LiftEd.Vars.tabOnLoad = 2;
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      } else if (vStrTabName === 'idLEAnnotations') {
        window.LiftEd.Vars.tabOnLoad = 3;
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      } else if (vStrTabName === 'idLEPrompts') {
        window.LiftEd.Vars.tabOnLoad = 4;
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      }
    } catch (e) {
     throw 'ERROR #5711161205: ' + e;
    }
};





// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fCreateDropDown
 * @description Creates dropdown active toggle.
*/
window.LiftEd.Graphing.fCreateDropDown.prototype = {
  initEvents : function() {
    let vThisHTMLEl = this;
    // noinspection Annotator
    vThisHTMLEl.dropDown.on('click', function(event){
      // noinspection Annotator
      $(this).toggleClass('active');
      event.stopPropagation();
    });
  }
};

/**
 * @memberof Graphing
 * Initializes dropdown and adds toggle dropdown off to entire window. .
*/
$(function() {
  try {
    new window.LiftEd.Graphing.fCreateDropDown( $('#idLEDropDown') );
    // noinspection Annotator
    $(document).click(function() {
      $('.cLEWrapperDropDown').removeClass('active');
    });
  } catch (e) {
    throw 'ERROR #5711161207: ' + e;
  }
});




/**
 * @memberof Graphing
 * @function fHTMLElModal
 * @description Creates HTML Modal for custom date range
 * @param {HTMLElement} aHTMLElBtn - A HTML element button to initialize the modal with.
 * @param {object} aDictConfig - A dictionary with a the key 'content' and value with the classname of the modal to open.
*/
  window.LiftEd.Graphing.fHTMLElModal = (aHTMLElBtn, aDictConfig) => {
    try {
      let vHTMLElement = null;
      let vHTMLELDocumentBody = null;
      let vHTMLElBtnClose = null;
      let vHTMLElBtnOK = null;

      // noinspection Annotator
      if (document.querySelector(aDictConfig.content)) {
        // noinspection Annotator
        vHTMLElement = document.querySelector(aDictConfig.content);
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.querySelector(aDictConfig.content) missing';
      }

      if (document.body) {
        vHTMLELDocumentBody = document.body;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.body missing';
      }

      if (vHTMLElement.querySelectorAll('.close-modal')) {
        vHTMLElBtnClose = vHTMLElement.querySelectorAll('.close-modal');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".close-modal") missing' ;
      }

      if (vHTMLElement.querySelectorAll('.confirm-modal')) {
        vHTMLElBtnOK = vHTMLElement.querySelectorAll('.confirm-modal');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".confirm-modal") missing';
      }

      if (aHTMLElBtn) {
        aHTMLElBtn.addEventListener('click', openModal, false);
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: aHTMLElBtn missing';
      }

      vHTMLELDocumentBody.addEventListener('click', closeModal, false);

      vHTMLElBtnClose.forEach(function(aHTMLButton) {
        aHTMLButton.addEventListener('click', closeModal, false);
      });

      vHTMLElBtnOK.forEach(function(aHTMLButton) {
        aHTMLButton.addEventListener('click', closeModalAndGetDates, false);
      });

      vHTMLElement.addEventListener('click', function(event) {
        event.stopPropagation();
      });

      document.addEventListener('keydown', function() {
        if (27 === event.keyCode) {
          closeModal();
        }
      }, false);

      function openModal(event) {
        event && event.stopPropagation();
        let vStringModalClassName = vHTMLElement.classList;
        vStringModalClassName.add('opened');
        vStringModalClassName.remove('closed');
        // noinspection Annotator
        $('.cLEWrapperDropDown').removeClass('active');
        window.LiftEd.Graphing.fSelectDateChange('Custom Date Range');
      }

      // noinspection JSUnusedLocalSymbols
      function closeModalAndGetDates(event) {
        let vDateMidnightEndDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202200', 'dateEnd')));
        vDateMidnightEndDate.setHours(0, 0, 0, 0);
        if (parseInt(window.LiftEd.Utils.fGetVar('#5709202200', 'dateEnd')) < parseInt(window.LiftEd.Utils.fGetVar('#5709202201', 'dateStart')) ) {
          window.LiftEd.UtilsCallbacks.fShowAlert({'title': 'The Start Date Must Be Before The End Date', 'message': "Please select a start date before the end date."});
          alert("Please select a start date before the end date.");
        }
        else if (vDateMidnightEndDate > new Date()) {
          window.LiftEd.UtilsCallbacks.fShowAlert({'title': 'Please Select Another Date', 'message': "Please select today's date or an earlier date."});
          alert("Please select End Date as today's date or earlier.");
        } else {
          window.LiftEd.Vars.typeDate = 99;
          let vStringModalClassName = vHTMLElement.classList;
          vStringModalClassName.remove('opened');
          vStringModalClassName.add('closed');
          // noinspection Annotator
          $('.cLEWrapperDropDown').removeClass('active');
          window.LiftEd.Graphing.fGetDates();
        }
      }

      // noinspection JSUnusedLocalSymbols
      function closeModal(event) {
        let vStringModalClassName = vHTMLElement.classList;
        vStringModalClassName.remove('opened');
        vStringModalClassName.add('closed');
      }

      // noinspection ThisExpressionReferencesGlobalObjectJS
    this.open = openModal;
      // noinspection ThisExpressionReferencesGlobalObjectJS
    this.close = closeModal;
    } catch (e) {
      throw 'ERROR #5711161215: ' + e;
    }
  };

  let vHTMLElCustomDateModal = document.querySelector('.cLECustomDateModalButton');

  // noinspection JSCheckFunctionSignatures
window.LiftEd.Graphing.fHTMLElModal(vHTMLElCustomDateModal , {
    content: '.cLECustomDateModal'
  });


/**
   * @memberof Graphing
   * @function fHTMLElAnnotationModal
   * @description Creates HTML Modal for tactics/notes modal.
   * @param {HTMLElement} aHTMLElButton - A HTML element button to initialize the modal with.
   * @param {object} aDictConfig - A dictionary with a the key 'content' and value with the classname of the modal to open.
  */
  window.LiftEd.Graphing.fHTMLElAnnotationModal = (aHTMLElButton, aDictConfig) => {
    try {
      let vHTMLElement = null;
      let vHTMLELDocumentBody = null;
      let vHTMLElBtnClose = null;
      let vNoteAnnotationBadge = null;
      let vTacticAnnotationBadge = null;
      let vHTMLCollectionTacticRows = null;
      let vHTMLCollectionNoteRows = null;

      // noinspection Annotator
      if (document.querySelector(aDictConfig.content)) {
        // noinspection Annotator
        vHTMLElement = document.querySelector(aDictConfig.content);
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.querySelector(aDictConfig.content) missing';
      }

      if (document.body) {
        vHTMLELDocumentBody = document.body;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.body missing'
      }

      if (vHTMLElement.querySelectorAll('.close-modal')) {
        vHTMLElBtnClose = vHTMLElement.querySelectorAll('.close-modal');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".close-modal") missing';
      }

      if (document.querySelectorAll('.cLENoteAnnotationGroup .badge')) {
        vNoteAnnotationBadge = document.querySelectorAll('.cLENoteAnnotationGroup .badge');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.querySelectorAll(".badge") missing';
      }

      if (document.querySelectorAll('.cLETacticAnnotationGroup .badge')) {
        vTacticAnnotationBadge = document.querySelectorAll('.cLETacticAnnotationGroup .badge');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.querySelectorAll(".badge") missing';
      }

      if (aHTMLElButton) {
        aHTMLElButton.addEventListener('click', openModal, false);
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221325: aHTMLElBtn missing';
      }


      if (document.getElementsByClassName('cLENote')) {
        vHTMLCollectionNoteRows  = document.getElementsByClassName('cLENote')
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5710040101: document.getElementsByClassName("cLENote") missing';
      }

      if (document.getElementsByClassName('cLETactic')) {
        vHTMLCollectionTacticRows  = document.getElementsByClassName('cLETactic')
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5710040101: document.getElementsByClassName("cLETactic") missing';
      }


      for (let i = 0; i < vHTMLCollectionNoteRows.length; i++) {
        vHTMLCollectionNoteRows[i].addEventListener('click', openModal, false);
      }

      for (let i = 0; i < vHTMLCollectionTacticRows.length; i++) {
        vHTMLCollectionTacticRows[i].addEventListener('click', openModal, false);
      }

      aHTMLElButton.addEventListener('click', openModal, false);
      vHTMLELDocumentBody.addEventListener('click', closeModal, false);

      vNoteAnnotationBadge.forEach(function(aHTMLButton) {
        aHTMLButton.addEventListener('click', openModal, false);
      });

      vTacticAnnotationBadge.forEach(function(aHTMLButton) {
        aHTMLButton.addEventListener('click', openModal, false);
      });

      vHTMLElBtnClose.forEach(function(aHTMLButton) {
        aHTMLButton.addEventListener('click', closeModal, false);
      });

      vHTMLElement.addEventListener('click', function(event) {
        event.stopPropagation();
      });

      document.addEventListener('keydown', function() {
        if (27 === event.keyCode) {
          closeModal();
        }
      }, false);

      function openModal(event) {
        event && event.stopPropagation();
        let vStrModalModalClass = vHTMLElement.classList;
        vStrModalModalClass.add('opened');
        vStrModalModalClass.remove('closed');
      }

      // noinspection JSUnusedLocalSymbols
      function closeModal(event) {
        let vStrModalModalClass = vHTMLElement.classList;
        vStrModalModalClass.remove('opened');
        vStrModalModalClass.add('closed');
      }

      // noinspection ThisExpressionReferencesGlobalObjectJS
      this.open = openModal;
      // noinspection ThisExpressionReferencesGlobalObjectJS
      this.close = closeModal;
    } catch (e) {
      throw 'ERROR #5711161207: ' + e;
    }
  };
  // window.LiftEd.Graphing.fHTMLElAnnotationModal = fHTMLElAnnotationModal;
  // window.LiftEd.Graphing.fHTMLElModal = fHTMLElModal;
// }(window));


/**
   * @memberof Graphing
   * @function fHTMLElValuePointModal
   * @description Creates HTML Modal for tactics/notes modal.
   * @param {HTMLElement} aHTMLElButton - A HTML element button to initialize the modal with.
   * @param {object} aDictConfig - A dictionary with a the key 'content' and value with the classname of the modal to open.
  */
  window.LiftEd.Graphing.fHTMLElValuePointModal = (aHTMLElButton, aDictConfig) => {
    try {
      let vHTMLElement = null;
      let vHTMLELDocumentBody = null;
      let vHTMLElBtnClose = null;
      let vHTMLCollectionValueAnnotations = null;
      // noinspection Annotator
      if (document.querySelector(aDictConfig.content)) {
        // noinspection Annotator
        vHTMLElement = document.querySelector(aDictConfig.content);
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.querySelector(aDictConfig.content) missing';
      }

      if (document.body) {
        vHTMLELDocumentBody = document.body;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: document.body missing'
      }

      if (vHTMLElement.querySelectorAll('.close-modal')) {
        vHTMLElBtnClose = vHTMLElement.querySelectorAll('.close-modal');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".close-modal") missing';
      }


      if (aHTMLElButton) {
        aHTMLElButton.addEventListener('click', openModal, false);
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221325: aHTMLElBtn missing';
      }

      if (document.getElementsByClassName('cLENote')) {
        vHTMLCollectionValueAnnotations = document.getElementsByClassName('circle');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5710040101: document.getElementsByClassName("cLENote") missing';
      }
      //
      for (let i = 0; i < vHTMLCollectionValueAnnotations.length; i++) {
        vHTMLCollectionValueAnnotations[i].addEventListener('click', openModal, false);
      }

      vHTMLELDocumentBody.addEventListener('click', closeModal, false);

      vHTMLElBtnClose.forEach(function(aHTMLButton) {
        aHTMLButton.addEventListener('click', closeModal, false);
      });

      vHTMLElement.addEventListener('click', function(event) {
        event.stopPropagation();
      });

      document.addEventListener('keydown', function() {
        if (27 === event.keyCode) {
          closeModal();
        }
      }, false);

      function openModal(event) {
        event && event.stopPropagation();
        let vStrModalModalClass = vHTMLElement.classList;
        vStrModalModalClass.add('opened');
        vStrModalModalClass.remove('closed');
      }

      // noinspection JSUnusedLocalSymbols
      function closeModal(event) {
        let vStrModalModalClass = vHTMLElement.classList;
        vStrModalModalClass.remove('opened');
        vStrModalModalClass.add('closed');
      }

      // noinspection ThisExpressionReferencesGlobalObjectJS
      this.open = openModal;
      // noinspection ThisExpressionReferencesGlobalObjectJS
      this.close = closeModal;
    } catch (e) {
      throw 'ERROR #5712071244: ' + e;
    }
  };



  /**
     * @memberof Graphing
     * @function fHTMLElPromptsBarModal
     * @description Creates HTML Modal for tactics/notes modal.
     * @param {HTMLElement} aHTMLElButton - A HTML element button to initialize the modal with.
     * @param {object} aDictConfig - A dictionary with a the key 'content' and value with the classname of the modal to open.
    */
    window.LiftEd.Graphing.fHTMLElPromptsBarModal = (aHTMLElButton, aDictConfig) => {
      try {
        let vHTMLElement = null;
        let vHTMLELDocumentBody = null;
        let vHTMLElBtnClose = null;
        let vHTMLCollectionValueAnnotations = null;
        // noinspection Annotator
        if (document.querySelector(aDictConfig.content)) {
          // noinspection Annotator
          vHTMLElement = document.querySelector(aDictConfig.content);
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5708221324: document.querySelector(aDictConfig.content) missing';
        }

        if (document.body) {
          vHTMLELDocumentBody = document.body;
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5708221324: document.body missing'
        }

        if (vHTMLElement.querySelectorAll('.close-modal')) {
          vHTMLElBtnClose = vHTMLElement.querySelectorAll('.close-modal');
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".close-modal") missing';
        }


        if (aHTMLElButton) {
          aHTMLElButton.addEventListener('click', openModal, false);
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5708221325: aHTMLElBtn missing';
        }

        if (document.getElementsByClassName('cLENote')) {
          vHTMLCollectionValueAnnotations = document.getElementsByClassName('cLEPromptsBar');
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5710040101: document.getElementsByClassName("cLENote") missing';
        }

        //
        for (let i = 0; i < vHTMLCollectionValueAnnotations.length; i++) {
          vHTMLCollectionValueAnnotations[i].addEventListener('click', openModal, false);
        }

        vHTMLELDocumentBody.addEventListener('click', closeModal, false);

        vHTMLElBtnClose.forEach(function(aHTMLButton) {
          aHTMLButton.addEventListener('click', closeModal, false);
        });

        vHTMLElement.addEventListener('click', function(event) {
          event.stopPropagation();
        });

        document.addEventListener('keydown', function() {
          if (27 === event.keyCode) {
            closeModal();
          }
        }, false);

        function openModal(event) {
          event && event.stopPropagation();
          let vStrModalModalClass = vHTMLElement.classList;
          vStrModalModalClass.add('opened');
          vStrModalModalClass.remove('closed');
        }

        // noinspection JSUnusedLocalSymbols
        function closeModal(event) {
          let vStrModalModalClass = vHTMLElement.classList;
          vStrModalModalClass.remove('opened');
          vStrModalModalClass.add('closed');
        }

        // noinspection ThisExpressionReferencesGlobalObjectJS
        this.open = openModal;
        // noinspection ThisExpressionReferencesGlobalObjectJS
        this.close = closeModal;
      } catch (e) {
        throw 'ERROR #5712071244: ' + e;
      }
    };


/**
 * @memberof Graphing
 * @function fHTMLElCustomAnnotationModal
 * @description Creates HTML Modal for custom annotation modal.
 * @param {HTMLElement} aHTMLElButton - A HTML element button to initialize the modal with.
 * @param {object} aDictConfig - A dictionary with a the key 'content' and value with the classname of the modal to open.
*/
window.LiftEd.Graphing.fHTMLElCustomAnnotationModal = (aHTMLElButton, aDictConfig) => {
  try {
    let vHTMLElement = null;
    let vHTMLELDocumentBody = null;
    let vHTMLElBtnClose = null;
    let vHTMLElBtn2Close = null;
    // noinspection JSUnusedAssignment
    let vHTMLElBtnSave = null;
    let vAnnotationBadge = null;
    let vHTMLELCustomModalLeft = null;
    let vHTMLELAuthorText = null;

    let vHTMLSpanScope = null,
        vHTMLRadioGlobal = null,
        vHTMLRadioAllTargets = null,
        vHTMLRadioBehavior = null,
        vHTMLLabelActivity = null,
        vHTMLLabelBehavior = null,
        vHTMLElAnnotationStartDate = null,
        vHTMLElAnnotationStartTime = null,
        vHTMLElAnnotationEndTime = null,
        vHTMLElAnnotationEndDate = null,
        vIntAnnotationEndDatePlusOne = null,
        vHTMLCollectionDataRows = null,
        vHTMLELAuthorValue = null,
        vHTMLLabelGlobal = null,
        vHTMLElCurrentAnnotationText = null;

    if (document.querySelector('input[name="nLEAnnotationStartTime"]')) {
      vHTMLElAnnotationStartTime = document.querySelector('input[name="nLEAnnotationStartTime"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710031429:document.querySelector("input[name="nLEAnnotationStartTime"]") missing';
    }

    if (document.querySelector('input[name="nLEAnnotationEndTime"]')) {
      vHTMLElAnnotationEndTime = document.querySelector('input[name="nLEAnnotationEndTime"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710031429:document.querySelector("input[name="nLEAnnotationEndTime"]") missing';
    }


    if (document.getElementById('idLEAnnotationModalLeft')) {
      vHTMLELCustomModalLeft = document.getElementById('idLEAnnotationModalLeft');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710040101: document.getElementById("idLEAnnotationModalLeft") missing';
    }

    if (document.getElementsByClassName('cLEAnnotation')) {
        vHTMLCollectionDataRows  = document.getElementsByClassName('cLEAnnotation')
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710040101: document.getElementsByClassName("cLEAnnotation") missing';
    }


    // noinspection Annotator
    if (document.querySelector(aDictConfig.content)) {
      // noinspection Annotator
      vHTMLElement = document.querySelector(aDictConfig.content);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: document.querySelector(aDictConfig.content) missing';
    }

    if (document.body) {
      vHTMLELDocumentBody = document.body;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: document.body missing'
    }

    if (vHTMLElement.querySelectorAll('.close-modal-annotation')) {
      vHTMLElBtnClose = vHTMLElement.querySelectorAll('.close-modal-annotation');
      vHTMLElBtn2Close = vHTMLElement.querySelectorAll('.close-modal');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".close-modal-annotation") missing';
    }

    if (vHTMLElement.querySelectorAll('.save-modal')) {
      // noinspection JSUnusedAssignment
      vHTMLElBtnSave = vHTMLElement.querySelectorAll('.save-modal');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".confirm-modal") missing';
    }

    if (document.querySelectorAll('.cLEAnnotationsGroup .badge')) {
      vAnnotationBadge = document.querySelectorAll('.cLEAnnotationsGroup .badge');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: document.querySelectorAll(".cLEAnnotationsGroup .badge") missing';
    }

    if (aHTMLElButton) {
      aHTMLElButton.addEventListener('click', openModal, false);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221326: aHTMLElBtn missing';
    }

    if (document.getElementById('idLECustomAuthorText')) {
      vHTMLELAuthorText = document.getElementById('idLECustomAuthorText');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710041536: document.getElementById("idLECustomAuthorText") missing';
    }

    if (document.getElementById('idLECustomAnnotationAuthor')) {
      vHTMLELAuthorValue = document.getElementById('idLECustomAnnotationAuthor');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710041537: document.getElementById("idLECustomAnnotationAuthor") missing';
    }


    if (document.getElementById('idLECustomScopeText')) {
      vHTMLSpanScope = document.getElementById('idLECustomScopeText');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710041539: document.getElementById("idLECustomScopeText") missing';
    }




          vHTMLRadioGlobal = document.getElementById('idLEGlobal');


        // if (document.getElementById('idLEActivity')) {
          vHTMLRadioAllTargets = document.getElementById('idLEAllTargets');
        // } else {
        //   throw 'ERROR #5710041539: document.getElementById("idLEActivity") missing';
        // }

        // if (document.getElementById('idLEBehavior')) {
          vHTMLRadioBehavior = document.getElementById('idLEBehavior');
        // } else {
        //   throw 'ERROR #5710041539: document.getElementById("idLEBehavior") missing';
        // }

        vHTMLLabelGlobal = document.getElementById('idLEGlobalLabel');


        // if (document.getElementById('idLEActivityLabel')) {
        vHTMLLabelActivity = document.getElementById('idLEActivityLabel');
        // } else {
        //   throw 'ERROR #5710041539: document.getElementById("idLEActivity") missing';
        // }

        // if (document.getElementById('idLEBehaviorLabel')) {
        vHTMLLabelBehavior = document.getElementById('idLEBehaviorLabel');
        // } else {
        //   throw 'ERROR #5710041539: document.getElementById("idLEBehavior") missing';
        // }



    vHTMLElBtnSave = document.createElement('button');
    vHTMLElBtnSave.setAttribute('id', 'idLESaveButton');
    vHTMLElBtnSave.setAttribute('class', 'save-modal');
    vHTMLElBtnSave.innerHTML = "Save";

    vHTMLELCustomModalLeft.appendChild(vHTMLElBtnSave);

    aHTMLElButton.addEventListener('click', () => {
        // noinspection BadExpressionStatementJS
      openModal;
        vHTMLELAuthorText.style.display = 'none';
        vHTMLELAuthorValue.style.display = 'none';
        if (window.LiftEd.Utils.fGetVar('#5710231927', 'typeChart') === 0 || window.LiftEd.Utils.fGetVar('#5710231927', 'typeChart') === '0') {
          window.LiftEd.Vars.scopeType = 2;
          window.LiftEd.Vars.scopeUUID = window.LiftEd.Vars.scopeUUID = window.LiftEd.Utils.fGetVar('#5710251905', 'uuid')
        } else {
          window.LiftEd.Vars.scopeType = 1;
          window.LiftEd.Vars.scopeUUID = window.LiftEd.Vars.scopeUUID = window.LiftEd.Utils.fGetVar('#5710251906', 'uuid');
        }
        //refactor this and the annotations badge onclick into a function so that i can pass in the string/times and have them append. 2-3 hours
        let vAnnotationHeader = document.getElementById('idLECustomAnnotationHeader');
        vAnnotationHeader.innerHTML = 'Create Annotation';
        vHTMLElAnnotationStartDate = document.querySelector('input[name="nLEAnnotationStartDate"]');
        vHTMLElAnnotationEndDate = document.querySelector('input[name="nLEAnnotationEndDate"]');
        let vIntegerAnnotationDate = new Date();
        let vAnnotationDateDays = ("0" + (vIntegerAnnotationDate.getDate())).slice(-2),
        vAnnotationDateMonth = ("0" + (vIntegerAnnotationDate.getMonth() + 1)).slice(-2),
        vAnnotationDateYear = vIntegerAnnotationDate.getFullYear();
        // noinspection UnnecessaryLocalVariableJS
      let vAnnotationDateString = '' + vAnnotationDateYear + '-' + vAnnotationDateMonth + '-' + vAnnotationDateDays;
        vHTMLElAnnotationStartDate.value = vAnnotationDateString;
        vHTMLElAnnotationEndDate.value = '';

        let vStringCurrentHours = new Date().getHours().toString();
        let vStringCurrentMinutes = new Date().getMinutes().toString();
        if (vStringCurrentMinutes.length === 1) {
            vStringCurrentMinutes = '0' + vStringCurrentMinutes;
        }

        if (vStringCurrentHours.length === 1) {
            vStringCurrentHours = '0' + vStringCurrentHours;
        }

        if (document.querySelector('input[name="nLEAnnotationStartTime"]')) {
          vHTMLElAnnotationStartTime = document.querySelector('input[name="nLEAnnotationStartTime"]');
        } else {
            throw 'ERROR #5710040135: document.querySelector("input[name="nLEAnnotationStartTime"]") missing';
        }
        vHTMLElAnnotationStartTime.value = vStringCurrentHours + ":" + vStringCurrentMinutes;

        if (document.querySelector('input[name="nLEAnnotationEndTime"]')) {
          vHTMLElAnnotationEndTime = document.querySelector('input[name="nLEAnnotationEndTime"]');
        } else {
            throw 'ERROR #5710040135: document.querySelector("input[name="nLEAnnotationEndTime"]") missing';
        }
          vHTMLElAnnotationEndTime.value = '';

        if (document.getElementById('idLECustomAnnotationTextIput')) {
          vHTMLElCurrentAnnotationText = document.getElementById('idLECustomAnnotationTextIput');
        } else {
            throw 'ERROR #5710040134: document.getElementById("idLECustomAnnotationTextIput") missing';
        }


        window.LiftEd.Vars.annotationUUID = '';
        vHTMLElCurrentAnnotationText.value = '';
        vHTMLElCurrentAnnotationText.focus();

        vHTMLSpanScope.style.display = '';
        vHTMLRadioGlobal.style.display = '';
        vHTMLLabelGlobal.style.display = '';
        if (vHTMLRadioAllTargets) {
          vHTMLRadioAllTargets.style.display = '';
          vHTMLLabelActivity.style.display = '';
          vHTMLRadioAllTargets.checked = true;
        }
        if (vHTMLRadioBehavior) {
          vHTMLRadioBehavior.style.display = '';
          vHTMLLabelBehavior.style.display = '';

          vHTMLRadioBehavior.checked = true;
        }
      }, false);

    vHTMLELDocumentBody.addEventListener('click', closeModal, false);
    vAnnotationBadge.forEach(function(aHTMLButton) {
      aHTMLButton.addEventListener('click', openModal, false);
    });

    vHTMLElBtnClose.forEach(function(aHTMLButton) {
      aHTMLButton.addEventListener('click', () => {closeModal();}, false);
    });

    for (let i = 0; i < vHTMLCollectionDataRows.length; i++) {
      vHTMLCollectionDataRows[i].addEventListener('click', openModal, false);
    }

    vHTMLElBtn2Close.forEach(function(aHTMLButton) {
      aHTMLButton.addEventListener('click', () => {closeModal();}, false);
    });

    vHTMLElBtnSave.addEventListener('click', fSaveAnnotationButton, false);

    vHTMLElement.addEventListener('click', function(event) {
      event.stopPropagation();
    });

    document.addEventListener('keydown', function() {
      if (27 === event.keyCode) {
        closeModal();
      }
    }, false);
    //
    function openModal(event) {
      event && event.stopPropagation();
      let vStrModalModalClass = vHTMLElement.classList;
      vStrModalModalClass.add('opened');
      vStrModalModalClass.remove('closed');
    }

    // noinspection JSUnusedLocalSymbols
    function closeModal(event) {
      let vStrModalModalClass = vHTMLElement.classList;
      vStrModalModalClass.remove('opened');
      vStrModalModalClass.add('closed');
    }

    function fSaveAnnotationButton() {

      let vHTMLElAnnotationStartDate = document.querySelector('input[name="nLEAnnotationStartDate"]');
      let vHTMLElAnnotationEndDate = document.querySelector('input[name="nLEAnnotationEndDate"]');
      let vHTMLElAnnotationStartTime = document.querySelector('input[name="nLEAnnotationStartTime"]');
      let vHTMLElAnnotationEndTime = document.querySelector('input[name="nLEAnnotationEndTime"]');

      let vAnnotationStartDate = new Date(vHTMLElAnnotationStartDate.value);
      let vAnnotationEndDate = new Date(vHTMLElAnnotationEndDate.value);
      vAnnotationStartDate = vAnnotationStartDate.setHours(12,0,0,0);
      vAnnotationStartDate = new Date(vAnnotationStartDate);
      vIntAnnotationStartDatePlusOne = vAnnotationStartDate.setDate(vAnnotationStartDate.getDate() + 1);
      let vAnnotationStartTime = vHTMLElAnnotationStartTime.value;
      let vAnnotationEndtime = vHTMLElAnnotationEndTime.value;

      if (vAnnotationEndDate) {
        vAnnotationEndDate = vAnnotationEndDate.setHours(12,0,0,0);
        vAnnotationEndDate = new Date(vAnnotationEndDate);
        vIntAnnotationEndDatePlusOne = vAnnotationEndDate.setDate(vAnnotationEndDate.getDate() + 1);
      }
      if (vAnnotationStartDate.getTime() > vAnnotationEndDate.getTime()) {
        window.LiftEd.UtilsCallbacks.fShowAlert({'title': 'The Start Date Must Be Before The End Date', 'message': "Please select a start date before the end date."});
        alert("Please select a start date before the end date.");
      } else if (vAnnotationStartDate.getTime() === vAnnotationEndDate.getTime()) {
        if (vAnnotationStartTime > vAnnotationEndtime) {
        window.LiftEd.UtilsCallbacks.fShowAlert({'title': 'The Start Time Must Be Before End Time', 'message': "If the start and end date are the same, please select a start time earlier than the end time."});
        alert("If the start and end date are the same, please select a start time earlier than the end time.");
        } else {
          closeModal();
          window.LiftEd.Graphing.fSaveAnnotation();
        }
      } else {
        closeModal();
        window.LiftEd.Graphing.fSaveAnnotation();
      }
    }

    // noinspection ThisExpressionReferencesGlobalObjectJS
    this.open = openModal;
    // noinspection ThisExpressionReferencesGlobalObjectJS
    this.close = closeModal;
  } catch (e) {
    throw 'ERROR #5711161210: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fHTMLElOptionsModal
 * @description Creates HTML Modal for options modal.
 * @param {HTMLElement} aHTMLElBtn - A HTML element button to initialize the modal with.
 * @param {object} aDictConfig - A dictionary with a the key 'content' and value with the classname of the modal to open.
*/
window.LiftEd.Graphing.fHTMLElOptionsModal = (aHTMLElBtn, aDictConfig) => {
  try {
    let vHTMLElement = null;
    let vHTMLELDocumentBody = null;
    let vHTMLElBtnClose = null;
    let vHTMLElAxisButtons = null;
    let vHTMLElOptionsButtons = null;
    let vHTMLElCollectionAxisButtons = null;

    // noinspection Annotator
    if (document.querySelector(aDictConfig.content)) {
      // noinspection Annotator
      vHTMLElement = document.querySelector(aDictConfig.content);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: document.querySelector(aDictConfig.content) missing';
    }

    if (document.body) {
      vHTMLELDocumentBody = document.body;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: document.body missing';
    }

    if (vHTMLElement.querySelectorAll('.close-modal')) {
      vHTMLElBtnClose = vHTMLElement.querySelectorAll('.close-modal');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".close-modal") missing' ;
    }

    if (vHTMLElement.querySelectorAll('.cLEGraphAxisButton')) {
      vHTMLElAxisButtons = vHTMLElement.querySelectorAll('.cLEGraphAxisButton');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".cLEGraphAxisButton") missing' ;
    }

    if (vHTMLElement.querySelectorAll('.cLENullRadio')) {
      vHTMLElOptionsButtons = vHTMLElement.querySelectorAll('.cLENullRadio');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: vHTMLElement.querySelectorAll(".cLEOptionsGraphButton") missing' ;
    }

    if (aHTMLElBtn) {
      aHTMLElBtn.addEventListener('click', openModal, false);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: aHTMLElBtn missing';
    }

    if (document.querySelectorAll('.cLEGraphAxisButton')) {
      vHTMLElCollectionAxisButtons = document.querySelectorAll('.cLEGraphAxisButton');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221324: document.querySelectorAll(".cLEGraphAxisButton") missing';
    }

    vHTMLElCollectionAxisButtons.forEach(function(aHTMLButton) {
      aHTMLButton.addEventListener('click', closeModal, false);
    });


    vHTMLELDocumentBody.addEventListener('click', closeModal, false);

    vHTMLElBtnClose.forEach(function(aHTMLButton) {
      aHTMLButton.addEventListener('click', closeModal, false);
    });

    vHTMLElement.addEventListener('click', function(event) {
      event.stopPropagation();
    });

    vHTMLElAxisButtons.forEach(function(aHTMLButton) {
      aHTMLButton.addEventListener('click', closeModal, false);
    });

    vHTMLElOptionsButtons.forEach(function(aHTMLButton) {
      aHTMLButton.addEventListener('click', closeModal, false);
    });

    document.addEventListener('keydown', function() {
      if (27 === event.keyCode) {
        closeModal();
      }
    }, false);

    function openModal(event) {
      event && event.stopPropagation();
      let vStringModalClassName = vHTMLElement.classList;
      vStringModalClassName.add('opened');
      vStringModalClassName.remove('closed');
      // noinspection Annotator
      $('.cLEWrapperDropDown').removeClass('active');
    }

    // noinspection JSUnusedLocalSymbols
    function closeModal(event) {
      let vStringModalClassName = vHTMLElement.classList;
      vStringModalClassName.remove('opened');
      vStringModalClassName.add('closed');
    }

    // noinspection ThisExpressionReferencesGlobalObjectJS
    this.open = openModal;
    // noinspection ThisExpressionReferencesGlobalObjectJS
    this.close = closeModal;
  } catch (e) {
    throw 'ERROR #5711161208: ' + e;
  }
};

///end


// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fSetUpOptions
 * @description Sets up option modal with appropriate radio buttons.
 * @param {string} aTypeDisplay - A string that designates the type of display. Can be '0', '1', '2', or '3'
 * @param {array} aArrayNoMissingDatesData - An array with data points for all days within the range.
 * @param {array} aArrayOriginalData - An array with the original data (no values for days without data).
 * @param {function} aD3fXScale - A function that sets up the X scale for d3 graphing.
 * @param {function} aD3fYScale - A function that sets up the Y scale for d3 graphing.
 * @param {array} aArraySummaryColumns - An array for the column headers in the data tab
 * @param {array} aArrayAnnotations - An array with annotations for that date range.
*/
window.LiftEd.Graphing.fSetUpOptions = (aTypeDisplay, aArrayNoMissingDatesData, aArrayOriginalData, aD3fXScale, aD3fYScale, aArraySummaryColumns, aArrayAnnotations, aDictPrompts) => {
  let vHTMLElAxisButtonHolder = null;
  // noinspection JSUnusedAssignment
  let vHTMLOptionsModalButton = null;
  let vHTMLElDayTypeButtonHolder = null;
  let vArrayAnnotations = null;
  if (document.getElementById('idLEOptionsButtonHolder')) {
    vHTMLElAxisButtonHolder = document.getElementById('idLEOptionsButtonHolder')
  } else {
    throw 'ERROR #5709221446: document.getElementById("idLEOptionsButtonHolder") missing';
  }

  if (aArrayAnnotations) {
    vArrayAnnotations = aArrayAnnotations
  } else {
    throw 'ERROR #5709221446: aArrayAnnotations missing';
  }

  if (vHTMLElAxisButtonHolder.hasChildNodes()) {
    while (vHTMLElAxisButtonHolder.firstChild){
        vHTMLElAxisButtonHolder.removeChild(vHTMLElAxisButtonHolder.childNodes[0])
    }
  }

  if (document.getElementById('idLEDayTypeValuesButtonHolder')) {
    vHTMLElDayTypeButtonHolder = document.getElementById('idLEDayTypeValuesButtonHolder')
  } else {
    throw 'ERROR #5709221446: document.getElementById("idLEDayTypeValuesButtonHolder") missing';
  }
  if (vHTMLElDayTypeButtonHolder.hasChildNodes()) {
    while (vHTMLElDayTypeButtonHolder.firstChild){
        vHTMLElDayTypeButtonHolder.removeChild(vHTMLElDayTypeButtonHolder.childNodes[0])
    }
  }



  vHTMLOptionsModalButton = document.createElement('input');
  vHTMLOptionsModalButton.setAttribute('id', "idLEOptionsModalButton");
  vHTMLOptionsModalButton.setAttribute('type', 'image');
  vHTMLOptionsModalButton.setAttribute('src', 'icon_graph_settings.png');
  vHTMLOptionsModalButton.setAttribute('class', "cLEOptionsModalButton");
  vHTMLOptionsModalButton.innerHTML = "Options";
  vHTMLElAxisButtonHolder.appendChild(vHTMLOptionsModalButton);
  window.LiftEd.Graphing.fAddNullButtons(aTypeDisplay, aArrayNoMissingDatesData, aArrayOriginalData, aD3fXScale, aD3fYScale, aArraySummaryColumns, vArrayAnnotations, aDictPrompts);
  window.LiftEd.Graphing.fAddHiddenDaysButton(aTypeDisplay, aArrayOriginalData, aD3fXScale, aD3fYScale, aArraySummaryColumns, vArrayAnnotations, aDictPrompts)
};





/**
 * @memberof Graphing
 * @function fAddNullButtons
 * @description Sets up regular and hidden days button in the options modal.
 * @param {string} aTypeDisplay - A string that designates the type of display. Can be '0', '1', '2', or '3'
 * @param {array} aArrayNoMissingDatesData - An array with data points for all days within the range.
 * @param {array} aArrayOriginalData - An array with the original data (no values for days without data).
 * @param {function} aD3fXScale - A function that sets up the X scale for d3 graphing.
 * @param {function} aD3fYScale - A function that sets up the Y scale for d3 graphing.
 * @param {array} aArraySummaryColumns - An array for the column headers in the data tab
 * @param {array} aArrayAnnotations - An array with annotations for that date range.
*/
window.LiftEd.Graphing.fAddNullButtons = (aTypeDisplay, aArrayNoMissingDatesData, aArrayOriginalData, aD3fXScale, aD3fYScale, aArraySummaryColumns, aArrayAnnotations, aDictPrompts) => {
  try {
    // noinspection JSUnusedLocalSymbols
    let vHTMLElDayTypeButtonHolder = null,
        vHTMLELNullGraphButton = null,
        vHTMLELNullGraphLabel,
        vHTMLElRegularGraphButton = null,
        vHTMLElRegularGraphLabel = null,
        vIntegerNumberHandler,
        vHTMLBreakLine;


      if (document.getElementById('idLEDayTypeValuesButtonHolder')) {
        vHTMLElDayTypeButtonHolder = document.getElementById('idLEDayTypeValuesButtonHolder')
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5709221446: document.getElementById("idLEDayTypeValuesButtonHolder") missing';
      }

      vHTMLELNullGraphButton = document.createElement('input');
      vHTMLELNullGraphButton.setAttribute('type', 'radio');
      vHTMLELNullGraphButton.setAttribute('class', 'cLENullRadio');
      vHTMLELNullGraphButton.setAttribute('id', 'idLENullGraphButton');
      vHTMLELNullGraphButton.setAttribute('name', 'daystype');
      vHTMLELNullGraphButton.setAttribute('value', 'nulldays');


      vHTMLELNullGraphLabel = document.createElement('label');
      vHTMLELNullGraphLabel.setAttribute('id', 'idLENullGraphLabel');
      vHTMLELNullGraphLabel.setAttribute('class', 'cLENullRadio');
      vHTMLELNullGraphLabel.setAttribute('for', 'idLENullGraphButton');
      vHTMLELNullGraphLabel.innerHTML = 'Do not display a data point';


      vHTMLElRegularGraphButton = document.createElement('input');
      vHTMLElRegularGraphButton.setAttribute('type', 'radio');
      vHTMLElRegularGraphButton.setAttribute('class', 'cLENullRadio');
      vHTMLElRegularGraphButton.setAttribute('id', 'idLERegularGraphButton');
      vHTMLElRegularGraphButton.setAttribute('name', 'daystype');
      vHTMLElRegularGraphButton.setAttribute('value', 'regulardays');

      let vHTMLELRegularGraphLabel = document.createElement('label');
      vHTMLELRegularGraphLabel.setAttribute('id', 'idLERegularGraphLabel');
      vHTMLELRegularGraphLabel.setAttribute('class', 'cLENullRadio');
      vHTMLELRegularGraphLabel.setAttribute('for', 'idLERegularGraphButton');
      vHTMLELRegularGraphLabel.innerHTML = 'Show data point as 0%';

      vHTMLBreakLine = document.createElement('br');

      vHTMLElDayTypeButtonHolder.appendChild(vHTMLELNullGraphButton);
      vHTMLElDayTypeButtonHolder.appendChild(vHTMLELNullGraphLabel);
      vHTMLElDayTypeButtonHolder.appendChild(vHTMLBreakLine);
      vHTMLElDayTypeButtonHolder.appendChild(vHTMLElRegularGraphButton);
      vHTMLElDayTypeButtonHolder.appendChild(vHTMLELRegularGraphLabel);


      vIntegerNumberHandler = window.LiftEd.Utils.fGetVar('#5710061446', 'numberHandler');
      if (vIntegerNumberHandler === 0 || vIntegerNumberHandler === '0') {
        vHTMLELNullGraphButton.checked = true;
      } else {
        vHTMLElRegularGraphButton.checked = true;
      }
      vHTMLElRegularGraphButton.addEventListener('click', () => {
        vHTMLElRegularGraphButton.checked = true;
        vHTMLELNullGraphButton.checked = false;
        window.LiftEd.Vars.numberHandler = 1;
        window.LiftEd.Vars.mergedArrays = [];
        gD3.selectAll('.cLEAverageMaxGraphLine').remove();
        gD3.selectAll('.cLEAverageGraphLine').remove();
        gD3.selectAll('#cLEAverageAnnotations').remove();
        gD3.selectAll('#cLEAverageMaxAnnotations').remove();
        gD3.selectAll('.cLEDataRow').remove();
        gD3.selectAll('.cLEDataFirstSubHeader').remove();
        gD3.selectAll('.cLEDataSubHeader').remove();
        gD3.selectAll('.graphline').remove();
        gD3.selectAll('.cLEMaxGraphLine').remove();
        gD3.selectAll('.cLEDataAnnotationLayer').remove();
        gD3.selectAll('#idLECumulativeDataRow').remove();
        if (gD3.selectAll("#idLEYAxis")) {
          gD3.selectAll("#idLEYAxis").remove();
          gD3.selectAll("#idLEXAxis").remove();
        }
        let vOriginalDateStart= new Date(window.LiftEd.Utils.fGetVar('#5709181817', 'originalDateStart'));
        vOriginalDateStart.setHours(12,0,0,0);
        window.LiftEd.Vars.dateStart = vOriginalDateStart.getTime();
        let vOriginalDateEnd = new Date(window.LiftEd.Utils.fGetVar('#5709181817', 'originalDateEnd'));
        vOriginalDateEnd.setHours(12,0,0,0);
        window.LiftEd.Vars.dateEnd = vOriginalDateEnd.getTime();
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();
        let vIntTickFrequency = null;
        let vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));
        let vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));
        if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {
          // noinspection JSUnusedLocalSymbols
          vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
        }
        //set default range for graphlines and d3 scales into a function. 2-3 hours
        window.LiftEd.Graphing.fSetScaledLines(gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]));
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fAddAxes(gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]), vIntTickFrequency, window.LiftEd.Vars.label);
        // noinspection JSCheckFunctionSignatures
        // noinspection JSCheckFunctionSignatures
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fAddGraphLineButtons(aArrayNoMissingDatesData, aD3fXScale, aD3fYScale, aTypeDisplay, aArraySummaryColumns);
        if (gD3.selectAll(".cLEAnnotationsGroup")._groups[0].length > 0) {
            gD3.selectAll(".cLEAnnotationsGroup").remove();
        }

        if (aDictPrompts) {
          gD3.selectAll('#idLEPromptsXAxis').remove();
          gD3.selectAll('#idLEPromptsYAxis').remove();
          gD3.selectAll('#idLEPromptsBars').remove();
          gD3.selectAll('#idLEPromptsLegend').remove();
          gD3.selectAll('#idLEPromptsAxisLabel').remove();
          let vArrayPromptsData = window.LiftEd.Graphing.fModifyPromptsData(aArrayNoMissingDatesData, aDictPrompts)

          let vArrayKeys= []
          for (let key in aDictPrompts) {
            vArrayKeys.push(aDictPrompts[key])
          }

          vPromptsD3fXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth')]).padding(.3)
          vPromptsD3BarfXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth') + 22]).padding(.3)
          vPromptsD3fYScale = gD3.scaleLinear().domain([0, d3.max(vArrayPromptsData, function(d) { return d.total; })]).rangeRound([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerPromptsHeight'), 0]);
          vPromptsD3fZScale = gD3.scaleOrdinal().domain(vArrayKeys).range([" #0000cc",  "#cc6666", "#0066cc", "#0099cc", "#00cccc", "#00ffcc", "#3300cc", "#3333cc", " #3366cc", "#3399cc", " #6600cc", "#6666cc", "#9900cc", " #990066", " #660066", "#006666", " #336633", "#663333", "#993333", "#9900ff", " #cc0066"]);
          window.LiftEd.Graphing.fAddPromptsAxes(vPromptsD3fXScale, vPromptsD3fYScale, null, window.LiftEd.Vars.label)
          window.LiftEd.Graphing.fAddPromptsBars(vArrayPromptsData, aDictPrompts, vPromptsD3BarfXScale, vPromptsD3fYScale, vPromptsD3fZScale)
          window.LiftEd.Graphing.fAddPromptsLegend(vArrayKeys, vPromptsD3fZScale)

          if (document.querySelector('.cLEPromptsBartModalButton')) {
            vPromptsBarModalButton = document.querySelector('.cLEPromptsBartModalButton');
          } else {
            throw 'ERROR #5712071245: document.querySelector(".cLEPromptsBartModalButton") missing';
          }

          window.LiftEd.Graphing.fHTMLElPromptsBarModal(vPromptsBarModalButton, {
            content: '.cLEValuePointModal'
          });
        }
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fAddAnnotations(aArrayAnnotations,
         gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]), parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));
        let vOriginalAnnotationTextHolder = document.getElementById('idLEAnnotationsTextHolder');
        if (vOriginalAnnotationTextHolder !== null) {
            while (vOriginalAnnotationTextHolder.firstChild) {
              vOriginalAnnotationTextHolder.removeChild(vOriginalAnnotationTextHolder.firstChild)
            }
            vOriginalAnnotationTextHolder.parentNode.removeChild(vOriginalAnnotationTextHolder)
        }
        window.LiftEd.Graphing.fAddAnnotationsToTab(aArrayAnnotations);
      });
      vHTMLELNullGraphButton.addEventListener('click', () => {
        vHTMLELNullGraphButton.checked = true;
        vHTMLElRegularGraphButton.checked = false;
        window.LiftEd.Vars.numberHandler = 0;
        window.LiftEd.Vars.mergedArrays = [];
        gD3.selectAll('.cLEAverageMaxGraphLine').remove();
        gD3.selectAll('.cLEAverageGraphLine').remove();
        gD3.selectAll('#cLEAverageAnnotations').remove();
        gD3.selectAll('#cLEAverageMaxAnnotations').remove();
        gD3.selectAll('.cLEDataRow').remove();
        gD3.selectAll('.cLEDataFirstSubHeader').remove();
        gD3.selectAll('.cLEDataSubHeader').remove();
        gD3.selectAll('.cLEMaxGraphLine').remove();
        gD3.selectAll('.graphline').remove();
        gD3.selectAll('.cLEDataAnnotationLayer').remove();
        gD3.selectAll('#idLECumulativeDataRow').remove();
        if (gD3.selectAll("#idLEYAxis")) {
          gD3.selectAll("#idLEYAxis").remove();
          gD3.selectAll("#idLEXAxis").remove();
        }
        let vOriginalDateStart= new Date(window.LiftEd.Utils.fGetVar('#5709181817', 'originalDateStart'));
        vOriginalDateStart.setHours(12,0,0,0);
        window.LiftEd.Vars.dateStart = vOriginalDateStart.getTime();
        let vOriginalDateEnd = new Date(window.LiftEd.Utils.fGetVar('#5709181817', 'originalDateEnd'));
        vOriginalDateEnd.setHours(12,0,0,0);
        window.LiftEd.Vars.dateEnd = vOriginalDateEnd.getTime();
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();

        let vIntTickFrequency = null;
        let vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));
        let vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));
        if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {
          // noinspection JSUnusedLocalSymbols
          vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
        }
        //set default range for graphlines and d3 scales into a function. 2-3 hours
        window.LiftEd.Graphing.fSetScaledLines(gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]));
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fAddAxes(gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]), vIntTickFrequency, window.LiftEd.Vars.label);
        // noinspection JSCheckFunctionSignatures
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fAddGraphLineButtons(aArrayOriginalData, gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]), aTypeDisplay, aArraySummaryColumns);
        if (gD3.selectAll(".cLEAnnotationsGroup")._groups[0].length > 0) {
            gD3.selectAll(".cLEAnnotationsGroup").remove();
        }
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fAddAnnotations(aArrayAnnotations, gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]), parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));


        if (aDictPrompts) {
          gD3.selectAll('#idLEPromptsXAxis').remove();
          gD3.selectAll('#idLEPromptsYAxis').remove();
          gD3.selectAll('#idLEPromptsBars').remove();
          gD3.selectAll('#idLEPromptsLegend').remove();
          gD3.selectAll('#idLEPromptsAxisLabel').remove();
          let vArrayPromptsData = window.LiftEd.Graphing.fModifyPromptsData(aArrayOriginalData, aDictPrompts)

          let vArrayKeys= []
          for (let key in aDictPrompts) {
            vArrayKeys.push(aDictPrompts[key])
          }

          vPromptsD3fXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth')]).padding(.3)
          vPromptsD3BarfXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth') + 22]).padding(.3)
          vPromptsD3fYScale = gD3.scaleLinear().domain([0, d3.max(vArrayPromptsData, function(d) { return d.total; })]).rangeRound([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerPromptsHeight'), 0]);
          vPromptsD3fZScale = gD3.scaleOrdinal().domain(vArrayKeys).range([" #0000cc",  "#cc6666", "#0066cc", "#0099cc", "#00cccc", "#00ffcc", "#3300cc", "#3333cc", " #3366cc", "#3399cc", " #6600cc", "#6666cc", "#9900cc", " #990066", " #660066", "#006666", " #336633", "#663333", "#993333", "#9900ff", " #cc0066"]);
          window.LiftEd.Graphing.fAddPromptsAxes(vPromptsD3fXScale, vPromptsD3fYScale, null, window.LiftEd.Vars.label)
          window.LiftEd.Graphing.fAddPromptsBars(vArrayPromptsData, aDictPrompts, vPromptsD3BarfXScale, vPromptsD3fYScale, vPromptsD3fZScale)
          window.LiftEd.Graphing.fAddPromptsLegend(vArrayKeys, vPromptsD3fZScale)

          if (document.querySelector('.cLEPromptsBartModalButton')) {
            vPromptsBarModalButton = document.querySelector('.cLEPromptsBartModalButton');
          } else {
            throw 'ERROR #5712071245: document.querySelector(".cLEPromptsBartModalButton") missing';
          }

          window.LiftEd.Graphing.fHTMLElPromptsBarModal(vPromptsBarModalButton, {
            content: '.cLEValuePointModal'
          });
        }

        let vOriginalAnnotationTextHolder = document.getElementById('idLEAnnotationsTextHolder');
        if (vOriginalAnnotationTextHolder !== null) {
            while (vOriginalAnnotationTextHolder.firstChild) {
              vOriginalAnnotationTextHolder.removeChild(vOriginalAnnotationTextHolder.firstChild)
            }
            vOriginalAnnotationTextHolder.parentNode.removeChild(vOriginalAnnotationTextHolder)
        }
        window.LiftEd.Graphing.fAddAnnotationsToTab(aArrayAnnotations);
      });

  } catch (e) {
    throw 'ERROR #5711161220: ' + e;
  }
};


  /**
   * @memberof Graphing
   * @function fSelectDateChange
   * @description Function that fires when a date range is selected from the dropdown.
   * @param {string} aSelectValue - A string that designates which dropdown option is selected. Can be 'Last 7 Days', 'Last 14 Days', 'Last 30 Days', 'Last 60 Days', 'Last 90 Days', 'Last 180 Days', 'Show All', or "Custom Date Range"
  */
  window.LiftEd.Graphing.fSelectDateChange = (aSelectValue) => {
    try {
      let vSelectValue = null;
      let vEndDate = new Date();
          vEndDate.setHours(23,59,59,0);
      let vStartDate = null,
          vInteger1Week = 604800000,
          vInteger1Month = 2592000000;
      let vHTMLELDropDownText;

      if (aSelectValue) {
        vSelectValue = aSelectValue
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221351: aSelectValue missing';
      }

      if (document.getElementById('idLEDatePickerValue')) {
        vHTMLELDropDownText = document.getElementById('idLEDatePickerValue');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5708221352: document.getElementById("idLEDatePickerValue") missing';
      }

      vEndDate = vEndDate.getTime();
      window.LiftEd.Vars.vSelectValue = vSelectValue;

      if (vSelectValue === 'Last 7 Days') {
        vStartDate = vEndDate - vInteger1Week;
        window.LiftEd.Vars.dateStart = vStartDate;
        window.LiftEd.Vars.dateEnd = vEndDate;
        window.LiftEd.Vars.typeDate = 0;
        vHTMLELDropDownText.innerHTML = vSelectValue;
        window.LiftEd.Graphing.fGetDates()
      }
      else if (vSelectValue === 'Last 14 Days') {
        vStartDate = vEndDate - (vInteger1Week * 2);
        window.LiftEd.Vars.dateStart = vStartDate;
        window.LiftEd.Vars.dateEnd = vEndDate;
        window.LiftEd.Vars.typeDate  = 1;
        vHTMLELDropDownText.innerHTML = vSelectValue;
        window.LiftEd.Graphing.fGetDates()
      }
      else if (vSelectValue === 'Last 30 Days') {
        vStartDate = vEndDate - vInteger1Month;
        window.LiftEd.Vars.dateStart = vStartDate;
        window.LiftEd.Vars.dateEnd = vEndDate;
        window.LiftEd.Vars.typeDate = 2;
        vHTMLELDropDownText.innerHTML = vSelectValue;
        window.LiftEd.Graphing.fGetDates()
      }
      else if (vSelectValue === 'Last 60 Days') {
        vStartDate = vEndDate - (vInteger1Month * 2);
        window.LiftEd.Vars.dateStart = vStartDate;
        window.LiftEd.Vars.dateEnd = vEndDate;
        window.LiftEd.Vars.typeDate  = 3;
        vHTMLELDropDownText.innerHTML = vSelectValue;
        window.LiftEd.Graphing.fGetDates()
      }
      else if (vSelectValue === 'Last 90 Days') {
        vStartDate = vEndDate - (vInteger1Month * 3);
        window.LiftEd.Vars.dateStart = vStartDate;
        window.LiftEd.Vars.dateEnd = vEndDate;
        window.LiftEd.Vars.typeDate  = 4;
        vHTMLELDropDownText.innerHTML = vSelectValue;
        window.LiftEd.Graphing.fGetDates()
      }
      else if (vSelectValue === 'Last 180 Days') {
        vStartDate = vEndDate - (vInteger1Month * 6 );
        window.LiftEd.Vars.dateStart = vStartDate;
        window.LiftEd.Vars.dateEnd = vEndDate;
        window.LiftEd.Vars.typeDate = 5;
        vHTMLELDropDownText.innerHTML = vSelectValue;
        window.LiftEd.Graphing.fGetDates();
      }
      else if (vSelectValue === 'Show All') {


        let vDateEarliest = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202144', 'dateEarliest'))),
            vDateLatest = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202144', 'dateLatest')));


        window.LiftEd.Vars.dateStart = window.LiftEd.Utils.fGetVar('#5709202144', 'dateEarliest');
        window.LiftEd.Vars.dateEnd = window.LiftEd.Utils.fGetVar('#5709202144', 'dateLatest');
        window.LiftEd.Vars.typeDate = 6;

        vHTMLELDropDownText.innerHTML = window.LiftEd.Utils.fGetVar('#5709191851', 'pArrStrMonthNames')[vDateEarliest .getMonth()] + " " + vDateEarliest.getDate() + ', ' + vDateEarliest .getFullYear() + ' - ' + window.LiftEd.Utils.fGetVar('#5709191852', 'pArrStrMonthNames')[vDateLatest .getMonth()] + " " + vDateLatest.getDate() + ', ' + vDateLatest .getFullYear();
        window.LiftEd.Graphing.fGetDates();
      } else {

        vHTMLELDropDownText.innerHTML = vSelectValue;
        window.LiftEd.Vars.typeDate = 99;
      }
    } catch (e) {
      throw 'ERROR #5711161221: ' + e;
    }
};



/**
 * @memberof Graphing
 * @function fUpdateInput
 * @description A function to update the global variables for startdate, enddate, starttime, endtime, startannotation, endannotation, and annotationtext
 * @param {string} aStringDateType - A string that designates the global variable to update. Can be 'startdate', 'enddate', 'starttime', 'endtime', 'startannotation', 'endannotation', and 'annotationtext'.
*/
window.LiftEd.Graphing.fUpdateInput = (aStringDateType) => {
  try {
    let vHTMLElStartDate = null;
    let vHTMLElEndDate = null;
    let vIntStartDate = null;
    let vIntEndDate = null;
    let vStringCurrentAnnotationText = null;
    let vHTMLElCurrentAnnotationStartDate = null;
    let vHTMLElCurrentAnnotationStartTime = null;
    let vHTMLElCurrentAnnotationEndDate = null;
    let vHTMLElCurrentAnnotationEndTime = null;
    let vHTMLElCurrentAnnotationText = null;
    let vIntAnnotationStartDate = null;
    let vIntAnnotationEndDate = null;
    let vIntAnnotationStartDatePlusOne = null;
    let vIntAnnotationEndDatePlusOne = null;
    let vIntCurrentAnnotationStartTime = null;
    let vIntCurrentAnnotationEndTime = null;

    if (document.querySelector('input[name="nLEStartDate"]')) {
      vHTMLElStartDate = document.querySelector('input[name="nLEStartDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221354: document.querySelector(("input[name="nLEStartDate"]") missing';
    }

    if (document.querySelector('input[name="nLEEndDate"]')) {
      vHTMLElEndDate = document.querySelector('input[name="nLEEndDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221355: document.querySelector("input[name="nLEEndDate"]") missing';
    }

    if (document.querySelector('input[name="nLEAnnotationStartDate"]')) {
      vHTMLElCurrentAnnotationStartDate = document.querySelector('input[name="nLEAnnotationStartDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221356: document.querySelector("input[name="nLEAnnotationStartDate"]") missing';
    }

    if (document.querySelector('input[name="nLEAnnotationEndDate"]')) {
      vHTMLElCurrentAnnotationEndDate = document.querySelector('input[name="nLEAnnotationEndDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221356: document.querySelector("input[name="nLEAnnotationEndDate"]") missing';
    }

    if (document.querySelector('input[name="nLEAnnotationStartTime"]')) {
      vHTMLElCurrentAnnotationStartTime = document.querySelector('input[name="nLEAnnotationStartTime"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221357: document.querySelector("input[name="nLEAnnotationStartTime"]") missing';
    }

    if (document.querySelector('input[name="nLEAnnotationEndTime"]')) {
      vHTMLElCurrentAnnotationEndTime = document.querySelector('input[name="nLEAnnotationEndTime"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221357: document.querySelector("input[name="nLEAnnotationEndTime"]") missing';
    }


    if (document.getElementById('idLECustomAnnotationTextIput')) {
      vHTMLElCurrentAnnotationText = document.getElementById('idLECustomAnnotationTextIput');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221358: document.getElementById("idLECustomAnnotationTextIput") missing';
    }



    if (aStringDateType === 'startdate') {
      vIntStartDate = new Date(vHTMLElStartDate.value);
      vIntStartDate.setHours(12,0,0,0);
      // noinspection UnnecessaryLocalVariableJS
      let vIntStartDatePlusOne = vIntStartDate.setDate(vIntStartDate.getDate() + 1);
      window.LiftEd.Vars.dateStart = vIntStartDatePlusOne;
    }
    else if (aStringDateType === 'enddate') {
      vIntEndDate = new Date(vHTMLElEndDate.value);
      vIntEndDate.setHours(12,0,0,0);
      // noinspection UnnecessaryLocalVariableJS
      let vIntEndDatePlusOne = vIntEndDate.setDate(vIntEndDate.getDate() + 1);
      window.LiftEd.Vars.dateEnd = vIntEndDatePlusOne;
    }
    else if (aStringDateType === 'starttime') {
      vIntCurrentAnnotationStartTime = vHTMLElCurrentAnnotationStartTime.value;
      if (!vIntCurrentAnnotationStartTime ) {
        window.LiftEd.Vars.currentAnnotationStartTime = '00:00';
      }
      window.LiftEd.Vars.currentAnnotationStartTime = vIntCurrentAnnotationStartTime;
    }
    else if (aStringDateType === 'endtime') {
      vIntCurrentAnnotationEndTime = vHTMLElCurrentAnnotationEndTime.value;
      if (!vIntCurrentAnnotationEndTime) {
        vIntCurrentAnnotationEndTime = '23:59';
      }
      window.LiftEd.Vars.currentAnnotationEndTime = vIntCurrentAnnotationEndTime;
    }
    else if (aStringDateType === 'startannotation') {
      vIntAnnotationStartDate = new Date(vHTMLElCurrentAnnotationStartDate.value);
      vIntAnnotationStartDate.setHours(12,0,0,0);
      vIntAnnotationStartDatePlusOne = vIntAnnotationStartDate.setDate(vIntAnnotationStartDate.getDate() + 1);
      window.LiftEd.Vars.curentAnnotationStartDate = vIntAnnotationStartDatePlusOne;
    }
    else if (aStringDateType === 'endannotation') {
      vIntAnnotationEndDate = new Date(vHTMLElCurrentAnnotationEndDate.value);
      vIntAnnotationEndDate.setHours(12,0,0,0);
      vIntAnnotationEndDatePlusOne = vIntAnnotationEndDate.setDate(vIntAnnotationEndDate.getDate() + 1);
      window.LiftEd.Vars.curentAnnotationEndDate = vIntAnnotationEndDatePlusOne;
    } else {
      vStringCurrentAnnotationText = vHTMLElCurrentAnnotationText.value;
      window.LiftEd.Vars.currentAnnotationText = vStringCurrentAnnotationText;
    }
  } catch (e) {
    throw 'ERROR #5711161222: ' + e;
  }
};


  /**
   * @memberof Graphing
   * @function fGetDates
   * @description A function to update the graph with a new date range.
  */
window.LiftEd.Graphing.fGetDates = () => {
  try {
    let vHTMLElStartDate = null,
        vHTMLElEndDate = null,
        vIntEndDate = null,
        vIntStartDate = null,
        vIntEndDatePlusOne = null,
        vIntStartDatePlusOne = null;

    if (document.querySelector('input[name="nLEStartDate"]')) {
      vHTMLElStartDate = document.querySelector('input[name="nLEStartDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221354: document.querySelector(("input[name="nLEStartDate"]") missing';
    }

    if (document.querySelector('input[name="nLEEndDate"]')) {
      vHTMLElEndDate = document.querySelector('input[name="nLEEndDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221355: document.querySelector("input[name="nLEStartDate"]") missing';
    }
    if (window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') === '99' || window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') === 99) {
      // noinspection CommaExpressionJS
      vIntEndDate = new Date(vHTMLElEndDate.value),
      vIntStartDate = new Date(vHTMLElStartDate.value),
      vIntEndDate.setHours(23,59,59,0);
      vIntStartDate.setHours(23,59,59,0);
      vIntEndDatePlusOne = vIntEndDate.setDate(vIntEndDate.getDate() + 1);
      vIntStartDatePlusOne = vIntStartDate.setDate(vIntStartDate.getDate() + 1);
      window.LiftEd.Vars.dateEnd = vIntEndDatePlusOne;
      window.LiftEd.Vars.dateStart = vIntStartDatePlusOne;
    }
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Vars.dateStart = window.LiftEd.Utils.fConvertDate(parseInt(window.LiftEd.Utils.fGetVar('#5709202128', 'dateStart')), '');
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Vars.dateEnd = window.LiftEd.Utils.fConvertDate(parseInt(window.LiftEd.Utils.fGetVar('#5709202127', 'dateEnd')), '');
    let vDictAPIArgs = {
      typeDate:  window.LiftEd.Utils.fGetVar('#5709202128', 'typeDate'),
      dateStart: window.LiftEd.Utils.fGetVar('#5709202129', 'dateStart'),
      dateEnd: window.LiftEd.Utils.fGetVar('#5709202130', 'dateEnd'),
      uuid: window.LiftEd.Utils.fGetVar('#5709202133', 'uuid')
    };

    vDictAPIArgs.options = {
      typeChart: window.LiftEd.Utils.fGetVar('#5709202131', 'typeChart'),
      typeDisplay: window.LiftEd.Utils.fGetVar('#5709202132', 'typeDisplay'),
      numberHandler: window.LiftEd.Utils.fGetVar('#5710061516', 'numberHandler'),
      tabOnLoad: window.LiftEd.Utils.fGetVar('#5710061517', 'tabOnLoad')
    };
    if (window.LiftEd.API.fGetDebug()) {console.log(vDictAPIArgs);}
    window.LiftEd.API.fLogDebugVerbose("vDictAPIArgs = " + JSON.stringify(vDictAPIArgs));
    window.LiftEd.GraphingCallbacks.fUpdateGraph(vDictAPIArgs);
  } catch (e) {
    throw 'ERROR #5711161223: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fAttachGraphTitle
 * @description A function to append the graph title to the graph.
 * @param {string} aStrResponseTitle - A string with
*/
window.LiftEd.Graphing.fAttachGraphTitle = (aStrResponseTitle) => {
  try {
    window.LiftEd.API.fLogDebugVerbose("document.getElementById('idLETitleHolder').hasChildNodes() = " + document.getElementById('idLETitleHolder').hasChildNodes());
    let vHTMLElAttachedTitleHolder = null;
    let vStartOfTitleString = null;
    let vEndOfTitleString = null;
    let vTruncatedTitleString = null;
    let vHTMLElTitleTSpan = null;
    let vStrResponseTitle = null;

    if (aStrResponseTitle) {
      vStrResponseTitle = aStrResponseTitle
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221355: aStrResponseTitle missing';
    }

    if (document.getElementById('idLETitleHolder')) {
      vHTMLElAttachedTitleHolder = document.getElementById('idLETitleHolder');
    }

    if (vHTMLElAttachedTitleHolder.hasChildNodes()) {
        vHTMLElAttachedTitleHolder.removeChild(document.getElementById('idLETitleHolder').childNodes[0]);
      vHTMLElTitleTSpan = document.createElement("TSPAN");
      vHTMLElTitleTSpan.setAttribute('class', 'cLETitle');
      if (vStrResponseTitle.length > 93) {
        vHTMLElTitleTSpan =  document.createElement("TSPAN");

        vStartOfTitleString = vStrResponseTitle.slice(0,20);
        vEndOfTitleString = vStrResponseTitle.slice(-20);
        vTruncatedTitleString = vStartOfTitleString + ' ..... ' + vEndOfTitleString;

        vHTMLElTitleTSpan.setAttribute('class', 'cLETitle');
        vHTMLElTitleTSpan.innerHTML = vTruncatedTitleString;
        vHTMLElAttachedTitleHolder.appendChild(vHTMLElTitleTSpan);
      }
      else if (vStrResponseTitle.length > 46) {
        let vHTMLElTitleTSpan = document.createElement("TSPAN");
        vHTMLElTitleTSpan.setAttribute('class', 'cLETitle2Rows');
        vHTMLElTitleTSpan.innerHTML = vStrResponseTitle;
        vHTMLElAttachedTitleHolder.appendChild(vHTMLElTitleTSpan);
      } else {
        let vHTMLElTitleTSpan = document.createElement("TSPAN");
        vHTMLElTitleTSpan.setAttribute('class', 'cLETitle');
        vHTMLElTitleTSpan.innerHTML = vStrResponseTitle;
        vHTMLElAttachedTitleHolder.appendChild(vHTMLElTitleTSpan);
      }
    } else {
      if (vStrResponseTitle.length > 93) {
        vHTMLElTitleTSpan = document.createElement("TSPAN");

        vStartOfTitleString = vStrResponseTitle.slice(0,20);
        vEndOfTitleString = vStrResponseTitle.slice(-20);
        vTruncatedTitleString = vStartOfTitleString + ' ..... ' + vEndOfTitleString;

        vHTMLElTitleTSpan.setAttribute('class', 'cLETitle');
        vHTMLElTitleTSpan.innerHTML = vTruncatedTitleString;
        vHTMLElAttachedTitleHolder.appendChild(vHTMLElTitleTSpan);
      }
      else if (vStrResponseTitle.length > 46) {
        vHTMLElTitleTSpan = document.createElement("TSPAN");
        vHTMLElTitleTSpan.setAttribute('class', 'cLETitle2Rows');
        vHTMLElTitleTSpan.innerHTML = vStrResponseTitle;
        vHTMLElAttachedTitleHolder.appendChild(vHTMLElTitleTSpan);
      } else {
        vHTMLElTitleTSpan = document.createElement("TSPAN");
        vHTMLElTitleTSpan.setAttribute('class', 'cLETitle');
        vHTMLElTitleTSpan.innerHTML = vStrResponseTitle;
        vHTMLElAttachedTitleHolder.appendChild(vHTMLElTitleTSpan);
      }
    }
  } catch (e) {
    throw 'ERROR #5711161224: ' + e;
  }
};



//https://stackoverflow.com/questions/42828187/how-to-take-a-screenshot-in-html-with-javascript
window.LiftEd.Utils.fTakeScreenShot = () => {
  html2canvas(document.getElementById('idLEContainer'), {
    onrendered: (canvas) => {
      let link=document.createElement("a");
      link.href=canvas.toDataURL('image/jpg');   //function blocks CORS
      link.download = 'screenshot.jpg';
      link.click();
    }
  });
};

/**
 * @memberof Graphing
 * @function fAddNotesToTab
 * @description A function to add notes to the tab below the graph.
 * @param {array} aNotesArray - An array of dictionaries of notes. Can be empty.
*/
window.LiftEd.Graphing.fAddNotesToTab = (aNotesArray) => {
  try {
    let vNotesArray = null;
    // noinspection JSUnusedAssignment
    let vOriginalNoteTextHolder = null;
    let vNotesHolder = null;
    let vD3TimeParse = window.LiftEd.Utils.fGetVar('#5709191552', 'gDateMonthDayParse');

    if (aNotesArray) {
      vNotesArray = aNotesArray;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708231355: aNotesArray missing';
    }

    if (document.getElementById("idLENotes")) {
      vNotesHolder = document.getElementById("idLENotes");
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708231357: document.getElementById("idLENotes") missing';
    }

    vOriginalNoteTextHolder = document.getElementById('idLENotesTextHolder');
    let vIntNotesCount = vNotesArray.length;
    if (vOriginalNoteTextHolder !== null) {
        while (vOriginalNoteTextHolder.firstChild) {
          vOriginalNoteTextHolder.removeChild(vOriginalNoteTextHolder.firstChild)
        }
        vOriginalNoteTextHolder.parentNode.removeChild(vOriginalNoteTextHolder)
    } else {
      let vNotesTextHolder = document.createElement('div');
      vNotesTextHolder.setAttribute('id', 'idLENotesTextHolder');
      vNotesHolder.appendChild(vNotesTextHolder);
      vNotesArray.forEach((aDictNote) => {
        let vStringNote = document.createElement("p"),
            vNoteDate = new Date(aDictNote.date);
        vStringNote.setAttribute('class', 'cLENote');
        let vIntegerDateDays = ("0" + vNoteDate.getDate()).slice(-2),
            vIntegerDateMonth = ("0" + (vNoteDate.getMonth() + 1)).slice(-2),
            vIntegerDateYear = vNoteDate.getFullYear(),
            vIntegerDateSeconds = vNoteDate.getSeconds(),
            vIntegerDateMinutes = vNoteDate.getMinutes(),
            vIntegerDateHours = vNoteDate.getHours();
        vStringNote.innerHTML = 'N' + vIntNotesCount + '&nbsp' + '&nbsp' + '&nbsp' + vIntegerDateMonth + '/' + vIntegerDateDays + '/' +  vIntegerDateYear + ' ' + vIntegerDateHours + ':' + vIntegerDateMinutes + ':' + vIntegerDateSeconds + '&nbsp'+ '&nbsp' + '-' + '&nbsp'+ '&nbsp' + aDictNote.author + ":"+ '&nbsp' + aDictNote.note;
        vNotesTextHolder.appendChild(vStringNote);
        vStringNote.addEventListener('click', () => {
          let vAnnotationHeader = document.getElementById('idLEAnnotationModalHeader');
          let vAnnotationBody = document.getElementById('idLEAnnotationModalBody');

          // noinspection Annotator
          vAnnotationHeader.innerHTML = vD3TimeParse(aDictNote.date) + ' ' + aDictNote.author;
          vAnnotationBody.innerHTML = aDictNote.note;
        });
        vIntNotesCount -= 1
      });
    }
  } catch (e) {
    throw 'ERROR #5711161225: ' + e;
  }
};




/**
 * @memberof Graphing
 * @function fAddTactics
 * @description A function to add tactics to the tab below the graph.
 * @param {array} aTacticsArray - An array of dictionaries of tactics. Can be empty.
*/
window.LiftEd.Graphing.fAddTacticsToTab = (aTacticsArray) => {
  try {
    let vTacticsArray = null;
    // noinspection JSUnusedAssignment
    let vOriginalTacticTextHolder = null;
    let vTacticsHolder = null;
    let vTacticsTextHolder = null;
    let vD3TimeParse = window.LiftEd.Utils.fGetVar('#5709191552', 'gDateMonthDayParse');

    if (aTacticsArray) {
      vTacticsArray = aTacticsArray;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708231405: aTacticsArray missing';
    }

    if (document.getElementById("idLETactics")) {
      vTacticsHolder = document.getElementById("idLETactics");
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708231406: document.getElementById("idLETactics") missing';
    }


    vOriginalTacticTextHolder = document.getElementById('idLETacticsTextHolder');
    let vIntTacticsCount = vTacticsArray.length;

    if (vOriginalTacticTextHolder !== null) {
        while (vOriginalTacticTextHolder.firstChild) {
          vOriginalTacticTextHolder.removeChild(vOriginalTacticTextHolder.firstChild)
        }
        vOriginalTacticTextHolder.parentNode.removeChild(vOriginalTacticTextHolder)
    } else {
      vTacticsTextHolder = document.createElement('div');
      vTacticsTextHolder.setAttribute('id', 'idLETacticsTextHolder');
      vTacticsHolder.appendChild(vTacticsTextHolder);
      // noinspection Annotator
      aTacticsArray.forEach((aDictTactic) => {
        let vStringNote = document.createElement("p"),
            vTacticDate = new Date(aDictTactic.date);
        vStringNote.setAttribute('class', 'cLETactic');
        let vIntegerDateDays = ("0" + vTacticDate.getDate()).slice(-2),
            vIntegerDateMonth = ("0" + (vTacticDate.getMonth() + 1)).slice(-2),
            vIntegerDateYear = vTacticDate.getFullYear(),
            vIntegerDateSeconds = vTacticDate.getSeconds(),
            vIntegerDateMinutes = vTacticDate.getMinutes(),
            vIntegerDateHours = vTacticDate.getHours();
        vStringNote.innerHTML = 'T' + vIntTacticsCount + '&nbsp' + '&nbsp' + '&nbsp' +
         vIntegerDateMonth + '/' + vIntegerDateDays + '/' +  vIntegerDateYear + ' ' + vIntegerDateHours + ':' + vIntegerDateMinutes + ':' + vIntegerDateSeconds + '&nbsp'+ '&nbsp' + '-' + '&nbsp'+ '&nbsp'+ aDictTactic.author + ":" + '&nbsp' + aDictTactic.note;
        vTacticsTextHolder.appendChild(vStringNote);
        vStringNote.addEventListener('click', () => {
          let vAnnotationHeader = document.getElementById('idLEAnnotationModalHeader');
          let vAnnotationBody = document.getElementById('idLEAnnotationModalBody');
          // noinspection Annotator
          vAnnotationHeader.innerHTML = vD3TimeParse(aDictTactic.date) + ' ' + aDictTactic.author;
          vAnnotationBody.innerHTML = aDictTactic.note;
        });
        vIntTacticsCount -= 1;
      });
    }
  } catch (e) {
    throw 'ERROR #5711161226: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fAddNotesToTab
 * @description A function to add annotations to the tab below the graph.
 * @param {array} aAnnotationsArray - An array of dictionaries of notes. Can be empty.
*/
window.LiftEd.Graphing.fAddAnnotationsToTab = (aAnnotationsArray) => {
  try {
    let vAnnotationsArray = null;
    // noinspection JSUnusedAssignment
    let vOriginalAnnotationTextHolder = null;
    let vAnnotationsHolder = null;
    let vAnnotationsTextHolder = null;
    let vIntXMin = null;
    let vIntXMax = null;
    let vHTMLELAnnotationButton = null;
    let vIntAnnotationCounter = null;
    let vAnnotationStartDate = null;
    let vPlaceHolderStartDate = null;
    let vIntegerEndDateDays = null,
      vIntegerEndDateMonth = null,
      vIntegerEndDateYear = null,
      vIntegerEndDateSeconds = null,
      vIntegerEndDateMinutes = null,
      vIntegerEndDateHours = null,
      vAnnotationEndDate = null,
      vPlaceHolderEndDate = null;

    if (aAnnotationsArray) {
      vAnnotationsArray = aAnnotationsArray;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709281355: aAnnotationsArray missing';
    }

    if (document.getElementById("idLEAnnotations")) {
      vAnnotationsHolder = document.getElementById("idLEAnnotations");
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709281356: document.getElementById("idLEAnnotations") missing';
    }

    vOriginalAnnotationTextHolder = document.getElementById('idLEAnnotationsTextHolder');
    let vIntAnnotationsCount = vAnnotationsArray.length;

    if (vOriginalAnnotationTextHolder !== null) {
        while (vOriginalAnnotationTextHolder.firstChild) {
          vOriginalAnnotationTextHolder.removeChild(vOriginalAnnotationTextHolder.firstChild)
        }
        vOriginalAnnotationTextHolder.parentNode.removeChild(vOriginalAnnotationTextHolder)
    } else {
      vAnnotationsTextHolder = document.createElement('div');
      vAnnotationsTextHolder.setAttribute('id', 'idLEAnnotationsTextHolder');
      vAnnotationsHolder.appendChild(vAnnotationsTextHolder);
      vHTMLELAnnotationButton = document.getElementById('idLEAnnotationsTabButton');
      vHTMLELAnnotationButton.innerHTML = "Annotations" + " (" + vAnnotationsArray.length + ")";

      vIntAnnotationCounter = 0;
      vAnnotationsArray.forEach((aDictAnnotation) => {

      let vStringNote = document.createElement("p");
          vStringNote.setAttribute('class', 'cLEAnnotation');
          vAnnotationStartDate = new Date(aDictAnnotation.dateStart);
          vPlaceHolderStartDate = new Date(aDictAnnotation.dateStart);
          vIntXMin = new Date(window.LiftEd.Utils.fGetVar('#5710201628', 'dateStart'));
          vIntXMax = new Date(window.LiftEd.Utils.fGetVar('#5710201629', 'dateEnd'));
          if (vAnnotationStartDate.setHours(0,0,0,0) <= vIntXMax.setHours(0,0,0,0) || (vAnnotationStartDate.setHours(0,0,0,0) <= vIntXMax.setHours(0,0,0,0) && vAnnotationStartDate.setHours(0,0,0,0) >= vIntXMin.setHours(0,0,0,0))) {
          let vIntegerStartDateDays = ("0" + vPlaceHolderStartDate.getDate()).slice(-2),
              vIntegerStartDateMonth = ("0" + (vPlaceHolderStartDate.getMonth() + 1)).slice(-2),
              vIntegerStartDateYear = vPlaceHolderStartDate.getFullYear(),
              vIntegerStartDateSeconds = vPlaceHolderStartDate.getSeconds(),
              vIntegerStartDateMinutes = vPlaceHolderStartDate.getMinutes(),
              vIntegerStartDateHours = vPlaceHolderStartDate.getHours();
              if ('dateEnd' in aDictAnnotation) {
                if (aDictAnnotation.dateEnd) {
                  vAnnotationEndDate = new Date(aDictAnnotation.dateEnd);
                  vPlaceHolderEndDate = new Date(aDictAnnotation.dateEnd);
                  if (vAnnotationEndDate.setHours(0,0,0,0) >= vAnnotationStartDate.setHours(0,0,0,0)) {
                    // noinspection CommaExpressionJS
                    vIntegerEndDateDays = ("0" + vPlaceHolderEndDate .getDate()).slice(-2),
                    vIntegerEndDateMonth = ("0" + (vPlaceHolderEndDate .getMonth() + 1)).slice(-2),
                    vIntegerEndDateYear = vPlaceHolderEndDate .getFullYear(),
                    vIntegerEndDateSeconds = vPlaceHolderEndDate .getSeconds(),
                    vIntegerEndDateMinutes = vPlaceHolderEndDate .getMinutes(),
                    vIntegerEndDateHours = vPlaceHolderEndDate .getHours();
                    //function for this to clean it up. 1-2 hours.
                    vStringNote.innerHTML = 'A' + vIntAnnotationsCount + '&nbsp' + '&nbsp' + '&nbsp' +
                     vIntegerStartDateMonth + '/' + vIntegerStartDateDays + '/' +  vIntegerStartDateYear + ' ' + vIntegerStartDateHours + ':' + vIntegerStartDateMinutes + ':' + vIntegerStartDateSeconds + '&nbsp'+ '&nbsp' + '-' + '&nbsp'+ '&nbsp'+ vIntegerEndDateMonth + '/' + vIntegerEndDateDays + '/' +  vIntegerEndDateYear + ' ' + vIntegerEndDateHours + ':' +  vIntegerEndDateMinutes + ':' + vIntegerEndDateSeconds + '&nbsp' + '&nbsp' + '-' + '&nbsp' + '&nbsp' + '&nbsp'+ '&nbsp'+ aDictAnnotation.author + '&nbsp' + ':' + '&nbsp' + aDictAnnotation.note;
                  }
                } else {
                vStringNote.innerHTML = 'A' + vIntAnnotationsCount + '&nbsp' + '&nbsp' + '&nbsp' +
                 vIntegerStartDateMonth + '/' + vIntegerStartDateDays + '/' +  vIntegerStartDateYear + ' ' + vIntegerStartDateHours + ':' + vIntegerStartDateMinutes + ':' + vIntegerStartDateSeconds + '&nbsp' + '&nbsp' + '-' + '&nbsp' + '&nbsp' + '&nbsp'+ '&nbsp'+ aDictAnnotation.author + '&nbsp' + ':' + '&nbsp' + aDictAnnotation.note;
               }
            } else {
            vStringNote.innerHTML = 'A' + vIntAnnotationsCount + '&nbsp' + '&nbsp' + '&nbsp' +
             vIntegerStartDateMonth + '/' + vIntegerStartDateDays + '/' +  vIntegerStartDateYear + ' ' + vIntegerStartDateHours + ':' + vIntegerStartDateMinutes + ':' + vIntegerStartDateSeconds + '&nbsp' + '&nbsp' + '-' + '&nbsp' + '&nbsp' + '&nbsp'+ '&nbsp'+ aDictAnnotation.author + '&nbsp' + ':' + '&nbsp' + aDictAnnotation.note;
           }
          }
          vAnnotationsTextHolder.appendChild(vStringNote);
          vStringNote.addEventListener('click', () => {
            let vHTMLAnnotationStartDate = null,
                vHTMLAnnotationEndDate = null,
                vHTMLAnnotationStartTime = null,
                vHTMLAnnotationEndTime = null,
                vHTMLAnnotationAuthor = null,
                vHTMLAnnotationNote = null,
                vHTMLSelectedRadioButton = null,
                vHTMLAnnotationHeader = null;


            let  vAnnotationStartDate = null,
                vAnnotationEndDate = null;

            // noinspection JSUnusedAssignment
            // noinspection JSUnusedAssignment
            // noinspection JSUnusedAssignment
            // noinspection JSUnusedAssignment
            // noinspection JSUnusedAssignment
            // noinspection JSUnusedAssignment
            let vAnnotationStartDateDays = null,
                vAnnotationStartDateMonth= null,
                vAnnotationStartDateYear = null,
                vAnnotationStartTimeHours = null,
                vAnnotationStartTimeMinutes = null,
                vAnnotationDateStartString = null,
                vAnnotationEndDateDays = null,
                vAnnotationEndDateMonth = null,
                vAnnotationEndDateYear = null,
                vAnnotationEndTimeHours = null,
                vAnnotationEndTimeMinutes = null,
                vAnnotationDateEndString = null;

            if ('originalStart' in aDictAnnotation) {
              vAnnotationStartDate = new Date(aDictAnnotation.originalStart);
            } else {
              vAnnotationStartDate = new Date(aDictAnnotation.dateStart);
            }

            if (aDictAnnotation.uuid) {
                window.LiftEd.Vars.annotationUUID = aDictAnnotation.uuid;
            }

            if (aDictAnnotation.originalEnd) {
              vAnnotationEndDate = new Date(aDictAnnotation.originalEnd)
            } else if (aDictAnnotation.dateEnd) {
              vAnnotationEndDate = new Date(aDictAnnotation.dateEnd)
            }
            if ('scopeUUID' in aDictAnnotation) {
              window.LiftEd.Vars.scopeType = aDictAnnotation.scopeType;
              window.LiftEd.Vars.scopeUUID = aDictAnnotation.scopeUUID;
            } else {
              window.LiftEd.Vars.scopeType = 1;
              window.LiftEd.Vars.scopeUUID = window.LiftEd.Utils.fGetVar('#5710221850', 'uuid');
            }

            if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'scopeType')) === 0) {
              vHTMLSelectedRadioButton = document.getElementById('idLEGlobal');
              vHTMLSelectedRadioButton.checked = true;
            } else if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'scopeType')) === 1) {
              if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'typeDisplay')) === 0 || parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'typeDisplay')) === 1) {
                vHTMLSelectedRadioButton = document.getElementById('idLEActivity');
                vHTMLSelectedRadioButton.checked = true;
              } else {
                vHTMLSelectedRadioButton = document.getElementById('idLEBehavior');
                vHTMLSelectedRadioButton.checked = true;
              }
            } else if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'scopeType')) === 2) {
              vHTMLSelectedRadioButton = document.getElementById('idLEAllTargets');
              vHTMLSelectedRadioButton.checked = true;
            } else {
              vHTMLSelectedRadioButton = document.getElementById('idLE' + window.LiftEd.Utils.fGetVar('#5710221836', 'scopeUUID'));
              vHTMLSelectedRadioButton.checked = true;
            }

            if (document.getElementById('idLECustomAuthorText')) {
              vHTMLAnnotationAuthor = document.getElementById('idLECustomAuthorText');
            } else {
              throw 'ERROR #5710232147: document.getElementById("idLECustomAuthorText") missing';
            }
            vHTMLAnnotationAuthor.style.display = 'inline-block';
            vHTMLAnnotationAuthor.style.display = 'inline-block';
            vHTMLAnnotationAuthor.innerHTML = aDictAnnotation.author;


            if (document.querySelector('input[name="nLEAnnotationStartDate"]')) {
                vHTMLAnnotationStartDate = document.querySelector('input[name="nLEAnnotationStartDate"]');
            } else {
              throw 'ERROR #5710031346: document.querySelector("input[name="nLEAnnotationStartDate"]") missing';
            }

            if (document.querySelector('input[name="nLEAnnotationEndDate"]')) {
                vHTMLAnnotationEndDate = document.querySelector('input[name="nLEAnnotationEndDate"]');
            } else {
              throw 'ERROR #5710111232: document.querySelector("input[name="nLEAnnotationEndDate"]") missing';
            }

            if (document.getElementById('idLECustomAnnotationHeader')) {
              vHTMLAnnotationHeader = document.getElementById('idLECustomAnnotationHeader');
            } else {
              throw 'ERROR #5710031348:  document.getElementById("idLECustomAnnotationHeader") missing';
            }
            // noinspection CommaExpressionJS
            vAnnotationStartDateDays = ("0" + (vAnnotationStartDate.getDate())).slice(-2),
            vAnnotationStartDateMonth = ("0" + (vAnnotationStartDate.getMonth() + 1)).slice(-2),
            vAnnotationStartDateYear = vAnnotationStartDate.getFullYear(),
            vAnnotationStartTimeHours = vAnnotationStartDate.getHours().toString(),
            vAnnotationStartTimeMinutes = vAnnotationStartDate.getMinutes().toString();
            vAnnotationDateStartString = '' + vAnnotationStartDateYear + '-' + vAnnotationStartDateMonth + '-' + vAnnotationStartDateDays;

            vHTMLAnnotationStartDate.value = vAnnotationDateStartString;
            if (vAnnotationEndDate) {
              // noinspection CommaExpressionJS
              vAnnotationEndDateDays = ("0" + (vAnnotationEndDate.getDate())).slice(-2),
              vAnnotationEndDateMonth = ("0" + (vAnnotationEndDate.getMonth() + 1)).slice(-2),
              vAnnotationEndDateYear = vAnnotationEndDate.getFullYear(),
              vAnnotationEndTimeHours = vAnnotationEndDate.getHours().toString(),
              vAnnotationEndTimeMinutes = vAnnotationEndDate.getMinutes().toString();
              vAnnotationDateEndString = '' + vAnnotationEndDateYear + '-' + vAnnotationEndDateMonth + '-' + vAnnotationEndDateDays;
              vHTMLAnnotationEndDate.value = vAnnotationDateEndString;
            }

            if (document.getElementById('idLECustomAnnotationHeader')) {
              vHTMLAnnotationHeader = document.getElementById('idLECustomAnnotationHeader');
            } else {
              throw 'ERROR #5710031348:  document.getElementById("idLECustomAnnotationHeader") missing';
            }

            vHTMLAnnotationHeader.innerHTML = 'Edit Annotation';

            if (document.getElementById('idLECustomAnnotationTextIput')) {
              vHTMLAnnotationNote = document.getElementById('idLECustomAnnotationTextIput');
            } else {
              throw 'ERROR #5710031349:  document.getElementById("idLECustomAnnotationTextIput") missing';
            }

            if (document.querySelector('input[name="nLEAnnotationStartTime"]')) {
              vHTMLAnnotationStartTime = document.querySelector('input[name="nLEAnnotationStartTime"]');
            } else {
              throw 'ERROR #5710111235:  document.querySelector("input[name="nLEAnnotationStartTime"]") missing';
            }
            if (document.querySelector('input[name="nLEAnnotationEndTime"]')) {
              vHTMLAnnotationEndTime = document.querySelector('input[name="nLEAnnotationEndTime"]');
            } else {
              throw 'ERROR #5710111235:  document.querySelector("input[name="nLEAnnotationEndTime"]") missing';
            }
            if (vAnnotationStartTimeHours.length === 1) {
              vAnnotationStartTimeHours = '0' + vAnnotationStartTimeHours
            }
            if (vAnnotationStartTimeMinutes.length === 1) {

              vAnnotationStartTimeMinutes = '0' + vAnnotationStartTimeMinutes
            }
            if (vAnnotationEndDate) {
              if (vAnnotationEndTimeHours.length === 1) {
                vAnnotationEndTimeHours = '0' + vAnnotationEndTimeHours
              }

              if (vAnnotationEndTimeMinutes.length === 1) {
                vAnnotationEndTimeMinutes = '0' + vAnnotationEndTimeMinutes
              }
              vHTMLAnnotationEndTime.value = vAnnotationEndTimeHours + ':' + vAnnotationEndTimeMinutes;
              window.LiftEd.Vars.currentAnnotationEndDate = new Date(vAnnotationDateEndString).getTime();
              window.LiftEd.Vars.currentAnnotationEndTime = vAnnotationEndTimeHours + ':' + vAnnotationEndTimeMinutes;
            } else {
              window.LiftEd.Vars.currentAnnotationEndDate = null;
              window.LiftEd.Vars.currentAnnotationEndTime = null;
              vHTMLAnnotationEndDate.value = '';
              vHTMLAnnotationEndTime.value = ''
            }


          vHTMLAnnotationNote.value = aDictAnnotation.note;
          window.LiftEd.Vars.currentAnnotationStartDate = new Date(vAnnotationDateStartString).getTime();
          vHTMLAnnotationStartTime.value = vAnnotationStartTimeHours + ':' + vAnnotationStartTimeMinutes;
          window.LiftEd.Vars.currentAnnotationStartTime = vAnnotationStartTimeHours + ':' + vAnnotationStartTimeMinutes;
          });
          vIntAnnotationCounter += 1;
          vIntAnnotationsCount -= 1;
      });
    }
  } catch (e) {
    throw 'ERROR #5711161226: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fSetHiddenGraphScales
 * @description A function to set the graph's x and y scales.
 * @param {array} aArrayPromptsData - An array of graph prompts data.
*/


window.LiftEd.Graphing.fSetHiddenPromptsGraphScales = (aArrayPromptsData) => {
  let vArrayCumulativePromptData = [];
  let vDictCumulativePromptData = {};

  if (aArrayPromptsData) {
    aArrayPromptsData.forEach( (aDictPromptsDataSet) => {
      aDictPromptsDataSet.coordinates.forEach( (aDictDataPoint) => {
          if (vDictCumulativePromptData[aDictDataPoint.date]) {
            vDictCumulativePromptData[aDictDataPoint.date].value = vDictCumulativePromptData[aDictDataPoint.date].value;
          } else {
            vDictCumulativePromptData[aDictDataPoint.date] = {value: 0};
          }
          for (let key in aDictDataPoint.prompts) {
            if (aDictDataPoint.prompts.hasOwnProperty(key)) {
              if (aDictDataPoint[key] === null) {
                vDictCumulativePromptData[aDictDataPoint.date].value += 0;
              } else {
                vDictCumulativePromptData[aDictDataPoint.date].value += aDictDataPoint.prompts[key];
              }
            }
          }
      })
    });

    for (let key in vDictCumulativePromptData) {
      if (vDictCumulativePromptData.hasOwnProperty(key)) {
        vArrayCumulativePromptData.push({date: key, value: vDictCumulativePromptData[key].value})
      }
    }

    vIntegerPromptsXMin = gD3.min(vArrayCumulativePromptData, function (aDictData) {
      return Math.min(aDictData.date)
    });
    vIntegerPromptsXMin = window.LiftEd.Utils.fConvertDate(vIntegerPromptsXMin, 'To JS Date Format');
    vIntegerPromptsXMin = new Date(vIntegerPromptsXMin).setHours(12, 0, 0, 0);

    vIntegerPromptsXMax = gD3.max(vArrayCumulativePromptData, function (aDictData) {
      return Math.max(aDictData.date)
    });
    vIntegerPromptsXMax = window.LiftEd.Utils.fConvertDate(vIntegerPromptsXMax, 'To JS Date Format');
    vIntegerPromptsXMax = new Date(vIntegerPromptsXMax).setHours(12, 0, 0, 0);

    vIntegerPromptsYMin = gD3.min(vArrayCumulativePromptData, function(aDictData){ return Math.min(aDictData.value)});
    vIntegerPromptsYMax = gD3.max(vArrayCumulativePromptData, function(aDictData){ return Math.max(aDictData.value)});


    // window.LiftEd.Vars.promptsXMin = vIntegerPromptsXMin;
    // window.LiftEd.Vars.promptsXMax = vIntegerPromptsXMax;
    window.LiftEd.Vars.promptsYMin = 0;
    window.LiftEd.Vars.promptsYMax = vIntegerPromptsYMax;

  }
}



// noinspection JSUnusedLocalSymbols
/**
 * @memberof Graphing
 * @function fSetGraphScales
 * @description A function to set the graph's x and y scales.
 * @param {object} aDictGraphData - A dictionary of graph data.
 * @param {object} aArrayPromptsData - A dictionary of graph prompts data.
*/
window.LiftEd.Graphing.fSetGraphScales = (aDictGraphData, aArrayPromptsData) => {
  try {
    let vIntegerNewXMin;
    let vIntegerNewYMin;
    let vIntegerNewYMax;
    let vZeroedDateStart;
    let vZeroedDateEnd;
    let vDictCumulativeData = {};
    let vArrayCumulativeMaxMinData = [];
    // noinspection JSUnusedLocalSymbols
    let vDictCumulativePromptData = {};
    // noinspection JSUnusedLocalSymbols
    let vArrayCumulativePromptData = [];


    // noinspection Annotator
    aDictGraphData.forEach ( (aDictDataSet) => {
      if (window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === 0 || window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === '0') {
        aDictDataSet.coordinates.forEach( (aDictDataPoint) =>{
          if (aDictDataPoint.value === null) {
            vDictCumulativeData[aDictDataPoint.date] = {max: 0, value: aDictDataPoint.value};
          } else {
            if (vDictCumulativeData[aDictDataPoint.date]) {
              if (vDictCumulativeData[aDictDataPoint.date].value > aDictDataPoint.value) {
                vDictCumulativeData[aDictDataPoint.date].value = aDictDataPoint.value;
                vDictCumulativeData[aDictDataPoint.date].max += aDictDataPoint.max;
              } else {
                vDictCumulativeData[aDictDataPoint.date].max += aDictDataPoint.max;
              }
            } else {
              vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value, max:  aDictDataPoint.max};
            }
          }
        });
      } else {
        aDictDataSet.coordinates.forEach( (aDictDataPoint) =>{
          if (aDictDataPoint.value === null) {
            vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value};
          } else {
            if (vDictCumulativeData[aDictDataPoint.date]) {
                vDictCumulativeData[aDictDataPoint.date].value += aDictDataPoint.value;
            } else {
              vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value};
            }
          }
        });
      }
    });

    for (let key in vDictCumulativeData) {
      if (window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === 0 || window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === '0') {
        if (vDictCumulativeData.hasOwnProperty(key)) {
          vArrayCumulativeMaxMinData.push({date: key, value: vDictCumulativeData[key].value, max: vDictCumulativeData[key].max});
        }
      }
      else {
        if (vDictCumulativeData.hasOwnProperty(key)) {
          vArrayCumulativeMaxMinData.push({date: key, value: vDictCumulativeData[key].value});
        }
      }
    }
    if (aArrayPromptsData) {
      aArrayPromptsData.forEach( (aDictPromptsDataSet) => {
        aDictPromptsDataSet.coordinates.forEach( (aDictDataPoint) => {
            if (vDictCumulativePromptData[aDictDataPoint.date]) {
              vDictCumulativePromptData[aDictDataPoint.date].value = vDictCumulativePromptData[aDictDataPoint.date].value;
            } else {
              vDictCumulativePromptData[aDictDataPoint.date] = {value: 0};
            }
            for (let key in aDictDataPoint.prompts) {
              if (aDictDataPoint.prompts.hasOwnProperty(key)) {
                if (aDictDataPoint[key] === null) {
                  vDictCumulativePromptData[aDictDataPoint.date].value += 0;
                } else {
                  vDictCumulativePromptData[aDictDataPoint.date].value += aDictDataPoint.prompts[key];
                }
              }
            }
        })
      });

      for (let key in vDictCumulativePromptData) {
        if (vDictCumulativePromptData.hasOwnProperty(key)) {
          vArrayCumulativePromptData.push({date: key, value: vDictCumulativePromptData[key].value})
        }
      }

      vIntegerPromptsXMin = gD3.min(vArrayCumulativePromptData, function (aDictData) {
        return Math.min(aDictData.date)
      });
      vIntegerPromptsXMin = window.LiftEd.Utils.fConvertDate(vIntegerPromptsXMin, 'To JS Date Format');
      vIntegerPromptsXMin = new Date(vIntegerPromptsXMin).setHours(12, 0, 0, 0);

      vIntegerPromptsXMax = gD3.max(vArrayCumulativePromptData, function (aDictData) {
        return Math.max(aDictData.date)
      });
      vIntegerPromptsXMax = window.LiftEd.Utils.fConvertDate(vIntegerPromptsXMax, 'To JS Date Format');
      vIntegerPromptsXMax = new Date(vIntegerPromptsXMax).setHours(12, 0, 0, 0);

      vIntegerPromptsYMin = gD3.min(vArrayCumulativePromptData, function(aDictData){ return Math.min(aDictData.value)});
      vIntegerPromptsYMax = gD3.max(vArrayCumulativePromptData, function(aDictData){ return Math.max(aDictData.value)});


      // window.LiftEd.Vars.promptsXMin = vIntegerPromptsXMin;
      // window.LiftEd.Vars.promptsXMax = vIntegerPromptsXMax;
      window.LiftEd.Vars.promptsYMin = 0;
      window.LiftEd.Vars.promptsYMax = vIntegerPromptsYMax;

    }


    window.LiftEd.Vars.xMin = parseInt(window.LiftEd.Utils.fGetVar('#5709181816', 'dateStart'));
    vZeroedDateStart = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709181817', 'dateStart')));
    vZeroedDateStart.setHours(12, 0, 0, 0);
    vZeroedDateEnd = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709181818', 'dateEnd')));
    vZeroedDateEnd.setHours(12, 0, 0, 0);

    // noinspection CommaExpressionJS
    window.LiftEd.Vars.xMin = vZeroedDateStart.getTime(),
    window.LiftEd.Vars.xMax = vZeroedDateEnd.getTime(),
    window.LiftEd.Vars.yMin = 'null',
    window.LiftEd.Vars.yMax = 'null';


    vIntegerNewXMin = gD3.min(vArrayCumulativeMaxMinData, function (aDictData) {
      return Math.min(aDictData.date)
    });
    vIntegerNewYMin = 0;
    vIntegerNewYMax = null;


    if (window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === 0 || window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === '0') {
      vIntegerNewYMax = gD3.max(vArrayCumulativeMaxMinData, function(aDictData){ return Math.max(aDictData.max)});

      window.LiftEd.Utils.fGetVar('#5709181819', 'yMin') === 'null' || parseInt(window.LiftEd.Utils.fGetVar('#5709181819', 'yMin')) > vIntegerNewYMin ? window.LiftEd.Vars.yMin = vIntegerNewYMin : null;

      window.LiftEd.Utils.fGetVar('#5709181820', 'yMax') === 'null' || parseInt(window.LiftEd.Utils.fGetVar('#5709181820', 'yMax')) < vIntegerNewYMax ? window.LiftEd.Vars.yMax = vIntegerNewYMax : null;

      parseInt(window.LiftEd.Utils.fGetVar('#5709181821', 'xMin')) > vIntegerNewXMin ? window.LiftEd.Vars.xMin = vIntegerNewXMin : null;
    }
    else if (window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === 1 || window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === '1') {
      window.LiftEd.Utils.fGetVar('#5709181819', 'yMin') === 'null' || parseInt(window.LiftEd.Utils.fGetVar('#5709181819', 'yMin')) > vIntegerNewYMin ? window.LiftEd.Vars.yMin = vIntegerNewYMin : null;
      parseInt(window.LiftEd.Utils.fGetVar('#5709181821', 'xMin')) > vIntegerNewXMin ? window.LiftEd.Vars.xMin = vIntegerNewXMin : null;

      window.LiftEd.Vars.yMax = 1
    }
    else if (window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === 2 || window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === '2') {
      vIntegerNewYMax = gD3.max(vArrayCumulativeMaxMinData, function(aDictData){ return Math.max(aDictData.value)});
      window.LiftEd.Utils.fGetVar('#5709181819', 'yMin') === 'null' || parseInt(window.LiftEd.Utils.fGetVar('#5709181819', 'yMin')) > vIntegerNewYMin ? window.LiftEd.Vars.yMin = vIntegerNewYMin : null;
      window.LiftEd.Utils.fGetVar('#5709181820', 'yMax') === 'null' ||
      parseInt(window.LiftEd.Utils.fGetVar('#5709181820', 'yMax')) < vIntegerNewYMax ? window.LiftEd.Vars.yMax = vIntegerNewYMax : null;
      parseInt(window.LiftEd.Utils.fGetVar('#5709181821', 'xMin')) > vIntegerNewXMin ? window.LiftEd.Vars.xMin = vIntegerNewXMin : null;
    }
    else if (window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === 3 || window.LiftEd.Utils.fGetVar('#5709181807', 'typeDisplay') === '3') {
      vIntegerNewYMin = gD3.min(vArrayCumulativeMaxMinData, function(aDictData){ return Math.min(aDictData.value * 60)});
      vIntegerNewYMax = gD3.max(vArrayCumulativeMaxMinData, function(aDictData){ return Math.max(aDictData.value * 60)});
      (window.LiftEd.Utils.fGetVar('#5709181819', 'yMin') === 'null' || parseInt(window.LiftEd.Utils.fGetVar('#5709181819', 'yMin')) * 60 > vIntegerNewYMin)? window.LiftEd.Vars.yMin = vIntegerNewYMin : null;
      window.LiftEd.Utils.fGetVar('#5709181820', 'yMax') === 'null' || parseInt(window.LiftEd.Utils.fGetVar('#5709181820', 'yMax')) * 60 < vIntegerNewYMax + 1 ? window.LiftEd.Vars.yMax = vIntegerNewYMax + 1: null;
      parseInt(window.LiftEd.Utils.fGetVar('#5709181821', 'xMin')) > vIntegerNewXMin ? window.LiftEd.Vars.xMin = vIntegerNewXMin : null;
    }
    if (window.LiftEd.Vars.yMax === 0 || window.LiftEd.Vars.yMax === null || isNaN(window.LiftEd.Vars.yMax)) {
      window.LiftEd.Vars.yMax = 1;
    }
    if ( window.LiftEd.Vars.yMin === null || !window.LiftEd.Vars.yMin) {
      window.LiftEd.Vars.yMin = 0;
    }

    window.LiftEd.Vars.yMin = 0;

    window.LiftEd.Vars.promptsXMin = window.LiftEd.Vars.xMin;
    window.LiftEd.Vars.promptsXMax = window.LiftEd.Vars.xMax;
  } catch (e) {
    throw 'ERROR #5711161228: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fAddAxes
 * @description A function to append x and y axes onto the graph
 * @param {function} aD3fXScale - A function to scale the x domain
 * @param {function} aD3fYScale - A function to scale the y domain
 * @param {array} aIntegerTickFrequency - An integer to designate the tick frequency on the x axis
 * @param {array} aStrLabelY - A string to label the y axis
 * @param {array} aArrayXDomain - An optional array to set the domain of the x axis with pre-designated ticks.
*/
window.LiftEd.Graphing.fAddAxes = (aD3fXScale, aD3fYScale, aIntegerTickFrequency, aStrLabelY, aArrayXDomain) => {
  try {
    let vD3fXScale = null;
    let vD3fYScale = null;
    let vStrLabelY = null;
    let vFormatTime = gD3.timeFormat("%M:%S");
    let vFormatMinutesAndSeconds = function(d) { return vFormatTime(new Date(2012, 0, 1, 0, 0, d)); };

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221443: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221444: aD3fYScale missing';
    }

    if (aStrLabelY) {
      vStrLabelY = aStrLabelY;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221444: vStrLabelY missing';
    }

    let vIntegerTickFrequency = aIntegerTickFrequency;

    if (gD3.selectAll('#idLEXAxis')) {
      gD3.selectAll('#idLEXAxis').remove();
      gD3.selectAll('#idLEYAxis').remove();
    }


    if (window.LiftEd.Utils.fGetVar('#5710131650', 'numberHandler') === 2 && !window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').includes(99)) {
      window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
         .attr('class', 'cLEXAxis')
         .attr("id","idLEXAxis")
         .attr("transform", "translate(15," + window.LiftEd.Utils.fGetVar('#5709181907', 'gIntegerHeight') + ")")
         .call(gD3.axisBottom(vD3fXScale)
         .ticks(vIntegerTickFrequency)
         .tickValues(aArrayXDomain)
         .tickFormat(gD3.timeFormat("%b" + " %_d"))
         .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181907', 'gIntegerHeight')))
         .selectAll('text')
         .attr("y", 0)
         .attr("x", -45)
         .attr("dy", ".35em")
         .attr("transform", "rotate(-90)")
         .style("text-anchor", "start");
    } else {
      window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
         .attr('class', 'cLEXAxis')
         .attr("id","idLEXAxis")
         .attr("transform", "translate(15," + window.LiftEd.Utils.fGetVar('#5709181907', 'gIntegerHeight') + ")")
         .call(gD3.axisBottom(vD3fXScale)
         .ticks(vIntegerTickFrequency)
         .tickFormat(gD3.timeFormat("%b" + " %_d"))
         .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181907', 'gIntegerHeight')))
         .selectAll('text')
         .attr("y", 0)
         .attr("x", -50)
         .attr("dy", ".35em")
         .attr("transform", "rotate(-90)")
         .style("text-anchor", "start");
    }


    if (window.LiftEd.Utils.fGetVar('#5709191400', 'typeDisplay') === 1 || window.LiftEd.Utils.fGetVar('#5709191400', 'typeDisplay') === '1') {
     //Percentage
     if (window.LiftEd.Utils.fGetVar('#5710131650', 'hiddenDays') === 1) {
       window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
        .attr('class', 'cLEYAxis')
        .attr("transform", "translate(" + '15' + ",0)")
        .attr("id","idLEYAxis")
        .call(gD3.axisLeft(vD3fYScale)
        .tickPadding(10)
        .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181944', 'gIntegerWidth'))
        .tickFormat(gD3.format(".0%")));
     } else {
       window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
        .attr('class', 'cLEYAxis')
        .attr("transform", "translate(" + '15' + ",0)")
        .attr("id","idLEYAxis")
        .call(gD3.axisLeft(vD3fYScale)
        .ticks(vIntegerTickFrequency)
        .tickPadding(10)
        .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181944', 'gIntegerWidth'))
        .tickFormat(gD3.format(".0%")));
     }
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191400', 'typeDisplay') === 3 || window.LiftEd.Utils.fGetVar('#5709191400', 'typeDisplay') === '3') {
     //duration
     if (window.LiftEd.Utils.fGetVar('#5710131650', 'hiddenDays') === 1) {
       window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
        .attr("transform", "translate(" + '15' + ",0)")
        .attr("id","idLEYAxis")
        .attr('class', 'idLEYAxis')
        .call(gD3.axisLeft(vD3fYScale)
        .tickPadding(10)
        .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181945', 'gIntegerWidth'))
        .tickFormat(vFormatMinutesAndSeconds));
     } else {
       window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
        .attr("id","idLEYAxis")
        .attr('class', 'cLEYAxis')
        .attr("transform", "translate(" + '15' + ",0)")
        .call(gD3.axisLeft(vD3fYScale)
        .ticks(vIntegerTickFrequency)
        .tickPadding(10)
        .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181945', 'gIntegerWidth'))
        .tickFormat(vFormatMinutesAndSeconds));
     }
    } else {
     //numbers
     if (window.LiftEd.Utils.fGetVar('#5710131650', 'hiddenDays') === 1) {
       window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
        .attr("id","idLEYAxis")
        .attr("transform", "translate(" + '15' + ",0)")
        .attr('class', 'idLEYAxis')
        .call(gD3.axisLeft(vD3fYScale)
        .tickPadding(10)
        .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181946', 'gIntegerWidth')));
     } else {
       window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("g")
        .attr("id","idLEYAxis")
        .attr("transform", "translate(" + '15' + ",0)")
        .attr('class', 'idLEYAxis')
        .call(gD3.axisLeft(vD3fYScale)
        .ticks(vIntegerTickFrequency)
        .tickPadding(10)
        .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181946', 'gIntegerWidth')));
     }
    }
    window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGGraphContainer').append("text")
      .attr("id", 'axislabels')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - window.LiftEd.Utils.fGetVar('#5709181946', 'gObjectMargin').left)
      .attr("x",0 - (window.LiftEd.Utils.fGetVar('#5709181945', 'gIntegerHeight') / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(vStrLabelY);
  } catch (e) {
    throw 'ERROR #5711161229: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fAddPromptsAxes
 * @description A function to append x and y axes onto the graph
 * @param {function} aD3fXScale - A function to scale the x domain
 * @param {function} aD3fYScale - A function to scale the y domain
 * @param {array} aIntegerTickFrequency - An integer to designate the tick frequency on the x axis
 * @param {array} aStrLabelY - A string to label the y axis
 * @param {array} aArrayXDomain - An optional array to set the domain of the x axis with pre-designated ticks.
*/
window.LiftEd.Graphing.fAddPromptsAxes = (aD3fXScale, aD3fYScale, aIntegerTickFrequency, aStrLabelY) => {
  try {
    let vD3fXScale = null;
    let vD3fYScale = null;
    let vStrLabelY = null;
    let vFormatTime = gD3.timeFormat("%M:%S");
    let vFormatMinutesAndSeconds = function(d) { return vFormatTime(new Date(2012, 0, 1, 0, 0, d)); };

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221443: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221444: aD3fYScale missing';
    }

    if (aStrLabelY) {
      vStrLabelY = aStrLabelY;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221444: vStrLabelY missing';
    }

    let vIntegerTickFrequency = aIntegerTickFrequency;

    if (gD3.selectAll('#idLEPromptsXAxis')) {
      gD3.selectAll('#idLEPromptsXAxis').remove();
      gD3.selectAll('#idLEPromptsYAxis').remove();
    }

    window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGPromptGraphContainer').append("g")
       .attr('class', 'cLEXAxis')
       .attr("id","idLEPromptsXAxis")
       .attr("transform", "translate(15," + window.LiftEd.Utils.fGetVar('#5709181907', 'gIntegerPromptsHeight') + ")")
       .call(gD3.axisBottom(vD3fXScale)
       .ticks(vIntegerTickFrequency)
       .tickFormat(gD3.timeFormat("%b" + " %_d"))
       .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181907', 'gIntegerHeight')))
       .selectAll('text')
       .attr("y", 0)
       .attr("x", -50)
       .attr("dy", ".35em")
       .attr("transform", "rotate(-90)")
       .style("text-anchor", "start");

     window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGPromptGraphContainer').append("g")
      .attr("id","idLEPromptsYAxis")
      .attr("transform", "translate(" + '15' + ",0)")
      .attr('class', 'cLEYAxis')
      .call(gD3.axisLeft(vD3fYScale)
      .ticks(vIntegerTickFrequency)
      .tickPadding(10)
      .tickSizeInner(-window.LiftEd.Utils.fGetVar('#5709181946', 'gIntegerWidth')));

    window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGPromptGraphContainer').append("text")
      .attr("id", 'idLEPromptsAxisLabel')
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - window.LiftEd.Utils.fGetVar('#5709181946', 'gObjectMargin').left)
      .attr("x",0 - (window.LiftEd.Utils.fGetVar('#5709181945', 'gIntegerPromptsHeight') / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(vStrLabelY);
  } catch (e) {
    throw 'ERROR #5711161229: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fModifyPromptsData
 * @description A function to modify the prompts data to d3's format for the bar graph.
 * @param {array} aArrayGraphData - An array with the graph data. Contains a dictionary of prompts.
 * @param {array} aDictPrompts - A dictionary of uuids with prompts labelsas values.
*/
window.LiftEd.Graphing.fModifyPromptsData = (aArrayGraphData, aDictPrompts, aStringDateType) => {
  let vArrayGraphData = aArrayGraphData,
    vArrayD3PromptsData = [],
    vArrayD3CompletePromptsData = [],
    vDictD3PromptsDataPoint = null;
    vDictPrompts = aDictPrompts;

  //fill in days that are missing from main graph.
  aArrayGraphData.forEach( (aDictDataSet) => {
    if (aDictDataSet.coordinates) {
      aDictDataSet.coordinates.forEach( (aDictDataPoint) => {
        let vBooleanNoMatches = true;
        vDictD3PromptsDataPoint = {}
        if (aStringDateType === 'Unix') {
          vDictD3PromptsDataPoint.date = new Date(aDictDataPoint.date * 1000).setHours(0,0,0,0)
        } else {
          vDictD3PromptsDataPoint.date = new Date(aDictDataPoint.date ).setHours(0,0,0,0)
        }
        vDictD3PromptsDataPoint.total = 0;
        if (vArrayD3PromptsData.length > 0) {
          for (var i = 0; i < vArrayD3PromptsData.length; i++) {
            if (vArrayD3PromptsData[i].date === vDictD3PromptsDataPoint.date){
              for (let key in aDictDataPoint.prompts) {
                let vArrayPromptsDataPoint = vArrayD3PromptsData[i];
                if (vArrayPromptsDataPoint[vDictPrompts[key]]) {
                  vArrayPromptsDataPoint[vDictPrompts[key]] += aDictDataPoint.prompts[key]
                  vArrayPromptsDataPoint.total += aDictDataPoint.prompts[key];
                } else {
                  vArrayPromptsDataPoint[vDictPrompts[key]] = aDictDataPoint.prompts[key]
                  vArrayPromptsDataPoint.total += aDictDataPoint.prompts[key];
                }
              }
              vBooleanNoMatches = false;
            }
            if (i === vArrayD3PromptsData.length - 1 && vBooleanNoMatches === true) {
              for (let key in aDictDataPoint.prompts) {
                vDictD3PromptsDataPoint[vDictPrompts[key]] = aDictDataPoint.prompts[key]
                vDictD3PromptsDataPoint.total += aDictDataPoint.prompts[key];
              }
              vArrayD3PromptsData.push(vDictD3PromptsDataPoint)
              break
            }
          }
        } else {
          for (let key in aDictDataPoint.prompts) {
            vDictD3PromptsDataPoint[vDictPrompts[key]] = aDictDataPoint.prompts[key]
            vDictD3PromptsDataPoint.total += aDictDataPoint.prompts[key];
          }
          vArrayD3PromptsData.push(vDictD3PromptsDataPoint)
        }
      })
    } else {
      aDictDataSet.forEach( (aDictDataPoint) => {
        let vBooleanNoMatches = true;
        vDictD3PromptsDataPoint = {}
        if (aStringDateType === 'Unix') {
          vDictD3PromptsDataPoint.date = new Date(aDictDataPoint.date * 1000).setHours(0,0,0,0)
        } else {
          vDictD3PromptsDataPoint.date = new Date(aDictDataPoint.date).setHours(0,0,0,0)
        }
        vDictD3PromptsDataPoint.total = 0;
        if (vArrayD3PromptsData.length > 0) {
          for (var i = 0; i < vArrayD3PromptsData.length; i++) {
            if (vArrayD3PromptsData[i].date === vDictD3PromptsDataPoint.date){
              for (let key in aDictDataPoint.prompts) {
                let vArrayPromptsDataPoint = vArrayD3PromptsData[i];
                if (vArrayPromptsDataPoint[vDictPrompts[key]]) {
                  vArrayPromptsDataPoint[vDictPrompts[key]] += aDictDataPoint.prompts[key]
                  vArrayPromptsDataPoint.total += aDictDataPoint.prompts[key];
                } else {
                  vArrayPromptsDataPoint[vDictPrompts[key]] = aDictDataPoint.prompts[key]
                  vArrayPromptsDataPoint.total += aDictDataPoint.prompts[key];
                }
              }
              vBooleanNoMatches = false;
            }
            if (i === vArrayD3PromptsData.length - 1 && vBooleanNoMatches === true) {
              for (let key in aDictDataPoint.prompts) {
                vDictD3PromptsDataPoint[vDictPrompts[key]] = aDictDataPoint.prompts[key]
                vDictD3PromptsDataPoint.total += aDictDataPoint.prompts[key];
              }
              vArrayD3PromptsData.push(vDictD3PromptsDataPoint)
              break
            }
          }
        } else {
          for (let key in aDictDataPoint.prompts) {
            vDictD3PromptsDataPoint[vDictPrompts[key]] = aDictDataPoint.prompts[key]
            vDictD3PromptsDataPoint.total += aDictDataPoint.prompts[key];
          }
          vArrayD3PromptsData.push(vDictD3PromptsDataPoint)
        }
      })
    }
  });

  vArrayD3PromptsData.sort(function(a, b){
    return a.date - b.date
  });

  if (window.LiftEd.Utils.fGetVar('#5710061514', 'numberHandler') != 2) {
    let vStartDate = new Date(window.LiftEd.Utils.fGetVar('#5710041735', 'dateStart')).setHours(0,0,0,0);
    let vEndDate = new Date(window.LiftEd.Utils.fGetVar('#5710041735', 'dateEnd')).setHours(0,0,0,0);
    let vIntCounter = 0;
    while (vStartDate <= vEndDate) {
      if (vArrayD3PromptsData[vIntCounter]) {
        if (vArrayD3PromptsData[vIntCounter].date != vStartDate && vStartDate === vEndDate) {
          vArrayD3CompletePromptsData.push({'date': vStartDate});
          let vPlaceHolderStartDate = new Date(vStartDate);
          vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
          vStartDate = vPlaceHolderStartDate.getTime();
        }
        else if (vArrayD3PromptsData[vIntCounter].date === vStartDate && vStartDate === vEndDate) {
          vArrayD3CompletePromptsData.push(vArrayD3PromptsData[vIntCounter]);
          let vPlaceHolderStartDate = new Date(vStartDate);
          vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
          vStartDate = vPlaceHolderStartDate.getTime();
        } else {
          if (vArrayD3PromptsData[vIntCounter].date != vStartDate) {
            vArrayD3CompletePromptsData.push({'date': vStartDate})
            let vPlaceHolderStartDate = new Date(vStartDate);
            vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
            vStartDate = vPlaceHolderStartDate.getTime();
          }
          else if (vArrayD3PromptsData[vIntCounter].date === vStartDate) {
            vArrayD3CompletePromptsData.push(vArrayD3PromptsData[vIntCounter])
            let vPlaceHolderStartDate = new Date(vStartDate);
            vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
            vStartDate = vPlaceHolderStartDate.getTime();
            vIntCounter = vIntCounter + 1;
          }
        }
      } else {
        vArrayD3CompletePromptsData.push({'date': vStartDate})
        let vPlaceHolderStartDate = new Date(vStartDate);
        vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
        vStartDate = vPlaceHolderStartDate.getTime();
        vIntCounter = vIntCounter + 1;
      }
    };
  } else {
    return vArrayD3PromptsData;
  }

  return vArrayD3CompletePromptsData;
};

/**
 * @memberof Graphing
 * @function fAddPromptsbars
 * @description A function to append the prompts graph's bars to the graph svg.
 * @param {array} aArrayPromptsData - An array with the modified prompts data for d3.
 * @param {object} aDictPromptsKeys - An object with the keys for the d3 graph bar the contains the legend keys.
 * @param {function} aD3fXScale - A function to scale the x domain
 * @param {function} aD3fYScale - A function to scale the y domain
 * @param {function} aD3fZScale - A function to to link the prompts with their respective colors.
*/
window.LiftEd.Graphing.fAddPromptsBars = (aArrayPromptsData, aDictPromptsKeys, aD3fXScale, aD3fYScale, aD3fZScale) => {
  let vArrayKeys= [];

  for (let key in aDictPromptsKeys) {
    vArrayKeys.push(aDictPromptsKeys[key])
  }

  window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGPromptGraphContainer').append("g")
    .selectAll("g")
    .data(d3.stack().keys(vArrayKeys)(aArrayPromptsData))
    .enter().append("g")
    .attr("fill", function(d) { return aD3fZScale(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .on("click",function(d){
      window.LiftEd.Graphing.fGetDetailsFor(d.data.date, null, '#5801121512', 'prompts');
      let vHTMLPromptsBarModal = document.getElementById('idLEValuePointModal');
      let vIntRight = window.LiftEd.Vars.gIntegerWidth/2;
      vHTMLPromptsBarModal.style.right = (window.LiftEd.Vars.gIntegerWidth/5) + 'px';
      vHTMLPromptsBarModal.style.marginLeft = null;
    })
    .attr('id', 'idLEPromptsBars')
    .attr('class', 'cLEPromptsBar')
    .attr("x", function(d) { return aD3fXScale(d.data.date); })
    .attr("y", function(d) { return aD3fYScale(d[1]) })
    .attr("height", function(d) { return aD3fYScale(d[0]) - aD3fYScale(d[1]); })
    .attr("width", aD3fXScale.bandwidth());
};


/**
 * @memberof Graphing
 * @function fGetDetailsFor
 * @description A function to show the details for a specific data point.
 * @param {number} aIntValueDate - An integer of the value's date.
 * @param {string} aStrTargetUUID - A uuid of the target/behavior the value point belongs to.
*/
window.LiftEd.Graphing.fGetDetailsFor = (aIntValueDate, aStrTargetUUID, aStrErrorCode, aStrDetailsType) => {
  try {
    let vHTMLElStartDate = null,
        vHTMLElEndDate = null,
        vIntEndDate = null,
        vIntStartDate = null,
        vDictAPIArgs,
        vIntEndDatePlusOne = null,
        vIntStartDatePlusOne = null,
        vIntValueDate = aIntValueDate,
        vStrTargetUUID = aStrTargetUUID;

    if (document.querySelector('input[name="nLEStartDate"]')) {
      vHTMLElStartDate = document.querySelector('input[name="nLEStartDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221354: document.querySelector(("input[name="nLEStartDate"]") missing';
    }
    if (document.querySelector('input[name="nLEEndDate"]')) {
      vHTMLElEndDate = document.querySelector('input[name="nLEEndDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221355: document.querySelector("input[name="nLEStartDate"]") missing';
    }
    if (window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') !== '99' || window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') !== 99) {
        // noinspection CommaExpressionJS
      vIntEndDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202127', 'dateEnd'))),
      vIntStartDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202128', 'dateStart')));
    } else {
        // noinspection CommaExpressionJS
        vIntEndDate = new Date(vHTMLElEndDate.value),
        vIntStartDate = new Date(vHTMLElStartDate.value),
        vIntEndDate.setHours(23,59,59,0);
        vIntStartDate.setHours(23,59,59,0);
        vIntEndDatePlusOne = vIntEndDate.setDate(vIntEndDate.getDate() + 1);

      vIntStartDatePlusOne = vIntStartDate.setDate(vIntStartDate.getDate() + 1);
        window.LiftEd.Vars.dateEnd = vIntEndDatePlusOne;
        window.LiftEd.Vars.dateStart = vIntStartDatePlusOne;

    }
    vDictAPIArgs = {
      typeDate:  window.LiftEd.Utils.fGetVar('#5709202128', 'typeDate'),
      dateStart: window.LiftEd.Utils.fConvertDate(vIntStartDate, ''),
      dateEnd: window.LiftEd.Utils.fConvertDate(vIntEndDate, ''),
      uuid: window.LiftEd.Utils.fGetVar('#5709202133', 'uuid')
    };

    vDictAPIArgs.options = {
      typeChart: window.LiftEd.Utils.fGetVar('#5709202131', 'typeChart'),
      typeDisplay: window.LiftEd.Utils.fGetVar('#5709202132', 'typeDisplay'),
      numberHandler: window.LiftEd.Utils.fGetVar('#5710061516', 'numberHandler'),
      tabOnLoad: window.LiftEd.Utils.fGetVar('#5710061517', 'tabOnLoad')
    };

    vIntValueDate = new Date(vIntValueDate).setHours(12,0,0,0);
    vIntValueDate = window.LiftEd.Utils.fConvertDate(vIntValueDate, '');

    if (vStrTargetUUID) {
      vDictAPIArgs.prompts = {
        date: vIntValueDate,
        uuid: vStrTargetUUID
      }
    } else {
      vDictAPIArgs.prompts ={
        date: vIntValueDate
      }
    }
    if (window.LiftEd.API.fGetDebug()) {console.log(vDictAPIArgs);}
    window.LiftEd.API.fLogDebugVerbose("vDictAPIArgs = " + JSON.stringify(vDictAPIArgs));
    window.LiftEd.GraphingCallbacks.fShowDetailsFor(vDictAPIArgs);
  } catch (e) {
    throw 'ERROR' + aStrErrorCode + ': ' + e;
  }
}

/**
 * @memberof Graphing
 * @function fAddPromptsLegend
 * @description A function to show the details for a specific data point.
*/
window.LiftEd.Graphing.fAddPromptsLegend = (aArrayKeys, aD3fZScale) => {
  let vD3Legend = null;
  let vIntLineHeight = 300;
  let vIntIPlaceHolder = 0;
  let vArrayKeys = null,
      vD3fZScale = null;

  if (aArrayKeys) {
    vArrayKeys = aArrayKeys;
  } else {
    throw 'ERROR #5712121530: aArrayKeys';
  }

  if (aD3fZScale) {
    vD3fZScale = aD3fZScale;
  } else {
    throw 'ERROR #5712121530: aD3fZScale';
  }
  window.LiftEd.Vars.pIntPromptsSpacing = 0;
  aArrayKeys.reverse();
  vD3Legend = window.LiftEd.Utils.fGetVar('#5709181929', 'gSVGPromptGraphContainer').append('g')
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "end")
    .attr('id', 'idLEPromptsLegend')
    .selectAll("g")
    .data(aArrayKeys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) {
        window.LiftEd.Vars.pBooleanPromptsSpaced = false;
        if (i > 0 && i % 4 === 0) {
          vIntLineHeight = vIntLineHeight + 25;
          window.LiftEd.Vars.pIntPromptsSpacing = 0;
        }
        if (i === 11) {
          window.LiftEd.Utils.fGetVar('#5709181428', 'gHTMLElementPromptsSVG')
            .attr('viewBox','0 0 780 400');
        }
        if (i === 15) {
          window.LiftEd.Utils.fGetVar('#5709181428', 'gHTMLElementPromptsSVG')
            .attr('viewBox','0 0 780 425');
        }
        if (i === 19) {
          window.LiftEd.Utils.fGetVar('#5709181428', 'gHTMLElementPromptsSVG')
            .attr('viewBox','0 0 780 450');
        }
        if (i >= 4) {
          while (i >= 4) {
            i = i - 4;
          }
        }
        if (d.length >= 28 && window.LiftEd.Vars.pBooleanPromptsSpaced === false) {

          if (i === 0) {
            window.LiftEd.Vars.pIntPromptsSpacing = 0;
          } else {
            window.LiftEd.Vars.pIntPromptsSpacing = window.LiftEd.Vars.pIntPromptsSpacing + 200;
          }
          return "translate(" + (-550 + window.LiftEd.Vars.pIntPromptsSpacing) + "," + vIntLineHeight + ")";
        }
        else if (d.length >= 24 && window.LiftEd.Vars.pBooleanPromptsSpaced === false) {
          if (i === 0) {
            window.LiftEd.Vars.pIntPromptsSpacing = 0;
          } else {
            window.LiftEd.Vars.pIntPromptsSpacing = window.LiftEd.Vars.pIntPromptsSpacing + 175;
          }
          return "translate(" + (-550 + window.LiftEd.Vars.pIntPromptsSpacing) + "," + vIntLineHeight + ")";
        }
        else if (d.length >= 20 && window.LiftEd.Vars.pBooleanPromptsSpaced === false) {
          if (i === 0) {
            window.LiftEd.Vars.pIntPromptsSpacing = 0;
          } else {
            window.LiftEd.Vars.pIntPromptsSpacing = window.LiftEd.Vars.pIntPromptsSpacing + 150;
          }
          return "translate(" + (-550 + window.LiftEd.Vars.pIntPromptsSpacing) + "," + vIntLineHeight + ")";
        } else if (window.LiftEd.Vars.pBooleanPromptsSpaced === false) {
          if (i === 0) {
            window.LiftEd.Vars.pIntPromptsSpacing = 0;
          } else {
            window.LiftEd.Vars.pIntPromptsSpacing = window.LiftEd.Vars.pIntPromptsSpacing + 90;
          }
          return "translate(" + (-550 + window.LiftEd.Vars.pIntPromptsSpacing) + "," + vIntLineHeight + ")";
        }
      });

  vD3Legend.append("rect")
      .attr("x", window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth') - 20)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", aD3fZScale)

  vD3Legend.append("text")
      .attr("x", window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth') - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
}

/**
 * @memberof Graphing
 * @function fAddHiddenDaysPrompts
 * @description A function to show the details for a specific data point.
*/
window.LiftEd.Graphing.fHiddenDaysPrompts = (aArrayPromptsData, aDictPromptsKeys) => {
  //vArrayZeroedData = zeroed filled in data w/ tactics
  //aDictGraphArgs.data = original data

  if (d3.selectAll('#idLEPromptsAxisLabel')) {
    d3.selectAll('#idLEPromptsAxisLabel').remove();
  }

  if (d3.selectAll('#idLEPromptsBars')) {
    d3.selectAll('#idLEPromptsBars').remove();
  }

  window.LiftEd.Graphing.fSetHiddenPromptsGraphScales(aArrayPromptsData);
  let vArrayPromptsData = window.LiftEd.Graphing.fModifyPromptsData(aArrayPromptsData, aDictPromptsKeys, 'JS')

  let vArrayKeys= []
  for (let key in aDictPromptsKeys) {
    vArrayKeys.push(aDictPromptsKeys[key])
  }

  vPromptsD3fXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth')]).padding(.3)
  vPromptsD3BarfXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth') + 22]).padding(.3)
  vPromptsD3fYScale = gD3.scaleLinear().domain([0, d3.max(vArrayPromptsData, function(d) { return d.total; })]).rangeRound([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerPromptsHeight'), 0]);
  vPromptsD3fZScale = gD3.scaleOrdinal().domain(vArrayKeys).range([" #0000cc",  "#cc6666", "#0066cc", "#0099cc", "#00cccc", "#00ffcc", "#3300cc", "#3333cc", " #3366cc", "#3399cc", " #6600cc", "#6666cc", "#9900cc", " #990066", " #660066", "#006666", " #336633", "#663333", "#993333", "#9900ff", " #cc0066"]);
  window.LiftEd.Graphing.fAddPromptsAxes(vPromptsD3fXScale, vPromptsD3fYScale, null, window.LiftEd.Vars.label)
  window.LiftEd.Graphing.fAddPromptsBars(vArrayPromptsData, aDictPromptsKeys, vPromptsD3BarfXScale, vPromptsD3fYScale, vPromptsD3fZScale)
  window.LiftEd.Graphing.fAddPromptsLegend(vArrayKeys, vPromptsD3fZScale)

  if (document.querySelector('.cLEPromptsBartModalButton')) {
    vPromptsBarModalButton = document.querySelector('.cLEPromptsBartModalButton');
  } else {
    throw 'ERROR #5712071245: document.querySelector(".cLEPromptsBartModalButton") missing';
  }

  window.LiftEd.Graphing.fHTMLElPromptsBarModal(vPromptsBarModalButton, {
    content: '.cLEValuePointModal'
  });
};

/**
 * @memberof Graphing
 * @function fUpdateModalHTML
 * @description A function to show the details for a specific data point in the value point modal.
 * @param {string} aStringHTML A large HTML string to append onto the value point body container using a configuration method.
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
window.LiftEd.Graphing.fUpdateModalHTML = (aStringHTML) => {
  try {
    let vHTMLValuePointModalBodyContainer = null;
    let vStringHTML = null;

    if (document.getElementById('idLEValuePointBodyContainer')) {
      vHTMLValuePointModalBodyContainer = document.getElementById('idLEValuePointBodyContainer');
    } else {
      throw 'ERROR #5712101515: document.getElementById("idLEValuePointBodyContainer") missing';
    }

    if (aStringHTML) {
      vStringHTML = aStringHTML;
    } else {
      throw 'ERROR #5712101515: aStringHTML missing';
    }

    if (vHTMLValuePointModalBodyContainer.hasChildNodes()) {
      while (vHTMLValuePointModalBodyContainer.firstChild) {
        vHTMLValuePointModalBodyContainer.removeChild(vHTMLValuePointModalBodyContainer.childNodes[0])
      }
    }


    $('#idLEValuePointBodyContainer').append(vStringHTML)

  } catch (e) {
    throw 'ERROR #5712101321: ' + e;
  }
}

/**
 * @memberof Graphing
 * @function fAddYAxisButtons
 * @description A function to add the switch y axis buttons on to the graph or the options modal.
 * @param {string} aStringTypeDisplay - A string to designate the type display. Can be '0', '1', '2', or '3'.
*/
window.LiftEd.Graphing.fAddYAxisButtons = (aStringTypeDisplay) => {
  try {
    let vTypeDisplay = null;
    let vStringTypeDisplay = null;
    let vHTMLElAxisButtonHolder = null;
    let vHTMLElAxisButtonModalHolder = null;
    let vHTMLElDataTypeHeader = null;

    // noinspection Annotator
    if (aStringTypeDisplay !== 0 || aStringTypeDisplay !== null) {
      vStringTypeDisplay = aStringTypeDisplay;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221446: aStringTypeDisplay missing';
    }

    if (typeof vStringTypeDisplay !== "string") {
      vTypeDisplay = vStringTypeDisplay.toString();
    }
    else {
      vTypeDisplay = vStringTypeDisplay;
    }

    if (document.getElementById('idLEDataTypeHeader')) {
      vHTMLElDataTypeHeader = document.getElementById('idLEDataTypeHeader')
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710091600: document.getElementById("idLEDataTypeHeader") missing';
    }

    if (document.getElementById('idLEAxisButtonHolder')) {
      vHTMLElAxisButtonHolder = document.getElementById('idLEAxisButtonHolder')
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221446: document.getElementById("idLEAxisButtonHolder") missing';
    }

    if (document.getElementById('idLEAxisButtonModalHolder')) {
      vHTMLElAxisButtonModalHolder = document.getElementById('idLEAxisButtonModalHolder')
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221446: document.getElementById("idLEAxisButtonModalHolder") missing';
    }
  //add active class

  if (vHTMLElAxisButtonHolder.hasChildNodes()) {
    while (vHTMLElAxisButtonHolder.firstChild){
        vHTMLElAxisButtonHolder.removeChild(vHTMLElAxisButtonHolder.childNodes[0])
    }
  }

  if (vHTMLElAxisButtonModalHolder.hasChildNodes()) {
    while (vHTMLElAxisButtonModalHolder.firstChild){
        vHTMLElAxisButtonModalHolder.removeChild(vHTMLElAxisButtonModalHolder.childNodes[0])
    }
  }

  //if type === number/percentage
    if (vTypeDisplay === '0' || vTypeDisplay ===  '1') {
      let vHTMLElementPercentageAxisButton =  document.createElement("BUTTON");
      vHTMLElementPercentageAxisButton.setAttribute('class', 'cLEGraphAxisButton');
      vHTMLElementPercentageAxisButton.setAttribute('id', 'idLEYAxisPercentageButton');
      vHTMLElementPercentageAxisButton.innerHTML = '%';

      let vHTMLElementNumberAxisButton =  document.createElement("BUTTON");
      vHTMLElementNumberAxisButton.setAttribute('class', 'cLEGraphAxisButton');
      vHTMLElementNumberAxisButton.setAttribute('id', 'idLEYAxisNumbersButton');
      vHTMLElementNumberAxisButton.innerHTML = 'Number';
      vHTMLElAxisButtonModalHolder.appendChild(vHTMLElementNumberAxisButton);
      vHTMLElAxisButtonModalHolder.appendChild(vHTMLElementPercentageAxisButton);

      vHTMLElementPercentageAxisButton.addEventListener("click", () => {
        vHTMLElementPercentageAxisButton.style.backgroundColor = '#0081D3';
        vHTMLElementPercentageAxisButton.style.color = '#fff';
        vHTMLElementNumberAxisButton.style.backgroundColor = '#fff';
        vHTMLElementNumberAxisButton.style.color = 'black';
        window.LiftEd.Vars.typeDisplay = '1';
        window.LiftEd.Graphing.fGetDates()});
      vHTMLElementNumberAxisButton.addEventListener("click", () => {
        vHTMLElementNumberAxisButton.style.backgroundColor = '#0081D3 ';
        vHTMLElementNumberAxisButton.style.color =  '#fff';
        vHTMLElementPercentageAxisButton.style.backgroundColor = '#fff';
        vHTMLElementPercentageAxisButton.style.color = 'black';
        window.LiftEd.Vars.typeDisplay = '0';
        window.LiftEd.Graphing.fGetDates()});

      //set active colors for html2canvas
      if (vTypeDisplay === '0') {
        vHTMLElementNumberAxisButton.style.backgroundColor = '#0081D3 ';
        vHTMLElementNumberAxisButton.style.color = '#fff';
        vHTMLElementPercentageAxisButton.style.backgroundColor = '#fff';
        vHTMLElementPercentageAxisButton.style.color = 'black';
      } else {
        vHTMLElementPercentageAxisButton.style.backgroundColor = '#0081D3 ';
        vHTMLElementPercentageAxisButton.style.color = '#fff';
        vHTMLElementNumberAxisButton.style.backgroundColor = '#fff';
        vHTMLElementNumberAxisButton.style.color = 'black';
      }
    } else{
      vHTMLElDataTypeHeader.style.display = 'none';
      //if type === behavior
      let vHTMLElementFrequencyAxisButton =  document.createElement("BUTTON");
      vHTMLElementFrequencyAxisButton.setAttribute('id', 'idLEYAxisFrequencyButton');
      vHTMLElementFrequencyAxisButton.setAttribute('class', 'cLEGraphAxisButton');
      vHTMLElementFrequencyAxisButton.innerHTML = 'Frequency';
      vHTMLElAxisButtonHolder.appendChild(vHTMLElementFrequencyAxisButton);

      let vHTMLElementDurationAxisButton =  document.createElement("BUTTON");
      vHTMLElementDurationAxisButton.setAttribute('id', 'idLEYAxisDurationButton');
      vHTMLElementDurationAxisButton.setAttribute('class', 'cLEGraphAxisButton');
      vHTMLElementDurationAxisButton.innerHTML = 'Duration';
      vHTMLElAxisButtonHolder.appendChild(vHTMLElementDurationAxisButton);

      vHTMLElementFrequencyAxisButton.addEventListener("click", () => {
        vHTMLElementFrequencyAxisButton.style.backgroundColor = '#0081D3 ';
        vHTMLElementFrequencyAxisButton.style.color = '#fff';
        vHTMLElementDurationAxisButton.style.backgroundColor = '#fff';
        vHTMLElementDurationAxisButton.style.color = 'black';
        window.LiftEd.Vars.typeDisplay = '2';
        window.LiftEd.Graphing.fGetDates()});

      vHTMLElementDurationAxisButton.addEventListener("click", () => {
        vHTMLElementDurationAxisButton.style.backgroundColor  = '#0081D3 ';
        vHTMLElementDurationAxisButton.style.color = '#fff';
        vHTMLElementFrequencyAxisButton.style.backgroundColor = '#fff';
        vHTMLElementFrequencyAxisButton.style.color = 'black';
        window.LiftEd.Vars.typeDisplay = '3';
        window.LiftEd.Graphing.fGetDates()});

      //set active colors for html2canvas
      if (vTypeDisplay === '2') {
        vHTMLElementFrequencyAxisButton.style.backgroundColor = '#0081D3 ';
        vHTMLElementFrequencyAxisButton.style.color = '#fff';
        vHTMLElementDurationAxisButton.style.color = 'black';
        vHTMLElementDurationAxisButton.style.backgroundColor = '#fff';
      } else {
        vHTMLElementDurationAxisButton.style.backgroundColor = '#0081D3 ';
        vHTMLElementDurationAxisButton.style.color = '#fff';
        vHTMLElementFrequencyAxisButton.style.backgroundColor = '#fff';
        vHTMLElementFrequencyAxisButton.style.color = 'black';
      }
    }
  } catch (e) {
    throw 'ERROR #5711161230: ' + e;
  }
};




// noinspection JSCommentMatchesSignature
/**
 * @memberof Graphing
 * @function fCreateValueAnnotationsAndDotCoordinatesArray
 * @description A function to build the x/y coordinates for the graphlines' dots and data point annotations
 * @param {array} aArrayDataPoints - An array of data points to build the dots and value annotations from.
 * @param {string} aStringTypeDisplay - A string that designates which graph type it is. Can be '0', '1', '2', '3'
 * @param {string} aStringColor - A hex string that designates the color of the dot and value annotations.
 * @param {string} aStringAnnotationType - A string that designates whether it is a max data point or not. Can be 'max' or ''.
 * @returns {object} - A dictionary of coordinates for graph dots and dot annotations.
*/
window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray = (aArrayDataPoints, aStringTypeDisplay, aStringColor, aStringAnnotationType) => {
  try {
    let vArrayDataValueAnnotations = [];
    let vArrayDotValueData = [];
    let vArrayMaxDataValueAnnotations = [];
    let vArrayMaxDotData = [];
    let vDictDataValuationsAndDotData = {};
    let vD3TimeParse = window.LiftEd.Utils.fGetVar('#5709191552', 'gDateMonthDayParse');
    //max lines annotation

    let vStringTypeDisplay = null;
    let vStringColor = null;
    let vArrayDataPoints = null;
    if (aArrayDataPoints) {
      vArrayDataPoints = aArrayDataPoints;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221718: vArrayDataPoints missing';
    }

    if (aStringTypeDisplay !== null) {
      vStringTypeDisplay = aStringTypeDisplay;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221718: aStringTypeDisplay missing';
    }

    if (aStringColor) {
      vStringColor = aStringColor;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221718: aStringColor missing';
    }
    if (aStringAnnotationType === 'max') {
      vArrayDataPoints.forEach( (aDictAverageMaxPoint) => {
        let vIntDy = 0;
        let vIntDx = 0;

        let vIntXMid = (parseInt(window.LiftEd.Utils.fGetVar('#5709191550', 'xMax') + 86400000) - parseInt(window.LiftEd.Utils.fGetVar('#5709191552', 'xMin'))) / 2;

        // noinspection EqualityComparisonWithCoercionJS
        if (aDictAverageMaxPoint.max != null) {
          vArrayMaxDotData.push(aDictAverageMaxPoint);


          //annotation y axis positioning.
          if (aDictAverageMaxPoint.max > (parseInt(window.LiftEd.Utils.fGetVar('#5709191550', 'yMax'))/2)) {
              vIntDy = 20;
          } else {
              vIntDy = -20;
          }
          //annotation x axis positioning.
          if (parseInt(aDictAverageMaxPoint.date) > (parseInt(window.LiftEd.Utils.fGetVar('#5709191550', 'xMax')) - vIntXMid)) {
              vIntDx = -20;
          } else {
              vIntDx = 20;
          }
          //build annotation.
          let vDictValueAnnotation = {}
          if ('uuid' in aDictAverageMaxPoint) {
            vDictValueAnnotation ={
                // note: {
                //   label: vD3TimeParse(aDictAverageMaxPoint.date) + '\xa0' + '\xa0'  +  ' ',
                //   title: aDictAverageMaxPoint.max.toString()
                // },
                data: {date: parseInt(aDictAverageMaxPoint.date),
                      value: aDictAverageMaxPoint.max,
                      uuid: aDictAverageMaxPoint.uuid
                    },
                dy: vIntDy,
                dx: vIntDx,
                color: vStringColor,
                subject: {
                    radius: 7
                }
            };
          } else {
            vDictValueAnnotation ={
                // note: {
                //   label: vD3TimeParse(aDictAverageMaxPoint.date) + '\xa0' + '\xa0'  +  ' ',
                //   title: aDictAverageMaxPoint.max.toString()
                // },
                data: {date: parseInt(aDictAverageMaxPoint.date), value: aDictAverageMaxPoint.max,uuid: ''},
                dy: vIntDy,
                dx: vIntDx,
                color: vStringColor,
                subject: {
                    radius: 7
                }
            };
          }

          vArrayMaxDataValueAnnotations.push(vDictValueAnnotation);
       }
      });
    } else {
      //regular graphline annotations
      vArrayDataPoints.forEach( (aDictDataPoint) => {
        let vIntDy = 0;
        let vIntDx = 0;

        //typedisplay logic


        let vIntXMid = (parseInt(window.LiftEd.Utils.fGetVar('#5709191550', 'xMax') + 86400000) - parseInt(window.LiftEd.Utils.fGetVar('#5709191552', 'xMin'))) / 2;

        let vStringTitle = '';
        let vIntegerValue = aDictDataPoint.value;
        if (aDictDataPoint.value !== null) {
          vArrayDotValueData.push(aDictDataPoint);
          //change title depending on graph type
          if (vStringTypeDisplay === '1' || vStringTypeDisplay === 1) {
            vStringTitle = (aDictDataPoint.value * 100).toString().slice(0, 4) + '%';
          }
          else if (vStringTypeDisplay === '3' || vStringTypeDisplay === 3) {
            vStringTitle = (aDictDataPoint.value * 60).toString().slice(0, 3) + 's';
            vIntegerValue = aDictDataPoint.value * 60;
          } else {
            vStringTitle = aDictDataPoint.value.toString();
          }

          if (vIntegerValue > (parseInt(window.LiftEd.Utils.fGetVar('#5709192001', 'yMax'))/2)) {
            vIntDy = 20;
          } else {
            vIntDy = -20;
          }
          if (parseInt(aDictDataPoint.date) > (parseInt(window.LiftEd.Utils.fGetVar('#5709191550', 'xMax')) - vIntXMid)) {
            vIntDx = -20;
          } else {
            vIntDx = 20;
          }
          let vDictValueAnnotation = {};
          if ('uuid' in aDictDataPoint) {
            vDictValueAnnotation ={
              note: {
                label: vD3TimeParse(aDictDataPoint.date) + '\xa0' + '\xa0'  +  ' ',
                title: vStringTitle
              },
              data: {date: parseInt(aDictDataPoint.date), value: vIntegerValue,
              uuid: aDictDataPoint.uuid},
              dy: vIntDy,
              dx: vIntDx,
              color: vStringColor,
              subject: {
                radius: 3
              }
            };
          } else {
            vDictValueAnnotation ={
              note: {
                label: vD3TimeParse(aDictDataPoint.date) + '\xa0' + '\xa0'  +  ' ',
                title: vStringTitle
              },
              prompts: {
                date: parseInt(aDictDataPoint.date),
                uuid: ''
              },
              data: {date: parseInt(aDictDataPoint.date), value: vIntegerValue, uuid: ''},
              dy: vIntDy,
              dx: vIntDx,
              color: vStringColor,
              subject: {
                radius: 3
              }
            };
          }
          vArrayDataValueAnnotations.push(vDictValueAnnotation);
        }
      });
    }
    //create dict with all data
    vDictDataValuationsAndDotData.maxDataValueAnnotation = vArrayMaxDataValueAnnotations;
    vDictDataValuationsAndDotData.maxDotData = vArrayMaxDotData;
    vDictDataValuationsAndDotData.dotValueData = vArrayDotValueData;
    vDictDataValuationsAndDotData.valueAnnotations = vArrayDataValueAnnotations;
    return vDictDataValuationsAndDotData;
  } catch (e) {
    throw 'ERROR #5711161231: ' + e
  }
};


/**
 * @memberof Graphing
 * @function fCreateAnnotationBadges
 * @description A function to create and return a single instance of a tactic, note, or custom annotation badge.
 * @param {string} aStrNote - A string to use as the note in the annotation badge.
 * @param {date} aDate - A date to align an annotation badge to a date on the graph.
 * @param {number} aIntYMax - An integer to set the y heigh of the annotation badge.
 * @param {string} aStrBadgeType - The type the annotation badge will be. Can be 'tactic', 'note', or 'annotation'.
 * @param {number} aIntCounter - An integer indicating the number which tactic/note/annotation it relates to in the table below the graph.
 * @param {string} aStrAuthor - A string indicating the author of the annotation badge.
 * @param {object} aDictNote - An object with the note object for annotations badges.
 * @returns {object} vDictBadge - Returns an annotation badge to display on the graph.
*/

window.LiftEd.Graphing.fCreateAnnotationBadges = (aStrNote, aDate, aIntYMax, aStrBadgeType, aIntCounter, aStrAuthor, aDictNote) => {
  try {
    let vStrNote = aStrNote,
        vDate = null,
        vIntYMax = aIntYMax,
        vStrBadgeType = null,
        vIntCounter = aIntCounter,
        vStrAuthor = aStrAuthor,
        vDictNote = aDictNote,
        vDictBadge = null,
        vStrAnnotationLetter = null,
        vD3TimeParse = window.LiftEd.Utils.fGetVar('#5709202054', 'gDateMonthDayParse');

    if (aDate) {
      vDate = aDate;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141351: aDate missing';
    }
    if (aStrBadgeType) {
      vStrBadgeType = aStrBadgeType;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141352: aStrBadgeType missing';
    }
    if (vStrBadgeType === 'tactic') {
      vStrAnnotationLetter = 'T';
    } else {
      vStrAnnotationLetter = 'N';
    }
    if (vStrBadgeType === 'tactic' || vStrBadgeType === 'note') {
        vDictBadge = {
          note: {
            label: vStrNote,
            title: vD3TimeParse(vDate) + ' ' +  vStrAuthor
          },
          data: { date: new Date(vDate).setHours(0, 0, 0, 0), value: vIntYMax },
          dy: 10,
          dx: 60,
          subject: {
            text: vStrAnnotationLetter + vIntCounter,
            radius: 14
          }
        };
    } else {
      vDictBadge = {
        note: vDictNote,
        data: { date: vDate, value: vIntYMax},
        dy: 10,
        dx: 60,
        subject: {
          text: "A" + vIntCounter,
          radius: 14
        }
      };
    }
    return vDictBadge
  } catch (e) {
    throw 'ERROR #5711161232: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fAddTacticsAndNotesAnnotations
 * @description A function to add or remove notes and tactics annotations.
 * @param {array} aArrayTacticsData - An array of tactics data
 * @param {array} aArrayNotesData - An array of notes data
 * @param {function} aD3fXScale - A function to scale the x axis of the graph data.
 * @param {function} aD3fYScale - A function to scale the y axis of the graph data.
 * @param {number} aIntYMax - An integer that has the max y value.
 * @param {string} aStringType - A string to to show what type of annotations to turn on or off. Can be 'tactics', or 'notes'.
*/
window.LiftEd.Graphing.fAddTacticsAndNotesAnnotations = (aArrayTacticsData, aArrayNotesData, aD3fXScale, aD3fYScale, aIntYMax, aStringType) => {
  try {
    let vNotesAnnotations = [];
    let vTacticsAnnotations = [];
    let vArrayTacticDatesMemo = [];
    let vArrayNoteDatesMemo = [];
    let timeFormat = gD3.timeFormat("%d-%b-%y");
    let vDictDatesMemo = {};
    let vDictCounter = {};
    let vDictModifiedYCoordinates = {};

    let vIntStaticRatio = aIntYMax/9;
    let vNewYMax = null;

    let vReplacementYCounter = null;
    let vD3TimeParse = window.LiftEd.Utils.fGetVar('#5709202054', 'gDateMonthDayParse');
    let vArrayTacticsData = null;
    let vArrayNotesData = null;
    let vD3fXScale = null;
    let vD3fYScale = null;
    let vIntYMax = aIntYMax;
    let vIntZeroedDate = null;

    if (aArrayTacticsData) {
      vArrayTacticsData = aArrayTacticsData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221735: aArrayTacticsData missing';
    }

    if (aArrayNotesData) {
      vArrayNotesData = aArrayNotesData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221735: aArrayNotesData missing';
    }

    if (aArrayTacticsData && aArrayNotesData) {
      // noinspection Annotator
      vDictCounter = {tactic: aArrayTacticsData.length + 1, note: aArrayNotesData.length + 1}
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221735: aArrayTacticsData or aArrayNotesData missing';
    }

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221739: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221740: aD3fYScale missing';
    }
    if (aStringType === 'tactics') {
      //create tactics annotations svg layer
      let vTacticsAnnotationLayer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
        .attr("transform", "translate(" + '15' + ",0)")
        .attr("class", "cLETacticAnnotationGroup");


      vArrayTacticsData.forEach( (aDictTactic) => {
        vIntZeroedDate = new Date(aDictTactic.date).setHours(12, 0, 0, 0);
        //append phase change lines if that for unique dates.
        if (!vArrayTacticDatesMemo.includes(vIntZeroedDate)) {
          if (aDictTactic.hiddenOnGraph !== 1) {
            let vTacticLineContainer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
              .attr("transform", "translate(" + '15' + ",0)")
              .attr('class', 'cLETacticLineContainer')
              .attr('id', 'date' + aDictTactic.date);
              vTacticLineContainer.append('line')
              .attr('class', 'cLETacticLines')
              .attr('x1', vD3fXScale(new Date(aDictTactic.date).setHours(0, 0, 0, 0)))
              .attr('y1', 0)
              .attr('dx', -9)
              .attr('x2', vD3fXScale(new Date(aDictTactic.date).setHours(0, 0, 0, 0)))
              .attr('y2',  window.LiftEd.Utils.fGetVar('#5709202055', 'gIntegerHeight'));

            vArrayTacticDatesMemo.push(vIntZeroedDate)
          }
        }
        //logic for spacing out annotation badges vertically correctly
        if (vDictDatesMemo[vIntZeroedDate]) {
          vNewYMax = vNewYMax - vIntStaticRatio;
          //adds count to date memo and subtracts from tactic counter
          vDictCounter.tactic -= 1;

          if (aDictTactic.hiddenOnGraph !== 1) {
            vDictDatesMemo[vIntZeroedDate] += 1;
            //build annotation
            //move building tactic/note annotation into function that creates the structure. 5-6 hours
            // noinspection JSUnusedLocalSymbols
            let vDictTactic = {
              note: {
                label: aDictTactic.note,
                title: vD3TimeParse(aDictTactic.date) + ' ' +  aDictTactic.author
              },
              data: { date: new Date(aDictTactic.date).setHours(0, 0, 0, 0), value: vNewYMax },
              dy: 10,
              dx: 60,
              subject: {
                text: "T" + vDictCounter.tactic,
                radius: 14,
                x: 'right',
                y: 'bottom'
              }
            };
            // noinspection JSCheckFunctionSignatures
            vTacticsAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aDictTactic.note, aDictTactic.date, vNewYMax, 'tactic', vDictCounter.tactic, aDictTactic.author))
            // vTacticsAnnotations.push(vDictTactic);
          }
          } else {
              //resets to original y axis coordinates.
              //sets current date in memo to 1.
              vDictCounter.tactic -= 1;
              if (vDictCounter.hiddenOnGraph !== 1) {
                vDictDatesMemo[vIntZeroedDate] = 1;
                vNewYMax = vIntYMax;
                // noinspection JSUnusedLocalSymbols
                let vDictTactic ={
                  note: {
                    label: aDictTactic.note,
                    title: vD3TimeParse(aDictTactic.date) + ' ' +  aDictTactic.author
                  },
                  //can use x, y directly instead of data
                  data: { date: new Date(aDictTactic.date).setHours(0, 0, 0, 0), value: vNewYMax },
                  dy: 10,
                  dx: 60,
                  subject: {
                    text: "T" + vDictCounter.tactic,
                    radius: 14,
                    x: 'right',
                    y: 'bottom'
                  }
                };
                // noinspection JSCheckFunctionSignatures
                vTacticsAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aDictTactic.note, aDictTactic.date, vNewYMax, 'tactic', vDictCounter.tactic, aDictTactic.author))
                // vTacticsAnnotations.push(vDictTactic);
              }
          }
        });

        let vMakeTacticsAnnotations = gD3.annotation()
          .editMode(false)
            .type(gD3.annotationBadge)
          .accessors({
            x: vDictData => vD3fXScale(new Date(vDictData.date)),
            y: vDictData => {
              //adjusts height if value === 0
              if (vDictData.value === 0) {
                if (vReplacementYCounter === null) {
                  vReplacementYCounter = 0;
                  return vReplacementYCounter;
                }
                else if (vReplacementYCounter === 0) {
                  vReplacementYCounter = vReplacementYCounter + 30;
                  return vReplacementYCounter;
                } else {
                  vReplacementYCounter = vReplacementYCounter + 30;
                  return vReplacementYCounter
                }
              } else {
                return vD3fYScale(vDictData.value);
              }
            }
          })
          .// noinspection UnreachableCodeJS
      accessorsInverse({
             date: vDictData => timeFormat(x.invert(vDictData.x)),
             close: vDictData => y.invert(vDictData.y)
          })
          .on('subjectclick', function(annotation) {
            //changes annotation modal body and header
            let vAnnotationHeader = document.getElementById('idLEAnnotationModalHeader');
            let vAnnotationBody = document.getElementById('idLEAnnotationModalBody');

            vAnnotationHeader.innerHTML = annotation.note.title;
            vAnnotationBody.innerHTML = annotation.note.label
          })
          .annotations(vTacticsAnnotations);

        //appends tactics annotations to graph.
        vTacticsAnnotationLayer
        .attr("class", "cLETacticAnnotationGroup")
        .call(vMakeTacticsAnnotations)
    }
    else if (aStringType === 'notes') {
      let vNotesAnnotationLayer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
          .attr("transform", "translate(" + '15' + ",0)")
          .attr("class", "cLENoteAnnotationGroup");

      vArrayNotesData.forEach( (aNote) => {
        vIntZeroedDate = new Date(aNote.date).setHours(12, 0, 0, 0);

        if (!vArrayNoteDatesMemo.includes(aNote.date)) {
          // noinspection JSUnusedLocalSymbols
          let vTacticLineContainer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
            .attr("transform", "translate(" + '15' + ",0)")
            .attr('class', 'cLENoteLineContainer')
            .attr('id', 'date' + aNote.date);

          vArrayNoteDatesMemo.push(vIntZeroedDate)
        }
        //adjust y axis coordinates depending on how many previous annotations there for that date.
        if (vDictDatesMemo[vIntZeroedDate]) {
          vNewYMax = vNewYMax - vIntStaticRatio;
          vDictDatesMemo[vIntZeroedDate] += 1;
          vDictCounter.note -= 1;
          // noinspection JSUnusedLocalSymbols
          let vDictNote = {
            note: {
              label: aNote.note,
              title:  vD3TimeParse(aNote.date) + ' ' +  aNote.author
            },
            data: { date: new Date(aNote.date).setHours(0, 0, 0, 0), value: vNewYMax },
            dy: 10,
            dx: 60,
            subject: {
              text: "N" + vDictCounter.note,
              radius: 14,
              x: 'right',
              y: 'bottom'
            }
          };
          // noinspection JSCheckFunctionSignatures
          vNotesAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aNote.note, aNote.date, vNewYMax, 'note', vDictCounter.note, aNote.author));
          // vNotesAnnotations.push(vDictNote);
        } else {
          //resets y axis coordinates to original height.
          vDictDatesMemo[vIntZeroedDate] = 1 ;
          vDictCounter.note -= 1;
          vNewYMax = vIntYMax;
          // noinspection JSUnusedLocalSymbols
          let vDictNote ={
            note: {
              label: aNote.note,
              title:  vD3TimeParse(aNote.date) + ' ' +  aNote.author
            },
            data: { date: new Date(aNote.date).setHours(0, 0, 0, 0), value: vNewYMax },
            dy: 10,
            dx: 0,
            subject: {
              text: "N" + vDictCounter.note,
              radius: 14,
              x: 'right',
              y: 'bottom'
            }
          };
          // noinspection JSCheckFunctionSignatures
          vNotesAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aNote.note, aNote.date, vNewYMax, 'note', vDictCounter.note, aNote.author));
          // vNotesAnnotations.push(vDictNote);
        }
      });

      let vMakeNotesAnnotations = gD3.annotation()
        .editMode(false)
        .type(gD3.annotationBadge)
        .accessors({
          x: vDictData => vD3fXScale(new Date(vDictData.date)),
          y: vDictData => {
            if (vDictData.value === 0) {
              if (vReplacementYCounter === null) {
                vReplacementYCounter = 0;
                return vReplacementYCounter;
              }
              else if (vReplacementYCounter === 0) {
                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter;
              } else {
                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter
              }
            } else {
              return vD3fYScale(vDictData.value);
            }
          }
        })
        .// noinspection UnreachableCodeJS
      accessorsInverse({
           date: vDictData => timeFormat(x.invert(vDictData.x)),
           close: vDictData => y.invert(vDictData.y)
        })
        .on('subjectclick', function(annotation) {
          let vAnnotationHeader = document.getElementById('idLEAnnotationModalHeader');
          let vAnnotationBody = document.getElementById('idLEAnnotationModalBody');

          vAnnotationHeader.innerHTML = annotation.note.title;
          vAnnotationBody.innerHTML = annotation.note.label
        })
        .annotations(vNotesAnnotations);

      vNotesAnnotationLayer
      .attr("class", "cLENoteAnnotationGroup")
      .call(vMakeNotesAnnotations)
    } else {
      //adds both tactics and notes annotations to the graph.
      let vTacticsAnnotationLayer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
        .attr("transform", "translate(" + '15' + ",0)")
        .attr("class", "cLETacticAnnotationGroup");

      let vNotesAnnotationLayer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
        .attr("transform", "translate(" + '15' + ",0)")
        .attr("class", "cLENoteAnnotationGroup");
      vArrayTacticsData.forEach( (aDictTactic) => {
        vIntZeroedDate = new Date(aDictTactic.date).setHours(12, 0, 0, 0);


        //appand phase change lines.
        if (!vArrayTacticDatesMemo.includes(vIntZeroedDate)) {
          if (aDictTactic.hiddenOnGraph !== 1) {
            let vTacticLineContainer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
              .attr('class', 'cLETacticLineContainer')
              .attr('id', 'date' + aDictTactic.date);
              vTacticLineContainer.append('line')
              .attr('class', 'cLETacticLines')
              .attr("transform", "translate(" + '15' + ",0)")
              .attr('x1', vD3fXScale(new Date(aDictTactic.date).setHours(0, 0, 0, 0)))
              .attr('y1', 0)
              .attr('dx', -9)
              .attr('x2', vD3fXScale(new Date(aDictTactic.date).setHours(0, 0, 0, 0)))
              .attr('y2', window.LiftEd.Utils.fGetVar('#5709202055', 'gIntegerHeight'));

            vArrayTacticDatesMemo.push(vIntZeroedDate)
          }
        }
        //logic for spacing out annotation badges vertically correctly
        if (vDictDatesMemo[vIntZeroedDate]) {
          vNewYMax = vNewYMax - vIntStaticRatio;
            if (vDictModifiedYCoordinates[vIntZeroedDate] > vNewYMax) {
              vDictModifiedYCoordinates[vIntZeroedDate] = vNewYMax
            }
          //adds count to date memo and subtracts from tactic counter
          vDictCounter.tactic -= 1;

          if (aDictTactic.hiddenOnGraph !== 1) {
            vDictDatesMemo[vIntZeroedDate] += 1;
            //build annotation
            // noinspection JSUnusedLocalSymbols
            let vDictTactic = {
              note: {
                label: aDictTactic.note,
                title: vD3TimeParse(aDictTactic.date) + ' ' +  aDictTactic.author
              },
              data: { date: new Date(aDictTactic.date).setHours(0, 0, 0, 0), value: vNewYMax },
              dy: 10,
              dx: 60,
              subject: {
                text: "T" + vDictCounter.tactic,
                radius: 14,
                x: 'right',
                y: 'bottom'
              }
            };
            // noinspection JSCheckFunctionSignatures
            vTacticsAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aDictTactic.note, aDictTactic.date, vNewYMax, 'tactic', vDictCounter.tactic, aDictTactic.author))
            // vTacticsAnnotations.push(vDictTactic);
          }
        } else {
            //resets to original y axis coordinates.
            //sets current date in memo to 1.
            vDictCounter.tactic -= 1;

            if (aDictTactic.hiddenOnGraph !== 1) {
              vDictDatesMemo[vIntZeroedDate] = 1;
              vNewYMax = vIntYMax;
              vDictModifiedYCoordinates[aDictTactic.date] = vNewYMax;
                  //move building tactic/note annotation into function that creates the structure. 5-6 hours
              // noinspection JSUnusedLocalSymbols
              let vDictTactic ={
                note: {
                  label: aDictTactic.note,
                  title: vD3TimeParse(aDictTactic.date) + ' ' +  aDictTactic.author
                },
                //can use x, y directly instead of data
                data: { date: new Date(aDictTactic.date).setHours(0, 0, 0, 0), value: vNewYMax },
                dy: 10,
                dx: 60,
                subject: {
                  text: "T" + vDictCounter.tactic,
                  radius: 14,
                  x: 'right',
                  y: 'bottom'
                }
              };
              // noinspection JSCheckFunctionSignatures
              vTacticsAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aDictTactic.note, aDictTactic.date, vNewYMax, 'tactic', vDictCounter.tactic, aDictTactic.author))
              // vTacticsAnnotations.push(vDictTactic);
            }
        }
      });


      //creates notes annotations.
      vArrayNotesData.forEach( (aNote) => {
        vIntZeroedDate = new Date(aNote.date).setHours(12, 0, 0, 0);

        if (!vArrayNoteDatesMemo.includes(vIntZeroedDate)) {
          // noinspection JSUnusedLocalSymbols
          let vTacticLineContainer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
            .attr("transform", "translate(" + '15' + ",0)")
            .attr('class', 'cLENoteLineContainer')
            .attr('id', 'date' + aNote.date);

          vArrayNoteDatesMemo.push(aNote.date)
        }
        //adjust y axis coordinates depending on how many previous annotations there for that date.
        if (vDictDatesMemo[vIntZeroedDate]) {
          if (vDictModifiedYCoordinates[vIntZeroedDate]) {
            vNewYMax = vDictModifiedYCoordinates[vIntZeroedDate] - vIntStaticRatio;
            vDictModifiedYCoordinates[vIntZeroedDate] = vNewYMax;
          }
          vDictDatesMemo[vIntZeroedDate] += 1;
          vDictCounter.note -= 1;
          // noinspection JSUnusedLocalSymbols
          let vDictNote = {
            note: {
              label: aNote.note,
              title:  vD3TimeParse(aNote.date) + ' ' +  aNote.author
            },
            data: { date: new Date(aNote.date).setHours(0, 0, 0, 0), value: vNewYMax },
            dy: 10,
            dx: 60,
            subject: {
              text: "N" + vDictCounter.note,
              radius: 14,
              x: 'right',
              y: 'bottom'
            }
          };
          // noinspection JSCheckFunctionSignatures
          vNotesAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aNote.note, aNote.date, vNewYMax, 'note', vDictCounter.note, aNote.author));
          // vNotesAnnotations.push(vDictNote);
        } else {
          //resets y axis coordinates to original height.
          vDictDatesMemo[vIntZeroedDate] = 1 ;
          vDictModifiedYCoordinates[vIntZeroedDate] = vIntYMax;
          vDictCounter.note -= 1;

          vNewYMax = vIntYMax;
            //move building tactic/note annotation into function that creates the structure. 5-6 hours
          // noinspection JSUnusedLocalSymbols
          let vDictNote ={
            note: {
              label: aNote.note,
              title:  vD3TimeParse(aNote.date) + ' ' +  aNote.author
            },
            data: { date: new Date(aNote.date).setHours(0, 0, 0, 0), value: vNewYMax },
            dy: 10,
            dx: 0,
            subject: {
              text: "N" + vDictCounter.note,
              radius: 14,
              x: 'right',
              y: 'bottom'
            }
          };
          // noinspection JSCheckFunctionSignatures
          vNotesAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges(aNote.note, aNote.date, vNewYMax, 'note', vDictCounter.note, aNote.author));
          // vNotesAnnotations.push(vDictNote);
        }
      });

      //build tactics annotation badges.
      let vMakeTacticsAnnotations = gD3.annotation()
        .editMode(false)
          .type(gD3.annotationBadge)
        .accessors({
          x: vDictData => vD3fXScale(new Date(vDictData.date)),
          y: vDictData => {
            //adjusts height if value === 0
            if (vDictData.value === 0) {
              if (vReplacementYCounter === null) {
                vReplacementYCounter = 0;
                return vReplacementYCounter;
              }
              else if (vReplacementYCounter === 0) {
                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter;
              } else {
                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter
              }
            } else {
              return vD3fYScale(vDictData.value);
            }
          }
        })
        .// noinspection UnreachableCodeJS
      accessorsInverse({
           date: vDictData => timeFormat(x.invert(vDictData.x)),
           close: vDictData => y.invert(vDictData.y)
        })
        .on('subjectclick', function(annotation) {
          let vAnnotationHeader = document.getElementById('idLEAnnotationModalHeader');
          let vAnnotationBody = document.getElementById('idLEAnnotationModalBody');

          vAnnotationHeader.innerHTML = annotation.note.title;
          vAnnotationBody.innerHTML = annotation.note.label
        })
        .annotations(vTacticsAnnotations);

      //build notes annotation badges.
      let vMakeNotesAnnotations = gD3.annotation()
        .editMode(false)
        .type(gD3.annotationBadge)
        .accessors({
          x: vDictData => vD3fXScale(new Date(vDictData.date)),
          y: vDictData => {
            if (vDictData.value === 0) {
              if (vReplacementYCounter === null) {
                vReplacementYCounter = 0;
                return vReplacementYCounter;
              }
              else if (vReplacementYCounter === 0) {
                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter;
              } else {
                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter
              }
            } else {
              return vD3fYScale(vDictData.value);
            }
          }
        })
        .// noinspection UnreachableCodeJS
      accessorsInverse({
           date: vDictData => timeFormat(x.invert(vDictData.x)),
           close: vDictData => y.invert(vDictData.y)
        })
        .on('subjectclick', function(annotation) {
          let vAnnotationHeader = document.getElementById('idLEAnnotationModalHeader');
          let vAnnotationBody = document.getElementById('idLEAnnotationModalBody');

          vAnnotationHeader.innerHTML = annotation.note.title;
          vAnnotationBody.innerHTML = annotation.note.label
        })
        .annotations(vNotesAnnotations);

      //append tactics and notes annotations to graph svg.
      vNotesAnnotationLayer
      .attr("class", "cLENoteAnnotationGroup")
      .call(vMakeNotesAnnotations);

      vTacticsAnnotationLayer
      .attr("class", "cLETacticAnnotationGroup")
      .call(vMakeTacticsAnnotations)
    }
  } catch (e) {
    throw 'ERROR #5711161233: ' + e
  }
};

/**
 * @memberof Graphing
 * @function fAppendPathAndDots
 * @description A function to append graphlines and dots to the graph.
 * @param {array} aArrayLineData - An array of data to append the line to the graph
 * @param {array} aArrayDotData - An array of data to append the dots to the graph
 * @param {string} aStrLineClass - A string to set the line's class
 * @param {string} aStrDotClass - A string to set the dots' class
 * @param {string} aStrID - A string to set the line and dot's id.
 * @param {string} aStrLineColor - A string to set the line's color
 * @param {string} aStrDotColor -  A string to set the dot's color
 * @param {function} aD3fXScale - A function that scales the x axis for the lines and dots
 * @param {function} aD3fYScale - A function that scales the y axis for the lines and dots
 * @param {string} aStrScaleType - A string that designates what type of path and dot to append. Can be 'max' or ''.
 * @param {string} aStringTypeDisplay - A string to to show what type of annotations to turn on or off. Can be 'tactics', or 'notes'.
*/
window.LiftEd.Graphing.fAppendPathAndDots = (aArrayLineData, aArrayDotData, aStrLineClass, aStrDotClass, aStrID, aStrLineColor, aStrDotColor, aD3fXScale, aD3fYScale, aStrScaleType, aStringTypeDisplay) => {
  try {
    let vArrayLineData = null,
        vArrayDotData = null,
        vStrLineClass = null,
        vStrDotClass = null,
        vStrID = null,
        vStrLineColor = null,
        vStrDotColor = null,
        vD3fXScale = null,
        vD3fYScale = null,
        vStringTypeDisplay = aStringTypeDisplay;

    if (aArrayLineData) {
      vArrayLineData = aArrayLineData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241551: aArrayLineData missing';
    }

    if (aArrayDotData) {
      vArrayDotData = aArrayDotData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241552: aArrayDotData missing';
    }

    if (aStrLineClass) {
      vStrLineClass = aStrLineClass;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241553: aStrLineClass missing';
    }

    if (aStrDotClass) {
      vStrDotClass = aStrDotClass;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241554: aStrDotClass missing';
    }

    if (aStrID) {
      vStrID = aStrID;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241555: aStrID missing';
    }

    if (aStrLineColor) {
      vStrLineColor = aStrLineColor;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241556: aStrLineColor missing';
    }

    if (aStrDotColor) {
      vStrDotColor = aStrDotColor;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241557: aStrDotColor missing';
    }

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241558: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241659: aD3fYScale missing';
    }






    if (aStrScaleType === 'max') {
      //adds max lines and circles.
      window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append("path")
        .datum(vArrayLineData)
        .attr("transform", "translate(" + '15' + ",0)")
        .attr('id', vStrID)
        .attr("class", vStrLineClass)
        .style("stroke", vStrLineColor)
        .attr("d", window.LiftEd.Utils.fGetVar('#5709192007', 'D3ScaledMaxLine'));
      window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').selectAll("dot")
        .data(vArrayDotData)
        .enter().append("circle")
          .attr("transform", "translate(" + '15' + ",0)")
          .attr("r", 6)
          .attr("id", vStrID)
          .attr("class", vStrDotClass)
          .style("stroke", vStrDotColor)
          .style('stroke-width', '2px')
          .style('fill', 'none')
          .attr("cx", function(aDictData) { return vD3fXScale(aDictData.date); })
          .attr("cy", function(aDictData) { return vD3fYScale(aDictData.max); });
    }
    else {
      //adds regular graphline and dots
      window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append("path")
        .datum(vArrayLineData)
        .attr("transform", "translate(" + '15' + ",0)")
        .attr('id', vStrID)
        .attr("class", vStrLineClass)
        .style("stroke", vStrLineColor)
        .attr("d", window.LiftEd.Utils.fGetVar('#5709192007', 'D3ScaledLine'));
      //for duration graph
      if (vStringTypeDisplay === '3' || vStringTypeDisplay === 3) {
        window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').selectAll("dot")
            .data(vArrayDotData)
            .enter().append("circle")
              .attr("transform", "translate(" + '15' + ",0)")
              .attr("r", 3.5)
              .attr("id", vStrID)
              .attr("class", vStrLineClass)
              .style("stroke", vStrDotColor)
              .style('fill', vStrDotColor)
              .attr("cx", function(aDictData) { return vD3fXScale(aDictData.date); })
              .attr("cy", function(aDictData) { return vD3fYScale(aDictData.value * 60); });
      } else {
        window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').selectAll("dot")
            .data(vArrayDotData)
            .enter().append("circle")
              .attr("transform", "translate(" + '15' + ",0)")
              .attr("r", 3.5)
              .attr("id", vStrID)
              .attr("class", vStrLineClass)
              .style("stroke", vStrDotColor)
              .style('fill', vStrDotColor)
              .attr("cx", function(aDictData) { return vD3fXScale(aDictData.date); })
              .attr("cy", function(aDictData) { return vD3fYScale(aDictData.value); });
      }
    }
  } catch (e) {
    throw 'ERROR #5711161234: ' + e
  }
};

/**
 * @memberof Graphing
 * @function fAppendValueAnnotations
 * @description A function to append value annotations to the graph
 * @param {array} aArrayMaxAnnotations - An array of value annotations for the max value annotations.
 * @param {array} aArrayCorrectAnnotations -  An array of value annotations for the # correct value annotations.
 * @param {string} aStrMaxId - A string to set the max value annotations id.
 * @param {string} aStrValueId - A string to set the correct value annotations id.
 * @param {string} aStrValueClass - A string to set the value annotation's class
 * @param {function} aD3fXScale - A function that scales the x axis for the value annotations
 * @param {function} aD3fYScale - A function that scales the y axis for the value annotations
 * @param {string} aStrAnnotationType - A string that designates what type of value annotation to append.
*/
window.LiftEd.Graphing.fAppendValueAnnotations = (aArrayMaxAnnotations, aArrayCorrectAnnotations, aStrMaxId, aStrValueId, aStrValueClass, aD3fXScale, aD3fYScale, aStrAnnotationType) => {
  try {
    let vArrayMaxAnnotions = aArrayMaxAnnotations,
        vStrMaxId = aStrMaxId,
        vStrValueId = null,
        vD3fXScale = null,
        vD3fYScale = null,
        vStrAnnotationType = aStrAnnotationType;


    if (aStrValueId) {
      vStrValueId = aStrValueId;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241833: aStrValueId missing';
    }

    if (aStrValueId) {
      vStrValueId = aStrValueId;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241833: aStrValueId missing';
    }

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241830: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241831: aD3fYScale missing';
    }




    if (vStrAnnotationType === 'max') {
      // noinspection ES6ModulesDependencies
      let vMakeMaxValueAnnotations = gD3.annotation()
          .editMode(false)
          .type(gD3.annotationCalloutCircle)
          .accessors({
              x: aDictData => vD3fXScale(new Date(aDictData.date)),
              y: aDictData => vD3fYScale(aDictData.value)
          })
          .accessorsInverse({
                date: aDictData => timeFormat(x.invert(aDictData.x)),
                close: aDictData => y.invert(aDictData.y)
          })
          .on('subjectclick', function(annotation) {
                let vHTMLValuePointModal = document.getElementById('idLEValuePointModal');
                let vIntLeft = window.LiftEd.Vars.originalCanvasX - window.LiftEd.Vars.gIntegerWidth;
                let vIntRight = window.LiftEd.Vars.gIntegerWidth/2;
                if (annotation.dx === 20) {
                  vHTMLValuePointModal.style.marginLeft = '-' + vIntLeft + 'px';
                  vHTMLValuePointModal.style.right = null;
                } else {
                  vHTMLValuePointModal.style.right = vIntRight + 'px';
                  vHTMLValuePointModal.style.marginLeft = null;
                }
                window.LiftEd.Graphing.fGetDetailsFor(annotation.data.date, annotation.data.uuid, '#5712081342');
                // if (annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden")) {
                //     gD3.selectAll("g.annotation-connector, g.annotation-note")
                //         .classed("hidden", true);
                //     annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                //         .classed("hidden", false);
                // } else {
                //     annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
                //         .classed("hidden", true)
                // }
            })
          .annotations(vArrayMaxAnnotions);
      let vDataMaxAnnotationLayer = window.LiftEd.Utils.fGetVar('#5709201642', 'gSVGGraphContainer').append('g')
          .attr("transform", "translate(" + '15' + ",0)")
          .attr('class', 'cLEDataAnnotationLayer')
          .attr("id", vStrMaxId);

      // noinspection Annotator
      vDataMaxAnnotationLayer
          .call(vMakeMaxValueAnnotations);
    }

    let vMakeValueAnnotations = gD3.annotation()
      .editMode(false)
      .type(gD3.annotationCalloutCircle)
      //accessors & accessorsInverse not needed
      //if using x, y in annotations JSON
      .accessors({
        x: aDictData => vD3fXScale(new Date(aDictData.date)),
        y: aDictData => vD3fYScale(aDictData.value)
      })
      .accessorsInverse({
         date: aDictData => timeFormat(x.invert(aDictData.x)),
         close: aDictData => y.invert(aDictData.y)
      })
      .on('subjectclick', function(annotation) {
        let vHTMLValuePointModal = document.getElementById('idLEValuePointModal');
        let vIntLeft = window.LiftEd.Vars.originalCanvasX - window.LiftEd.Vars.gIntegerWidth;
        let vIntRight = window.LiftEd.Vars.gIntegerWidth/2;
        if (annotation.dx === 20) {
          vHTMLValuePointModal.style.marginLeft = '-' + vIntLeft + 'px';
          vHTMLValuePointModal.style.right = null;
        } else {
          vHTMLValuePointModal.style.right = vIntRight + 'px';
          vHTMLValuePointModal.style.marginLeft = null;
        }
          window.LiftEd.Graphing.fGetDetailsFor(annotation.data.date, annotation.data.uuid, '#5712081343');
          // if (annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden")) {
          //   gD3.selectAll("g.annotation-connector, g.annotation-note")
          //     .classed("hidden", true);
          //   annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
          //     .classed("hidden", false);
          // } else {
          //   annotation.type.a.selectAll("g.annotation-connector, g.annotation-note")
          //   .classed("hidden", true)
          // }
        })
      .annotations(aArrayCorrectAnnotations);

    let vDataAnnotationLayer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
      .attr("transform", "translate(" + '15' + ",0)")
      .attr('class', 'cLEDataAnnotationLayer')
      .attr("id", vStrValueId);

    // noinspection Annotator
    vDataAnnotationLayer
      .call(vMakeValueAnnotations);

      let vValuePointModal = null;

      if (document.querySelector('.cLEValuePointModalButton')) {
        vValuePointModal = document.querySelector('.cLEValuePointModalButton');
      } else {
        throw 'ERROR #5712071245: document.querySelector(".cLEValuePointModalButton") missing';
      }

      window.LiftEd.Graphing.fHTMLElValuePointModal(vValuePointModal , {
        content: '.cLEValuePointModal'
      });

  } catch (e) {
    throw 'ERROR #5711161234: ' + e;
  }
};



// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fAddCumulativeGraphLine
 * @description A function to toggle the cumulative graph line.
 * @param {array} aArrayCoordinates - An array of coordinates for the cumulativegraphline
 * @param {function} aD3fXScale - A function that scales the x axis
 * @param {function} aD3fYScale - A function that scales the y axis
 * @param {string} aStringColor - A string to set the cumulative graphlines color.
 * @param {string} aStringTypeDisplay - A string to determine graphe display type. Can be '0', '1', '2', or '3'
 * @param {string} aStringIsManualClick - A string to determine if it is a manually added graphline or not. Can be 'true' or 'false'
*/
window.LiftEd.Graphing.fAddCumulativeGraphLine =  (aArrayCoordinates, aD3fXScale, aD3fYScale, aStringColor, aStringTypeDisplay, aStringIsManualClick) => {
  try {
    let vDictCumulativeData = {};
    let vArrayCumulativeLineData = [];
    let vArrayDotValueData = [];
    let vArrayDataValueAnnotations = [];
    let vArrayMaxValueAnnotations = [];
    let vHTMLGraphLineButton = null;
    let vHTMLElCumulativeDataRow = null;
    let vHTMLElAverageDataName = null;

    let vArrayCoordinates = null,
        vD3fXScale = null,
        vD3fYScale = null,
        vStringColor = null,
        vStringTypeDisplay = null,
        vStringIsManualClick = null,
        vArrayXAxisDomain = [],
        vArrayFilteredXAxisDomain = null;


    if (document.getElementById('idLEAverageDataButton')) {
      vHTMLGraphLineButton = document.getElementById('idLEAverageDataButton');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241855: HTMLEEl: idLEAverageDataButton missing';
    }

    if (document.getElementById('idLECumulativeDataRow')) {
      vHTMLElCumulativeDataRow = document.getElementById('idLECumulativeDataRow');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241856: HTMLEEl: idLECumulativeDataRow missing';
    }

    if (document.getElementById('idLEAverageDataName')) {
      vHTMLElAverageDataName = document.getElementById('idLEAverageDataName');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241857: HTMLEEl: idLEAverageDataName missing';
    }

    if (aArrayCoordinates) {
      vArrayCoordinates = aArrayCoordinates;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241858: aArrayCoordinates missing';
    }
    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241859: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241900: aD3fYScale missing';
    }

    if (aStringColor) {
      vStringColor = aStringColor;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241901: aStringColor missing';
    }

    if (aStringTypeDisplay !== null) {
      vStringTypeDisplay = aStringTypeDisplay;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241902: aStringTypeDisplay missing';
    }

    if (aStringIsManualClick) {
      vStringIsManualClick = aStringIsManualClick;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241903: aStringIsManualClick missing';
    }


    //logic setting globalvar true for manually turning on cumulativegraph
    if (window.LiftEd.Utils.fGetVar('#5709191932', 'cumulativeManuallyTurnedOn')=== 'false' && vStringIsManualClick === 'true') {
      if (!document.getElementById('idLEAverageData')) {
        window.LiftEd.Vars.showCumulativeLine = 'true';
        window.LiftEd.Vars.cumulativeManuallyTurnedOn = 'true';
      }
    }

    //clean up logic for all graphlines 5-6 hours
    if (document.getElementById('idLEAverageData')) {
      if (window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(99)) {
          let vIntIndex = window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').indexOf(99);
          window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').splice(vIntIndex, 1);
      }
      gD3.selectAll('.cLEAverageMaxGraphLine').remove();
      gD3.selectAll('.cLEAverageGraphLine').remove( );
      gD3.selectAll('#cLEAverageAnnotations').remove();
      gD3.selectAll('#cLEAverageMaxAnnotations').remove();
      vHTMLGraphLineButton.style.backgroundColor = vStringColor;
      window.LiftEd.Vars.showCumulativeLine = 'false';
      vHTMLElCumulativeDataRow.style.backgroundColor = '#fff';
      vHTMLElAverageDataName.className = 'cLEAverageDataName';
    }
    else if (vStringTypeDisplay === 0 || vStringTypeDisplay === '0') {
      if (window.LiftEd.Utils.fGetVar('#5710211925', 'numberHandler') ===  2) {
        if (window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length > 0) {
          window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').unshift(99)
        } else {
          window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(99);
        }
      }

      let vArrayMaxDataLine = [];
      let vArrayMaxDotData;

      vHTMLElCumulativeDataRow.style.backgroundColor = '#0081D3';
      vHTMLGraphLineButton.style.backgroundColor = '#003d00';
      vHTMLElAverageDataName.className = 'cLEAverageDataNameWhite';

      //make dict of cumulative data.
      vArrayCoordinates.forEach( (aDictDataSet) => {
        aDictDataSet.forEach( (aDictDataPoint) => {
          if (aDictDataPoint.value === null) {
            vDictCumulativeData[aDictDataPoint.date] = {max: aDictDataPoint.value, value: aDictDataPoint.value}
          } else {
            if (vDictCumulativeData[aDictDataPoint.date]) {
              vDictCumulativeData[aDictDataPoint.date].value += aDictDataPoint.value;
              vDictCumulativeData[aDictDataPoint.date].max += aDictDataPoint.max;
            } else {
              vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value, max:  aDictDataPoint.max}
            }
          }
        });
      });

      for (let key in vDictCumulativeData) {
        if (vDictCumulativeData.hasOwnProperty(key)) {
          vArrayXAxisDomain.push(key);
          if (vDictCumulativeData[key].max === null) {
            vArrayMaxDataLine.push({date: key, max: null});
            vArrayCumulativeLineData.push({date: key, value: vDictCumulativeData[key].value});
          } else {
            vArrayMaxDataLine.push({date: key, max: vDictCumulativeData[key].max});
            vArrayCumulativeLineData.push({date: key, value: vDictCumulativeData[key].value});
          }
        }
      }
      //create max annotations and dot array
      // noinspection JSCheckFunctionSignatures
      let vDictMaxLineData = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayMaxDataLine, vStringTypeDisplay, '#006400', 'max');

      vArrayMaxValueAnnotations = vDictMaxLineData.maxDataValueAnnotation;
      vArrayMaxDotData = vDictMaxLineData.maxDotData;

      //create annotations and dot array
      // noinspection JSCheckFunctionSignatures
      let vDictValueLineData = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayCumulativeLineData, vStringTypeDisplay, '#006400', '');
      vArrayDataValueAnnotations = vDictValueLineData.valueAnnotations;
      vArrayDotValueData = vDictValueLineData.dotValueData;


      //make array of cumulative data with correct data structure
      for (let key in vDictCumulativeData) {
        if (vDictCumulativeData.hasOwnProperty(key)) {
          vArrayXAxisDomain.push(key);
          if (vDictCumulativeData[key].max === null) {
            vArrayMaxDataLine.push({date: key, max: null});
            vArrayCumulativeLineData.push({date: key, value: vDictCumulativeData[key].values});
          } else {
            vArrayMaxDataLine.push({date: key, max: vDictCumulativeData[key].max});
            vArrayCumulativeLineData.push({date: key, value: vDictCumulativeData[key].value});
          }
        }
      }

      vArrayMaxDataLine.sort(function(a, b){
        return a.date - b.date
      });

      vArrayCumulativeLineData.sort(function(a, b){
        return a.date - b.date
      });

      vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
        return vArrayXAxisDomain.indexOf(item) === pos;
      });
      vArrayFilteredXAxisDomain.sort();
      vArrayFilteredXAxisDomain.reverse();

    //add cumulative max lines and dots


    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayMaxDataLine, vArrayMaxDotData, "cLEAverageMaxGraphLine", "cLEAverageGraphLine", 'idLEAverageData', 'rgba(0, 100, 0, 0.5)', vStringColor, vD3fXScale, vD3fYScale, 'max');
    //add cumulative line and dots
    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayCumulativeLineData, vArrayDotValueData, "cLEAverageGraphLine", "cLEAverageGraphLine", 'idLEAverageData', vStringColor, vStringColor, vD3fXScale, vD3fYScale, '');

    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendValueAnnotations(vArrayMaxValueAnnotations, vArrayDataValueAnnotations, 'cLEAverageMaxAnnotations', 'cLEAverageAnnotations', '', vD3fXScale, vD3fYScale, 'max');

      gD3.selectAll("g.annotation-connector, g.annotation-note")
          .classed("hidden", true);

    }
    else if (vStringTypeDisplay === '2' || vStringTypeDisplay === 2) {
      if (window.LiftEd.Utils.fGetVar('#5710211925', 'numberHandler') ===  2) {
        if (window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length > 0) {
          window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').unshift(99)
        } else {
          window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(99);
        }
      }

      vHTMLGraphLineButton.style.backgroundColor = '#003d00';
      vHTMLElCumulativeDataRow.style.backgroundColor = '#0081D3';
      vHTMLElAverageDataName.className = 'cLEAverageDataNameWhite';

      vArrayCoordinates.forEach( (aDictDataSet) => {
        aDictDataSet.forEach( (aDictDataPoint) => {
          if (vDictCumulativeData[aDictDataPoint.date]) {
            vDictCumulativeData[aDictDataPoint.date].value += aDictDataPoint.value;
          } else {
            vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value}
          }
        });
      });
      for (let key in vDictCumulativeData) {
        vArrayXAxisDomain.push(key);
        if (vDictCumulativeData.hasOwnProperty(key)) {
            vArrayCumulativeLineData.push({date: key, value: vDictCumulativeData[key].value});
          }
      }

      vArrayCumulativeLineData.sort(function(a, b){
        return a.date - b.date
      });

      vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
        return vArrayXAxisDomain.indexOf(item) === pos;
      });
      vArrayFilteredXAxisDomain.sort();
      vArrayFilteredXAxisDomain.reverse();

      // noinspection JSCheckFunctionSignatures
      vArrayDataValueAnnotations = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayCumulativeLineData, vStringTypeDisplay, '#006400', '').valueAnnotations;
      // noinspection JSCheckFunctionSignatures
      vArrayDotValueData = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayCumulativeLineData, vStringTypeDisplay, '#006400', '').dotValueData;
      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayCumulativeLineData, vArrayDotValueData, "cLEAverageGraphLine", "cLEAverageGraphLine", 'idLEAverageData', vStringColor, vStringColor, vD3fXScale, vD3fYScale, '');

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendValueAnnotations([], vArrayDataValueAnnotations, '', 'cLEAverageAnnotations', '', vD3fXScale, vD3fYScale, '');

      gD3.selectAll("g.annotation-connector, g.annotation-note")
          .classed("hidden", true);
    } else if (vStringTypeDisplay === '1' || vStringTypeDisplay === 1) {
    if (window.LiftEd.Utils.fGetVar('#5710211925', 'numberHandler') ===  2) {
      if (window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length > 0) {
        window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').unshift(99)
      } else {
        window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(99);
      }
    }

    vHTMLGraphLineButton.style.backgroundColor = '#003d00';
    vHTMLElCumulativeDataRow.style.backgroundColor = '#0081D3';
    vHTMLElAverageDataName.className = 'cLEAverageDataNameWhite';
    vArrayCoordinates.forEach( (aDictDataSet) => {
      aDictDataSet.forEach( (aDictDataPoint) => {
        if (aDictDataPoint.value === null) {
            vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value, occurences: 1}
        } else {
          if (vDictCumulativeData[aDictDataPoint.date]) {
            if (aDictDataPoint.realData === 'yes') {
              vDictCumulativeData[aDictDataPoint.date].value += aDictDataPoint.value;
              vDictCumulativeData[aDictDataPoint.date].occurences += 1;
            } else {
              vDictCumulativeData[aDictDataPoint.date].value += aDictDataPoint.value;
              vDictCumulativeData[aDictDataPoint.date].occurences += 0;
            }
          } else {
            if (aDictDataPoint.realData === 'yes') {
              vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value, occurences: 1}
            } else {
              vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value, occurences: 0}
            }
          }
        }
      });
    });

    for (let key in vDictCumulativeData) {
      vArrayXAxisDomain.push(parseInt(key));
      if (vDictCumulativeData.hasOwnProperty(key)) {
        if (vDictCumulativeData[key].value) {
          if (vDictCumulativeData[key].occurences === 0) {
            vArrayCumulativeLineData.push({date: key, value: (vDictCumulativeData[key].value / 1)})
          } else {
            vArrayCumulativeLineData.push({date: key, value: (vDictCumulativeData[key].value / vDictCumulativeData[key].occurences)})
          }
        } else {
           vArrayCumulativeLineData.push({date: key, value: vDictCumulativeData[key].value})
        }
      }
    }

     vArrayCumulativeLineData.sort(function(a, b){
       return a.date - b.date
     });

    vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
      return vArrayXAxisDomain.indexOf(item) === pos;
    });
    vArrayFilteredXAxisDomain.sort();


    // noinspection JSCheckFunctionSignatures
      vArrayDataValueAnnotations = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayCumulativeLineData, vStringTypeDisplay, '#006400', '').valueAnnotations;
    // noinspection JSCheckFunctionSignatures
      vArrayDotValueData = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayCumulativeLineData, vStringTypeDisplay, '#006400', '').dotValueData;
    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayCumulativeLineData, vArrayDotValueData, "cLEAverageGraphLine", "cLEAverageGraphLine", 'idLEAverageData', vStringColor, vStringColor, vD3fXScale, vD3fYScale, '');

    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendValueAnnotations([], vArrayDataValueAnnotations, '', 'cLEAverageAnnotations', '', vD3fXScale, vD3fYScale, '');

    gD3.selectAll("g.annotation-connector, g.annotation-note")
        .classed("hidden", true);
    }
    else { // noinspection Annotator
      if (aStringTypeDisplay === '3' || aStringTypeDisplay === 3) {
        if (window.LiftEd.Utils.fGetVar('#5710211925', 'numberHandler') ===  2) {
          if (window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length > 0) {
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').unshift(99)
          } else {
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(99);
          }
        }


        vHTMLGraphLineButton.style.backgroundColor = '#003d00';
        vHTMLElCumulativeDataRow.style.backgroundColor = '#0081D3';
        vHTMLElAverageDataName.className = 'cLEAverageDataNameWhite';

        aArrayCoordinates.forEach( (aDictDataSet) => {
          aDictDataSet.forEach( (aDictDataPoint) => {
            if (aDictDataPoint.value === null) {
              vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value}
            } else {
              if (vDictCumulativeData[aDictDataPoint.date]) {
                vDictCumulativeData[aDictDataPoint.date].value += aDictDataPoint.value;
              } else {
                vDictCumulativeData[aDictDataPoint.date] = {value: aDictDataPoint.value}
              }
            }
          });
        });

        for (let key in vDictCumulativeData) {
          vArrayXAxisDomain.push(key);
          if (vDictCumulativeData.hasOwnProperty(key)) {
             vArrayCumulativeLineData.push({date: key, value: vDictCumulativeData[key].value})
          }
        }

        vArrayCumulativeLineData.sort(function(a, b){
          return a.date - b.date
        });

        vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
          return vArrayXAxisDomain.indexOf(item) === pos;
        });
        vArrayFilteredXAxisDomain.sort();
        vArrayFilteredXAxisDomain.reverse();

        // noinspection JSCheckFunctionSignatures
        vArrayDataValueAnnotations = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayCumulativeLineData, vStringTypeDisplay, '#006400', '').valueAnnotations;
        // noinspection JSCheckFunctionSignatures
        vArrayDotValueData = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayCumulativeLineData, vStringTypeDisplay, '#006400', '').dotValueData;
        // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAppendPathAndDots(vArrayCumulativeLineData, vArrayDotValueData, "cLEAverageGraphLine", "cLEAverageGraphLine", 'idLEAverageData', vStringColor, vStringColor, vD3fXScale, vD3fYScale, '', vStringTypeDisplay);


        // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAppendValueAnnotations([], vArrayDataValueAnnotations, '', 'cLEAverageAnnotations', '', vD3fXScale, vD3fYScale, '');

        gD3.selectAll("g.annotation-connector, g.annotation-note")
            .classed("hidden", true);
        }
    }
  } catch (e) {
    throw 'ERROR #5711161235: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fModifyAnnotationsDates
 * @description A function to modify annotation dates to make them align with the ticks.
 * @param {object} aDictAnnotation - A dictionary of 1 annotation.
 * @param {array} aArrayScaledDates -  An array of dates scaled to the graphline's ticks.
*/
window.LiftEd.Graphing.fModifyAnnotationsDates = (aDictAnnotation, aArrayScaledDates) => {
  try {
    let vArrayScaledDates = null;
    if (aArrayScaledDates) {
      vArrayScaledDates = aArrayScaledDates;
    }
    // noinspection Annotator
    // noinspection Annotator
    // noinspection Annotator
    // noinspection Annotator
    let vDictAnnotation = {};
    if ('scopeUUID' in aDictAnnotation) {
      vDictAnnotation = {
        "dateStart" : aDictAnnotation.dateStart,
        "dateEnd" : aDictAnnotation.dateEnd,
        "author" : aDictAnnotation.author,
        'originalStart': aDictAnnotation.dateStart,
        'originalEnd': aDictAnnotation.dateEnd,
        "note" : aDictAnnotation.note,
        'uuid' : aDictAnnotation.uuid,
        'scopeUUID': aDictAnnotation.scopeUUID,
        'scopeType': aDictAnnotation.scopeType,
      };
    } else {
      vDictAnnotation = {
        "dateStart" : aDictAnnotation.dateStart,
        "dateEnd" : aDictAnnotation.dateEnd,
        "author" : aDictAnnotation.author,
        'originalStart': aDictAnnotation.dateStart,
        'originalEnd': aDictAnnotation.dateEnd,
        "note" : aDictAnnotation.note,
        'uuid' : aDictAnnotation.uuid,
        'scopeType': aDictAnnotation.scopeType,
      };
    }
    let vExitLoop = false;

    vArrayScaledDates.forEach( (aIntDate) => {
      if (vExitLoop) {
        // noinspection UnnecessaryReturnStatementJS
        return;
      }
      else { // noinspection Annotator
        if (aIntDate >= aDictAnnotation.dateEnd) {
              vDictAnnotation.dateEnd = aIntDate;
              vExitLoop = true;
            }
            else { // noinspection Annotator
          if (aIntDate <= aDictAnnotation.dateStart) {
                      vDictAnnotation.dateStart = aIntDate;
                    }
                    else { // noinspection Annotator
                  if (aDictAnnotation.dateStart <= vArrayScaledDates[0]) {
                              vDictAnnotation.dateStart = vArrayScaledDates[0];
                            }
                }
        }
      }
    });
    return vDictAnnotation
  } catch (e) {
    throw 'ERROR #5711161236: ' + e;
  }
};


// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fAddGraphLine
 * @description aArrayDataArray
 * @param {array} aArrayDataArray - An array of dictionaries with data for each coordinate.
 * @param {array} aDataSetName -  A string with the dataset's name to use for an id.
 * @param {function} aD3fXScale - A function to set the x scale
 * @param {function} aD3fYScale - A function to set the y scale
 * @param {string} aStringTypeDisplay - A string that indicates type display.
 * @param {string} aStringColor - A string to set the color of the graphline.
 * @param {string} aStringActiveColor - A string to set the color of the button's active state.
 * @param {string} aStringMaxLineColor - A string to set the max line color.
*/
window.LiftEd.Graphing.fAddGraphLine = (aArrayDataArray, aDataSetName, aD3fXScale, aD3fYScale, aStringTypeDisplay, aStringColor, aStringActiveColor, aStringMaxLineColor) => {
  try {
    let vRegexSplitNoSpaces = /\s*\s*/;
    let vArrayDotValueData;
    let vArrayDataValueAnnotations;
    let vArrayMaxDataValueAnnotations = [];
    let vArrayMaxDotData = [];

    let vDictValueAndDotData;
    let vArrayDataSetNameSplit = null,
       vStringJoinedName = null,
       vArrayDataArray = null,
       vDataSetName = null,
       vD3fXScale = null,
       vD3fYScale = null,
       vStringTypeDisplay = null,
       vStringColor = null,
       vStringActiveColor = null,
       vStringMaxLineColor  = null,
       vHTMLElDataRow = null,
       vHTMLElCumulativeDataRow = document.getElementById('idLECumulativeDataRow'),
       vHTMLElAverageDataName = document.getElementById('idLEAverageDataName'),
       vArrayXAxisDomain = [],
       vArrayFilteredXAxisDomain = null,
       vHTMLElCollectionDataRowText = null,
       vHTMLGraphLineButton = null;
    let vArrayMaxData = [];
    let vArrayCorrectData = [];

    if (aArrayDataArray) {
      vArrayDataArray = aArrayDataArray;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241927: aArrayDataArray missing';
    }
    if (aDataSetName) {
      vDataSetName = aDataSetName;
      vArrayDataSetNameSplit= vDataSetName.split(vRegexSplitNoSpaces);
      vStringJoinedName = vArrayDataSetNameSplit.join("")
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241928: aDataSetName missing';
    }
    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241929: aD3fXScale missing';
    }
    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241930: aD3fYScale missing';
    }
    if (aStringTypeDisplay !== null) {
      vStringTypeDisplay = aStringTypeDisplay;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241931: aStringTypeDisplay missing';
    }
    if (aStringColor) {
      vStringColor = aStringColor;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241932: aStringColor missing';
    }
    if (aStringActiveColor) {
      vStringActiveColor = aStringActiveColor;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241933: aStringActiveColor missing';
    }
    if (aStringMaxLineColor) {
      vStringMaxLineColor = aStringMaxLineColor;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241934: aStringMaxLineColor missing';
    }
    if (document.getElementById('row' + aDataSetName)) {
      vHTMLElDataRow = document.getElementById('row' + aDataSetName);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241906: document.getElementById("row" + aDataSetName) missing';
    }


    if (document.querySelectorAll('#' + 'text' + aDataSetName)) {
      vHTMLElCollectionDataRowText = document.querySelectorAll('#' +'text'+ aDataSetName);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241907: document.getElementById("#" + vStringJoinedName + "text")) missing';
    }

    //add comments to if else statements for clairty globally. 4-5 hours.
    //remove cumulativegraphline if not turn manually on
    if (window.LiftEd.Utils.fGetVar('#5709191932', 'cumulativeManuallyTurnedOn') === 'false' && parseInt(window.LiftEd.Utils.fGetVar('#5709191937', 'dataLength')) > 1) {
      if (window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(99) ) {
        let vIntIndex = window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').indexOf(99);
        window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').splice(vIntIndex, 1);
      }

      gD3.selectAll('.cLEAverageMaxGraphLine').remove();
      gD3.selectAll('.cLEAverageGraphLine').remove( );
      gD3.selectAll('#cLEAverageAnnotations').remove();
      gD3.selectAll('#cLEAverageMaxAnnotations').remove();
      if (document.getElementById('idLEAverageDataButton')) {
        vHTMLGraphLineButton = document.getElementById('idLEAverageDataButton');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5709241907: document.getElementById("idLEAverageDataButton")) missing';
      }
      if (vHTMLGraphLineButton === null) {
          window.LiftEd.API.fErrorReport("fAddGraphLine: document.getElementById('idLEAverageDataButton'); -- vHTMLGraphLineButton == nil?");
      } else {
          vHTMLElCumulativeDataRow.style.backgroundColor = '#fff';
          vHTMLGraphLineButton.style.backgroundColor = '#006400';
          vHTMLElAverageDataName.className = 'cLEAverageDataName';
      }
    }
    vDictValueAndDotData = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayDataArray, vStringTypeDisplay, vStringColor, '');

    vArrayDataValueAnnotations = vDictValueAndDotData.valueAnnotations;
    vArrayDotValueData = vDictValueAndDotData.dotValueData;

    //move graphbuttons/row/text color changes into a function. used multiples place throughout 3-4 hours.
    if (document.getElementById('uuid' + vStringJoinedName)) {
      gD3.selectAll('#' + 'uuid' + vStringJoinedName).remove();
      let vHTMLElGraphLineButton = document.getElementById('btn' + vStringJoinedName);
      vHTMLElGraphLineButton.style.backgroundColor = vStringColor;
      vHTMLElDataRow.style.backgroundColor = '#fff';
      //unselect data row
      for (let i = 0; i < vHTMLElCollectionDataRowText.length; i++) {
        vHTMLElCollectionDataRowText[i].style.color = 'black';
      }
    }
    //make row active
    else if (vStringTypeDisplay === 0 || vStringTypeDisplay === '0') {
    for (let i = 0; i < vHTMLElCollectionDataRowText.length; i++) {
      vHTMLElCollectionDataRowText[i].style.color = '#fff';
    }



    //create arrays for line, dot, value annotations.
    vArrayDataArray.map( (aDictDataPoint) => {
      vArrayMaxData.push({"date": aDictDataPoint.date, "max": aDictDataPoint.max, "uuid": aDictDataPoint.uuid});
      vArrayCorrectData.push({"date": aDictDataPoint.date, "value": aDictDataPoint.value, "uuid": aDictDataPoint.uuid});
      vArrayXAxisDomain.push(aDictDataPoint.date);
    });
    vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
      return vArrayXAxisDomain.indexOf(item) === pos;
    });
    vArrayFilteredXAxisDomain.sort();

    // noinspection JSCheckFunctionSignatures
    let vDictMaxData = window.LiftEd.Graphing.fCreateValueAnnotationsAndDotCoordinatesArray(vArrayMaxData,  aStringTypeDisplay, aStringColor, 'max');
    vArrayMaxDataValueAnnotations = vDictMaxData.maxDataValueAnnotation;
    vArrayMaxDotData = vDictMaxData.maxDotData;

    //append max line and dots
    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayMaxData, vArrayMaxDotData, "cLEMaxGraphLine", "graphline", 'uuid' + vStringJoinedName, vStringMaxLineColor, vStringColor, vD3fXScale, vD3fYScale, 'max');

    //append # correct line and dots
    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayCorrectData, vArrayDotValueData, "graphline", "graphline", 'uuid' + vStringJoinedName, vStringColor, vStringColor, vD3fXScale, vD3fYScale, '');

    //make row active
    let vHTMLElGraphLineButton = document.getElementById('btn' + vDataSetName);
    vHTMLElGraphLineButton.style.backgroundColor = vStringActiveColor;
    vHTMLElDataRow.style.backgroundColor = '#0081D3';

    //makes button and row active
    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendValueAnnotations(vArrayMaxDataValueAnnotations, vArrayDataValueAnnotations, 'uuid' + vStringJoinedName, 'uuid' + vStringJoinedName, 'cLEDataAnnotationLayer', vD3fXScale, vD3fYScale, 'max');

    gD3.selectAll("g.annotation-connector, g.annotation-note")
        .classed("hidden", true);

    } else if (vStringTypeDisplay === 1 || vStringTypeDisplay === '1') {
    for (let i = 0; i < vHTMLElCollectionDataRowText.length; i++) {
      vHTMLElCollectionDataRowText[i].style.color = '#fff';
    }

    vArrayDataArray.map((aDictDataPoint) => {
      vArrayXAxisDomain.push(new Date(aDictDataPoint.date).setHours(0,0,0,0));
    });

    vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
      return vArrayXAxisDomain.indexOf(item) === pos;
    });
    vArrayFilteredXAxisDomain.sort();

    //appends graphline and dots
    //(aArrayLineData, aArrayDotData, aStrLineClass, aStrDotClass, aStrID, aStrLineColor, aStrDotColor, aD3fXScale, aD3fYScale, aStrScaleType, aStringTypeDisplay)
    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayDataArray, vArrayDotValueData, "graphline", "graphline", 'uuid' + vStringJoinedName, vStringColor, vStringColor, vD3fXScale, vD3fYScale, '');

    //makes button and row active
    let vHTMLElGraphLineButton = document.getElementById('btn' + vDataSetName);
    vHTMLElGraphLineButton.style.backgroundColor = vStringActiveColor;
    vHTMLElDataRow.style.backgroundColor = '#0081D3';

    //(aArrayMaxAnnotations, aArrayCorrectAnnotations, aStrMaxId, aStrValueId, aStrValueClass, aD3fXScale, aD3fYScale, aStrAnnotationType)
    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendValueAnnotations([], vArrayDataValueAnnotations, '', 'uuid' + vStringJoinedName, 'cLEDataAnnotationLayer', vD3fXScale, vD3fYScale, '');


    gD3.selectAll("g.annotation-connector, g.annotation-note")
        .classed("hidden", true);
    } else if (vStringTypeDisplay === 3 || vStringTypeDisplay === '3') {
    for (let i = 0; i < vHTMLElCollectionDataRowText.length; i++) {
      vHTMLElCollectionDataRowText[i].style.color = '#fff';
    }
    let vArrayDataArray = aArrayDataArray;

    vArrayDataArray.map((aDictDataPoint) => {
      vArrayXAxisDomain.push(aDictDataPoint.date);
    });
    vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
      return vArrayXAxisDomain.indexOf(item) === pos;
    });
    vArrayFilteredXAxisDomain.sort();

    window.LiftEd.Graphing.fAppendPathAndDots(vArrayDataArray, vArrayDotValueData, "graphline", "graphline",  'uuid' + vStringJoinedName, vStringColor, vStringColor, vD3fXScale, vD3fYScale, '', vStringTypeDisplay);

    let vHTMLElGraphLineButton = document.getElementById('btn' + vDataSetName);
    vHTMLElGraphLineButton.style.backgroundColor = vStringActiveColor;
    vHTMLElDataRow.style.backgroundColor = '#0081D3';

    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendValueAnnotations([], vArrayDataValueAnnotations, '',  'uuid' + vStringJoinedName, 'cLEDataAnnotationLayer', vD3fXScale, vD3fYScale, '');

    gD3.selectAll("g.annotation-connector, g.annotation-note")
        .classed("hidden", true);
    }
    else {
    for (let i = 0; i < vHTMLElCollectionDataRowText.length; i++) {
      vHTMLElCollectionDataRowText[i].style.color = '#fff';
    }

    let vArrayDataArray = aArrayDataArray;
    vArrayDataArray.map((aDictDataPoint) => {
      vArrayXAxisDomain.push(aDictDataPoint.date);
    });
    vArrayFilteredXAxisDomain =  vArrayXAxisDomain.filter(function(item, pos) {
      return vArrayXAxisDomain.indexOf(item) === pos;
    });
    vArrayFilteredXAxisDomain.sort();

    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendPathAndDots(vArrayDataArray, vArrayDotValueData, "graphline", "graphline",  'uuid' + vStringJoinedName, vStringColor, vStringColor, aD3fXScale, aD3fYScale, '');

    let vHTMLElGraphLineButton = document.getElementById('btn' + vDataSetName);
    vHTMLElGraphLineButton.style.backgroundColor = vStringActiveColor;
    vHTMLElDataRow.style.backgroundColor = '#0081D3';

    // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAppendValueAnnotations([], vArrayDataValueAnnotations, '', 'uuid' + vStringJoinedName, 'cLEDataAnnotationLayer', vD3fXScale, vD3fYScale, '');

    gD3.selectAll("g.annotation-connector, g.annotation-note")
        .classed("hidden", true);
    }
  } catch (e) {
    throw 'ERROR #5711161237: ' + e;
  }
};

// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fAddMergedHiddenGraphLine
 * @description A function to append the graphline for hidden days.
 * @param {array} aArrayData - An array of dictionaries with data for each coordinate.
 * @param {function} aD3fXScale - A function to set the x scale
 * @param {function} aD3fYScale - A function to set the y scale
 * @param {string} aStringTypeDisplay - A string to determine the type display. Can be '0', '1', '2', '3'
 * @param {array} aArrayAnnotations - An array of annotations.
 * @param {array} aArrayColors - An array of colors.
 * @param {array} aArrayActiveColors - An array of active colors for the graphline button.
 * @param {array} aArrayMaxLineColors - An array of max line colors.
*/
window.LiftEd.Graphing.fAddMergedHiddenGraphLine = (aArrayData, aD3fXScale, aD3fYScale, aStringTypeDisplay, aArrayAnnotations, aArrayColors, aArrayActiveColors, aArrayMaxLineColors) => {
  try {
    // window.LiftEd.UtilsCallbacks.fStartSpinner();
    let vArrayMergedUniqueDataDates = [];

    let vArrayCurrentDataDates = [];
    let vIntRangeCounter = 0;
    let vArrayXAxisRange = [];
    let vArrayData = null;
    let vD3fXScale = null;
    let vD3fYScale  = null,
        vStringTypeDisplay = null,
        vArrayAnnotations = null,
        vArrayColors = null,
        vArrayActiveColors = null,
        vArrayMaxLineColors  = null,
        vArrayModifiedAnnotations = null,
        vArrayFilteredAnnotations = null,
        vAnnotationStartDate = null,
        vPlaceHolderAnnotationStartDate = null,
        vIntGraphStartDate = null,
        vIntGraphEndDate = null,
        vAnnotationEndDate = null,
        vPlaceHolderAnnotationEndDate = null,
        vIntDomainLength = null,
        vIntRangeRatio = null,
        vIntegerStartDate = null,
        vIntegerEndDate = null,
        vIntTickFrequency = null,
      vOriginalAnnotationTextHolder = null,
      vIntColorCounter = null,
      vStringReplacementDataName = null,
      vArrayHTMLDataSubValues = null,
      vArrayHTMLDataRows = null,
      vArrayHTMLDataNames = null;

    if (aArrayData) {
      vArrayData = aArrayData;
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: aArrayData missing';
    }

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: aD3fYScale missing';
    }
    vStringTypeDisplay = aStringTypeDisplay;


    if (aArrayAnnotations) {
      vArrayAnnotations = aArrayAnnotations;
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: aArrayAnnotations missing';
    }

    if (aArrayColors) {
      vArrayColors = aArrayColors;
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: aArrayColors missing';
    }

    if (aArrayActiveColors) {
      vArrayActiveColors = aArrayActiveColors;
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: aArrayActiveColors missing';
    }

    if (aArrayMaxLineColors) {
      vArrayMaxLineColors = aArrayMaxLineColors;
    } else {
        // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: aArrayColors missing';
    }
    //comments + refactoring. 2-3 hours.
    if (window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length > 0) {
      if (!window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(99)) {

        window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').forEach( (aIntIndex) => {
          if (aIntIndex !== 99) {
            aArrayData[aIntIndex].coordinates.forEach( (aDictCoordinate) => {
              vArrayCurrentDataDates.push(aDictCoordinate.date);
            });
            vArrayMergedUniqueDataDates = vArrayMergedUniqueDataDates.concat(vArrayCurrentDataDates).unique();
          }
        });

        let vIntOnlyDate = vArrayMergedUniqueDataDates[0];
        if (vArrayMergedUniqueDataDates.length === 1) {
          vArrayMergedUniqueDataDates.unshift(vIntOnlyDate - 86400000);
          vArrayMergedUniqueDataDates.push(vIntOnlyDate + 86400000)
        }
        vArrayMergedUniqueDataDates.sort();
        if (vArrayMergedUniqueDataDates.length > 1) {
          window.LiftEd.Vars.dateStart = vArrayMergedUniqueDataDates[0];
          window.LiftEd.Vars.dateEnd = vArrayMergedUniqueDataDates[vArrayMergedUniqueDataDates.length - 1]
        }
        vArrayModifiedAnnotations = [];
        vArrayFilteredAnnotations = [];
        //add comments for long pieces of logic 3-4 hours.
        vArrayAnnotations.forEach( (aDictAnnotation) => {
          vAnnotationStartDate = new Date(aDictAnnotation.dateStart);
          vPlaceHolderAnnotationStartDate = new Date(aDictAnnotation.dateStart);
          vIntGraphStartDate = new Date(window.LiftEd.Utils.fGetVar('#5710211649', 'dateStart'));
          vIntGraphEndDate = new Date(window.LiftEd.Utils.fGetVar('#5710211649', 'dateEnd'));
          if ('dateEnd' in aDictAnnotation) {
            vAnnotationEndDate = new Date(aDictAnnotation.dateEnd);
            vPlaceHolderAnnotationEndDate = new Date(aDictAnnotation.dateEnd);
            // noinspection Annotator
            // noinspection Annotator
            if ('scopeType' !== 0 || 'scopeType' !== '0') {
              if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) >= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate.setHours(0,0,0,0)) {
                vAnnotationEndDate = new Date(aDictAnnotation.dateEnd);
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
              } else if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate.setHours(0,0,0,0)) {
                vAnnotationEndDate = new Date(aDictAnnotation.dateEnd);
                vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
              }
            } else {
              if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0).setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate.setHours(0,0,0,0)) {
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType})
              } else if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0).setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate.setHours(0,0,0,0)) {
                vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType})
              }
            }
          } else {
            // noinspection Annotator
            // noinspection Annotator
            if ('scopeType' !== 0 || 'scopeType' !== '0') {
              if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0)) {
                    vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUuid": aDictAnnotation.scopeUuid})
              }
            } else {
              if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0)) {
                    vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType})
              }
            }
          }
        });

        vArrayFilteredAnnotations.forEach( (aDictAnnotation) => {
          // noinspection JSCheckFunctionSignatures
          vArrayModifiedAnnotations.push(window.LiftEd.Graphing.fModifyAnnotationsDates(aDictAnnotation, vArrayMergedUniqueDataDates));
        });

        vIntDomainLength = vArrayMergedUniqueDataDates.length + .5;
        vIntRangeRatio = window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth')/(vIntDomainLength - 1);
        vArrayXAxisRange.push(vIntRangeCounter);
        for (let i = vArrayXAxisRange.length; i < vIntDomainLength - 1; i = vArrayXAxisRange.length) {
          vIntRangeCounter = vIntRangeCounter + vIntRangeRatio;
          vArrayXAxisRange.push(vIntRangeCounter);
        }

        vArrayXAxisRange.push(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'));
        vD3fXScale = gD3.scaleLinear().domain(vArrayMergedUniqueDataDates).range(vArrayXAxisRange);
        vD3fYScale = gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]);

        window.LiftEd.Graphing.fSetScaledLines(vD3fXScale, vD3fYScale);
        if (gD3.selectAll("#idLEYAxis")) {
          gD3.selectAll("#idLEYAxis").remove();
          gD3.selectAll("#idLEXAxis").remove();
        }
        if (!window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').includes(99) && gD3.selectAll(".cLEAnnotationsGroup")._groups[0].length > 0 ) {
            gD3.selectAll(".cLEAnnotationsGroup").remove();

          vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));
          vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));
            vIntTickFrequency = null;
            if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {
              vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
            }
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddAxes(vD3fXScale, vD3fYScale, vIntTickFrequency, window.LiftEd.Vars.label, vArrayMergedUniqueDataDates);

            // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddAnnotations(vArrayModifiedAnnotations, vD3fXScale, vD3fYScale, parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));
          vOriginalAnnotationTextHolder = document.getElementById('idLEAnnotationsTextHolder');
            if (vOriginalAnnotationTextHolder !== null) {
                while (vOriginalAnnotationTextHolder.firstChild) {
                  vOriginalAnnotationTextHolder.removeChild(vOriginalAnnotationTextHolder.firstChild)
                }
                vOriginalAnnotationTextHolder.parentNode.removeChild(vOriginalAnnotationTextHolder)
            }
            window.LiftEd.Graphing.fAddAnnotationsToTab(vArrayModifiedAnnotations);

            if (gD3.selectAll('.graphline')) {
              gD3.selectAll('.graphline').remove();
              gD3.selectAll('.cLEDataAnnotationLayer').remove();
            }


            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').forEach( (aIntIndex) => {
              if (aIntIndex !== 99) {
                if (aIntIndex > vArrayColors.length) {
                  vIntColorCounter = aIntIndex - vArrayColors.length;
                }
                else if (aIntIndex === vArrayColors.length) {
                  vIntColorCounter = 0
                } else {
                  vIntColorCounter = aIntIndex;
                }

                let vIntOriginalCount = aIntIndex;

                vStringReplacementDataName = '';
                if (!vArrayData[vIntOriginalCount].name) {
                  vStringReplacementDataName = 'Data Set ' + aIntIndex;
                } else {
                  vStringReplacementDataName = vArrayData[vIntOriginalCount].uuid;
                }
                // noinspection JSCheckFunctionSignatures
                window.LiftEd.Graphing.fAddGraphLine(vArrayData[aIntIndex].coordinates, vArrayData[aIntIndex].uuid, vD3fXScale, vD3fYScale, vStringTypeDisplay, vArrayColors[vIntColorCounter], vArrayActiveColors[vIntColorCounter], vArrayMaxLineColors[vIntColorCounter], vArrayModifiedAnnotations)
              }
            });
        } else {
          vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));
          vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));
          vIntTickFrequency = null;
          if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {
            vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
          }
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddAxes(vD3fXScale, vD3fYScale, vIntTickFrequency, window.LiftEd.Vars.label, vArrayMergedUniqueDataDates);

          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddAnnotations(vArrayModifiedAnnotations, vD3fXScale, vD3fYScale, parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));
          vOriginalAnnotationTextHolder = document.getElementById('idLEAnnotationsTextHolder');
          if (vOriginalAnnotationTextHolder !== null) {
              while (vOriginalAnnotationTextHolder.firstChild) {
                vOriginalAnnotationTextHolder.removeChild(vOriginalAnnotationTextHolder.firstChild)
              }
              vOriginalAnnotationTextHolder.parentNode.removeChild(vOriginalAnnotationTextHolder)
          }
          window.LiftEd.Graphing.fAddAnnotationsToTab(vArrayModifiedAnnotations);


          gD3.selectAll('.graphline').remove();
          gD3.selectAll('.cLEDataAnnotationLayer').remove();


          window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').forEach( (aIntIndex) => {
            if (aIntIndex !== 99) {
              if (aIntIndex > vArrayColors.length) {
                vIntColorCounter = aIntIndex - vArrayColors.length;
              }
              else if (aIntIndex === vArrayColors.length) {
                vIntColorCounter = 0
              } else {
                vIntColorCounter = aIntIndex;
              }

              let vIntOriginalCount = aIntIndex;

              vStringReplacementDataName = '';
              if (!vArrayData[vIntOriginalCount].uuid) {
                vStringReplacementDataName = 'Data Set ' + aIntIndex;
              } else {
                vStringReplacementDataName = vArrayData[vIntOriginalCount].uuid;
              }
              if (vArrayData[aIntIndex].coordinates.length > 0) {
                // noinspection JSCheckFunctionSignatures
                window.LiftEd.Graphing.fAddGraphLine(vArrayData[aIntIndex].coordinates, vArrayData[aIntIndex].uuid, vD3fXScale, vD3fYScale, vStringTypeDisplay, vArrayColors[vIntColorCounter], vArrayActiveColors[vIntColorCounter], vArrayMaxLineColors[vIntColorCounter], vArrayAnnotations)
              }
            }
          });
        }
      }
    } else {
      gD3.selectAll('.graphline').remove();
      gD3.selectAll('.cLEDataAnnotationLayer').remove();
      if (document.getElementsByClassName('cLEDataRow')) {

        vArrayHTMLDataRows = document.getElementsByClassName('cLEDataRow');
          for (let i = 0; i < vArrayHTMLDataRows.length; i++) {
            vArrayHTMLDataRows[i].style.backgroundColor = '#fff';
          }
      }

      if (document.getElementsByClassName('cLESubHeaderValues')) {
        vArrayHTMLDataSubValues = document.getElementsByClassName('cLESubHeaderValues');
          for (let i = 0; i < vArrayHTMLDataSubValues.length; i++) {
            vArrayHTMLDataSubValues[i].style.color = 'black';
          }
      }

      if ( document.getElementsByClassName('cLEDataSubHeaderName')) {

        vArrayHTMLDataNames = document.getElementsByClassName('cLEDataSubHeaderName');
        for (let i = 0; i < vArrayHTMLDataNames.length; i++) {
          vArrayHTMLDataNames[i].style.color = 'black';
        }
      }
    }
    window.LiftEd.GraphingCallbacks.fDidLoadGraph("Copyright (c) 2017 LiftEd, Incorporated. All rights reserved. CrossPlatform Graphing" + window.LiftEd.API.fGetVersionNumber());
  } catch (e) {
    throw 'ERROR #5711161238: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fAddGraphLineButtons
 * @description A function to add graph line buttons to the data table below the graph
 * @param {array} aArrayModifiedData - An array of modified data to use for coordinates and lines.
 * @param {function} aD3fXScale - A function to set the x scale
 * @param {function} aD3fYScale - A function to set the y scale
 * @param {string} aStringTypeDisplay - A string to designate what type of graph it is. Can be '0'. '1', '2', '3'
 * @param {array} aArraySummaryColumns - An array of columns for the data header.
 * @param {array} aArrayAnnotations - An array of annotations.
*/
window.LiftEd.Graphing.fAddGraphLineButtons = (aArrayModifiedData, aD3fXScale, aD3fYScale, aStringTypeDisplay, aArraySummaryColumns, aArrayAnnotations, aDictPrompts) => {
  try {
    window.LiftEd.API.fLogDebugVerbose("aArrayModifiedData = " + aArrayModifiedData);
    let vArrayModifiedData = null,
    vD3fXScale = null,
    vD3fYScale = null,
    vStringTypeDisplay = null,
    vArraySummaryColumns = null,
    vHTMLElementDataButtonContainer = null,
    vHTMLElementDataButtonHolder = null,
    vArrayDataCoordinates = [],
    vArrayAnnotations = aArrayAnnotations;




    let vRegexSplitNoSpaces = /\s*\s*/;
    let vD3fHiddenCumulativeXScale = null;
    let vD3fHiddenCumulativeYScale = null;
    let vArrayFilteredAnnotations = null;
    let vArrayModifiedAnnotations = null;
    let vAnnotationStartDate = null;
    let vAnnotationEndDate = null;
    let vPlaceHolderAnnotationStartDate = null;
    let vPlaceHolderAnnotationEndDate = null;
    let vIntGraphStartDate = null;
    let vIntGraphEndDate = null;
    let vIntegerStartDate = null;
    let vIntegerEndDate = null;
    let vIntTickFrequency = null;
    let vOriginalAnnotationTextHolder = null;
    let vArrayHTMLDataRows = null;
    let vArrayHTMLDataSubValues = null;
    let vArrayHTMLDataNames = null;
    let vHTMLElGraphLineButton = null;
    let vArrayCurrentDates = null;

    if (aArrayModifiedData) {
      vArrayModifiedData = aArrayModifiedData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241933: aArrayModifiedData missing';
    }
    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241934: aD3fXScale missing';
    }
    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241935: aD3fYScale missing';
    }
    if (aStringTypeDisplay !== null) {
      vStringTypeDisplay = aStringTypeDisplay;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241936: aStringTypeDisplay missing';
    }
    if (aArraySummaryColumns) {
      vArraySummaryColumns = aArraySummaryColumns;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241937: aArraySummaryColumns missing';
    }
    if (document.getElementById('idLEData')) {
      vHTMLElementDataButtonContainer =  document.getElementById('idLEData');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241938: document.getElementById("idLEData") missing';
    }
    if (document.getElementById('idLEData')) {
      vHTMLElementDataButtonContainer =  document.getElementById('idLEData');
      vHTMLElementDataButtonHolder = document.createElement('div');
      vHTMLElementDataButtonHolder.setAttribute('id', 'idLEDataButtonHolder');
      vHTMLElementDataButtonContainer.appendChild(vHTMLElementDataButtonHolder);
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241939: document.getElementById("idLEData") missing';
    }
    //graph line colors
    let vArrayColors = ['#39CCCC', '#9933ff', '#99ccff', '#336699', ' #33cc33', '#660099', '#990066', '#99cc66', '#996666', '#99cc99', '#99ffcc', '#cc00ff', '#cc33ff', '#cc99cc', '#ccff99', '#ff0066', '#ff0033', '#ff6633', '#ff9933', '#0066ff'];

    //active graph line colors
    let vArrayActiveColors = ['#299393', '#6d21ba', '#7098bf', '#25496d', '#289b28', '#440166', '#660144', '#71964c', '#684646', '#6d916d', '#7bcea5', '#9701bc', '#9727bc', '#a07ba0', '#97bc73', '#b50048', '#d6002a', '#ce5229', '#c17426', '#0056d8'];

    //graph line colors for max lines.
    let vArrayMaxLineColors = ['rgba(57, 204, 204, 0.5)', 'rgba(153, 51, 255, 0.5)', 'rgba(153, 204, 255, 0.5)', 'rgba(51, 102, 153, 0.5)', ' rgba(51, 204, 51, 0.5)', 'rgba(102, 0, 153, 0.5)', 'rgba(153, 0, 102, 0.5)', 'rgba(153, 204, 102, 0.5)', 'rgba(153, 102, 102, 0.5)', 'rgba(153, 204, 153, 0.5)', 'rgba(153, 255, 204, 0.5)', 'rgba(204, 51, 255, 0.5)', '#cc33ff', 'rgba(204, 153, 204, 0.5)', 'rgba(204, 255, 153, 0.5)', 'rgba(255, 0, 102, 0.5)', 'rgba(255, 0, 51, 0.5)', 'rgba(255, 102, 51, 0.5)', 'rgba(255, 153, 51, 0.5)', 'rgba(0, 102, 255)'];

    //make one array with all coordinates
    vArrayModifiedData.forEach( (aDictData) => {
        vArrayDataCoordinates.push(aDictData.coordinates)
    });
    window.array = vArrayModifiedData;
    //if more than 1 set of data, add a row for cumulative data.
    if (vArrayModifiedData.length > 1) {
      let vHTMLElementAverageDataRow = document.createElement('div');
      vHTMLElementAverageDataRow.setAttribute('class', 'cLEAverageData');
      vHTMLElementAverageDataRow.setAttribute('id', 'idLECumulativeDataRow');
      let vAverageDataButton = document.createElement('div');
      let vAverageDataName = document.createElement('div');
      vAverageDataName.setAttribute('class', 'cLEAverageDataName');
      vAverageDataName.setAttribute('id', 'idLEAverageDataName');

      vAverageDataButton.setAttribute('id', 'idLEAverageDataButton');
      vAverageDataButton.setAttribute('class', 'cLEGraphLineButton');
      vAverageDataButton.style.backgroundColor = '#006400';
      vHTMLElementAverageDataRow.appendChild(vAverageDataButton);
      vAverageDataName.innerHTML = 'Cumulative Data';
      vHTMLElementAverageDataRow.appendChild(vAverageDataName);

      vArrayCurrentDates = [];


      let vDictCumulativeData = {};

      let vArrayXAxisRange = [];
      let vIntRangeCounter = 0;
      vArrayDataCoordinates.forEach( (aDictDataSet) => {
        aDictDataSet.forEach( (aDictCoordinate) => {
          vDictCumulativeData[aDictCoordinate.date] = 0;
        });
      });

      for (let key in vDictCumulativeData) {
        vArrayCurrentDates.push(parseInt(key))
      }

      vArrayCurrentDates.sort(function(a, b) {
        return parseInt(a) - parseInt(b)
      });

      let vIntOnlyDate = vArrayCurrentDates[0];
      if (vArrayCurrentDates.length === 1) {
        vArrayCurrentDates.unshift(vIntOnlyDate - 86400000);
        vArrayCurrentDates.push(vIntOnlyDate + 86400000)
      }

      if (window.LiftEd.Utils.fGetVar('#5710251706', 'numberHandler')  === 2) {
        if (vArrayCurrentDates.length > 2) {
          window.LiftEd.Vars.dateStart = vArrayCurrentDates[0];
          window.LiftEd.Vars.dateEnd = vArrayCurrentDates[vArrayCurrentDates.length - 1]
        }
      }

      let vIntDomainLength = vArrayCurrentDates.length + .5;

      let vIntRangeRatio = window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth')/(vIntDomainLength - 1);
      vArrayXAxisRange.push(vIntRangeCounter);

      for (let i = vArrayXAxisRange.length; i < vIntDomainLength - 1; i = vArrayXAxisRange.length) {
        vIntRangeCounter = vIntRangeCounter + vIntRangeRatio;
        vArrayXAxisRange.push(vIntRangeCounter);
      }
      vArrayXAxisRange.push(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'));
      if (vArrayCurrentDates.length === 0) {

        vD3fHiddenCumulativeXScale = gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]);
        vD3fHiddenCumulativeYScale = gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]);
      } else if (window.LiftEd.Utils.fGetVar('#5709181707', 'numberHandler') === 2) {
        vD3fHiddenCumulativeXScale = gD3.scaleLinear().domain(vArrayCurrentDates).range(vArrayXAxisRange);

        vD3fHiddenCumulativeYScale = gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]);
      } else {

        vD3fHiddenCumulativeXScale = gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]);
        vD3fHiddenCumulativeYScale = gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]);
      }

      window.LiftEd.Graphing.fSetScaledLines(vD3fXScale, vD3fYScale);


      //move annotations xscaling for hidden graphline into a function. not DRY. 2 hours.
      vArrayModifiedAnnotations = [];

      vArrayFilteredAnnotations = [];

      vArrayModifiedAnnotations = [];
      if (vArrayAnnotations) {
        vArrayAnnotations.forEach( (aDictAnnotation) => {

          vAnnotationStartDate = new Date(aDictAnnotation.dateStart);

          vPlaceHolderAnnotationStartDate = new Date(aDictAnnotation.dateStart);
          if (vArrayCurrentDates.length >= 1) {

            vIntGraphStartDate = new Date(parseInt(vArrayCurrentDates[0]));

            vIntGraphEndDate = new Date(parseInt(vArrayCurrentDates[vArrayCurrentDates.length - 1]));
          } else {

            vIntGraphStartDate = new Date(window.LiftEd.Utils.fGetVar('#5710191701', 'dateStart'));
            vIntGraphEndDate = new Date(window.LiftEd.Utils.fGetVar('#5710191701', 'dateEnd'))
          }

          let vStartDateWithinGraphDateRange = new Date(vPlaceHolderAnnotationStartDate).setHours(0,0,0,0) >= new Date(vIntGraphStartDate).setHours(0,0,0,0) && new Date(vPlaceHolderAnnotationStartDate).setHours(0,0,0,0) <= new Date(vIntGraphEndDate).setHours(0,0,0,0);
          if ('dateEnd' in aDictAnnotation) {

            vAnnotationEndDate = new Date(aDictAnnotation.dateEnd);
            vPlaceHolderAnnotationEndDate = new Date(aDictAnnotation.dateEnd);
            let vEndDateWithinGraphDateRange = new Date(vPlaceHolderAnnotationEndDate).setHours(0,0,0,0) <= new Date(vIntGraphEndDate).setHours(0,0,0,0);
            let vEndDateGreaterStartDate = new Date(vPlaceHolderAnnotationEndDate).setHours(0,0,0,0) >= new Date(vPlaceHolderAnnotationStartDate).setHours(0,0,0,0);
            // noinspection Annotator
            // noinspection Annotator
              if (vStartDateWithinGraphDateRange && vEndDateWithinGraphDateRange && vEndDateGreaterStartDate) {
                if ('scopeUUID' in aDictAnnotation) {
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
                } else {
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType})
                }
              } else if (vStartDateWithinGraphDateRange && vEndDateWithinGraphDateRange && vEndDateGreaterStartDate) {
                if ('scopeUUID' in aDictAnnotation) {
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
                }
                else{
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid':     aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType})
                }
              }
          } else {
            if (vStartDateWithinGraphDateRange) {
                if ('scopeUUID' in aDictAnnotation) {
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
                } else {
                  vArrayFilteredAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType})
                }
            }
          }
        });

        vArrayFilteredAnnotations.forEach( (aDictAnnotation) => {
          // noinspection JSCheckFunctionSignatures
          vArrayModifiedAnnotations.push(window.LiftEd.Graphing.fModifyAnnotationsDates(aDictAnnotation, vArrayCurrentDates));
        });
      }
      vHTMLElementAverageDataRow.addEventListener('click', () => {
        // window.LiftEd.UtilsCallbacks.fStartSpinner();
        if (window.LiftEd.Utils.fGetVar('#5710061514', 'numberHandler') === 2) {
          if (gD3.selectAll("#idLEYAxis")) {
            gD3.selectAll("#idLEYAxis").remove();
            gD3.selectAll("#idLEXAxis").remove();
          }
          vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));

          vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));


          vIntTickFrequency = null;
          if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {

            vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
          }
          window.LiftEd.Graphing.fSetScaledLines(vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale);
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddAxes(vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, vIntTickFrequency, window.LiftEd.Vars.label, vArrayCurrentDates);

          if (gD3.selectAll(".cLEAnnotationsGroup")._groups[0].length > 0) {
            gD3.selectAll(".cLEAnnotationsGroup").remove();
            if (gD3.selectAll('.cLEDataAnnotationLayer')) {
              gD3.selectAll('.graphline').remove();
              gD3.selectAll('.cLEDataAnnotationLayer').remove();
            }

            vOriginalAnnotationTextHolder = document.getElementById('idLEAnnotationsTextHolder');
            if (vOriginalAnnotationTextHolder !== null) {
                while (vOriginalAnnotationTextHolder.firstChild) {
                  vOriginalAnnotationTextHolder.removeChild(vOriginalAnnotationTextHolder.firstChild)
                }
                vOriginalAnnotationTextHolder.parentNode.removeChild(vOriginalAnnotationTextHolder)
            }
            // noinspection JSCheckFunctionSignatures
            window.LiftEd.Graphing.fAddAnnotations(vArrayModifiedAnnotations, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));
            window.LiftEd.Graphing.fAddAnnotationsToTab(vArrayModifiedAnnotations)
          }

          // noinspection JSCheckFunctionSignatures
          vArrayCoordinatesSets = [];
          vArrayDataCoordinates.forEach( (aArrayDataSet) => {
            vDictCoordinateSet = {};
            vDictCoordinateSet.coordinates = aArrayDataSet;
            vArrayCoordinatesSets.push(vDictCoordinateSet);
          })
          window.LiftEd.Graphing.fHiddenDaysPrompts(vArrayCoordinatesSets, aDictPrompts);
          window.LiftEd.Graphing.fAddCumulativeGraphLine(vArrayDataCoordinates, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, '#006400', vStringTypeDisplay, 'true', vArrayAnnotations);
          // add hiddendaysprompts here


          for (let i = 0; i < window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length; i++) {
            // noinspection UnnecessaryLocalVariableJS
            let vIntOriginalCount = i;
            if (  window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays')[i] !== 99) {
              let vStringReplacementDataName = '';
              if (i > 0) {
                if (!vArrayModifiedData[i - 1].uuid) {
                  vStringReplacementDataName = 'Data Set ' + (i - 1);
                } else {
                  vStringReplacementDataName = vArrayModifiedData[vIntOriginalCount].uuid;
                }
                // noinspection JSCheckFunctionSignatures
                window.LiftEd.Graphing.fAddGraphLine(vArrayModifiedData[i - 1].coordinates, vArrayModifiedData[i - 1].uuid, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, vStringTypeDisplay, vArrayColors[i - 1], vArrayActiveColors[i - 1], vArrayMaxLineColors[i - 1], vArrayAnnotations);
              }
            }
          }
        } else {
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddCumulativeGraphLine(vArrayDataCoordinates, vD3fXScale, vD3fYScale, '#006400', vStringTypeDisplay, 'true', vArrayAnnotations);
        }
         window.LiftEd.GraphingCallbacks.fDidLoadGraph("Copyright (c) 2017 LiftEd, Incorporated. All rights reserved. CrossPlatform Graphing" + window.LiftEd.API.fGetVersionNumber());
      });
      vHTMLElementDataButtonHolder.appendChild(vHTMLElementAverageDataRow);
    }
    //add data tab headers
    for (let i = 0; i < vArraySummaryColumns.length; i++) {
      if (i === 0) {

        let vHTMLElDataSubHeader = document.createElement("DIV");
        vHTMLElDataSubHeader.setAttribute('class', 'cLEDataFirstSubHeader');
        vHTMLElDataSubHeader.innerHTML = vArraySummaryColumns[i];

        let vDataSubHeaderHolder = document.getElementById('idLEDataTabHeading');
        vDataSubHeaderHolder.appendChild(vHTMLElDataSubHeader);
      } else {
        let vHTMLElDataSubHeader = document.createElement("DIV");
        vHTMLElDataSubHeader.setAttribute('class', 'cLEDataSubHeader');
        vHTMLElDataSubHeader.innerHTML = vArraySummaryColumns[i];

        let vDataSubHeaderHolder = document.getElementById('idLEDataTabHeading');
        vDataSubHeaderHolder.appendChild(vHTMLElDataSubHeader);
      }
    }

    //add graphline buttons
    for (let i = 0; i < vArrayModifiedData.length; i++) {
      let vHTMLElementDataRow = document.createElement("DIV");
      let vHTMLElementDataButton = document.createElement("DIV");
      let vHTMLElementDataButtonAndNameHolder = document.createElement("DIV");
      vHTMLElementDataButtonAndNameHolder.setAttribute('class', 'cLEDataButtonHolder');
      let vIntColorCounter = null;
      let vStringReplacementDataName = '';
      if (i > vArrayColors.length) {
        vIntColorCounter = i % vArrayColors.length;
      }
      else if (i % vArrayColors.length === 0) {

        vIntColorCounter = 0
      } else {
        vIntColorCounter = i;
      }
      let vIntOriginalCount = i;
      if (!vArrayModifiedData[vIntOriginalCount].uuid) {
        vStringReplacementDataName = 'Data Set ' + i;
      } else {
        vStringReplacementDataName = vArrayModifiedData[vIntOriginalCount].uuid;
      }

      vHTMLElementDataButton.setAttribute('id','btn' + vArrayModifiedData[vIntOriginalCount].uuid);
      vHTMLElementDataButton.setAttribute('class', 'cLEGraphLineButton');
      vHTMLElementDataButton.style.backgroundColor = vArrayColors[vIntColorCounter];
      vHTMLElementDataButtonAndNameHolder.appendChild(vHTMLElementDataButton);
      vHTMLElementDataRow.appendChild(vHTMLElementDataButtonAndNameHolder);
      vHTMLElementDataRow.setAttribute('id', 'row' + vArrayModifiedData[vIntOriginalCount].uuid);
      //set up hidden days logic here

      //clean logic up /add comments. 2-3 hours.
      //TODO: ENG-1020 Refactoring. OKed
      vHTMLElementDataRow.addEventListener("click", () => {
        // window.LiftEd.UtilsCallbacks.fStartSpinner();
        if (window.LiftEd.Utils.fGetVar('#5710061514', 'numberHandler') === 2) {
          //default state
          if (window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(99) &&  window.LiftEd.Utils.fGetVar('#5709191932', 'cumulativeManuallyTurnedOn') === 'false') {
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(vIntOriginalCount);
            let vIntIndex = window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').indexOf(99);
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').splice(vIntIndex, 1);
            gD3.selectAll('.cLEAverageMaxGraphLine').remove();
            gD3.selectAll('.cLEAverageGraphLine').remove( );
            gD3.selectAll('#cLEAverageAnnotations').remove();
            gD3.selectAll('#cLEAverageMaxAnnotations').remove();
            document.getElementById('idLEAverageDataButton').style.backgroundColor = '#006400';
            window.LiftEd.Vars.showCumulativeLine = 'false';
            document.getElementById('idLECumulativeDataRow').style.backgroundColor = '#fff';
            document.getElementById('idLEAverageDataName').className = 'cLEAverageDataName';

            // noinspection JSCheckFunctionSignatures
            window.LiftEd.Graphing.fAddMergedHiddenGraphLine(vArrayModifiedData, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, vStringTypeDisplay, vArrayAnnotations, vArrayColors, vArrayActiveColors, vArrayMaxLineColors)
          }
          //manually turned on cumulative line. doesnt include current data set graph line
          else if (window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(99) &&  window.LiftEd.Utils.fGetVar('#5709191932', 'cumulativeManuallyTurnedOn') === 'true' && !window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(vIntOriginalCount)) {
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(vIntOriginalCount);
            // noinspection JSCheckFunctionSignatures
            window.LiftEd.Graphing.fAddGraphLine(vArrayModifiedData[vIntOriginalCount].coordinates, vArrayModifiedData[vIntOriginalCount].uuid, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, vStringTypeDisplay, vArrayColors[vIntColorCounter], vArrayActiveColors[vIntColorCounter], vArrayMaxLineColors[vIntColorCounter], vArrayAnnotations);
          }
          //does not have cumulative and doesnt have current date set.
          else if (!window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(99) && !window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(vIntOriginalCount)) {
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(vIntOriginalCount);
            for (let i = 0; i < window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length; i++) {
              if (document.getElementById('uuid' + vArrayModifiedData[window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays')[i]].uuid)) {
                  gD3.selectAll('#' + 'uuid'+ vArrayModifiedData[window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays')[i]].uuid).remove();
              }
            }
            // noinspection JSCheckFunctionSignatures
            let vArrayHiddenPromptsData = [];
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').forEach( (aIntPromptsDataIndex) => {
              vArrayHiddenPromptsData.push(vArrayModifiedData[aIntPromptsDataIndex]);
            })

            window.LiftEd.Graphing.fHiddenDaysPrompts(vArrayHiddenPromptsData, aDictPrompts)

            window.LiftEd.Graphing.fAddMergedHiddenGraphLine(vArrayModifiedData, vD3fXScale, vD3fYScale, vStringTypeDisplay, vArrayAnnotations, vArrayColors, vArrayActiveColors, vArrayMaxLineColors);
          } else if (window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(vIntOriginalCount)) {
            let vIntIndex = window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').indexOf(vIntOriginalCount);
            if (vIntIndex > -1) {
                if (window.LiftEd.Utils.fGetVar('#5710171521', 'mergedArrays').includes(99) ) {
                  vArrayHTMLDataRows = document.getElementsByClassName('cLEDataRow');
                  vArrayHTMLDataRows.item(vIntOriginalCount).style.backgroundColor = '#fff';

                  vArrayHTMLDataSubValues = document.getElementsByClassName('cLEDataRow').item(vIntOriginalCount);
                  for (let i = 0; i < vArrayHTMLDataSubValues.childNodes.length; i++) {
                    if (vArrayHTMLDataSubValues.childNodes[i].className === 'cLESubHeaderValues') {
                      vArrayHTMLDataSubValues.childNodes[i].style.color = 'black';
                    }
                  }

                  vArrayHTMLDataNames = document.getElementsByClassName('cLEDataSubHeaderName');
                  vArrayHTMLDataNames[vIntOriginalCount].style.color = 'black';
                } else {
                  vHTMLElGraphLineButton = null;
                  for (let i = 0; i < window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length; i++) {
                    if (document.getElementById('uuid' + vArrayModifiedData[window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays')[i]].uuid)) {
                        gD3.selectAll('#' + 'uuid'+ vArrayModifiedData[window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays')[i]].uuid).remove();
                    }
                  }
                  if (document.getElementById('btn' + vArrayModifiedData[vIntOriginalCount].uuid)) {

                    vHTMLElGraphLineButton = document.getElementById('btn' + vArrayModifiedData[vIntOriginalCount].uuid);
                  }
                  vHTMLElGraphLineButton.style.backgroundColor = vArrayColors[vIntOriginalCount];

                  if (document.getElementsByClassName('cLEDataRow')) {

                    vArrayHTMLDataRows = document.getElementsByClassName('cLEDataRow');
                      vArrayHTMLDataRows.item(vIntOriginalCount).style.backgroundColor = '#fff';
                  }
                  if (document.getElementsByClassName('cLESubHeaderValues')) {

                    vArrayHTMLDataSubValues = document.getElementsByClassName('cLEDataRow').item(vIntOriginalCount);
                      for (let i = 0; i < vArrayHTMLDataSubValues.childNodes.length; i++) {
                        if (vArrayHTMLDataSubValues.childNodes[i].className === 'cLESubHeaderValues') {
                          vArrayHTMLDataSubValues.childNodes[i].style.color = 'black';
                        }
                      }
                  }

                  if ( document.getElementsByClassName('cLEDataSubHeaderName')) {

                    vArrayHTMLDataNames = document.getElementsByClassName('cLEDataSubHeaderName');
                    vArrayHTMLDataNames[vIntOriginalCount].style.color = 'black';
                  }
                }
                if (document.getElementById('uuid' + vStringReplacementDataName)) {
                  gD3.selectAll('#' + 'uuid'+ vStringReplacementDataName).remove();
                }
                if (vArrayModifiedData.length <= 1) {
                  window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').splice(vIntIndex, 1);
                  gD3.selectAll('.graphline').remove();
                  gD3.selectAll('.cLEDataAnnotationLayer').remove();
                } else {
                  window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').splice(vIntIndex, 1);
                  // noinspection JSCheckFunctionSignatures
                  window.LiftEd.Graphing.fAddMergedHiddenGraphLine(vArrayModifiedData, vD3fXScale, vD3fYScale, vStringTypeDisplay, vArrayAnnotations, vArrayColors, vArrayActiveColors, vArrayMaxLineColors)
                }
            }
          } else {
            window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(vIntOriginalCount);
            // noinspection JSCheckFunctionSignatures
            window.LiftEd.Graphing.fAddMergedHiddenGraphLine(vArrayModifiedData, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, vStringTypeDisplay, vArrayAnnotations, vArrayColors, vArrayActiveColors, vArrayMaxLineColors)
          }
        } else {
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddGraphLine(vArrayModifiedData[vIntOriginalCount].coordinates, vArrayModifiedData[vIntOriginalCount].uuid, vD3fXScale, vD3fYScale, vStringTypeDisplay, vArrayColors[vIntColorCounter], vArrayActiveColors[vIntColorCounter], vArrayMaxLineColors[vIntColorCounter], vArrayAnnotations);
        }
          window.LiftEd.GraphingCallbacks.fDidLoadGraph("Copyright (c) 2017 LiftEd, Incorporated. All rights reserved. CrossPlatform Graphing" + window.LiftEd.API.fGetVersionNumber());
      });
      vHTMLElementDataRow.setAttribute('class', 'cLEDataRow');
      vHTMLElementDataButtonHolder.appendChild(vHTMLElementDataRow);
      if (vArrayModifiedData.length === 1) {
        for (let j = 0; j < vArrayModifiedData[vIntOriginalCount].summaryData.length; j++) {
          let vHTMLElDataSubheader = document.createElement("DIV");
          vRegexSplitNoSpaces = /\s*\s*/;

          let vStringJoinedName = 'text' + vArrayModifiedData[vIntOriginalCount].uuid;

          vHTMLElDataSubheader.setAttribute('id', vStringJoinedName);
          if (vArrayModifiedData[vIntOriginalCount].name && j === 0) {
            vHTMLElDataSubheader.innerHTML = vArrayModifiedData[vIntOriginalCount].name;
          } else {
            vHTMLElDataSubheader.innerHTML = vArrayModifiedData[vIntOriginalCount].summaryData[j];
          }
          if (j === 0) {
              vHTMLElDataSubheader.setAttribute('class', 'cLEDataSubHeaderName');
              vHTMLElementDataButtonAndNameHolder.appendChild(vHTMLElDataSubheader);
          } else {
              vHTMLElDataSubheader.setAttribute('class', 'cLESubHeaderValues');
              vHTMLElementDataRow.appendChild(vHTMLElDataSubheader);

          }
        }
        if (window.LiftEd.Utils.fGetVar('#5710061514', 'numberHandler') ===  2) {
          window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').push(vIntOriginalCount);
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddMergedHiddenGraphLine(vArrayModifiedData, vD3fXScale, vD3fYScale, vStringTypeDisplay, vArrayAnnotations, vArrayColors, vArrayActiveColors, vArrayMaxLineColors)
        } else {
          vIntTickFrequency= null;

          vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));

          vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));
          if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {

            vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
          }
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddAxes(vD3fXScale, vD3fYScale, vIntTickFrequency, window.LiftEd.Utils.fGetVar('#5710232038', 'label'));
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddGraphLine(vArrayModifiedData[vIntOriginalCount].coordinates, vArrayModifiedData[vIntOriginalCount].uuid, vD3fXScale, vD3fYScale, vStringTypeDisplay, vArrayColors[vIntColorCounter], vArrayActiveColors[vIntColorCounter], vArrayMaxLineColors[vIntColorCounter], vArrayAnnotations)
        }
      }
      //add summarydata to data tab
      if (vArrayModifiedData.length > 1) {
        for (let j = 0; j < vArrayModifiedData[vIntOriginalCount].summaryData.length; j++) {
          let vHTMLElDataSubheader = document.createElement("DIV");
          vRegexSplitNoSpaces = /\s*\s*/;

          let vStringJoinedName = 'text' + vArrayModifiedData[vIntOriginalCount].uuid;

          vHTMLElDataSubheader.setAttribute('id', vStringJoinedName);
          if (vArrayModifiedData[vIntOriginalCount].name && j === 0) {
            vHTMLElDataSubheader.innerHTML = vArrayModifiedData[vIntOriginalCount].name;
          } else {
            vHTMLElDataSubheader.innerHTML = vArrayModifiedData[vIntOriginalCount].summaryData[j];
          }

          if (j === 0) {
              vHTMLElDataSubheader.setAttribute('class', 'cLEDataSubHeaderName');
              vHTMLElementDataButtonAndNameHolder.appendChild(vHTMLElDataSubheader);
          } else {
              vHTMLElDataSubheader.setAttribute('class', 'cLESubHeaderValues');
              vHTMLElementDataRow.appendChild(vHTMLElDataSubheader);
          }
        }
      }
      }
      if (vArrayDataCoordinates.length > 1 && window.LiftEd.Utils.fGetVar('#509181537', 'showCumulativeLine') === 'true') {

        vIntTickFrequency = null;

        vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));
      vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));
       if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {
         vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
       }
      if ( window.LiftEd.Utils.fGetVar('#509181537', 'numberHandler') === 2) {
        if (gD3.selectAll("#idLEYAxis")) {
          gD3.selectAll("#idLEYAxis").remove();
          gD3.selectAll("#idLEXAxis").remove();
        }
        vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));
        vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));

        vIntTickFrequency = null;
        if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {
          vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
        }
        window.LiftEd.Graphing.fSetScaledLines(vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale);
        // noinspection Annotator
      window.LiftEd.Graphing.fAddAxes(vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, vIntTickFrequency, window.LiftEd.Vars.label, vArrayCurrentDates);

        if (gD3.selectAll(".cLEAnnotationsGroup")._groups[0].length > 0) {
          gD3.selectAll(".cLEAnnotationsGroup").remove();
          if (gD3.selectAll('.cLEDataAnnotationLayer')) {
            gD3.selectAll('.graphline').remove();
            gD3.selectAll('.cLEDataAnnotationLayer').remove();
          }
          vOriginalAnnotationTextHolder = document.getElementById('idLEAnnotationsTextHolder');
          if (vOriginalAnnotationTextHolder !== null) {
              while (vOriginalAnnotationTextHolder.firstChild) {
                vOriginalAnnotationTextHolder.removeChild(vOriginalAnnotationTextHolder.firstChild)
              }
              vOriginalAnnotationTextHolder.parentNode.removeChild(vOriginalAnnotationTextHolder)
          }
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddAnnotations(vArrayModifiedAnnotations, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));
          window.LiftEd.Graphing.fAddAnnotationsToTab(vArrayModifiedAnnotations)
        }
        // noinspection JSCheckFunctionSignatures
          vArrayCoordinatesSets = [];
          vArrayDataCoordinates.forEach( (aArrayDataSet) => {
            vDictCoordinateSet = {};
            vDictCoordinateSet.coordinates = aArrayDataSet;
            vArrayCoordinatesSets.push(vDictCoordinateSet);
          })
          window.LiftEd.Graphing.fHiddenDaysPrompts(vArrayCoordinatesSets, aDictPrompts)

          window.LiftEd.Graphing.fAddCumulativeGraphLine(vArrayDataCoordinates, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, '#006400', vStringTypeDisplay, 'true', vArrayAnnotations);


        for (let i = 0; i < window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays').length; i++) {
          if (  window.LiftEd.Utils.fGetVar('#5710201559', 'mergedArrays')[i] !== 99) {
            let vStringReplacementDataName = '';
            if (i > 0) {
              if (!vArrayModifiedData[i - 1].uuid) {
                vStringReplacementDataName = 'Data Set ' + (i - 1);
              } else {
                // noinspection Annotator
                vStringReplacementDataName = vArrayModifiedData[vIntOriginalCount].uuid;
              }
              // noinspection JSCheckFunctionSignatures
              window.LiftEd.Graphing.fAddGraphLine(vArrayModifiedData[i - 1].coordinates, vArrayModifiedData[i - 1].uuid, vD3fHiddenCumulativeXScale, vD3fHiddenCumulativeYScale, vStringTypeDisplay, vArrayColors[i - 1], vArrayActiveColors[i - 1], vArrayMaxLineColors[i - 1], vArrayAnnotations);
            }
          }
        }
      } else {
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAddCumulativeGraphLine(vArrayDataCoordinates, gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181705', 'xMin')) - 86400000, parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]), gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]), '#006400', vStringTypeDisplay, 'true', vArrayAnnotations);
      }
    }
  } catch (e) {
    throw 'ERROR #5711161239: ' + e;
  }
};

//add comments. 30 minutes


// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
/**
 * @memberof Graphing
 * @function fCreateCheckboxes
 * @description Creates checkboxes and appends them to the panels below the graph or onto the options/custom annotations modal.
 * @param {HTMLElement} aHTMLELCheckboxContainer - A HTML Element to append the checkbox to.
 * @param {string} aStrCheckboxType -  A string for the checkbox type.
 * @param {string} aStrCheckboxbHolderID - A string for the checkbox holder's id.
 * @param {string} aStrCheckboxID - A string for the checkbox id.
 * @param {string} aStrCheckboxClass - A string for the checkbox class.
 * @param {boolean} aBooleanCheckboxChecked - A boolean indicating if the checkbox is checked or not.
 * @param {string} aStrCheckboxLabelFor - A string for the checkbox label's for attribute.
 * @param {string} aStrCheckboxLabelClass - A string for the checkbox label's class.
 * @param {string} aStrCheckboxLabelInnerHTML - A string to display on the HTML DOM.
 * @param {string} aStrCheckboxName - A string for the checkbox's name.
*/
//TODO: ENG-1020 Refactoring. OKed
window.LiftEd.Graphing.fCreateCheckboxes = (aHTMLELCheckboxContainer, aStrCheckboxbHolderID, aStrCheckboxID, aStrCheckboxClass, aBooleanCheckboxChecked, aStrCheckboxType, aStrCheckboxLabelFor, aStrCheckboxLabelClass, aStrCheckboxLabelInnerHTML, aStrCheckboxName) => {
  try {
    let vHTMLELCheckboxContainer = null,
        vStrCheckboxbHolderID = null,
        vStrCheckboxID = null;
        // noinspection CommaExpressionJS
    // noinspection JSUnusedLocalSymbols
    let vStrCheckboxClass = null,
        vBooleanCheckboxChecked = null,
        vStrCheckboxType = null,
        vStrCheckboxLabelFor = null,
        vStrCheckboxLabelClass = null,
        vStrCheckboxName = aStrCheckboxName,
        vStrCheckboxLabelInnerHTML = null,
        vHTMLElCheckBoxHolder = null,
        vHTMLElCheckBox = null,
        vHTMLElCheckBoxLabel = null;


      if (aHTMLELCheckboxContainer) {
        vHTMLELCheckboxContainer = aHTMLELCheckboxContainer;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142350: aHTMLELCheckboxContainer missing';
      }

      if (aStrCheckboxbHolderID) {
        vStrCheckboxbHolderID = aStrCheckboxbHolderID;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142351: aStrCheckboxbHolderID missing';
      }

      if (aStrCheckboxID) {
        vStrCheckboxID = aStrCheckboxID;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142352: aStrCheckboxID missing';
      }

      if (aStrCheckboxClass) {
        vStrCheckboxClass = aStrCheckboxClass;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142353: aStrCheckboxClass missing';
      }

      if (aBooleanCheckboxChecked) {
        vBooleanCheckboxChecked = aBooleanCheckboxChecked;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142354: aBooleanCheckboxChecked missing';
      }

      if (aStrCheckboxType) {
        vStrCheckboxType = aStrCheckboxType;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142355: aStrCheckboxType missing';
      }

      if (aStrCheckboxLabelFor) {
        vStrCheckboxLabelFor = aStrCheckboxLabelFor;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142356: aStrCheckboxLabelFor missing';
      }

      if (aStrCheckboxLabelClass) {
        vStrCheckboxLabelClass = aStrCheckboxLabelClass;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142357: aStrCheckboxLabelClass missing';
      }

      if (aStrCheckboxLabelInnerHTML) {
        vStrCheckboxLabelInnerHTML = aStrCheckboxLabelInnerHTML;
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5711142359: aStrCheckboxLabelInnerHTML missing';
      }

      vHTMLElCheckBoxHolder = document.createElement('div');
      vHTMLElCheckBoxHolder.setAttribute('id', vStrCheckboxbHolderID);
      vHTMLELCheckboxContainer.appendChild(vHTMLElCheckBoxHolder);

      vHTMLElCheckBox = document.createElement('input');
      vHTMLElCheckBox.setAttribute('id', vStrCheckboxID);
      vHTMLElCheckBox.setAttribute('class', vStrCheckboxClass);
      // noinspection JSCheckFunctionSignatures
      vHTMLElCheckBox.setAttribute('checked', true);
      vHTMLElCheckBox.setAttribute('type', 'checkbox');

      vHTMLElCheckBoxLabel = document.createElement('label');
      vHTMLElCheckBoxLabel.setAttribute('for', vStrCheckboxLabelFor);
      if (vStrCheckboxName) {
        vHTMLElCheckBoxLabel.setAttribute('id', vStrCheckboxName);
      }
      vHTMLElCheckBoxLabel.setAttribute('class', vStrCheckboxLabelClass);
      vHTMLElCheckBoxLabel.innerHTML += vStrCheckboxLabelInnerHTML;
      vHTMLElCheckBoxHolder.appendChild(vHTMLElCheckBox);
      vHTMLElCheckBoxHolder.appendChild(vHTMLElCheckBoxLabel);
  } catch (e) {
    throw 'ERROR #5711161239: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fAddTacticsAndNotesButtons
 * @description Adds tactics and notes buttons to the table underneath the graph
 * @param {array} aArrayTacticsData - An array of tactics data
 * @param {array} aArrayNotesData -  An array of notes data
 * @param {array} aArrayAnnotationsData - An array of annotations data
 * @param {function} aD3fXScale - A function to set the x scale
 * @param {function} aD3fYScale - A function to set the y scale
 * @param {number} aIntYMax - An integer of the y axis' max value.
*/
window.LiftEd.Graphing.fAddTacticsAndNotesButtons = (aArrayTacticsData, aArrayNotesData, aArrayAnnotationsData, aD3fXScale, aD3fYScale, aIntYMax) => {
  try {
    // noinspection JSUnusedLocalSymbols
    // noinspection JSUnusedLocalSymbols
    // noinspection JSUnusedLocalSymbols
    // noinspection JSUnusedLocalSymbols
    let vArrayTacticsData = null,
    vArrayNotesData = null,
    vArrayAnnotationsData = null,
    vD3fXScale = null,
    vD3fYScale = null,
    vIntYMax = aIntYMax,
    vHTMLElTacticsCheckBoxContainer = null,
    vHTMLElTacticCheckBoxHolder = null,
    vHTMLElTacticLineCheckBox = null,
    vHTMLElTacticLineCheckBoxLabel = null,
    vHTMLElBreakLine = null,
    vHTMLElNotesCheckBoxContainer = null,
    vHTMLElNotesCheckBoxHolder = null,
    vHTMLElAnnotationsCheckBoxContainer = null,
    vHTMLElAnnotationsCheckBoxHolder = null,
    vHTMLElBreakLine2 = null,
    vNotesLineCheckBox = null,
    vNotesLineCheckBoxLabel = null,
    vAnnotationsLineCheckBox = null,
    vAnnotationsLineCheckBoxLabel = null,
    vAddAnnotationsButton = null;

    if (aArrayTacticsData !== null) {
      vArrayTacticsData = aArrayTacticsData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241948: aArrayTacticsData missing';
    }
    if (aArrayNotesData !== null) {
      vArrayNotesData = aArrayNotesData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241949: aArrayNotesData missing';
    }
    if (aArrayAnnotationsData !== null) {
      vArrayAnnotationsData = aArrayAnnotationsData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241949: aArrayAnnotationsData missing';
    }
    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241950: aD3fXScale missing';
    }
    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241951: aD3fYScale missing';
    }
    //remove previous buttons
    if (document.getElementById('idLETacticButtonHolder')) {
      document.getElementById('idLETacticButtonHolder').parentNode.removeChild(document.getElementById('idLETacticButtonHolder'));
    }

    if (document.getElementById('idLENoteButtonHolder')) {
        document.getElementById('idLENoteButtonHolder').parentNode.removeChild(document.getElementById('idLENoteButtonHolder'));
    }

    if (document.getElementById('idLEAnnotationButtonHolder')) {
        document.getElementById('idLEAnnotationButtonHolder').parentNode.removeChild(document.getElementById('idLEAnnotationButtonHolder'));
    }
    //add both tactics and notes buttons.
    if (vArrayNotesData.length > 0 && vArrayTacticsData.length > 0) {
      //add tactics button
      if (document.getElementById('idLETacticsHeader')) {
        vHTMLElTacticsCheckBoxContainer = document.getElementById('idLETacticsHeader');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5709241951: document.getElementById("idLETacticsHeader") missing';
      }

      // vHTMLElTacticCheckBoxHolder = document.createElement('div');
      //     vHTMLElTacticCheckBoxHolder.setAttribute('id', 'idLETacticButtonHolder');
      //     vHTMLElTacticsCheckBoxContainer.appendChild(vHTMLElTacticCheckBoxHolder);
      //
      // vHTMLElTacticLineCheckBox = document.createElement("INPUT");
      // vHTMLElTacticLineCheckBox.setAttribute('id', 'idLETacticsButton');
      // vHTMLElTacticLineCheckBox.setAttribute('class', 'cLECheckBox');
      // // noinspection JSCheckFunctionSignatures
      // vHTMLElTacticLineCheckBox.setAttribute('checked', true);
      // vHTMLElTacticLineCheckBox.setAttribute('type', 'checkbox');
      // vHTMLElTacticLineCheckBoxLabel = document.createElement('label');
      // vHTMLElTacticLineCheckBoxLabel.setAttribute('for', 'idLETacticsButton');
      // vHTMLElTacticLineCheckBoxLabel.setAttribute('class', 'cLECheckBoxText');
      // vHTMLElTacticCheckBoxHolder.appendChild(vHTMLElTacticLineCheckBox);
      // vHTMLElTacticCheckBoxHolder.appendChild(vHTMLElTacticLineCheckBoxLabel);
      //
      // vHTMLElTacticLineCheckBoxLabel.innerHTML += 'Display Phase Change Lines on Graph';

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fCreateCheckboxes(vHTMLElTacticsCheckBoxContainer, 'idLETacticButtonHolder', 'idLETacticsButton', 'cLECheckBox', true, 'checkbox', 'idLETacticsButton', 'cLECheckBoxText', 'Display Phase Change Lines on Graph');



      vHTMLElTacticLineCheckBox = document.getElementById('idLETacticsButton');
      vHTMLElTacticLineCheckBox.addEventListener("click", () => {window.LiftEd.Graphing.fAddTacticsAndNoteLines(vArrayTacticsData, vArrayNotesData, vD3fXScale, vD3fYScale, vIntYMax, 'tactics')});

      vHTMLElTacticCheckBoxHolder = document.getElementById('idLETacticButtonHolder');
      vHTMLElBreakLine = document.createElement('br');
      vHTMLElTacticCheckBoxHolder.appendChild(vHTMLElBreakLine);

      //adds tactics
      window.LiftEd.Graphing.fAddTacticsToTab (aArrayTacticsData);

      //add tactics and notes buttons
      vHTMLElNotesCheckBoxContainer = document.getElementById('idLENotesHeader');
      // vHTMLElNotesCheckBoxHolder = document.createElement('div');
      //     vHTMLElNotesCheckBoxHolder.setAttribute('id', 'idLENoteButtonHolder');
      //     vHTMLElNotesCheckBoxContainer.appendChild(vHTMLElNotesCheckBoxHolder);
      //
      //
      //
      // vNotesLineCheckBox = document.createElement("INPUT");
      // vNotesLineCheckBox.setAttribute('id', 'idLENotesButton');
      // vNotesLineCheckBox.setAttribute('type', 'checkbox');
      // // noinspection JSCheckFunctionSignatures
      // vNotesLineCheckBox.setAttribute('checked', true);
      // vNotesLineCheckBox.setAttribute('class', 'cLECheckBox');
      //
      // vNotesLineCheckBoxLabel = document.createElement('label');
      // vNotesLineCheckBoxLabel.setAttribute('for', 'idLENotesButton');
      // vNotesLineCheckBoxLabel.setAttribute('class', 'cLECheckBoxText');
      // vNotesLineCheckBoxLabel.innerHTML = 'Display Notes on Graph;';
      // vHTMLElNotesCheckBoxHolder.appendChild(vNotesLineCheckBox);
      // vHTMLElNotesCheckBoxHolder.appendChild(vNotesLineCheckBoxLabel);
      //
      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fCreateCheckboxes(vHTMLElNotesCheckBoxContainer, 'idLENoteButtonHolder', 'idLENotesButton', 'cLECheckBox', true, 'checkbox', 'idLENotesButton', 'cLECheckBoxText', 'Display Notes on Graph');

      vNotesLineCheckBox = document.getElementById('idLENotesButton');
      vNotesLineCheckBox.addEventListener("click", () => {window.LiftEd.Graphing.fAddTacticsAndNoteLines(vArrayTacticsData, vArrayNotesData, vD3fXScale, vD3fYScale, vIntYMax, 'notes')});


      vHTMLElBreakLine2 = document.createElement('br');
      vHTMLElNotesCheckBoxHolder = document.getElementById('idLENoteButtonHolder');
      vHTMLElNotesCheckBoxHolder.appendChild(vHTMLElBreakLine2);

      //adds notes
      window.LiftEd.Graphing.fAddNotesToTab(vArrayNotesData)
    }
    else if (vArrayTacticsData.length > 0) {
      vHTMLElTacticsCheckBoxContainer =  document.getElementById('idLETacticsHeader');
      // vHTMLElTacticCheckBoxHolder = document.createElement('div');
      //     vHTMLElTacticCheckBoxHolder.setAttribute('id', 'idLETacticButtonHolder');
      //     vHTMLElTacticsCheckBoxContainer.appendChild(vHTMLElTacticCheckBoxHolder);
      //
      // vHTMLElTacticLineCheckBox = document.createElement("INPUT");
      // vHTMLElTacticLineCheckBox.setAttribute('id', 'idLETacticsButton');
      // vHTMLElTacticLineCheckBox.setAttribute('class', 'cLECheckBox');
      // // noinspection JSCheckFunctionSignatures
      // vHTMLElTacticLineCheckBox.setAttribute('checked', true);
      // vHTMLElTacticLineCheckBox.setAttribute('type', 'checkbox');
      // vHTMLElTacticLineCheckBoxLabel = document.createElement('label');
      // vHTMLElTacticLineCheckBoxLabel.setAttribute('for', 'idLETacticsButton');
      // vHTMLElTacticLineCheckBoxLabel.setAttribute('class', 'cLECheckBoxText');
      // vHTMLElTacticCheckBoxHolder.appendChild(vHTMLElTacticLineCheckBox);
      // vHTMLElTacticCheckBoxHolder.appendChild(vHTMLElTacticLineCheckBoxLabel);
      //
      // vHTMLElTacticLineCheckBoxLabel.innerHTML += 'Display Phase Change Lines on Graph';

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fCreateCheckboxes(vHTMLElTacticsCheckBoxContainer, 'idLETacticButtonHolder', 'idLETacticsButton', 'cLECheckBox', true, 'checkbox', 'idLETacticsButton', 'cLECheckBoxText', 'Display Phase Change Lines on Graph');

      vHTMLElTacticLineCheckBox = document.getElementById('idLETacticsButton');
      vHTMLElTacticLineCheckBox.addEventListener("click", () => {window.LiftEd.Graphing.fAddTacticsAndNoteLines(vArrayTacticsData, vArrayNotesData, vD3fXScale, vD3fYScale, vIntYMax, 'tactics')});

      let vHTMLElBreakLine = document.createElement('br');
      vHTMLElTacticCheckBoxHolder = document.getElementById('idLETacticButtonHolder');
      vHTMLElTacticCheckBoxHolder.appendChild(vHTMLElBreakLine);

      window.LiftEd.Graphing.fAddTacticsToTab (vArrayTacticsData)
    }
    else if (vArrayNotesData.length > 0) {
      let vHTMLElNotesCheckBoxContainer = document.getElementById('idLENotesHeader');
      // let vHTMLElNotesCheckBoxHolder = document.createElement('div');
      //     vHTMLElNotesCheckBoxHolder.setAttribute('id', 'idLENoteButtonHolder');
      //     vHTMLElNotesCheckBoxContainer.appendChild(vHTMLElNotesCheckBoxHolder);
      //
      //
      // let vNotesLineCheckBox = document.createElement("INPUT");
      // vNotesLineCheckBox.setAttribute('id', 'idLENotesButton');
      // vNotesLineCheckBox.setAttribute('type', 'checkbox');
      // // noinspection JSCheckFunctionSignatures
      // vNotesLineCheckBox.setAttribute('checked', true);
      // vNotesLineCheckBox.setAttribute('class', 'cLECheckBox');
      // let vNotesLineCheckBoxLabel = document.createElement('label');
      // vNotesLineCheckBoxLabel.setAttribute('for', 'idLENotesButton');
      // vNotesLineCheckBoxLabel.setAttribute('class', 'cLECheckBoxText');
      // vNotesLineCheckBoxLabel.innerHTML = 'Display Notes on Graph';
      // vHTMLElNotesCheckBoxHolder.appendChild(vNotesLineCheckBox);
      // vHTMLElNotesCheckBoxHolder.appendChild(vNotesLineCheckBoxLabel);

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fCreateCheckboxes(vHTMLElNotesCheckBoxContainer, 'idLENoteButtonHolder', 'idLENotesButton', 'cLECheckBox', true, 'checkbox', 'idLENotesButton', 'cLECheckBoxText', 'Display Notes on Graph');


      vNotesLineCheckBox = document.getElementById('idLENotesButton');
      vNotesLineCheckBox.addEventListener("click", () => {window.LiftEd.Graphing.fAddTacticsAndNoteLines(vArrayTacticsData, vArrayNotesData, vD3fXScale, vD3fYScale, vIntYMax, 'notes')});


      let vHTMLElBreakLine = document.createElement('br');
      vHTMLElNotesCheckBoxHolder = document.getElementById('idLENoteButtonHolder');
      vHTMLElNotesCheckBoxHolder.appendChild(vHTMLElBreakLine);

      window.LiftEd.Graphing.fAddNotesToTab(vArrayNotesData)
    }
    if (document.getElementById('idLETabs')) {
      vHTMLElAnnotationsCheckBoxContainer = document.getElementById('idLEAnnotationsHeader');
      // vHTMLElAnnotationsCheckBoxHolder = document.createElement('div');
      // vHTMLElAnnotationsCheckBoxHolder.setAttribute('id', 'idLEAnnotationButtonHolder');
      // vHTMLElAnnotationsCheckBoxContainer.appendChild(vHTMLElAnnotationsCheckBoxHolder);
      //
      // vAnnotationsLineCheckBox = document.createElement("INPUT");
      // vAnnotationsLineCheckBox.setAttribute('id', 'idLEAnnotationsButton');
      // vAnnotationsLineCheckBox.setAttribute('type', 'checkbox');
      // // noinspection JSCheckFunctionSignatures
      // vAnnotationsLineCheckBox.setAttribute('checked', true);
      // vAnnotationsLineCheckBox.setAttribute('class', 'cLECheckBox');
      //
      // vAnnotationsLineCheckBoxLabel = document.createElement('label');
      // vAnnotationsLineCheckBoxLabel.setAttribute('for', 'idLEAnnotationsButton');
      // vAnnotationsLineCheckBoxLabel.setAttribute('id', 'idLEAnnotationsLabel');
      // vAnnotationsLineCheckBoxLabel.setAttribute('class', 'cLECheckBoxText');
      // vAnnotationsLineCheckBoxLabel.innerHTML = 'Display Annotations on Graph';
      // vHTMLElAnnotationsCheckBoxHolder.appendChild(vAnnotationsLineCheckBox);
      // vHTMLElAnnotationsCheckBoxHolder.appendChild(vAnnotationsLineCheckBoxLabel);

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fCreateCheckboxes(vHTMLElAnnotationsCheckBoxContainer, 'idLEAnnotationButtonHolder', 'idLEAnnotationsButton', 'cLECheckBox', true, 'checkbox', 'idLEAnnotationsButton', 'cLECheckBoxText', 'Display Annotations on Graph', 'idLEAnnotationsLabel');


      vAddAnnotationsButton = document.createElement('button');
      vAddAnnotationsButton.setAttribute('id', 'idLEAddAnnotationsButton');
      vAddAnnotationsButton.setAttribute('class', 'cLEAddAnnotationsButton');
      vAddAnnotationsButton.innerHTML = 'Add Annotation';
      vHTMLElAnnotationsCheckBoxContainer.appendChild(vAddAnnotationsButton);

      vAnnotationsLineCheckBox = document.getElementById('idLEAnnotationsButton');
      if (vArrayAnnotationsData.length > 0) {
        vAnnotationsLineCheckBox.addEventListener("click", () => {window.LiftEd.Graphing.fAddAnnotations(vArrayAnnotationsData, vD3fXScale, vD3fYScale, vIntYMax)});
        window.LiftEd.Graphing.fAddAnnotationsToTab(vArrayAnnotationsData)
      }

    }
    let vAnnotationModal = document.querySelector('.cLEAnnotationModalButton');

    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Graphing.fHTMLElAnnotationModal(vAnnotationModal , {
      content: '.cLEAnnotationModal'
    });
  } catch (e) {
    throw 'ERROR #5711161240: ' + e;
  }
};


// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fSelectRadioButton
 * @description A function that sets the global scopetype variable when editing or creating an annotation.
 * @param {string} aStringRadioButtonName - A string that determine's which radio button is selected.
*/
window.LiftEd.Graphing.fSelectRadioButton = (aStringRadioButtonName) => {
  try {
    let vStringRadioButtonName = null;
    if (aStringRadioButtonName) {
      vStringRadioButtonName = aStringRadioButtonName
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710061738: aStringRadioButtonName missing';
    }
    if (vStringRadioButtonName === 'global') {
      window.LiftEd.Vars.scopeType = 0;
      window.LiftEd.Vars.scopeUUID = window.LiftEd.Utils.fGetVar('#5709202128', 'uuid');
    }
    else if (vStringRadioButtonName === 'all behavior/activity') {
      window.LiftEd.Vars.scopeType = 1;
      window.LiftEd.Vars.scopeUUID= window.LiftEd.Utils.fGetVar('#5709202128', 'uuid');
    }
    else if (vStringRadioButtonName === 'all targets') {
      window.LiftEd.Vars.scopeType = 2;
      window.LiftEd.Vars.scopeUUID = window.LiftEd.Utils.fGetVar('#5709202128', 'uuid');
    }
    else if (vStringRadioButtonName === 'target') {
      window.LiftEd.Vars.scopeType = 3;
    }
  } catch (e) {
    throw 'ERROR #5711161241: ' + e;
  }
};

/**
 * @memberof Graphing
 * @function fSaveAnnotation
 * @description A function to save a new or edited annotation.
*/
window.LiftEd.Graphing.fSaveAnnotation = () => {
  try {
    let vHTMLElStartDate = null,
        vHTMLElEndDate = null,
        vIntEndDate = null,
        vIntStartDate = null,
        vArrayAnnotations = [],
        vDictAnnotation,
        vHTMLElAnnotationStartDate = null,
        vHTMLElAnnotationText,
        vHTMLElAnnotationStartTime = null,
        vHTMLElAnnotationEndTime = null,
        vStringAnnotationText,
        vStringAnnotationStartTime,
        vStringAnnotationStartHours,
        vStringAnnotationStartMinutes,
        vAnnotationStartDate,
        vIntAnnotationStartDatePlusOne,
        vStringAnnotationEndTime = null,
        vStringAnnotationEndHours = null,
        vStringAnnotationEndMinutes = null,
        vAnnotationEndDate = null,
        vIntAnnotationEndDatePlusOne = null,
        vHTMLElAnnotationEndDate = null,
        vIntEndDatePlusOne = null,
        vIntStartDatePlusOne = null;


    if (document.querySelector('input[name="nLEStartDate"]')) {
      vHTMLElStartDate = document.querySelector('input[name="nLEStartDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221354: document.querySelector(("input[name="nLEStartDate"]") missing';
    }
    if (document.querySelector('input[name="nLEEndDate"]')) {
      vHTMLElEndDate = document.querySelector('input[name="nLEEndDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710031423: document.querySelector("input[name="nLEStartDate"]") missing';
    }

    if (document.querySelector('input[name="nLEAnnotationStartDate"]')) {

      vHTMLElAnnotationStartDate = document.querySelector('input[name="nLEAnnotationStartDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710031427: document.querySelector("input[name="nLEAnnotationStartDate"]") missing';
    }
    if (document.querySelector('input[name="nLEAnnotationEndDate"]')) {

      vHTMLElAnnotationEndDate = document.querySelector('input[name="nLEAnnotationEndDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710031427: document.querySelector("input[name="nLEAnnotationEndDate"]") missing';
    }
    if (document.querySelector('input[name="nLEAnnotationStartTime"]')) {
      vHTMLElAnnotationStartTime = document.querySelector('input[name="nLEAnnotationStartTime"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710031429:document.querySelector("input[name="nLEAnnotationStartTime"]") missing';
    }
    if (document.querySelector('input[name="nLEAnnotationEndTime"]')) {
      vHTMLElAnnotationEndTime = document.querySelector('input[name="nLEAnnotationEndTime"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710031429:document.querySelector("input[name="nLEAnnotationEndTime"]") missing';
    }
    if (window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') !== '99' || window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') !== 99) {
        // noinspection CommaExpressionJS
      vIntEndDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202127', 'dateEnd'))),
        vIntStartDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202128', 'dateStart')));
        vIntEndDate.setHours(23,59,59,0);
        vIntStartDate.setHours(23,59,59,0);
        window.LiftEd.Vars.dateEnd = vIntEndDate;
        window.LiftEd.Vars.dateStart = vIntStartDate;
    } else {
        // noinspection CommaExpressionJS
      vIntEndDate = new Date(vHTMLElEndDate.value),
        vIntStartDate = new Date(vHTMLElStartDate.value),
        vIntEndDate.setHours(23,59,59,0);
        vIntStartDate.setHours(23,59,59,0);
        vIntEndDatePlusOne = vIntEndDate.setDate(vIntEndDate.getDate() + 1);

      vIntStartDatePlusOne = vIntStartDate.setDate(vIntStartDate.getDate() + 1);
        window.LiftEd.Vars.dateEnd = vIntEndDatePlusOne;
        window.LiftEd.Vars.dateStart = vIntStartDatePlusOne;
    }


    window.LiftEd.Vars.dateStart = window.LiftEd.Utils.fConvertDate(window.LiftEd.Utils.fGetVar('#5709202128', 'dateStart'), '');
    window.LiftEd.Vars.dateEnd = window.LiftEd.Utils.fConvertDate(window.LiftEd.Utils.fGetVar('#5709202127', 'dateEnd'), '');
    let vDictAPIArgs = {
      typeDate:  window.LiftEd.Utils.fGetVar('#5709202128', 'typeDate'),
      dateStart: window.LiftEd.Utils.fGetVar('#5709202129', 'dateStart'),
      dateEnd: window.LiftEd.Utils.fGetVar('#5709202130', 'dateEnd'),
      uuid: window.LiftEd.Utils.fGetVar('#5709202133', 'uuid'),
    };

    vDictAnnotation = {};


    vAnnotationStartDate = new Date(vHTMLElAnnotationStartDate.value);

    vStringAnnotationStartTime = vHTMLElAnnotationStartTime.value;
    if (!vStringAnnotationStartTime) {

      vStringAnnotationStartTime = '00:00';
    }


    vStringAnnotationStartHours = vStringAnnotationStartTime.slice(0,2);
    vStringAnnotationStartMinutes  = vStringAnnotationStartTime.slice(3, 5);
    vAnnotationStartDate.setHours(vStringAnnotationStartHours, vStringAnnotationStartMinutes);


    vIntAnnotationStartDatePlusOne = vAnnotationStartDate.setDate(vAnnotationStartDate.getDate() + 1);
    vDictAnnotation.dateStart = window.LiftEd.Utils.fConvertDate(vIntAnnotationStartDatePlusOne, '');

  if (vHTMLElAnnotationEndDate.value) {

    vAnnotationEndDate = new Date(vHTMLElAnnotationEndDate.value);

      vStringAnnotationEndTime = vHTMLElAnnotationEndTime.value;
      if (!vStringAnnotationEndTime) {
        vStringAnnotationEndTime = '23:59';
      }
      vStringAnnotationEndHours = vStringAnnotationEndTime.slice(0,2);

    vStringAnnotationEndMinutes  = vStringAnnotationEndTime.slice(3, 5);
      vAnnotationEndDate.setHours(vStringAnnotationEndHours, vStringAnnotationEndMinutes);
      vIntAnnotationEndDatePlusOne = vAnnotationEndDate.setDate(vAnnotationEndDate.getDate() + 1);
      vDictAnnotation.dateEnd = window.LiftEd.Utils.fConvertDate(vIntAnnotationEndDatePlusOne, '');
  }



    vHTMLElAnnotationText = document.getElementById('idLECustomAnnotationTextIput');

    vStringAnnotationText = vHTMLElAnnotationText.value;


    vDictAnnotation.note = vStringAnnotationText;

    if (window.LiftEd.Utils.fGetVar('#5709202128', 'annotationUUID')) {
      vDictAnnotation.uuid = window.LiftEd.Utils.fGetVar('#5709202128', 'annotationUUID');
    }

    if (window.LiftEd.Utils.fGetVar('#5710191701', 'scopeUUID')) {
      vDictAnnotation.scopeUUID =  window.LiftEd.Utils.fGetVar('#5710191701', 'scopeUUID');
    } else {
      vDictAnnotation.scopeUUID =  window.LiftEd.Utils.fGetVar('#5710191701', 'uuid');
    }
    vDictAnnotation.scopeType =  window.LiftEd.Utils.fGetVar('#5710191702', 'scopeType');

    vArrayAnnotations.push(vDictAnnotation);
    vDictAPIArgs.annotations = vArrayAnnotations;
    vDictAPIArgs.options = {
      typeChart: window.LiftEd.Utils.fGetVar('#5709202131', 'typeChart'),
      typeDisplay: window.LiftEd.Utils.fGetVar('#5709202132', 'typeDisplay'),
      numberHandler: window.LiftEd.Utils.fGetVar('#5710061514', 'numberHandler'),
      tabOnLoad: window.LiftEd.Utils.fGetVar('#5710061515', 'tabOnLoad')
    };
    if (window.LiftEd.API.fGetDebug()) {console.log(vDictAPIArgs);}
    window.LiftEd.API.fLogDebugVerbose("vDictAPIArgs = " + JSON.stringify(vDictAPIArgs));
    window.LiftEd.GraphingCallbacks.fCallBackAddAnnotation(vDictAPIArgs);
  } catch (e) {
    throw 'ERROR #5711161242: ' + e;
  }
};





/**
 * @memberof Graphing
 * @function fAddTacticsAndNoteLines
 * @description A function to add tactics and notes to the graph.
 * @param {array} aArrayTacticsData - An array of tactics data
 * @param {array} aArrayNotesData -  An array of notes data
 * @param {function} aD3fXScale - A function to set the x scale
 * @param {function} aD3fYScale - A function to set the y scale
 * @param {number} aIntYMax - An integer of the y axis' max value.
 * @param {string} aStringType - A string to determine whether to add tactics, notes, or both.
*/
window.LiftEd.Graphing.fAddTacticsAndNoteLines = (aArrayTacticsData, aArrayNotesData, aD3fXScale, aD3fYScale, aIntYMax, aStringType) => {
  try {
    let vArrayTacticsData = null,
    vArrayNotesData = null,
    vD3fXScale = null,
    vD3fYScale = null,
    vIntYMax = aIntYMax,
    vStringType = aStringType;

    if (aArrayTacticsData !== null) {
      vArrayTacticsData = aArrayTacticsData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241959: aArrayTacticsData missing';
    }
    if (aArrayNotesData !== null) {
      vArrayNotesData = aArrayNotesData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242000: aArrayNotesData missing';
    }
    if (aD3fXScale !== null) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242001: aD3fXScale missing';
    }
    if (aD3fYScale !== null) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242002: aD3fYScale missing';
    }
    if ((gD3.selectAll(".cLENoteLineContainer")._groups[0].length === 0  && gD3.selectAll(".cLETacticLineContainer")._groups[0].length > 0 && vStringType === 'tactics') || (gD3.selectAll(".cLETacticLineContainer")._groups[0].length === 0  && gD3.selectAll(".cLENoteLineContainer")._groups[0].length > 0 && vStringType === 'notes')) {
      gD3.selectAll(".cLENoteAnnotationGroup").remove();
      gD3.selectAll('.cLENoteLineContainer').remove();
      gD3.selectAll(".cLETacticAnnotationGroup").remove();
      gD3.selectAll('.cLETacticLineContainer').remove();
    }

    else if (gD3.selectAll("cLETacticLineContainer")._groups[0].length === 0 && gD3.selectAll(".cLENoteLineContainer")._groups[0].length === 0 && vStringType === 'tactics') {
      gD3.selectAll(".cLENoteAnnotationGroup").remove();
      gD3.selectAll('.cLENoteLineContainer').remove();
      gD3.selectAll(".cLETacticAnnotationGroup").remove();
      gD3.selectAll('.cLETacticLineContainer').remove();

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAddTacticsAndNotesAnnotations (vArrayTacticsData, [], vD3fXScale, vD3fYScale, vIntYMax, vStringType);
    }  else if (gD3.selectAll(".cLETacticLineContainer")._groups[0].length === 0 && gD3.selectAll(".cLENoteLineContainer")._groups[0].length === 0 && vStringType === 'notes') {
      gD3.selectAll(".cLENoteAnnotationGroup").remove();
      gD3.selectAll('.cLENoteLineContainer').remove();
      gD3.selectAll(".cLETacticAnnotationGroup").remove();
      gD3.selectAll('.cLETacticLineContainer').remove();

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAddTacticsAndNotesAnnotations ([], vArrayNotesData, vD3fXScale, vD3fYScale, vIntYMax, vStringType);
    } else if (gD3.selectAll(".cLETacticLineContainer")._groups[0].length > 0 && gD3.selectAll(".cLENoteLineContainer")._groups[0].length !== 0 && vStringType === 'tactics') {
      gD3.selectAll(".cLENoteAnnotationGroup").remove();
      gD3.selectAll('.cLENoteLineContainer').remove();
      gD3.selectAll(".cLETacticAnnotationGroup").remove();
      gD3.selectAll('.cLETacticLineContainer').remove();

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAddTacticsAndNotesAnnotations ([], vArrayNotesData, vD3fXScale, vD3fYScale, vIntYMax, 'notes');
    } else if (gD3.selectAll(".cLETacticLines")._groups[0].length > 0 && gD3.selectAll(".cLENoteLineContainer")._groups[0].length !== 0  && vStringType === 'notes') {
      gD3.selectAll(".cLENoteAnnotationGroup").remove();
      gD3.selectAll('.cLENoteLineContainer').remove();
      gD3.selectAll(".cLETacticAnnotationGroup").remove();
      gD3.selectAll('.cLETacticLineContainer').remove();

      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fAddTacticsAndNotesAnnotations (vArrayTacticsData, [], vD3fXScale, vD3fYScale, vIntYMax, 'tactics');
    } else {
      gD3.selectAll(".cLENoteAnnotationGroup").remove();
      gD3.selectAll('.cLENoteLineContainer').remove();
      gD3.selectAll(".cLETacticAnnotationGroup").remove();
      gD3.selectAll('.cLETacticLineContainer').remove();

      window.LiftEd.Graphing.fAddTacticsAndNotesAnnotations (vArrayTacticsData, vArrayNotesData, vD3fXScale, vD3fYScale, vIntYMax, '');
    }
  } catch (e) {
    throw 'ERROR #5711161243: ' + e;
  }
};

// noinspection SpellCheckingInspection
// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fAddScopeToModal
 * @description A function to add scopetypes if they are designate to show by visiblity options.
 * @param {array} aArrayTargetNames - An array of target names for scopetype 3
 * @param {array} aArrayDataUUID - An array of UUIds for each data set.
*/
window.LiftEd.Graphing.fAddScopeToModal = (aArrayTargetNames, aArrayDataUUID) => {
  try {
    let vHTMLRadioType = null,
        vHTMLRadioTypeLabel = null,
        vIntTypeDisplay,
        vHTMLELScopeHolder = null,
        vArrayTargetNames = null,
        vHTMListItem = null,
        vHTMListItem2 = null,
        vHTMLRadioType2 = null,
        vHTMLRadioTypeLabel2 = null;

        vIntTypeDisplay = parseInt(window.LiftEd.Utils.fGetVar('#5010091617', 'typeDisplay'));

        if (document.getElementById('idLEScopeList')) {
          vHTMLELScopeHolder  = document.getElementById('idLEScopeList');
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5710041538: document.getElementById("idLEScopeList") missing';
        }

        if (aArrayTargetNames) {
          vArrayTargetNames  = aArrayTargetNames;
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5710041538: aArrayTargetNames missing';
        }

        if (window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[0] === '1' || window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[0] === 1) {

          vHTMListItem = document.createElement('li');
          vHTMListItem.setAttribute('class', 'cLEScopeRadio');
          vHTMLRadioType = document.createElement('input');
          vHTMLRadioType.setAttribute('type', 'radio');
          vHTMLRadioType.setAttribute('id', 'idLEGlobal');
          vHTMLRadioType.setAttribute('class', 'cLEScopeRadio');
          vHTMLRadioType.setAttribute('name', 'scope');
          vHTMLRadioType.setAttribute('value', 'global');
          vHTMLRadioType.checked = false;
          vHTMLRadioType.addEventListener('click', () =>{window.LiftEd.Graphing.fSelectRadioButton('global')});

          vHTMLRadioTypeLabel = document.createElement('label');
          vHTMLRadioTypeLabel.setAttribute('id', 'idLEGlobalLabel');
          vHTMLRadioTypeLabel.setAttribute('class', 'cLEScopeRadio');
          vHTMLRadioTypeLabel.setAttribute('for', 'idLEGlobal');
          vHTMLRadioTypeLabel.innerHTML = ' Everywhere For This Student';
          vHTMListItem.appendChild(vHTMLRadioType);
          vHTMListItem.appendChild(vHTMLRadioTypeLabel);
          vHTMLELScopeHolder.appendChild(vHTMListItem);
        }



        if (vIntTypeDisplay === 0 || vIntTypeDisplay === 1) {
          if (window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[1] === '1' || window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[1] === 1) {
            vHTMListItem = document.createElement('li');
            vHTMListItem.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioType = document.createElement('input');
            vHTMLRadioType.setAttribute('type', 'radio');
            vHTMLRadioType.setAttribute('id', 'idLEActivity');
            vHTMLRadioType.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioType.setAttribute('name', 'scope');
            vHTMLRadioType.setAttribute('value', 'activity');
            vHTMLRadioType.checked = false;
            vHTMLRadioType.addEventListener('click', () =>{window.LiftEd.Graphing.fSelectRadioButton('all behavior/activity')});

            vHTMLRadioTypeLabel = document.createElement('label');
            vHTMLRadioTypeLabel.setAttribute('id', 'idLEActivityLabel');
            vHTMLRadioTypeLabel.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioTypeLabel.setAttribute('for', 'idLEActivity');
            vHTMLRadioTypeLabel.innerHTML = 'All Activities For This Student';
            vHTMListItem.appendChild(vHTMLRadioType);
            vHTMListItem.appendChild(vHTMLRadioTypeLabel);
            vHTMLELScopeHolder.appendChild(vHTMListItem);
          }

          if (window.LiftEd.Utils.fGetVar('#5710221838', 'visiblity').scope[2] === '1' || window.LiftEd.Utils.fGetVar('#5710221838', 'visiblity').scope[2] === 1) {

            vHTMListItem2 = document.createElement('li');
            vHTMListItem2.setAttribute('class', 'cLEScopeRadio');

            vHTMLRadioType2 = document.createElement('input');
            vHTMLRadioType2.setAttribute('type', 'radio');
            vHTMLRadioType2.setAttribute('id', 'idLEAllTargets');
            vHTMLRadioType2.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioType2.setAttribute('name', 'scope');
            vHTMLRadioType2.setAttribute('value', 'alltargets');
            vHTMLRadioType2.checked = false;
            vHTMLRadioType2.addEventListener('click', () =>{window.LiftEd.Graphing.fSelectRadioButton('all targets')});


            vHTMLRadioTypeLabel2 = document.createElement('label');
            vHTMLRadioTypeLabel2.setAttribute('id', 'idLEActivityLabel');
            vHTMLRadioTypeLabel2.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioTypeLabel2.setAttribute('for', 'idLEAllTargets');
            vHTMLRadioTypeLabel2.innerHTML = 'All Targets For This Activity';
            vHTMListItem2.appendChild(vHTMLRadioType2);
            vHTMListItem2.appendChild(vHTMLRadioTypeLabel2);
            vHTMLELScopeHolder.appendChild(vHTMListItem2);
          }
        }

        if (vIntTypeDisplay === 2 || vIntTypeDisplay === 3) {
          if (window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[1] === '1' || window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[1] === 1) {

            vHTMListItem = document.createElement('li');
            vHTMListItem.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioType = document.createElement('input');
            vHTMLRadioType.setAttribute('type', 'radio');
            vHTMLRadioType.setAttribute('id', 'idLEBehavior');
            vHTMLRadioType.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioType.setAttribute('name', 'scope');
            vHTMLRadioType.setAttribute('value', 'behavior');
            vHTMLRadioType.checked = false;
            vHTMLRadioType.addEventListener('click', () =>{
              window.LiftEd.Graphing.fSelectRadioButton("all behavior/activity")
            });

            vHTMLRadioTypeLabel = document.createElement('label');
            vHTMLRadioTypeLabel.setAttribute('id', 'idLEBehaviorLabel');
            vHTMLRadioTypeLabel.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioTypeLabel.setAttribute('for', 'idLEBehavior');
            vHTMLRadioTypeLabel.innerHTML = 'All Behaviors For This Student';
            vHTMListItem.appendChild(vHTMLRadioType);
            vHTMListItem.appendChild(vHTMLRadioTypeLabel);
            vHTMLELScopeHolder.appendChild(vHTMListItem);
          }
        }
        if (window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[3] === '1' || window.LiftEd.Utils.fGetVar('#5710221930', 'visiblity').scope[3] === 1) {
          for (let i = 0; i < vArrayTargetNames.length; i++) {

            vHTMListItem = document.createElement('li');
            vHTMListItem.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioType = document.createElement('input');
            vHTMLRadioType.setAttribute('type', 'radio');
            vHTMLRadioType.setAttribute('id', 'idLE' + aArrayDataUUID[i]);
            vHTMLRadioType.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioType.setAttribute('name', 'scope');
            vHTMLRadioType.setAttribute('value', 'target');
            vHTMLRadioType.checked = false;
            let vStringUUID = aArrayDataUUID[i];
            vHTMLRadioType.addEventListener('click', () => {
              window.LiftEd.Vars.scopeUUID = vStringUUID;
              window.LiftEd.Vars.scopeType = 3;
              window.LiftEd.Graphing.fSelectRadioButton("target");
            });


            vHTMLRadioTypeLabel = document.createElement('label');
            vHTMLRadioTypeLabel.setAttribute('id', 'idLETargetLabel');
            vHTMLRadioTypeLabel.setAttribute('class', 'cLEScopeRadio');
            vHTMLRadioTypeLabel.setAttribute('for', 'idLE' + aArrayDataUUID[i]);
            if (vIntTypeDisplay === 0 || vIntTypeDisplay === 1) {
              vHTMLRadioTypeLabel.innerHTML = " Target : " + vArrayTargetNames[i];
            } else {
              vHTMLRadioTypeLabel.innerHTML = " Behavior : " + vArrayTargetNames[i];
            }

            vHTMListItem.appendChild(vHTMLRadioType);
            vHTMListItem.appendChild(vHTMLRadioTypeLabel);
            vHTMLELScopeHolder.appendChild(vHTMListItem);
          }
        }
  } catch (e) {
    throw 'ERROR #5711161243: ' + e;
  }
};



// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
/**
 * @memberof Graphing
 * @function fBuildAnnotationDictionary
 * @description A function to build and return an annotation dictionary used during the annotation badge's click function.
 * @param {string} aStrLabel - A string containing the annotation's note.
 * @param {number} aIntDateStart - An integer for the annotation's modified start date.
 * @param {number} aIntOriginalStart -  An integer for the annotation's original start date.
 * @param {number} aIntDateEnd -  An integer for the annotation's modified end date.
 * @param {number} aIntOriginalEnd -  An integer for the annotation's original start date.
 * @param {number} aDateEarliest -  An integer for the annotation's earliest date.
 * @param {number} aDateLatest -  An integer for the annotation's latest date.
 * @param {number} aIntUUID - A string for the annotaiton's uuid.
 * @param {string} aStrScopeUUID - A string representing the annotaiton's scope uuid.
 * @param {string} aStrAuthor - A string representing the annotation's author.
 * @param {number} aIntScopeType - An integer for the annotation's scopetype.
*/
window.LiftEd.Graphing.fBuildAnnotationDictionary = (aStrLabel, aIntDateStart, aIntOriginalStart, aIntDateEnd, aIntOriginalEnd, aDateEarliest, aDateLatest, aIntUUID, aStrScopeUUID, aStrAuthor, aIntScopeType) => {
  try {
    let vStrLabel = aStrLabel,
        vIntDateStart = null,
        vIntOriginalStart = aIntOriginalStart,
        vIntDateEnd = aIntDateEnd,
        vIntOriginalEnd = aIntOriginalEnd,
        vDateEarliest = aDateEarliest,
        vDateLatest = aDateLatest,
        vIntUUID = null,
        vStrScopeUUID = aStrScopeUUID,
        vStrAuthor = aStrAuthor,
        vIntScopeType = aIntScopeType,
        vD3TimeParse = window.LiftEd.Utils.fGetVar('#5709202054', 'gDateMonthDayParse'),
        vDictAnnotation = {};

    if (aIntDateStart) {
      vIntDateStart = aIntDateStart;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141547: aIntDateStart missing';
    }
    if (aIntUUID) {
      vIntUUID  = aIntUUID ;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141414: aIntUUID missing';
    }
    if (!aIntDateEnd) {
      if (window.LiftEd.Utils.fGetVar('#5710231322', 'numberHandler') === 2) {
        if (vIntScopeType !== 0) {
          vDictAnnotation = {
            label: vStrLabel,
            title: vD3TimeParse(vIntDateStart),
            dateStart:  vIntDateStart,
            originalStart: vIntOriginalStart,
            dateEnd: null,
            originalEnd: null,
            uuid: vIntUUID,
            scopeUUID: vStrScopeUUID,
            author: vStrAuthor,
            scopeType: vIntScopeType,
          }
        } else {
          vDictAnnotation = {
            label: vStrLabel,
            title: vD3TimeParse(vIntDateStart),
            dateStart:  vIntDateStart,
            originalStart: vIntOriginalStart,
            dateEnd: null,
            originalEnd: null,
            uuid: vIntUUID,
            scopeUUID: window.LiftEd.Utils.fGetVar('#5710221836', 'uuid'),
            author: vStrAuthor,
            scopeType: vIntScopeType,
          }
       }
     } else {
       if (vIntScopeType !== 0) {
         vDictAnnotation = {
           label: vStrLabel,
           title: vD3TimeParse(vIntDateStart),
           dateStart:  vIntDateStart,
           dateEnd: null,
           uuid: vIntUUID,
           scopeUUID: vStrScopeUUID,
           author: vStrAuthor,
          scopeType: vIntScopeType,
        }
       } else{
         vDictAnnotation = {
           label: vStrLabel,
           title: vD3TimeParse(vIntDateStart),
           dateStart:  vIntDateStart,
           dateEnd: null,
           uuid: vIntUUID,
           scopeUUID: window.LiftEd.Utils.fGetVar('#5710221836', 'uuid'),
           author: vStrAuthor,
           scopeType: vIntScopeType,
         }
       }
     }
   } else {
     if (window.LiftEd.Utils.fGetVar('#5710231322', 'numberHandler') === 2) {
       if (vIntScopeType !== 0) {
         vDictAnnotation = {
           label: vStrLabel,
           title: vD3TimeParse(vIntDateStart),
           dateStart:  vIntDateStart,
           originalStart: vIntOriginalStart,
           dateEnd: aIntDateEnd,
           originalEnd: aIntOriginalEnd,
           dateEarliest: vDateEarliest,
           dateLatest: vDateLatest,
           uuid: vIntUUID,
           scopeUUID: vStrScopeUUID,
           author: vStrAuthor,
           scopeType: vIntScopeType,
         }
       } else {
         vDictAnnotation = {
           label: vStrLabel,
           title: vD3TimeParse(vIntDateStart),
           dateStart:  vIntDateStart,
           originalStart: vIntOriginalStart,
           dateEnd: vIntDateEnd,
           originalEnd: vIntOriginalEnd,
           dateEarliest: vDateEarliest,
           dateLatest: vDateLatest,
           uuid: vIntUUID,
           scopeUUID: window.LiftEd.Utils.fGetVar('#5710221844', 'uuid'),
           author: vStrAuthor,
           scopeType: vIntScopeType,
         }
       }
     } else {
       if (vIntScopeType !== 0) {
         vDictAnnotation = {
           label: vStrLabel,
           title: vD3TimeParse(vIntDateStart),
           dateStart:  vIntDateStart,
           dateEnd: vIntDateEnd,
           dateEarliest: vDateEarliest,
           dateLatest: vDateLatest,
           uuid: vIntUUID,
           scopeUUID: vStrScopeUUID,
           author: vStrAuthor,
           scopeType: vIntScopeType,
         }
       } else {
         vDictAnnotation = {
           label: vStrLabel,
           title: vD3TimeParse(vIntDateStart),
           dateStart:  vIntDateStart,
           dateEnd: vIntDateEnd,
           dateEarliest: vDateEarliest,
           dateLatest: vDateLatest,
           uuid: vIntUUID,
           scopeUUID: window.LiftEd.Utils.fGetVar('#5710221844', 'uuid'),
           author: vStrAuthor,
           scopeType: vIntScopeType,
         }
       }
     }
   }
   return vDictAnnotation;
  } catch (e) {
    throw 'ERROR #5711161244: ' + e;
  }
};


// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
// noinspection JSUnusedLocalSymbols
/**
 * @memberof Graphing
 * @function fAppendAnnotationBackground
 * @description A function to append the annotation's background on the graph.
 * @param {HTMLElement} aSVGELAnnotationsLayer - A HTML Element representing the svg annotation layer.
 * @param {number} aIntY2 -  An integer for the annotation background's max height
 * @param {function} aD3fXScale -  A function to scale the the background to the graph's xscale.
 * @param {number} aIntBackgroundEndDate - An annotation for the background's end date.
 * @param {number} aIntBackgroundStartDate - An integer for the background's start date.
 * @param {number} aIntAnnotationCounter - An integer for the annotaiton's current counter. Relates to the annotation number below the graph.
 * @param {number} aIntWidth - An integer for the width of the background.
*/
//TODO: ENG-1020 Refactoring. OKed
window.LiftEd.Graphing.fAppendAnnotationBackground = (aSVGELAnnotationsLayer, aIntY2, aD3fXScale, aIntBackgroundEndDate, aIntBackgroundStartDate, aIntAnnotationCounter, aIntWidth) => {
  try {
    let vSVGELAnnotationsLayer = null,
        vIntY2 = null,
        vD3fXScale = aD3fXScale,
        vIntBackgroundEndDate = null,
        vIntBackgroundStartDate = null,
        vIntAnnotationCounter = aIntAnnotationCounter,
        vIntWidth = aIntWidth;


    if (aSVGELAnnotationsLayer) {
      vSVGELAnnotationsLayer = aSVGELAnnotationsLayer;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141452: aSVGELAnnotationsLayer missing';
    }
    if (aIntBackgroundEndDate) {
      vIntBackgroundEndDate = aIntBackgroundEndDate;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141455: aIntBackgroundEndDate missing';
    }
    if (aIntBackgroundStartDate) {
      vIntBackgroundStartDate = aIntBackgroundStartDate;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141457: aIntBackgroundStartDate missing';
    }
    if (aIntY2) {
      vIntY2 = aIntY2;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5711141457: aIntY2 missing';
    }
    if (vIntWidth) {
      vSVGELAnnotationsLayer.append('rect')
        .attr('x', vD3fXScale(vIntBackgroundStartDate))
        .attr('x1', vIntBackgroundStartDate)
        .attr('x2', vIntBackgroundEndDate)
        // .attr('y2', vIntY2)
        .attr('y1', 0)
        .attr('width', 0)
        .attr('id', "idLEAnnotationRangeBackground"  + "A" + vIntAnnotationCounter)
        .attr('class', 'cLEAnnotationBackground')
        .attr('height', window.LiftEd.Utils.fGetVar('#5710121655', 'gIntegerHeight'))
    } else{
      vSVGELAnnotationsLayer.append('rect')
        .attr('x', vD3fXScale(vIntBackgroundStartDate))
        .attr('x1', vIntBackgroundStartDate)
        .attr('x2', vIntBackgroundEndDate)
        .attr('y2', vIntY2)
        .attr('y1', 0)
        .attr('width', vD3fXScale(vIntBackgroundEndDate) - vD3fXScale(vIntBackgroundStartDate))
        .attr('id', "idLEAnnotationRangeBackground"  + "A" + vIntAnnotationCounter)
        .attr('class', 'cLEAnnotationBackground')
        .attr('height', window.LiftEd.Utils.fGetVar('#5710121655', 'gIntegerHeight'))
    }
  } catch (e) {
    throw 'ERROR #5711161245: ' + e;
  }
};


//add comments and clean up logic for creating annotation badges. same fucntion as tactic/note badges. 3-4 hours.
/**
 * @memberof Graphing
 * @function fAddAnnotations
 * @description A function to toggle annotations on the graph.
 * @param {array} aArrayAnnotationsData - An array of annotations dictionaries.
 * @param {function} aD3fXScale - A function to set the x scale
 * @param {function} aD3fYScale - A function to set the y scale
 * @param {number} aIntYMax - An integer of the y axis' max value.
*/
window.LiftEd.Graphing.fAddAnnotations = (aArrayAnnotationsData, aD3fXScale, aD3fYScale, aIntYMax) => {
  try {
    // noinspection JSUnusedLocalSymbols
    let vArrayAnnotationsData = null,
        vD3fXScale = null,
        vD3fYScale = null,
        vIntYMax = aIntYMax,
        vArrayAnnotations = [],
        timeFormat = gD3.timeFormat("%d-%b-%y"),
        vDictDatesMemo = {},
        vDictCounter = {},
        vIntStaticRatio = aIntYMax/9,
        vNewStartYMax = null,
        vNewEndYMax = null,
        vD3TimeParse = window.LiftEd.Utils.fGetVar('#5709202054', 'gDateMonthDayParse'),
        vIntegerAnnotationStartDate = null,
        vIntegerAnnotationEndDate = null,
        vAnnotationStartDateDays = null,
        vAnnotationStartDateMonth = null,
        vAnnotationStartDateYear = null,
        vAnnotationStartTimeHours = null,
        vAnnotationStartTimeMinutes = null,
        vAnnotationEndDateDays = null,
        vAnnotationEndDateMonth = null,
        vAnnotationEndDateYear = null,
        vAnnotationEndTimeHours = null,
        vAnnotationEndTimeMinutes = null,
        vAnnotationHeader = null,
        vAnnotationBody = null,
        vReplacementYCounter = null,
        vHTMLELAuthorText = null,
        vHTMLELAuthorValue = null,
        vAnnotationZeroedStartDate = null,
        vAnnotationZeroedEndDate = null,
        vStartDate = null,
        vEndDate = null,
        vHTMLElAnnotationsCheckBoxHolder = null,
        vAnnotationsLineCheckBox = null,
        vAnnotationsLineCheckBoxLabel = null,
        vDictNote = null,
        vHTMLElAnnotationStartDate = null,
        vHTMLSelectedRadioButton = null,
        vAnnotationDateStartString = null,
        vAnnotationDateEndString = null,
        vHTMLElAnnotationEndDate = null,
        vHTMLElAnnotationStartTime = null,
        vHTMLElAnnotationEndTime = null;


    if (gD3.selectAll('#idLESaveButton')) {
      gD3.selectAll('#idLESaveButton').remove();
    }

    if (aArrayAnnotationsData !== null) {
      vArrayAnnotationsData = aArrayAnnotationsData;

      // noinspection Annotator
      vDictCounter = {annotation: aArrayAnnotationsData.length + 1}
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709241959: aArrayAnnotationsData missing';
    }
  if (aD3fXScale !== null) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
    throw 'ERROR #5709242001: aD3fXScale missing';
    }
  if (aD3fYScale !== null) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
    throw 'ERROR #5709242001: aD3fXScale missing';
    }

    if (document.getElementById('idLECustomAuthorText')) {

      vHTMLELAuthorText = document.getElementById('idLECustomAuthorText');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710041538: document.getElementById("idLECustomAuthorText") missing';
    }

    if (document.getElementById('idLECustomAnnotationAuthor')) {
      vHTMLELAuthorValue = document.getElementById('idLECustomAnnotationAuthor');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710041539: document.getElementById("idLECustomAnnotationAuthor") missing';
    }


  if (gD3.selectAll(".cLEAnnotationsGroup")._groups[0].length > 0) {
      gD3.selectAll(".cLEAnnotationsGroup").remove();
  } else {
    let vAnnotationsLayer = window.LiftEd.Utils.fGetVar('#5709191622', 'gSVGGraphContainer').append('g')
      .attr("transform", "translate(" + '15' + ",0)")
      .attr("class", "cLEAnnotationsGroup");

    if (window.LiftEd.Utils.fGetVar('#57102122150', 'numberHandler') === 2) {
      gD3.selectAll('#idLEAnnotationsButton').remove();
      gD3.selectAll('#idLEAnnotationsLabel').remove();
      vHTMLElAnnotationsCheckBoxHolder = document.getElementById('idLEAnnotationButtonHolder');
      if (vHTMLElAnnotationsCheckBoxHolder) {

        vAnnotationsLineCheckBox = document.createElement("INPUT");
        vAnnotationsLineCheckBox.setAttribute('id', 'idLEAnnotationsButton');
        vAnnotationsLineCheckBox.setAttribute('type', 'checkbox');
        // noinspection JSCheckFunctionSignatures
        vAnnotationsLineCheckBox.setAttribute('checked', true);
        vAnnotationsLineCheckBox.setAttribute('class', 'cLECheckBox');

        vAnnotationsLineCheckBoxLabel = document.createElement('label');
        vAnnotationsLineCheckBoxLabel.setAttribute('for', 'idLEAnnotationsButton');
        vAnnotationsLineCheckBoxLabel.setAttribute('class', 'cLECheckBoxText');
        vAnnotationsLineCheckBoxLabel.setAttribute('id', 'idLEAnnotationsLabel');
        vAnnotationsLineCheckBoxLabel.innerHTML = 'Display Annotations on Graph';
        vHTMLElAnnotationsCheckBoxHolder.appendChild(vAnnotationsLineCheckBox);
        vHTMLElAnnotationsCheckBoxHolder.appendChild(vAnnotationsLineCheckBoxLabel);

        vHTMLElAnnotationsCheckBoxHolder.appendChild(vAnnotationsLineCheckBox);
        vHTMLElAnnotationsCheckBoxHolder.appendChild(vAnnotationsLineCheckBoxLabel);

        if (vArrayAnnotationsData.length > 0) {
          vAnnotationsLineCheckBox.addEventListener("click", () => {window.LiftEd.Graphing.fAddAnnotations(vArrayAnnotationsData, vD3fXScale, vD3fYScale, vIntYMax)});
        }
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5710212156: vHTMLElAnnotationsCheckBoxHolder missing';
      }


    }

    vArrayAnnotationsData.forEach( (aDictAnnotation) => {
      // vIntZeroedAnnotationDate = new Date(aDictAnnotation.date).setHours(0, 0, 0, 0);
      vAnnotationZeroedStartDate = new Date(aDictAnnotation.dateStart).setHours(0,0,0,0);
      vStartDate = new Date(window.LiftEd.Utils.fGetVar('#510101415', 'dateStart')).setHours(0,0,0,0);

      vEndDate = new Date(window.LiftEd.Utils.fGetVar('#510101414', 'dateEnd')).setHours(0,0,0,0);



      if ('dateEnd' in aDictAnnotation) {

        vAnnotationZeroedEndDate = new Date(aDictAnnotation.dateEnd).setHours(0,0,0,0);
          if (vAnnotationZeroedEndDate > vEndDate) {
            vAnnotationZeroedEndDate = vEndDate;
          }
      } else {

        vAnnotationZeroedEndDate = null
      }

      if (vAnnotationZeroedStartDate < vStartDate) {

        vAnnotationZeroedStartDate = vStartDate;
      }
      if (!vAnnotationZeroedEndDate) {
        if (vDictDatesMemo[vAnnotationZeroedStartDate]) {
          vNewStartYMax = aIntYMax - (vIntStaticRatio * vDictDatesMemo[vAnnotationZeroedStartDate]);
        } else {
          vNewStartYMax = aIntYMax;
        }
        if (vDictDatesMemo[vAnnotationZeroedStartDate]) {
          vDictDatesMemo[vAnnotationZeroedStartDate] += 1;
        } else {
          vDictDatesMemo[vAnnotationZeroedStartDate] = 1
        }
        vDictCounter.annotation -= 1;
        if (window.LiftEd.Utils.fGetVar('#5710231322', 'numberHandler') === 2) {
          if (aDictAnnotation.scopeType !== 0) {
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary( aDictAnnotation.note, aDictAnnotation.dateStart, aDictAnnotation.originalStart, null, null, null, null, aDictAnnotation.uuid, aDictAnnotation.scopeUUID, aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart),
            //   dateStart: aDictAnnotation.dateStart,
            //   originalStart: aDictAnnotation.originalStart,
            //   dateEnd: null,
            //   originalEnd: null,
            //   uuid: aDictAnnotation.uuid,
            //   scopeUUID: aDictAnnotation.scopeUUID,
            //   author: aDictAnnotation.author,
            //   scopeType: aDictAnnotation.scopeType,
            // }
          } else {
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary( aDictAnnotation.note, aDictAnnotation.dateStart, aDictAnnotation.originalStart, null, null, null, null, aDictAnnotation.uuid, window.LiftEd.Utils.fGetVar('#5710221836', 'uuid'), aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart),
            //   dateStart: aDictAnnotation.dateStart,
            //   originalStart: aDictAnnotation.originalStart,
            //   dateEnd: null,
            //   originalEnd: null,
            //   uuid: aDictAnnotation.uuid,
            //   scopeUUID: window.LiftEd.Utils.fGetVar('#5710221836', 'uuid'),
            //   author: aDictAnnotation.author,
            //   scopeType: aDictAnnotation.scopeType
            // }
          }
        } else {
          if (aDictAnnotation.scopeType !== 0) {
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary( aDictAnnotation.note, aDictAnnotation.dateStart, null, null, null, null, null, aDictAnnotation.uuid, aDictAnnotation.scopeUUID, aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart),
            //   dateStart: aDictAnnotation.dateStart,
            //   dateEnd: null,
            //   uuid: aDictAnnotation.uuid,
            //   scopeUUID: aDictAnnotation.scopeUUID,
            //   author: aDictAnnotation.author,
            //   scopeType: aDictAnnotation.scopeType,
            // }
          } else {
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary( aDictAnnotation.note, aDictAnnotation.dateStart, null, null, null, null, null, aDictAnnotation.uuid, window.LiftEd.Utils.fGetVar('#5710221836', 'uuid'), aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart),
            //   dateStart: aDictAnnotation.dateStart,
            //   dateEnd: null,
            //   uuid: aDictAnnotation.uuid,
            //   scopeUUID: window.LiftEd.Utils.fGetVar('#5710221836', 'uuid'),
            //   author: aDictAnnotation.author,
            //   scopeType: aDictAnnotation.scopeType
            // }
          }
        }

        vArrayAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges('', vAnnotationZeroedStartDate, vNewStartYMax, 'annotation', vDictCounter.annotation, '', vDictNote))
        // vArrayAnnotations.push(vDictStartAnnotation)
      } else  {
        if (vDictDatesMemo[vAnnotationZeroedStartDate]) {
          vNewStartYMax = aIntYMax - (vIntStaticRatio * vDictDatesMemo[vAnnotationZeroedStartDate]);
        } else {
          vNewStartYMax = aIntYMax;
        }
        if (vDictDatesMemo[vAnnotationZeroedEndDate]) {
          vNewEndYMax = aIntYMax - (vIntStaticRatio * vDictDatesMemo[vAnnotationZeroedEndDate]);
        } else {

          vNewEndYMax = aIntYMax;
        }
        if (vAnnotationZeroedStartDate === vAnnotationZeroedEndDate) {
          if (vDictDatesMemo[vAnnotationZeroedStartDate]) {
            vDictDatesMemo[vAnnotationZeroedStartDate] += 1;
          } else {
            vDictDatesMemo[vAnnotationZeroedStartDate] = 1
          }
        } else {
          if (vDictDatesMemo[vAnnotationZeroedStartDate]) {
            vDictDatesMemo[vAnnotationZeroedStartDate] += 1;
          } else {
            vDictDatesMemo[vAnnotationZeroedStartDate] = 1
          }

          if (vDictDatesMemo[vAnnotationZeroedEndDate]) {
            vDictDatesMemo[vAnnotationZeroedEndDate] += 1;
          } else {
            vDictDatesMemo[vAnnotationZeroedEndDate] = 1
          }
        }

        vDictCounter.annotation -= 1;
        if (window.LiftEd.Utils.fGetVar('#5710231322', 'numberHandler') === 2) {
          if (aDictAnnotation.scopeType !== 0) {
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary(aDictAnnotation.note, aDictAnnotation.dateStart, aDictAnnotation.originalStart, aDictAnnotation.dateEnd, aDictAnnotation.originalEnd, vStartDate, vEndDate, aDictAnnotation.uuid, aDictAnnotation.author, aDictAnnotation.scopeUUID, aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart) + "-" + vD3TimeParse(aDictAnnotation.dateEnd),
            //   dateStart: aDictAnnotation.dateStart,
            //   originalStart: aDictAnnotation.originalStart,
            //   dateEnd: aDictAnnotation.dateEnd,
            //   originalEnd: aDictAnnotation.originalEnd,
            //   dateEarliest: vStartDate,
            //   dateLatest: vEndDate,
            //   uuid: aDictAnnotation.uuid,
            //   author: aDictAnnotation.author,
            //   scopeUUID: aDictAnnotation.scopeUUID,
            //   scopeType: aDictAnnotation.scopeType
            // }
          } else {
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary(aDictAnnotation.note, aDictAnnotation.dateStart, aDictAnnotation.originalStart, aDictAnnotation.dateEnd, aDictAnnotation.originalEnd, vStartDate, vEndDate, aDictAnnotation.uuid, aDictAnnotation.author, window.LiftEd.Utils.fGetVar('#5710221844', 'uuid'), aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart) + "-" + vD3TimeParse(aDictAnnotation.dateEnd),
            //   dateStart: aDictAnnotation.dateStart,
            //   originalStart: aDictAnnotation.originalStart,
            //   dateEnd: aDictAnnotation.dateEnd,
            //   originalEnd: aDictAnnotation.originalEnd,
            //   dateEarliest: vStartDate,
            //   dateLatest: vEndDate,
            //   uuid: aDictAnnotation.uuid,
            //   author: aDictAnnotation.author,
            //   scopeUUID: window.LiftEd.Utils.fGetVar('#5710221844', 'uuid'),
            //   scopeType: aDictAnnotation.scopeType
            // }
          }
        } else {
          if (aDictAnnotation.scopeType !== 0) {
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary(aDictAnnotation.note, aDictAnnotation.dateStart, null, aDictAnnotation.dateEnd, null, vStartDate, vEndDate, aDictAnnotation.uuid, aDictAnnotation.scopeUUID, aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart) + "-" + vD3TimeParse(aDictAnnotation.dateEnd),
            //   dateStart: aDictAnnotation.dateStart,
            //   dateEnd: aDictAnnotation.dateEnd,
            //   dateEarliest: vStartDate,
            //   dateLatest: vEndDate,
            //   uuid: aDictAnnotation.uuid,
            //   author: aDictAnnotation.author,
            //   scopeUUID: aDictAnnotation.scopeUUID,
            //   scopeType: aDictAnnotation.scopeType
            // }
          } else {
            // noinspection JSCheckFunctionSignatures
            // noinspection JSCheckFunctionSignatures
            vDictNote = window.LiftEd.Graphing.fBuildAnnotationDictionary(aDictAnnotation.note, aDictAnnotation.dateStart, null, aDictAnnotation.dateEnd, null, vStartDate, vEndDate, aDictAnnotation.uuid, window.LiftEd.Utils.fGetVar('#5710221844', 'uuid'), aDictAnnotation.author, aDictAnnotation.scopeType);
            // vDictNote = {
            //   label: aDictAnnotation.note,
            //   title: vD3TimeParse(aDictAnnotation.dateStart) + "-" + vD3TimeParse(aDictAnnotation.dateEnd),
            //   dateStart: aDictAnnotation.dateStart,
            //   dateEnd: aDictAnnotation.dateEnd,
            //   dateEarliest: vStartDate,
            //   dateLatest: vEndDate,
            //   uuid: aDictAnnotation.uuid,
            //   author: aDictAnnotation.author,
            //   scopeUUID: window.LiftEd.Utils.fGetVar('#5710221844', 'uuid'),
            //   scopeType: aDictAnnotation.scopeType
            // }
          }
        }



      vArrayAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges('', vAnnotationZeroedStartDate, vNewStartYMax, 'annotation', vDictCounter.annotation, '', vDictNote));
      vArrayAnnotations.push(window.LiftEd.Graphing.fCreateAnnotationBadges('', vAnnotationZeroedEndDate, vNewEndYMax, 'annotation', vDictCounter.annotation, '', vDictNote));
      // vArrayAnnotations.push(vDictStartAnnotation);
      // vArrayAnnotations.push(vDictEndAnnotation);

      let vAnnotationBackgroundStartDate = vAnnotationZeroedStartDate;
      let vAnnotationBackgroundEndDate = vAnnotationZeroedEndDate;

      // vStartDate = new Date(window.LiftEd.Utils.fGetVar('#510101415', 'dateStart')).setHours(0,0,0,0);
      // vEndDate = new Date(window.LiftEd.Utils.fGetVar('#510101414', 'dateEnd')).setHours(0,0,0,0);
      let vArrayHTMLBackgrounds = [];
      for (let i = 0; i < document.getElementsByClassName('cLEAnnotationBackground').length; i++) {
        vArrayHTMLBackgrounds.push(document.getElementsByClassName('cLEAnnotationBackground')[i])
      }
      if ( vArrayHTMLBackgrounds.length > 0) {
        for (let i = 0; i < vArrayHTMLBackgrounds.length; i++) {
          let vIntRectangleStartDate = vArrayHTMLBackgrounds[i].attributes[1].value;
          let vIntRectangleEndDate = vArrayHTMLBackgrounds[i].attributes[2].value;

          if (vAnnotationBackgroundStartDate === vStartDate && vAnnotationBackgroundEndDate === vEndDate) {
            gD3.selectAll('.cLEAnnotationBackground').remove();
          }
          else if (vIntRectangleStartDate >= vAnnotationBackgroundStartDate && vIntRectangleEndDate <= vAnnotationBackgroundEndDate) {
            gD3.selectAll("#" + vArrayHTMLBackgrounds[i].attributes[window.LiftEd.Utils.fGetConst('#5710252114', 'kAnnotationBackGroundAttributeID')].value).remove();
          }
          else if (vIntRectangleStartDate <= vAnnotationBackgroundStartDate && vIntRectangleEndDate <= vAnnotationBackgroundEndDate && vIntRectangleEndDate >= vAnnotationBackgroundStartDate) {
              gD3.selectAll("#" + vArrayHTMLBackgrounds[i].attributes[window.LiftEd.Utils.fGetConst('#5710252114', 'kAnnotationBackGroundAttributeID')].value).remove();
              gD3.selectAll("#" + 'idLEAnnotationRangeBackground' + "A" + vDictCounter.annotation).remove();

              vAnnotationBackgroundStartDate = vIntRectangleStartDate;
          }
          else if (vIntRectangleStartDate >= vAnnotationBackgroundStartDate && vIntRectangleEndDate >= vAnnotationBackgroundEndDate && vIntRectangleStartDate <= vAnnotationBackgroundEndDate) {
            gD3.selectAll("#" +  vArrayHTMLBackgrounds[i].attributes[window.LiftEd.Utils.fGetConst('#5710252114', 'kAnnotationBackGroundAttributeID')].value).remove();
            gD3.selectAll("#" + 'idLEAnnotationRangeBackground' + "A" + vDictCounter.annotation).remove();

            vAnnotationBackgroundEndDate = vIntRectangleEndDate;
          }
          else if (vIntRectangleStartDate === vAnnotationBackgroundStartDate && vIntRectangleEndDate === vAnnotationBackgroundEndDate) {
              gD3.selectAll("#" +   vArrayHTMLBackgrounds[i].attributes[window.LiftEd.Utils.fGetConst('#5710252114', 'kAnnotationBackGroundAttributeID')].value).remove();
          }
          else if (vIntRectangleStartDate === vAnnotationBackgroundStartDate && vIntRectangleEndDate >= vAnnotationBackgroundEndDate) {
              gD3.selectAll("#" +   vArrayHTMLBackgrounds[i].attributes[window.LiftEd.Utils.fGetConst('#5710252114', 'kAnnotationBackGroundAttributeID')].value).remove();
              vAnnotationBackgroundEndDate = vIntRectangleEndDate;
          }
          else if (vIntRectangleStartDate <= vAnnotationBackgroundStartDate && vIntRectangleEndDate === vAnnotationBackgroundEndDate) {
              gD3.selectAll("#" +   vArrayHTMLBackgrounds[i].attributes[window.LiftEd.Utils.fGetConst('#5710252114', 'kAnnotationBackGroundAttributeID')].value).remove();
              vAnnotationBackgroundStartDate = vIntRectangleStartDate;
          }
        }
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fAppendAnnotationBackground(vAnnotationsLayer, vNewEndYMax, aD3fXScale, vAnnotationBackgroundEndDate, vAnnotationBackgroundStartDate, vDictCounter.annotation)
        // vAnnotationsLayer.append('rect')
        //   .attr('x', aD3fXScale(vAnnotationBackgroundStartDate))
        //   .attr('x1', vAnnotationBackgroundStartDate)
        //   .attr('x2', vAnnotationBackgroundEndDate)
        //   .attr('y2', vNewEndYMax)
        //   .attr('y1', 0)
        //   .attr('width', aD3fXScale(vAnnotationBackgroundEndDate) - aD3fXScale(vAnnotationBackgroundStartDate))
        //   .attr('id', "idLEAnnotationRangeBackground"  + "A" + vDictCounter.annotation)
        //   .attr('class', 'cLEAnnotationBackground')
        //   .attr('height', window.LiftEd.Utils.fGetVar('#5710121655', 'gIntegerHeight'))
      } else {
        if (vAnnotationBackgroundEndDate === vAnnotationBackgroundStartDate) {
          window.LiftEd.Graphing.fAppendAnnotationBackground(vAnnotationsLayer, vNewEndYMax, aD3fXScale, vAnnotationBackgroundEndDate, vAnnotationBackgroundStartDate, vDictCounter.annotation, 0)
          // vAnnotationsLayer.append('rect')
          //   .attr('x', aD3fXScale(vAnnotationBackgroundStartDate))
          //   .attr('x1', vAnnotationBackgroundStartDate)
          //   .attr('x2', vAnnotationBackgroundEndDate)
          //   .attr('y2', vNewEndYMax)
          //   .attr('y1', 0)
          //   .attr('width', 0)
          //   .attr('id', "idLEAnnotationRangeBackground"  + "A" + vDictCounter.annotation)
          //   .attr('class', 'cLEAnnotationBackground')
          //   .attr('height', window.LiftEd.Utils.fGetVar('#5710121655', 'gIntegerHeight'));
        } else {
          // noinspection JSCheckFunctionSignatures
          window.LiftEd.Graphing.fAppendAnnotationBackground(vAnnotationsLayer, vNewEndYMax, aD3fXScale, vAnnotationBackgroundEndDate, vAnnotationBackgroundStartDate, vDictCounter.annotation)
          // vAnnotationsLayer.append('rect')
          //   .attr('x', aD3fXScale(vAnnotationBackgroundStartDate))
          //   .attr('x1', vAnnotationBackgroundStartDate)
          //   .attr('x2', vAnnotationBackgroundEndDate)
          //   .attr('y2', vNewEndYMax)
          //   .attr('y1', 0)
          //   .attr('width', aD3fXScale(vAnnotationBackgroundEndDate) - aD3fXScale(vAnnotationBackgroundStartDate))
          //   .attr('id', "idLEAnnotationRangeBackground"  + "A" + vDictCounter.annotation)
          //   .attr('class', 'cLEAnnotationBackground')
          //   .attr('height', window.LiftEd.Utils.fGetVar('#5710121655', 'gIntegerHeight'));
        }
      }
      }
    });



      let vMakeAnnotations = gD3.annotation()
        .editMode(false)
          .type(gD3.annotationBadge)
        .accessors({
          x: vDictData => vD3fXScale(new Date(vDictData.date)),
          y: vDictData => {
            //adjusts height if value === 0
            if (vDictData.value === 0) {
              if (vReplacementYCounter === null) {

                vReplacementYCounter = 0;
                return vReplacementYCounter;
              }
              else if (vReplacementYCounter === 0) {

                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter;
              } else {

                vReplacementYCounter = vReplacementYCounter + 30;
                return vReplacementYCounter
              }
            } else {
              return vD3fYScale(vDictData.value);
            }
          }
        })
        .// noinspection UnreachableCodeJS
    accessorsInverse({
           date: vDictData => timeFormat(x.invert(vDictData.x)),
           close: vDictData => y.invert(vDictData.y)
        })
        .on('subjectclick', function(annotation) {
          if (document.querySelector('input[name="nLEAnnotationStartDate"]')) {

            vHTMLElAnnotationStartDate = document.querySelector('input[name="nLEAnnotationStartDate"]');
          } else {
            throw 'ERROR #5710031346: document.querySelector("input[name="nLEAnnotationStartDate"]") missing';
          }

          if (document.querySelector('input[name="nLEAnnotationEndDate"]')) {
              vHTMLElAnnotationEndDate = document.querySelector('input[name="nLEAnnotationEndDate"]');
          } else {
            throw 'ERROR #5710111232: document.querySelector("input[name="nLEAnnotationEndDate"]") missing';
          }


          if (annotation.note.originalEnd) {

            vIntegerAnnotationEndDate = new Date(annotation.note.originalEnd);
          }
          else if (annotation.note.dateEnd) {
              vIntegerAnnotationEndDate = new Date(annotation.note.dateEnd);
          }

          if (annotation.note.originalStart) {
              vIntegerAnnotationStartDate = new Date(annotation.note.originalStart);
          }
          else if (annotation.note.dateStart) {

            vIntegerAnnotationStartDate = new Date(annotation.note.dateStart);
          }

          if (annotation.note.scopeUUID) {
            window.LiftEd.Vars.scopeType = annotation.note.scopeType;
            window.LiftEd.Vars.scopeUUID = annotation.note.scopeUUID;
          } else {
            window.LiftEd.Vars.scopeType = annotation.note.scopeType;
            window.LiftEd.Vars.scopeUUID = window.LiftEd.Utils.fGetVar('#5710221850', 'uuid')
          }
          vHTMLSelectedRadioButton = null;
          if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'scopeType')) === 0) {

            vHTMLSelectedRadioButton = document.getElementById('idLEGlobal');
            vHTMLSelectedRadioButton.checked = true;
          } else if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'scopeType')) === 1) {
            if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'typeDisplay')) === 0 || parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'typeDisplay')) === 1) {

              vHTMLSelectedRadioButton = document.getElementById('idLEActivity');
              vHTMLSelectedRadioButton.checked = true;
            } else {

              vHTMLSelectedRadioButton = document.getElementById('idLEBehavior');
              vHTMLSelectedRadioButton.checked = true;
            }
          } else if (parseInt(window.LiftEd.Utils.fGetVar('#5710221836', 'scopeType')) === 2) {

            vHTMLSelectedRadioButton = document.getElementById('idLEAllTargets');
            vHTMLSelectedRadioButton.checked = true;
          } else {
            vHTMLSelectedRadioButton = document.getElementById('idLE' + window.LiftEd.Utils.fGetVar('#5710221836', 'scopeUUID'));
            vHTMLSelectedRadioButton.checked = true;
          }

          vHTMLELAuthorText.style.display = 'inline-block';
          vHTMLELAuthorValue.style.display = 'inline-block';
          vHTMLELAuthorValue.innerHTML = annotation.note.author;



          // noinspection CommaExpressionJS
          vAnnotationStartDateDays = ("0" + (vIntegerAnnotationStartDate.getDate())).slice(-2),
          vAnnotationStartDateMonth = ("0" + (vIntegerAnnotationStartDate.getMonth() + 1)).slice(-2),
          vAnnotationStartDateYear = vIntegerAnnotationStartDate.getFullYear(),
          vAnnotationStartTimeHours = vIntegerAnnotationStartDate.getHours().toString(),
          vAnnotationStartTimeMinutes = vIntegerAnnotationStartDate.getMinutes().toString();

          vAnnotationDateStartString = '' + vAnnotationStartDateYear + '-' + vAnnotationStartDateMonth + '-' + vAnnotationStartDateDays;

          vHTMLElAnnotationStartDate.value = vAnnotationDateStartString;
          if (annotation.note.dateEnd) {



            // noinspection CommaExpressionJS
            vAnnotationEndDateDays = ("0" + (vIntegerAnnotationEndDate.getDate())).slice(-2),
            vAnnotationEndDateMonth = ("0" + (vIntegerAnnotationEndDate.getMonth() + 1)).slice(-2),
            vAnnotationEndDateYear = vIntegerAnnotationEndDate.getFullYear(),
            vAnnotationEndTimeHours = vIntegerAnnotationEndDate.getHours().toString(),
            vAnnotationEndTimeMinutes = vIntegerAnnotationEndDate.getMinutes().toString();

            vAnnotationDateEndString = '' + vAnnotationEndDateYear + '-' + vAnnotationEndDateMonth + '-' + vAnnotationEndDateDays;
            vHTMLElAnnotationEndDate.value = vAnnotationDateEndString;
          } else {

            vIntegerAnnotationEndDate = null;
            vHTMLElAnnotationEndDate.value = '';
          }

          //changes annotation modal body and header
          if (document.getElementById('idLECustomAnnotationHeader')) {

            vAnnotationHeader = document.getElementById('idLECustomAnnotationHeader');
          } else {
            throw 'ERROR #5710031348:  document.getElementById("idLECustomAnnotationHeader") missing';
          }
          if (document.getElementById('idLECustomAnnotationTextIput')) {

            vAnnotationBody = document.getElementById('idLECustomAnnotationTextIput');
          } else {
            throw 'ERROR #5710031349:  document.getElementById("idLECustomAnnotationTextIput") missing';
          }
          if (document.querySelector('input[name="nLEAnnotationStartTime"]')) {

            vHTMLElAnnotationStartTime = document.querySelector('input[name="nLEAnnotationStartTime"]');
          } else {
            throw 'ERROR #5710111235:  document.querySelector("input[name="nLEAnnotationStartTime"]") missing';
          }
          if (document.querySelector('input[name="nLEAnnotationEndTime"]')) {

            vHTMLElAnnotationEndTime = document.querySelector('input[name="nLEAnnotationEndTime"]');
          } else {
            throw 'ERROR #5710111235:  document.querySelector("input[name="nLEAnnotationEndTime"]") missing';
          }
          if (vAnnotationStartTimeHours.length === 1) {
            vAnnotationStartTimeHours = '0' + vAnnotationStartTimeHours
          }
          if (vAnnotationStartTimeMinutes.length === 1) {

            vAnnotationStartTimeMinutes = '0' + vAnnotationStartTimeMinutes
          }
          if (vIntegerAnnotationEndDate) {
            if (vAnnotationEndTimeHours.length === 1) {
              vAnnotationEndTimeHours = '0' + vAnnotationEndTimeHours
            }
            if (vAnnotationEndTimeMinutes.length === 1) {

              vAnnotationEndTimeMinutes = '0' + vAnnotationEndTimeMinutes
            }
            vHTMLElAnnotationEndTime.value = vAnnotationEndTimeHours + ':' + vAnnotationEndTimeMinutes;
            window.LiftEd.Vars.currentAnnotationEndDate = new Date(vAnnotationDateEndString).getTime();
            window.LiftEd.Vars.currentAnnotationEndTime = vAnnotationEndTimeHours + ':' + vAnnotationEndTimeMinutes;
          } else {
            window.LiftEd.Vars.currentAnnotationEndDate = null;
            window.LiftEd.Vars.currentAnnotationEndTime = null;
            vHTMLElAnnotationEndTime.value = '';
            vHTMLElAnnotationEndTime.value = ''
          }




          vAnnotationHeader.innerHTML = 'Edit Annotation';
          vAnnotationBody.value = annotation.note.label;




          vHTMLElAnnotationStartTime.value = vAnnotationStartTimeHours + ':' + vAnnotationStartTimeMinutes;

          window.LiftEd.Vars.currentAnnotationStartDate = new Date(vAnnotationDateStartString).getTime();
          window.LiftEd.Vars.currentAnnotationStartTime = vAnnotationStartTimeHours + ':' + vAnnotationStartTimeMinutes;


          window.LiftEd.Vars.annotationUUID = annotation.note.uuid;
          // vAnnotationBody.focus();
        })
        .annotations(vArrayAnnotations);

      //appends tactics annotations to graph.
      vAnnotationsLayer
      .attr("class", "cLEAnnotationsGroup")
      .call(vMakeAnnotations)
  }
  if (document.getElementById('idLETabs')) {
    let vCustomAnnotationModal = document.querySelector('.cLEAddAnnotationsButton');
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Graphing.fHTMLElCustomAnnotationModal(vCustomAnnotationModal , {
        content: '.cLECustomAnnotation'
      });
  }
  } catch (e) {
    throw 'ERROR #5711161250: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fUtilUpdateGraphDefault
 * @description A function to update the graph with a new date range.
*/
window.LiftEd.Graphing.fUtilUpdateGraphDefault = () => {
  try {
    let vHTMLElStartDate = null,
        vHTMLElEndDate = null,
        vIntEndDate = null,
        vIntStartDate = null,
        vDictAPIArgs,
        vIntEndDatePlusOne = null,
        vIntStartDatePlusOne = null;



    if (document.querySelector('input[name="nLEStartDate"]')) {
      vHTMLElStartDate = document.querySelector('input[name="nLEStartDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221354: document.querySelector(("input[name="nLEStartDate"]") missing';
    }
    if (document.querySelector('input[name="nLEEndDate"]')) {
      vHTMLElEndDate = document.querySelector('input[name="nLEEndDate"]');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5708221355: document.querySelector("input[name="nLEStartDate"]") missing';
    }
    if (window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') !== '99' || window.LiftEd.Utils.fGetVar('#5709202126', 'typeDate') !== 99) {
        // noinspection CommaExpressionJS
      vIntEndDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202127', 'dateEnd'))),
        vIntStartDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709202128', 'dateStart')));
    } else {
        // noinspection CommaExpressionJS
        vIntEndDate = new Date(vHTMLElEndDate.value),
        vIntStartDate = new Date(vHTMLElStartDate.value),
        vIntEndDate.setHours(23,59,59,0);
        vIntStartDate.setHours(23,59,59,0);
        vIntEndDatePlusOne = vIntEndDate.setDate(vIntEndDate.getDate() + 1);

      vIntStartDatePlusOne = vIntStartDate.setDate(vIntStartDate.getDate() + 1);
        window.LiftEd.Vars.dateEnd = vIntEndDatePlusOne;
        window.LiftEd.Vars.dateStart = vIntStartDatePlusOne;

    }
    vDictAPIArgs = {
      typeDate:  window.LiftEd.Utils.fGetVar('#5709202128', 'typeDate'),
      dateStart: window.LiftEd.Utils.fConvertDate(vIntStartDate, ''),
      dateEnd: window.LiftEd.Utils.fConvertDate(vIntEndDate, ''),
      uuid: window.LiftEd.Utils.fGetVar('#5709202133', 'uuid')
    };

    vDictAPIArgs.options = {
      typeChart: window.LiftEd.Utils.fGetVar('#5709202131', 'typeChart'),
      typeDisplay: window.LiftEd.Utils.fGetVar('#5709202132', 'typeDisplay'),
      numberHandler: window.LiftEd.Utils.fGetVar('#5710061516', 'numberHandler'),
      tabOnLoad: window.LiftEd.Utils.fGetVar('#5710061517', 'tabOnLoad')
    };
    if (window.LiftEd.API.fGetDebug()) {console.log(vDictAPIArgs);}
    window.LiftEd.API.fLogDebugVerbose("vDictAPIArgs = " + JSON.stringify(vDictAPIArgs));
    // window.LiftEd.GraphingCallbacks.fUpdateGraphDefaults(vDictAPIArgs);
  } catch (e) {
    throw 'ERROR #5711161251: ' + e;
  }
};




/**
 * @memberof Graphing
 * @function fChooseTab
 * @description A function that displays the table corresponding to the tab selected.
 * @param {number} aIntTabName - An integer that determines which tab was selected. Can be 0, 1, 2, 3 or 4.
*/
window.LiftEd.Graphing.fChooseTab = (aIntTabName) => {
  try {
    let vIntTabName = aIntTabName,
        vHTMLElDataHeader = document.getElementById('idLEData'),
        vHTMLElTacticsHeader = document.getElementById('idLETactics'),
        vHTMLElNotesHeader = document.getElementById('idLENotes'),
        vHTMLElAnnotationsHeader = document.getElementById('idLEAnnotations'),
        vHTMLElPromptsHeader = document.getElementById('idLEPrompts');


    let vHTMLElDataButton = document.getElementById('idLEDataButton'),
        vHTMLElTacticsButton = document.getElementById('idLETacticsTabButton'),
        vHTMLElNotesButton = document.getElementById('idLENotesTabButton'),
        vHTMLElAnnotationButton = document.getElementById('idLEAnnotationsTabButton'),
        vHTMLElPromptsButton = document.getElementById('idLEPromptsTabButton');

    if (vIntTabName === 0 && vHTMLElDataHeader) {
      vHTMLElDataHeader.style.display = "block";
      vHTMLElDataButton.className += ' active';
      window.LiftEd.Vars.tabOnLoad = 0;
    } else if (vIntTabName === 1 && vHTMLElTacticsHeader) {
      vHTMLElTacticsHeader.style.display = "block";
      vHTMLElTacticsButton.className += ' active';
      window.LiftEd.Vars.tabOnLoad = 1;
    } else if (vIntTabName === 2 && vHTMLElNotesHeader) {
      vHTMLElNotesHeader.style.display = "block";
      vHTMLElNotesButton.className += ' active';
      window.LiftEd.Vars.tabOnLoad = 2;
    } else if (vIntTabName === 3 && vHTMLElAnnotationsHeader) {
      vHTMLElAnnotationsHeader.style.display = "block";
      vHTMLElAnnotationButton.className += ' active';
      window.LiftEd.Vars.tabOnLoad = 3;
    } else if (vIntTabName === 4 && vHTMLElPromptsButton) {
      vHTMLElPromptsHeader.style.display = "block";
      vHTMLElPromptsButton.className += ' active';
      window.LiftEd.Vars.tabOnLoad = 4;
    } else  {
      vHTMLElAnnotationsHeader.style.display = "block";
      vHTMLElAnnotationButton.className += ' active';
      window.LiftEd.Vars.tabOnLoad = 3;
    }
  } catch (e) {
    throw 'ERROR #5711161252: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fSelectDateFromDropDowns
 * @description A function that choose the correct option from the dropdown on load.
*/
window.LiftEd.Graphing.fSelectDateFromDropDown = () => {
  try {
    let vHTMLElementDropDown = null,
        vIntegerStartDate,
        vIntegerStartDateDays = null,
        vIntegerStartDateMonth = null,
        vIntegerStartDateYear = null,
        vStringStartDateString = null,
        vIntegerEndDate,
        vIntegerEndDateDays = null,
        vIntegerEndDateMonth = null,
        vIntegerEndDateYear = null,
        vStringEndDateString = null,
        vHTMLElStartDate = null,
        vHTMLElEndDate = null,
        vEndDateDays = null,
        vEndDateMonth,
        vEndDateYear,
        vStartDateDays,
        vStartDateMonth,
        vStartDateYear,
        vEndDateString,
        vStartDateString;


    if (document.getElementById('idLEDatePickerValue')) {
      vHTMLElementDropDown = document.getElementById('idLEDatePickerValue');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242014: document.getElementById("idLEDatePickerValue") missing';
    }
    vIntegerStartDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709191845', 'dateStart')));

    if (vIntegerStartDate) {
      // noinspection CommaExpressionJS
      vIntegerStartDateDays = vIntegerStartDate.getDate(),
      vIntegerStartDateMonth = window.LiftEd.Utils.fGetVar('#5709191853', 'pArrStrMonthNames')[vIntegerStartDate.getMonth()].slice(0, 3),
      vIntegerStartDateYear = vIntegerStartDate.getFullYear(),
      vStringStartDateString = vIntegerStartDateMonth + ' ' + vIntegerStartDateDays + ', ' + vIntegerStartDateYear;
    }
    vIntegerEndDate = new Date(parseInt(window.LiftEd.Utils.fGetVar('#5709191846', 'dateEnd')));
    if (vIntegerEndDate) {
      // noinspection CommaExpressionJS
      vIntegerEndDateDays = vIntegerEndDate.getDate(),
      vIntegerEndDateMonth = window.LiftEd.Utils.fGetVar('#5709191850', 'pArrStrMonthNames')[vIntegerEndDate.getMonth()].slice(0, 3),
      vIntegerEndDateYear = vIntegerEndDate.getFullYear(),
      vStringEndDateString = vIntegerEndDateMonth + ' ' + vIntegerEndDateDays + ', ' + vIntegerEndDateYear;
    }

    if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '0' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 0) {
      vHTMLElementDropDown.innerHTML = "Last 7 Days";
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '1' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 1) {
      vHTMLElementDropDown.innerHTML = 'Last 14 Days';
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '2' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 2) {
      vHTMLElementDropDown.innerHTML = 'Last 30 Days';
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '3' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 3) {
      vHTMLElementDropDown.innerHTML = 'Last 60 Days';
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '4' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 4) {
      vHTMLElementDropDown.innerHTML = 'Last 90 Days';
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '5' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 5) {
      vHTMLElementDropDown.innerHTML = 'Last 180 Days';
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '6' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 6) {
      window.LiftEd.API.fLogDebugVerbose("vIntegerStartDate = " + vIntegerStartDate);
      window.LiftEd.API.fLogDebugVerbose("vIntegerEndDate = " + vIntegerEndDate);
      vHTMLElementDropDown.innerHTML = '' + vStringStartDateString + ' - ' + vStringEndDateString;
    }
    else if (window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === '99' || window.LiftEd.Utils.fGetVar('#5709191852', 'typeDate') === 99) {
      vHTMLElementDropDown.innerHTML = '' + vStringStartDateString + ' - ' + vStringEndDateString;
    }

    if (document.querySelector('input[name="nLEStartDate"]')) {
      vHTMLElStartDate = document.querySelector('input[name="nLEStartDate"]');
    }else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242014: document.querySelector("input[name="nLEStartDate"]") missing';
    }
    if (document.querySelector('input[name="nLEEndDate"]')) {
      vHTMLElEndDate = document.querySelector('input[name="nLEEndDate"]');
    }else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242014: document.querySelector("input[name="nLEEndDate"]") missing';
    }



    // noinspection CommaExpressionJS
    vEndDateMonth = ("0" + (vIntegerEndDate.getMonth() + 1)).slice(-2),
        vEndDateYear = vIntegerEndDate.getFullYear(),
        vStartDateDays = ("0" + (vIntegerStartDate.getDate())).slice(-2),
        vStartDateMonth = ("0" + (vIntegerStartDate.getMonth() + 1)).slice(-2),
        vStartDateYear = vIntegerStartDate.getFullYear();


        if ((vIntegerEndDate.getDate() + 1) > 31) {
          vEndDateDays = ("0" + 31).slice(-2);
        } else {

          vEndDateDays = ("0" + (vIntegerEndDate.getDate())).slice(-2);
        }

    vEndDateString = '' + vEndDateYear + '-' + vEndDateMonth + '-' + vEndDateDays;

    vStartDateString = '' + vStartDateYear + '-' + vStartDateMonth + '-' + vStartDateDays;
    vHTMLElEndDate.value = vEndDateString;
    vHTMLElStartDate.value = vStartDateString;
  } catch (e) {
    throw 'ERROR #5711161253: ' + e;
  }
};

/**
 * @memberof Graphing
 * @function fSizeTables
 * @description A function to resize the tables below the graph to fit the width of the screen
*/
window.LiftEd.Graphing.fSizeTables = () => {
  try {
    let vHTMLElDataHeader = document.getElementById('idLEData'),
        vHTMLElTacticsHeader = document.getElementById('idLETactics'),
        vHTMLElNotesHeader = document.getElementById('idLENotes'),
        vHTMLElAnnotationsHeader = document.getElementById('idLEAnnotations'),
        vHTMLElPromptsHeader = document.getElementById('idLEPrompts');
    if (vHTMLElDataHeader) {
      vHTMLElDataHeader.style.width = window.LiftEd.Utils.fGetVar('#5709202102', 'canvasX').toString() + 'px';
    }

    if (vHTMLElTacticsHeader){
      vHTMLElTacticsHeader.style.width = window.LiftEd.Utils.fGetVar('#5709202102', 'canvasX').toString() + 'px';
    }

    if (vHTMLElNotesHeader) {
      vHTMLElNotesHeader.style.width = window.LiftEd.Utils.fGetVar('#5709202102', 'canvasX').toString() + 'px';
    }

    if (vHTMLElAnnotationsHeader) {
      vHTMLElAnnotationsHeader.style.width = window.LiftEd.Utils.fGetVar('#5709202102', 'canvasX').toString() + 'px';
    }

    if (vHTMLElPromptsHeader) {
      vHTMLElPromptsHeader.style.width = window.LiftEd.Utils.fGetVar('#5709202102', 'canvasX').toString() + 'px';
    }
  } catch (e) {
    throw 'ERROR #5711161254: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fZeroData
 * @description A function zero the data passed in so that the ticks align with the graph coordinates.
 * @param {array} aArrayData - An array of data to modify.
 * @returns {array} - An array of data zeroed to midnight.
*/
window.LiftEd.Graphing.fZeroData = (aArrayData) => {
  try {
    let vArrayData = null;
    let vArrayZeroedData = [];
    if (aArrayData) {
      vArrayData = aArrayData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242024: aArrayData missing';
    }
    vArrayData.forEach( (aDictDataSet) => {
      let vDictNewDataSet = {'name': aDictDataSet.name, 'coordinates': [], 'summaryData': aDictDataSet.summaryData, 'uuid': aDictDataSet.uuid};
      aDictDataSet.coordinates.forEach( (aDictCoordinate) => {
        let vNewCoordinateDate = new Date(window.LiftEd.Utils.fConvertDate(aDictCoordinate.date, 'To JS Date Format'));
        vNewCoordinateDate.setHours(0, 0, 0, 0);
        if (vNewCoordinateDate.getTime() < window.LiftEd.Utils.fGetVar('#5709181706', 'dateEnd')) {
          if ('prompts' in aDictCoordinate) {
            vDictNewDataSet.coordinates.push({'date': vNewCoordinateDate.getTime(), 'value': aDictCoordinate.value, 'max': aDictCoordinate.max, 'uuid': aDictDataSet.uuid, 'prompts': aDictCoordinate.prompts});
          } else {
            vDictNewDataSet.coordinates.push({'date': vNewCoordinateDate.getTime(), 'value': aDictCoordinate.value, 'max': aDictCoordinate.max, 'uuid': aDictDataSet.uuid});
          }
        }
      });
      vArrayZeroedData.push(vDictNewDataSet)
    });
    return vArrayZeroedData;
  } catch (e) {
    throw 'ERROR #5711161255: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fSetShowAllDates
 * @description A function that sets the show all selection the dropdown with the correct date range.
 * @param {object} aDictGraphArgs - A dictionary of the graph data
*/
window.LiftEd.Graphing.fSetShowAllDates = (aDictGraphArgs) => {
  try {
    let vHTMLElShowAllSelection = null,
        vDateEarliest = null,
        vDateLatest = null,
        vDictGraphArgs = null;

    if (document.getElementById('idLEShowAll')) {
      vHTMLElShowAllSelection = document.getElementById('idLEShowAll');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242028: document.getElementById("idLEShowAll") missing';
    }
    if (aDictGraphArgs) {
      vDictGraphArgs = aDictGraphArgs;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242029: aDictGraphArgs missing';
    }
    if ('dateEarliest' in vDictGraphArgs) {
        vDateEarliest = new Date(window.LiftEd.Utils.fConvertDate(vDictGraphArgs.dateEarliest, 'To JS Date Format'));
    } else {
        vDateEarliest = new Date(window.LiftEd.Utils.fConvertDate(vDictGraphArgs.dateStart, 'To JS Date Format'));
        vDictGraphArgs.dateEarliest = vDictGraphArgs.dateStart;
    }

    if ('dateLatest' in vDictGraphArgs) {
        vDateLatest = new Date(window.LiftEd.Utils.fConvertDate(vDictGraphArgs.dateLatest, 'To JS Date Format'));
    } else {
        vDateLatest = new Date(window.LiftEd.Utils.fConvertDate(vDictGraphArgs.dateEnd, 'To JS Date Format'));
        vDictGraphArgs.dateLatest = vDictGraphArgs.dateEnd;
    }
    if (vDateEarliest > vDateLatest) {
      vHTMLElShowAllSelection.innerHTML = "Show All" + " (" +
      window.LiftEd.Utils.fGetVar('#509181533', 'pArrStrMonthNames')[vDateLatest.getMonth()] + " " + vDateLatest.getDate() + ', ' + vDateLatest.getFullYear() + ' - ' + window.LiftEd.Utils.fGetVar('#509181534', 'pArrStrMonthNames')[vDateEarliest.getMonth()] + " " + vDateEarliest.getDate() + ', ' + vDateEarliest.getFullYear() + ')';
    } else {
      vHTMLElShowAllSelection.innerHTML = "Show All" + " (" + window.LiftEd.Utils.fGetVar('#509181535', 'pArrStrMonthNames')[vDateEarliest.getMonth()] + " " + vDateEarliest.getDate() + ', ' + vDateEarliest.getFullYear() + ' - ' + window.LiftEd.Utils.fGetVar('#509181536', 'pArrStrMonthNames')[vDateLatest.getMonth()] + " " + vDateLatest.getDate() + ', ' + vDateLatest.getFullYear() + ')';
    }
  } catch (e) {
    throw 'ERROR #5711161256: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fBuildDataDisplay
 * @description A function to build the data table under the graph
 * @param {number} aDataSetLength - An integer of the length of the targets available.
 * @param {string} aStrDataLabel - A string to use as the title the for the text of the data button
*/
window.LiftEd.Graphing.fBuildDataDisplay = (aDataSetLength, aStrDataLabel) => {
  try {
    let vGraphContainer = null,
        vTabsHolder,
        vDataTabButton = null,
        vDataTab = null,
        vDataSetLength = null,
        vStrDataLabel = null,
        vDataTabHeader = null;

    if (document.getElementById('idLEGraphContainer')) {
      vGraphContainer = document.getElementById('idLEGraphContainer');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242031: document.getElementById("idLEGraphContainer") missing';
    }
    if (aDataSetLength) {
      vDataSetLength = aDataSetLength;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242031: vDataSetLength missing';
    }
    if (aStrDataLabel) {
      vStrDataLabel = aStrDataLabel;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710091430: aStrDataLabel missing';
    }
    vTabsHolder = document.createElement('DIV');
    vTabsHolder.setAttribute('id', 'idLETabs');
    if (window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === '5' || window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === 5) {
      vTabsHolder.setAttribute('class', 'cLETabs');
    }
    else if (window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === '4' || window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === 4) {
      vTabsHolder.setAttribute('class', 'cLETabsLength4');
    }
    else if (window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === '3' || window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === 3) {
      vTabsHolder.setAttribute('class', 'cLETabsLength3');
    }
    else if (window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === '2' || window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === 2) {
      vTabsHolder.setAttribute('class', 'cLETabsLength2');
    } else {
      vTabsHolder.setAttribute('class', 'cLETabsLength1');
    }
    vGraphContainer.appendChild(vTabsHolder);
    if (vDataSetLength >= 1) {
      vDataTabButton = document.createElement('button');
      if (aDataSetLength >= 2) {
        vDataTabButton.innerHTML = vStrDataLabel + " (" + (aDataSetLength + 1) + ")";
      } else {
        vDataTabButton.innerHTML = vStrDataLabel + " (" + aDataSetLength + ")";
      }
      vDataTabButton.setAttribute('class', 'cLETabLinks');
      vDataTabButton.setAttribute('id', 'idLEDataButton');
      vDataTabButton.onclick = () => {
        window.LiftEd.Graphing.fUtilUpdateGraphDefault();
        // noinspection JSCheckFunctionSignatures
        window.LiftEd.Graphing.fOpenTab(event, 'idLEData')};

      vTabsHolder.appendChild(vDataTabButton);

      vDataTab = document.createElement('div');
      vDataTab.setAttribute('id', 'idLEData');
      vDataTab.setAttribute('class', 'cLETabContent');


      vDataTabHeader = document.createElement('div');
      vDataTabHeader.setAttribute('id', 'idLEDataTabHeading');
      vDataTabHeader.setAttribute('class', 'cLEDataTabHeading');

      vGraphContainer.appendChild(vDataTab);
      vDataTab.appendChild(vDataTabHeader);
    }
  } catch (e) {
    throw 'ERROR #5711161257: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fBuildTacticsDisplay
 * @description A function to build the data table under the graph
 * @param {number} aIntTacticsLength - An integer of the length of the targets available.
*/
//appends tactics tab to the dom
window.LiftEd.Graphing.fBuildTacticsDisplay = (aIntTacticsLength) => {
  try {
    let vTabHolder = document.getElementById('idLETabs'),
        vTacticsTabButton,
        vTacticsTab,
        vTacticsTabHeader,
        vGraphContainer = null,
        vIntTacticsLength = null;



    if (document.getElementById('idLEGraphContainer')) {
      vGraphContainer = document.getElementById('idLEGraphContainer');
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242031: document.getElementById("idLEGraphContainer") missing';
    }
    if (aIntTacticsLength) {
      vIntTacticsLength = aIntTacticsLength;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242031: aIntTacticsLength missing';
    }
    vTacticsTabButton = document.createElement('button');
    vTacticsTabButton.innerHTML = "Tactics" + " (" + vIntTacticsLength + ")";
    vTacticsTabButton.setAttribute('class', 'cLETabLinks');
    vTacticsTabButton.setAttribute('id', 'idLETacticsTabButton');
    vTacticsTabButton.onclick = () => {
      window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fOpenTab(event, 'idLETactics')};
    vTabHolder.appendChild(vTacticsTabButton);

    vTacticsTab = document.createElement('div');
    vTacticsTab.setAttribute('id', 'idLETactics');
    vTacticsTab.setAttribute('class', 'cLETabContent');

    vTacticsTabHeader = document.createElement('div');
    vTacticsTabHeader.setAttribute('id', 'idLETacticsHeader');
    vTacticsTabHeader.setAttribute('class', 'cLETabsHeader');
    vTacticsTab.appendChild(vTacticsTabHeader);
    vGraphContainer.appendChild(vTacticsTab);
  } catch (e) {
    throw 'ERROR #5711161415: ' + e;
  }
};


    /**
    * @memberof Graphing
    * @function fBuildNotesDisplay
    * @description A function to build the notes table under the graph
    * @param {number} aIntNotesLength - An integer of the length of the notes available.
    */
window.LiftEd.Graphing.fBuildNotesDisplay = (aIntNotesLength) => {
  try {
    let vTabHolder = document.getElementById('idLETabs'),
        vNotesTabButton,
        vNotesTab,
        vNotesTabHeader,
        vGraphContainer,
        vIntNotesLength = null;

    if (aIntNotesLength) {
      vIntNotesLength = aIntNotesLength;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242031: aIntNotesLength missing';
    }
    vNotesTabButton = document.createElement('button');
    vNotesTabButton.innerHTML = "Notes" + " (" + vIntNotesLength + ")";
    vNotesTabButton.setAttribute('class', 'cLETabLinks');
    vNotesTabButton.setAttribute('id', 'idLENotesTabButton');
    vNotesTabButton.onclick = () => {
      window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fOpenTab(event, 'idLENotes')};
    vTabHolder.appendChild(vNotesTabButton);

    vGraphContainer = document.getElementById('idLEGraphContainer');
    vNotesTab = document.createElement('div');
    vNotesTab.setAttribute('id', 'idLENotes');
    vNotesTab.setAttribute('class', 'cLETabContent');

    vNotesTabHeader = document.createElement('div');
    vNotesTabHeader.setAttribute('id', 'idLENotesHeader');
    vNotesTabHeader.setAttribute('class', 'cLETabsHeader');

    vNotesTab.appendChild(vNotesTabHeader);
      vGraphContainer.appendChild(vNotesTab);
  } catch (e) {
    throw 'ERROR #5711161258: ' + e;
  }
};

/**
 * @memberof Graphing
 * @function fBuildAnnotationsDisplay
 * @description A function to build the annotations table under the graph
 * @param {array} aArrayAnnotations - An array of annotations to display on the annotations table
*/
window.LiftEd.Graphing.fBuildAnnotationsDisplay = (aArrayAnnotations) => {
  try {
    let vTabHolder = document.getElementById('idLETabs'),
        vAnnotationsTabButton,
        vAnnotationsTab,
        vAnnotationsTabHeader,
        vGraphContainer = null;
    let vArrayFilteredAnnotations = [];
    let vIntXMin = null;
    let vIntXMax = null;
    let vAnnotationStartDate = null;
    let vAnnotationEndDate = null;
    let vArrayAnnotations = aArrayAnnotations;


      if (document.getElementById('idLEGraphContainer')) {
        vGraphContainer = document.getElementById('idLEGraphContainer');
      } else {
        // noinspection ExceptionCaughtLocallyJS
        throw 'ERROR #5709242031: document.getElementById("idLEGraphContainer") missing';
      }
    if (window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === '1' || window.LiftEd.Utils.fGetVar('#5709181748', 'tabLength') === 1) {
        vTabHolder = document.createElement('DIV');
        vTabHolder.setAttribute('id', 'idLETabs');
        vTabHolder.setAttribute('class', 'cLETabsLength1');
        vGraphContainer.appendChild(vTabHolder);
      } else {
        if (document.getElementById('idLETabs')) {
          vTabHolder = document.getElementById('idLETabs');
        } else {
          // noinspection ExceptionCaughtLocallyJS
          throw 'ERROR #5709242043: document.getElementById("idLETabs") missing';
        }
      }

      if (vArrayAnnotations.length > 0) {
        vArrayAnnotations.forEach((aDictAnnotation) => {
          vAnnotationStartDate = new Date(aDictAnnotation.dateStart * 1000);
          vIntXMin = new Date(window.LiftEd.Utils.fGetVar('#5710201628', 'dateStart'));
          vIntXMax= new Date(window.LiftEd.Utils.fGetVar('#5710201629', 'dateEnd'));
          if (vAnnotationStartDate.setHours(0,0,0,0) >= vIntXMin.setHours(0,0,0,0) && vAnnotationStartDate.setHours(0,0,0,0) <= vIntXMax.setHours(0,0,0,0)) {
            if ('dateEnd' in aDictAnnotation) {
              vAnnotationEndDate = new Date(aDictAnnotation.dateEnd * 1000);
              if (vAnnotationEndDate.setHours(0,0,0,0) <= vIntXMax.setHours(0,0,0,0)) {
                vArrayFilteredAnnotations.push(1);
              }
            } else {
                vArrayFilteredAnnotations.push(1);
            }
          }
        });
      }

    vAnnotationsTabButton = document.createElement('button');
    vAnnotationsTabButton.innerHTML = "Annotations" + " (" + vArrayFilteredAnnotations.length + ")";
    vAnnotationsTabButton.setAttribute('class', 'cLETabLinks');
    vAnnotationsTabButton.setAttribute('id', 'idLEAnnotationsTabButton');
    vAnnotationsTabButton.onclick = () => {
      window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fOpenTab(event, 'idLEAnnotations')};
    vTabHolder.appendChild(vAnnotationsTabButton);

    vGraphContainer = document.getElementById('idLEGraphContainer');
    vAnnotationsTab = document.createElement('div');
    vAnnotationsTab.setAttribute('id', 'idLEAnnotations');
    vAnnotationsTab.setAttribute('class', 'cLETabContent');

    vAnnotationsTabHeader = document.createElement('div');
    vAnnotationsTabHeader.setAttribute('id', 'idLEAnnotationsHeader');
    vAnnotationsTabHeader.setAttribute('class', 'cLETabsHeader');

    vAnnotationsTab.appendChild(vAnnotationsTabHeader);
    vGraphContainer.appendChild(vAnnotationsTab);
  } catch (e) {
    throw 'ERROR #5711161259: ' + e;
  }
};

/**
  * @memberof Graphing
  * @function fBuildPromptsDisplay
  * @description A function to build the notes table under the graph
*/
window.LiftEd.Graphing.fBuildPromptsDisplay = () => {
  try {
    // noinspection JSUnusedLocalSymbols
    let vTabHolder = document.getElementById('idLETabs'),
        vPromptsTabButton,
        vPromptsTab,
        vPromptsTabHeader,
        vGraphContainer,
        vPromptsSVG,
        vIntPromptsLength = null;

    // if (aIntPromptsLength) {
    //   vIntPromptsLength = aIntPromptsLength;
    // } else {
    //   // noinspection ExceptionCaughtLocallyJS
    //   throw 'ERROR #5709242031: aIntPromptsLength missing';
    // }
    vPromptsTabButton = document.createElement('button');
    vPromptsTabButton.innerHTML = "Prompts"
    vPromptsTabButton.setAttribute('class', 'cLETabLinks');
    vPromptsTabButton.setAttribute('id', 'idLEPromptsTabButton');
    vPromptsTabButton.onclick = () => {
      window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fOpenTab(event, 'idLEPrompts')};
    vTabHolder.appendChild(vPromptsTabButton);

    vGraphContainer = document.getElementById('idLEGraphContainer');
    vPromptsTab = document.getElementById('idLEPrompts');
    vPromptsSVG = document.getElementById('idLEPromptsSVG');

    if (document.getElementById('idLEPromptsSVG')) {
      window.LiftEd.Vars.gHTMLElementPromptsSVG = gD3.select("#idLEPromptsSVG")
                                                .attr('preserveAspectRatio','xMinYMin');

      Object.defineProperty(window.LiftEd.Vars, 'gSVGPromptGraphContainer', {
        get: function() {
          // noinspection UnnecessaryLocalVariableJS
          let vOut = this.gHTMLElementPromptsSVG.append("g").attr("transform", "translate(" + window.LiftEd.Utils.fGetVar('#5709181922', 'gObjectMargin').left + "," + window.LiftEd.Utils.fGetVar('#5709181923', 'gObjectMargin').top + ")");
          return vOut;
        },
        configurable: true
      });

      window.LiftEd.Utils.fGetVar('#5709181428', 'gHTMLElementPromptsSVG')
        .attr('viewBox','0 0 780 375');
    }

  } catch (e) {
    throw 'ERROR #5711212041: ' + e;
  }
};



/**
 * @memberof Graphing
 * @function fTacticsAndNotesErrorHandling
 * @description A function to handle error handling for tactics and notes.
 * @param {array} aArrayOfTacticsOrNotes - An array of tactics or notes to error handle.
 * @returns {array} - An array of tactics or notes that will run error free.
*/
window.LiftEd.Graphing.fTacticsAndNotesErrorHandling = (aArrayOfTacticsOrNotes) => {
  try {
    let vArrayOfTacticsOrNotes = null,
        vStringTitle = null,
        vArrayErrorFreeTacticsOrNotes = null;

    if (aArrayOfTacticsOrNotes) {
      vArrayOfTacticsOrNotes = aArrayOfTacticsOrNotes;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709242050: aArrayOfTacticsOrNotes missing';
    }

    vArrayErrorFreeTacticsOrNotes = [];
    vArrayOfTacticsOrNotes.forEach( (aDictTactOrNote) => {
      if ((!aDictTactOrNote.date || aDictTactOrNote.date === '') && !aDictTactOrNote.author && !aDictTactOrNote.note) {
        // noinspection JSCheckFunctionSignatures
        vArrayErrorFreeTacticsOrNotes.push({"date": window.LiftEd.Utils.fConvertDate(parseInt(window.LiftEd.Utils.fGetVar('#5709202203', 'dateStart')), ''), "author": '', "note": ''});


        // noinspection Annotator
        window.LiftEd.API.fErrorReport("ERROR #5708262331: Missing date, author, and note. UUID: " + vUUID + ", Graph Title: " + vStringTitle);
      }
      if ((!aDictTactOrNote.date && !aDictTactOrNote.author) || (aDictTactOrNote.date === '' && !aDictTactOrNote.author)) {
          // noinspection JSCheckFunctionSignatures
        vArrayErrorFreeTacticsOrNotes.push({"date": window.LiftEd.Utils.fConvertDate(parseInt(window.LiftEd.Utils.fGetVar('#5709202203', 'dateStart')), ''), "author": '', "note": aDictTactOrNote.note});

          // noinspection Annotator
        window.LiftEd.API.fErrorReport("ERROR #5708262331: Missing date and author. UUID: " + vUUID + ", Graph Title: " + vStringTitle);
      }
      else if ((!aDictTactOrNote.date && !aDictTactOrNote.note) || (aDictTactOrNote.date === '' && !aDictTactOrNote.note)) {
        // noinspection JSCheckFunctionSignatures
        vArrayErrorFreeTacticsOrNotes.push({"date": window.LiftEd.Utils.fConvertDate(parseInt(window.LiftEd.Utils.fGetVar('#5709202203', 'dateStart')), ''), "author": aDictTactOrNote.author, "note": ''});

        // noinspection Annotator
        window.LiftEd.API.fErrorReport("ERROR #5708262331: Missing date and note. UUID: " + vUUID + ", Graph Title: " + vStringTitle);
      }
      else if (!aDictTactOrNote.author && !aDictTactOrNote.note) {
        vArrayErrorFreeTacticsOrNotes.push({"date": aDictTactOrNote.date, "author": "", "note": ''});

        // noinspection Annotator
        window.LiftEd.API.fErrorReport("ERROR #5708262331: Missing author and note. UUID: " + vUUID + ", Graph Title: " + vStringTitle);
      }
      else if (!aDictTactOrNote.date || aDictTactOrNote.date === '') {
        // noinspection JSCheckFunctionSignatures
        vArrayErrorFreeTacticsOrNotes.push({"date": window.LiftEd.Utils.fConvertDate(parseInt(window.LiftEd.Utils.fGetVar('#5709202203', 'dateStart')), ''), "author": aDictTactOrNote.author, "note": aDictTactOrNote.note});

        // noinspection Annotator
        window.LiftEd.API.fErrorReport("ERROR #5708262331: Missing date. UUID: " + vUUID + ", Graph Title: " + vStringTitle);
      }
      else if (!aDictTactOrNote.author) {
        vArrayErrorFreeTacticsOrNotes.push({"date": aDictTactOrNote.date, "author": "", "note": aDictTactOrNote.note});

        // noinspection Annotator
        window.LiftEd.API.fErrorReport("ERROR #5708262331: Missing author. UUID: " + vUUID + ", Graph Title: " + vStringTitle);
      }
      else if (!aDictTactOrNote.note) {
        vArrayErrorFreeTacticsOrNotes.push({"date": aDictTactOrNote.date, "author": aDictTactOrNote.author, "note": ''});

        // noinspection Annotator
        window.LiftEd.API.fErrorReport("ERROR #5708262331: Missing note. UUID: " + vUUID + ", Graph Title: " + vStringTitle);
      } else {
        vArrayErrorFreeTacticsOrNotes.push(aDictTactOrNote);
      }
    });
    return vArrayErrorFreeTacticsOrNotes;
  } catch (e) {
    throw 'ERROR #5711161401: ' + e;
  }
};

// noinspection SpellCheckingInspection
/**
 * @memberof Graphing
 * @function fFillInMissingDates
 * @description A function to fillin missing dates for the graph when displaying days without data as 0
 * @param {array} aArrayData - An array of data with data for dates with values.
 * @returns {array} - An array with all dates in the date range. Dates without value have a value of 0.
*/
window.LiftEd.Graphing.fFillInMissingDates = (aArrayData, aStringDataSetUUID) => {
  try {
    let vEndDate,
        vStartDate,
        vArrayData = null,
        vArrayCompleteData = [],
        vInteger1Day = 86400000,
        vIntCounter = 0;

        vEndDate = new Date(window.LiftEd.Utils.fGetVar('#5710041735', 'dateEnd')).setHours(0,0,0,0);
        vStartDate = new Date(window.LiftEd.Utils.fGetVar('#5710041735', 'dateStart')).setHours(0,0,0,0);
    if (aArrayData) {
      vArrayData = aArrayData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710041736: aArrayData missing';
    }
    while (vStartDate <= vEndDate) {
      if (vArrayData[vIntCounter]) {
        // noinspection EqualityComparisonWithCoercionJS
        if (vArrayData[vIntCounter].date != vStartDate && vStartDate === vEndDate) {
          if ('prompts' in vArrayData[vIntCounter]) {
              vArrayCompleteData.push({"date": vStartDate, "value": 0, "max": 0, "realData": 'no', 'uuuid': aStringDataSetUUID, 'prompts': vArrayData[vIntCounter].prompts});
          } else {
            vArrayCompleteData.push({"date": vStartDate, "value": 0, "max": 0, "realData": 'no', 'uuuid': aStringDataSetUUID});
          }
          vStartDate = vStartDate + vInteger1Day;
          return vArrayCompleteData;
        }
        else if (vArrayData[vIntCounter].date === vStartDate && vStartDate === vEndDate) {
            if ('prompts' in vArrayData[vIntCounter]) {
              vArrayCompleteData.push({"date": vArrayData[vIntCounter].date, "value": vArrayData[vIntCounter].value, "max": vArrayData[vIntCounter].max, "realData": 'yes', 'uuuid': aStringDataSetUUID, 'prompts': vArrayData[vIntCounter].prompts});
            } else {
              vArrayCompleteData.push({"date": vArrayData[vIntCounter].date, "value": vArrayData[vIntCounter].value, "max": vArrayData[vIntCounter].max, "realData": 'yes', 'uuuid': aStringDataSetUUID});
            }
            return vArrayCompleteData;
        }
        else { // noinspection EqualityComparisonWithCoercionJS
          if (new Date(vArrayData[vIntCounter].date).setHours(0,0,0,0) != vStartDate) {
            if ('prompts' in vArrayData[vIntCounter]) {
              vArrayCompleteData.push({"date": vStartDate, "value": 0, "max": 0,  "realData": 'no', 'uuuid': aStringDataSetUUID, 'prompts': vArrayData[vIntCounter].propts});
            } else {
              vArrayCompleteData.push({"date": vStartDate, "value": 0, "max": 0,  "realData": 'no', 'uuuid': aStringDataSetUUID});
            }

            let vPlaceHolderStartDate = new Date(vStartDate);
            vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
            vStartDate = vPlaceHolderStartDate.getTime();
          }
          else if (new Date(vArrayData[vIntCounter].date).setHours(0,0,0,0) === vStartDate) {
            if ('prompts' in vArrayData[vIntCounter]) {
               vArrayCompleteData.push({"date": vArrayData[vIntCounter].date, "value": vArrayData[vIntCounter].value, "max": vArrayData[vIntCounter].max, "realData": 'yes', 'uuuid': aStringDataSetUUID, 'prompts': vArrayData[vIntCounter].prompts});
            } else {
               vArrayCompleteData.push({"date": vArrayData[vIntCounter].date, "value": vArrayData[vIntCounter].value, "max": vArrayData[vIntCounter].max, "realData": 'yes', 'uuuid': aStringDataSetUUID});
            }
           let vPlaceHolderStartDate = new Date(vStartDate);
           vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
           vStartDate = vPlaceHolderStartDate.getTime();
           vIntCounter = vIntCounter + 1;
           }
        }
     } else {
       vArrayCompleteData.push({"date": vStartDate, "value": 0, "max": 0, "realData": 'no', 'uuuid': aStringDataSetUUID});
       let vPlaceHolderStartDate = new Date(vStartDate);
       vPlaceHolderStartDate.setDate(vPlaceHolderStartDate.getDate() + 1);
       vStartDate = vPlaceHolderStartDate.getTime();
       vIntCounter = vIntCounter + 1;
     }
    }
    return vArrayCompleteData;
  } catch (e) {
    throw 'ERROR #5711161402: ' + e;
  }
};


/**
 * @memberof Graphing
 * @function fAddHiddenDaysButton
 * @description Adds hidden days button to the options modal
 * @param {string} aTypeDisplay - A string that designates the type of display. Can be '0', '1', '2', or '3'
 * @param {array} aArrayData - An array of data of coordinates.
 * @param {function} aD3fXScale - A function that sets up the X scale for d3 graphing.
 * @param {function} aD3fYScale - A function that sets up the Y scale for d3 graphing.
 * @param {array} aArraySummaryColumns - An array for the column headers in the data tab.
 * @param {array} aArrayAnnotations - An array with annotations for that date range.
*/

window.LiftEd.Graphing.fAddHiddenDaysButton = (aTypeDisplay, aArrayData, aD3fXScale, aD3fYScale, aArraySummaryColumns, aArrayAnnotations, aDictPrompts) => {
  try {
    let vHTMLElDayTypeButtonHolder   = null,
        vHTMLElHiddenGraphButton = null,
        vHTMLElHiddenGraphLabel,
        vTypeDisplay = null,
        vIntegerNumberHandler,
        vArrayData = null,
        vD3fXScale = null,
        vD3fYScale = null,
        vArraySummaryColumns = null,
        vArrayAnnotations = null,
        vHTMLElBreakPoint,
        vHTMLElRegularGraphButton = null,
        vHTMLELNullGraphButton = null;

    // noinspection Annotator
    if (aTypeDisplay !== 0 || aTypeDisplay !== null) {
      vTypeDisplay = aTypeDisplay;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710162013: aStringTypeDisplay missing';
    }

    if (document.getElementById('idLEDayTypeValuesButtonHolder')) {
      vHTMLElDayTypeButtonHolder = document.getElementById('idLEDayTypeValuesButtonHolder')
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5709221446: document.getElementById("idLEDayTypeValuesButtonHolder") missing';
    }

    if (aArrayData) {
      vArrayData = aArrayData;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710162012: aArrayData missing';
    }

    if (aArrayAnnotations) {
      vArrayAnnotations = aArrayAnnotations;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #57101622:51 aArrayAnnotations missing';
    }

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710162014: aD3fXScale missing';
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710162015: aD3fYScale missing';
    }

    if (aArraySummaryColumns) {
      vArraySummaryColumns = aArraySummaryColumns;
    } else {
      // noinspection ExceptionCaughtLocallyJS
      throw 'ERROR #5710162016: aArraySummaryColumns missing';
    }


    vHTMLElHiddenGraphButton = document.createElement('input');
    vHTMLElHiddenGraphButton.setAttribute('type', 'radio');
    vHTMLElHiddenGraphButton.setAttribute('class', 'cLENullRadio');
    vHTMLElHiddenGraphButton.setAttribute('id', 'idLEHiddenGraphButton');
    vHTMLElHiddenGraphButton.setAttribute('name', 'daystype');
    vHTMLElHiddenGraphButton.setAttribute('value', 'hiddendays');


    vHTMLElHiddenGraphLabel = document.createElement('label');
    vHTMLElHiddenGraphLabel.setAttribute('id', 'idLEHiddenGraphLabel');
    vHTMLElHiddenGraphLabel.setAttribute('class', 'cLENullRadio');
    vHTMLElHiddenGraphLabel.setAttribute('for', 'idLEHiddenGraphButton');
    vHTMLElHiddenGraphLabel.innerHTML = 'Do not display days';


    vHTMLElBreakPoint = document.createElement('br');
    vHTMLElDayTypeButtonHolder.appendChild(vHTMLElBreakPoint);
    vHTMLElDayTypeButtonHolder.appendChild(vHTMLElHiddenGraphButton);
    vHTMLElDayTypeButtonHolder.appendChild(vHTMLElHiddenGraphLabel);

    vHTMLElRegularGraphButton = document.getElementById('idLERegularGraphButton');

    vHTMLELNullGraphButton = document.getElementById('idLENullGraphButton');


    vIntegerNumberHandler = window.LiftEd.Utils.fGetVar('#5710061446', 'numberHandler');
    if (vIntegerNumberHandler === 2 || vIntegerNumberHandler === '2') {
      vHTMLElHiddenGraphButton.checked = true;
    }
    vHTMLElHiddenGraphButton.addEventListener('click', () => {
      vHTMLElRegularGraphButton.checked = false;
      vHTMLELNullGraphButton.checked = false;
      vHTMLElHiddenGraphButton.checked = true;
      window.LiftEd.Vars.numberHandler = 2;
      window.LiftEd.Graphing.fUtilUpdateGraphDefault();
      window.LiftEd.Vars.mergedArrays = [];
      gD3.selectAll('.cLEAverageMaxGraphLine').remove();
      gD3.selectAll('.cLEAverageGraphLine').remove();
      gD3.selectAll('#cLEAverageAnnotations').remove();
      gD3.selectAll('#cLEAverageMaxAnnotations').remove();
      gD3.selectAll('.cLEDataRow').remove();
      gD3.selectAll('.cLEDataFirstSubHeader').remove();
      gD3.selectAll('.cLEDataSubHeader').remove();
      gD3.selectAll('.graphline').remove();
      gD3.selectAll('.cLEDataAnnotationLayer').remove();
      gD3.selectAll('#idLECumulativeDataRow').remove();
      if (gD3.selectAll("#idLEYAxis")) {
        gD3.selectAll("#idLEYAxis").remove();
        gD3.selectAll("#idLEXAxis").remove();
      }
      window.LiftEd.Vars.showCumulativeLine = 'true';
      window.LiftEd.Graphing.fAddGraphLineButtons(vArrayData, vD3fXScale, vD3fYScale, vTypeDisplay, vArraySummaryColumns, vArrayAnnotations, aDictPrompts);
    });

    let vHTMLOptionsModalButton = document.getElementById('idLEOptionsModalButton');
    if (document.getElementById('idLETabs')) {
      // noinspection JSCheckFunctionSignatures
      window.LiftEd.Graphing.fHTMLElOptionsModal(vHTMLOptionsModalButton , {
          content: '.cLEOptionsModal',
        });
    }
  } catch (e) {
    throw 'ERROR #5711161403: ' + e;
  }
};

/**
 * @memberof Graphing
 * @function fSetScaledLines
 * @description A function to scale the graphlines with the correct x and y scaling.
 * @param {function} aD3fXScale - A function that sets up the X scale for d3 graphing.
 * @param {function} aD3fYScale - A function that sets up the Y scale for d3 graphing.
*/
window.LiftEd.Graphing.fSetScaledLines = (aD3fXScale, aD3fYScale) => {
  try {
    let vD3fXScale = null,
        vD3fYScale = null;

    if (aD3fXScale) {
      vD3fXScale = aD3fXScale;
    }

    if (aD3fYScale) {
      vD3fYScale = aD3fYScale;
    }

    if (window.LiftEd.Utils.fGetVar('#5710201557', 'typeDisplay') === 3 || window.LiftEd.Utils.fGetVar('#5710201557', 'typeDisplay') === '3') {
      window.LiftEd.Vars.D3ScaledLine = gD3.line()
        .defined(function(aDictDataPoint) { // noinspection EqualityComparisonWithCoercionJS
          return aDictDataPoint.value != null})
        .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
        .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.value * 60); });
    }
    else if (window.LiftEd.Utils.fGetVar('#5710201557', 'typeDisplay') === 0 || window.LiftEd.Utils.fGetVar('#5710201557', 'typeDisplay') === '0') {
      window.LiftEd.Vars.D3ScaledMaxLine = gD3.line()
        .defined(function(aDictDataPoint) { // noinspection EqualityComparisonWithCoercionJS
          return aDictDataPoint.max != null})
        .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
        .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.max); });
    window.LiftEd.Vars.D3ScaledLine = gD3.line()
        .defined(function(aDictDataPoint) { // noinspection EqualityComparisonWithCoercionJS
          return aDictDataPoint.value != null})
        .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
        .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.value); });
    } else {
      window.LiftEd.Vars.D3ScaledLine = gD3.line()
        .defined(function(aDictDataPoint) { // noinspection EqualityComparisonWithCoercionJS
          return aDictDataPoint.value != null})
        .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
        .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.value); });
    }
  } catch (e) {
    throw 'ERROR #5711161405: ' + e;
  }
};





/**
 * @memberof Graphing
 * @function fLoadGraphWithArguments
 * @description A function surrounding the main graph building function with a try catch.
 * @param {object} aDictGraphArgs - A dictionary with the complete set of data to build the graph.
*/
window.LiftEd.Graphing.fLoadGraphWithArguments = (aDictGraphArgs) => {
  try {
    window.LiftEd.Graphing.fLoadGraphWithArgumentsThrowsException(aDictGraphArgs)
  } catch (e) {
    // noinspection Annotator
    window.LiftEd.API.fErrorReport("ERROR #5708301857: Could not complete: fLoadGraphWithArguments" + e + 'Graph Title: ' +  aDictGraphArgs.title + ' && ' + JSON.stringify(aDictGraphArgs));
    window.LiftEd.GraphingCallbacks.fDidLoadGraph("Copyright (c) 2017 LiftEd, Incorporated. All rights reserved. CrossPlatform Graphing" + window.LiftEd.API.fGetVersionNumber());
  } finally {
    window.LiftEd.GraphingCallbacks.fDidLoadGraph("Copyright (c) 2017 LiftEd, Incorporated. All rights reserved. CrossPlatform Graphing" + window.LiftEd.API.fGetVersionNumber());
  }
};


/**
 * @memberof Graphing
 * @function fLoadGraphWithArgumentsThrowsException
 * @description A function to build the graph.
 * @param {object} aDictGraphArgs - A dictionary with the complete set of data to build the graph.
*/
window.LiftEd.Graphing.fLoadGraphWithArgumentsThrowsException = (aDictGraphArgs) => {
  window.LiftEd.API.fLogDebugVerbose(aDictGraphArgs);
  //removing all tactics and notes
  let vHTMLElementNotes = document.getElementsByClassName("cLENote");
  if (vHTMLElementNotes) {
    while (vHTMLElementNotes.length > 0) {
      vHTMLElementNotes[0].parentNode.removeChild(vHTMLElementNotes[0])
    }
  }
  let vArrayZeroedData,
      vArrayTactics,
      vArrayNotes,
      vArrayJavaScriptTimeTactics = null,
      vArrayJavaScriptTimeNotes = null,
      vArrayAnnotations,
      vArrayJavaScriptTimeAnnotations = null,
      vAnnotationStartDate = null,
      vPlaceHolderAnnotationStartDate  = null,
      vIntGraphStartDate = null,
      vIntGraphEndDate = null,
      vAnnotationEndDate = null,
      vPlaceHolderAnnotationEndDate = null,
      vNewTacticDate = null,
      vNewNoteDate = null,
      vArrayLineBreakData  = null,
      vD3fXScale = null,
      vD3fYScale = null,
      vIntTickFrequency,
      vIntegerStartDate,
      vIntegerEndDate,
      vHTMLElStartDate = null,
      vHTMLElEndDate = null,
      vStartDatePicker = null,
      vEndDatePicker = null,
      vAnnotationModal = null,
      vArrayNoMissingDatesData = null,
      vArrayTemporaryCoordinates = null,
      vDictTemporaryDataSet = null;

  //wipes previous graph clean.
  gD3.selectAll('#cLEMaxAnnotations').remove();
  gD3.selectAll('#cLEAverageAnnotations').remove();
  gD3.selectAll('#cLEAverageMaxAnnotations').remove();
  gD3.selectAll("path.line").remove();
  gD3.selectAll("#idLEYAxis").remove();
  gD3.selectAll("#idLEXAxis").remove();
  gD3.selectAll('#idLEPromptsXAxis').remove();
  gD3.selectAll('#idLEPromptsYAxis').remove();
  gD3.selectAll('#idLEPromptsBars').remove();
  gD3.selectAll('#idLEPromptsLegend').remove();
  gD3.selectAll('#idLEPromptsAxisLabel').remove();
  gD3.selectAll("#tacticlines").remove();
  gD3.selectAll("#axislabels").remove();
  gD3.selectAll("#annotation-group").remove();
  gD3.selectAll('#graphline').remove();
  gD3.selectAll('.graphline').remove();
  gD3.selectAll('.cLEDataAnnotationLayer').remove();
  gD3.selectAll('.cLETopBarLineSpace').remove();
  gD3.selectAll('.cLEDataSubHeader').remove();
  gD3.selectAll('.cLEGraphLineButton').remove();
  gD3.selectAll('.cLEAverageMaxGraphLine').remove();
  gD3.selectAll('.cLEMaxGraphLine').remove();
  gD3.selectAll('.cLESubHeaderValues').remove();
  gD3.selectAll('.cLEAverageGraphLine').remove();
  gD3.selectAll('.cLEGraphLineButton').remove();
  gD3.selectAll(".cLENoteAnnotationGroup").remove();
  gD3.selectAll('.cLENoteLineContainer').remove();
  gD3.selectAll(".cLETacticAnnotationGroup").remove();
  gD3.selectAll('.cLETacticLineContainer').remove();
  gD3.selectAll(".cLEAnnotationsGroup").remove();
  gD3.selectAll('#idLETacticsTabButton').remove();
  gD3.selectAll('#idLENotesTabButton').remove();
  gD3.selectAll('#idLEAddAnnotationsButton').remove();
  gD3.selectAll('#idLENoteButtonHolder').remove();
  gD3.selectAll('#idLETacticButtonHolder').remove();
  gD3.selectAll('#idLETabs').remove();
  gD3.selectAll('#idLEData').remove();
  gD3.selectAll('#idLETactics').remove();
  gD3.selectAll('#idLENotes').remove();
  gD3.selectAll('#idLEAnnotations').remove();
  gD3.selectAll('#idLESaveButton').remove();
  gD3.selectAll('.cLENullRadio').remove();
  gD3.selectAll('.cLEScopeRadio').remove();
  //set xy for svg canvas
  // noinspection Annotator
  let vPromptsTab = document.getElementById('idLEPrompts');
  vPromptsTab.style.display = 'none';

  let vStrViewBox = '0 0' + ' ' + aDictGraphArgs.canvasX.toString() + ' 375'
    window.LiftEd.Utils.fGetVar('#5709181427', 'gObjectHTMLElementSVG')
      .attr('viewBox', vStrViewBox);

  //sets globalvariables
  try {
    // noinspection Annotator
    window.LiftEd.Vars.typeChart = aDictGraphArgs.options.typeChart;
    // noinspection Annotator
    window.LiftEd.Vars.typeDisplay = aDictGraphArgs.options.typeDisplay;
    // noinspection Annotator
    window.LiftEd.Vars.typeDate = aDictGraphArgs.typeDate;
    // noinspection Annotator
    window.LiftEd.Vars.dataLength = aDictGraphArgs.data.length;
    // noinspection Annotator
    window.LiftEd.Vars.hiddenDays = aDictGraphArgs.options.hiddenDays;
    window.LiftEd.Vars.mergedArrays = [];
  } catch (e) {
    throw 'ERROR #5708302041: ' + e;
  }

  // noinspection Annotator
  if ('tabOnLoad' in aDictGraphArgs.options) {
    // noinspection Annotator
    window.LiftEd.Vars.tabOnLoad = aDictGraphArgs.options.tabOnLoad
  } else {
    window.LiftEd.Vars.tabOnLoad = 0;
  }

  // noinspection Annotator
  if ('numberHandler' in aDictGraphArgs.options) {
    // noinspection Annotator
    window.LiftEd.Vars.numberHandler = aDictGraphArgs.options.numberHandler
  } else {
    window.LiftEd.Vars.numberHandler = 0;
  }


  //sets global variables for remembering default line log and how many tabs to build
  window.LiftEd.Vars.cumulativeManuallyTurnedOn = 'false';
  window.LiftEd.Vars.tabLength = 0;

  if ('showCumulativeLine' in window.LiftEd.Vars) {
      window.LiftEd.Vars.showCumulativeLine = window.LiftEd.Utils.fGetVar('#509181537', 'showCumulativeLine');
  } else {
    window.LiftEd.Vars.showCumulativeLine = 'true';
  }

  //set global variables earliest and latest dateStart
  // noinspection Annotator
  window.LiftEd.Vars.dateEarliest = window.LiftEd.Utils.fConvertDate(aDictGraphArgs.dateEarliest, 'To JS Date Format');
  // noinspection Annotator
  window.LiftEd.Vars.dateLatest = window.LiftEd.Utils.fConvertDate(aDictGraphArgs.dateLatest, 'To JS Date Format');

  let vIntShowAllDateEarliest = new Date(window.LiftEd.Utils.fGetVar('#5010262033', 'dateEarliest'));
  vIntShowAllDateEarliest = vIntShowAllDateEarliest.setHours(12,0,0,0);
  let vIntShowAllDateLatest = new Date(window.LiftEd.Utils.fGetVar('#5010262034', 'dateLatest'));
  vIntShowAllDateLatest = vIntShowAllDateLatest.setHours(12,0,0,0);

  if (vIntShowAllDateEarliest === vIntShowAllDateLatest) {
    window.LiftEd.Vars.dateEarliest = vIntShowAllDateEarliest - 86400000;
    window.LiftEd.Vars.dateLatest = vIntShowAllDateLatest + 86400000;
  }

  //sets global variables for datestart and date end
  try {
    // noinspection Annotator
    window.LiftEd.Vars.dateStart = window.LiftEd.Utils.fConvertDate(aDictGraphArgs.dateStart, 'To JS Date Format');
    // noinspection Annotator
    window.LiftEd.Vars.dateEnd = window.LiftEd.Utils.fConvertDate(aDictGraphArgs.dateEnd, 'To JS Date Format');
    // noinspection Annotator
    window.LiftEd.Vars.originalDateStart = window.LiftEd.Utils.fConvertDate(aDictGraphArgs.dateStart, 'To JS Date Format');
    // noinspection Annotator
    window.LiftEd.Vars.originalDateEnd = window.LiftEd.Utils.fConvertDate(aDictGraphArgs.dateEnd, 'To JS Date Format');
  } catch (e) {
    throw 'ERROR #5708302042: ' + e;
  }

  let vIntCustomDateStart = new Date(window.LiftEd.Utils.fGetVar('#5010262035', 'dateStart'));
  vIntCustomDateStart = vIntCustomDateStart.setHours(12,0,0,0);
  let vIntCustomDateEnd = new Date(window.LiftEd.Utils.fGetVar('#5010262036', 'dateEnd'));
  vIntCustomDateEnd = vIntCustomDateEnd.setHours(12,0,0,0);

  if (vIntCustomDateStart ===  vIntCustomDateEnd) {
    window.LiftEd.Vars.dateStart = vIntCustomDateStart - 86400000;
    window.LiftEd.Vars.dateEnd = vIntCustomDateEnd + 86400000;
  }


  if (window.LiftEd.Utils.fGetVar('#5709181538', 'typeDate') === '6' || window.LiftEd.Utils.fGetVar('#5709181538', 'typeDate') === 6) {
    window.LiftEd.Vars.dateStart = window.LiftEd.Utils.fGetVar('#5709181539', 'dateEarliest');
    window.LiftEd.Vars.dateEnd = window.LiftEd.Utils.fGetVar('#5709181540', 'dateLatest');
  }

  //sets canvas size
  try {
    // noinspection Annotator
    window.LiftEd.Vars.canvasX = aDictGraphArgs.canvasX/1.1;
    window.LiftEd.Vars.originalCanvasX = aDictGraphArgs.canvasX;
    // noinspection Annotator
    window.LiftEd.Vars.canvasY = aDictGraphArgs.canvasY/1.1;
  } catch (e) {
    throw 'ERROR #5708302043: ' + e;
  }

  //sets uuid
  try {
    // noinspection Annotator
    window.LiftEd.Vars.uuid = aDictGraphArgs.uuid
  } catch (e) {
    throw 'ERROR #5708302044: ' + e;
  }

  if ('visibility' in aDictGraphArgs) {
    // noinspection Annotator
    window.LiftEd.Vars.visiblity = aDictGraphArgs.visibility
  } else {
    if (window.LiftEd.Utils.fGetVar('#5710221836', 'typeChart') === 0 || window.LiftEd.Utils.fGetVar('#5710221836', 'typeChart') === '0') {
      window.LiftEd.Vars.visiblity.scope = {
         "0": "1" ,
         "1": "1" ,
         "2": "1" ,
         "3": "1" ,
         }
    } else {
      window.LiftEd.Vars.visiblity.scope = {
         "0": "1" ,
         "1": "1" ,
         "2": "0" ,
         "3": "1" ,
         }
    }
  }

  //sets x and y height and width
  // noinspection CommaExpressionJS
  // noinspection Annotator
  // noinspection CommaExpressionJS
  // noinspection Annotator
  // noinspection CommaExpressionJS
  // noinspection Annotator
  // noinspection Annotator
  // noinspection CommaExpressionJS
  window.LiftEd.Vars.gIntegerWidth = aDictGraphArgs.canvasX/1.03 - window.LiftEd.Utils.fGetVar('#5709181603', 'gObjectMargin').left - window.LiftEd.Utils.fGetVar('#57091816034', 'gObjectMargin').right,
  window.LiftEd.Vars.gIntegerHeight = (aDictGraphArgs.canvasY / 1.9) -  window.LiftEd.Utils.fGetVar('#5709181605', 'gObjectMargin').top - window.LiftEd.Utils.fGetVar('#5709181606', 'gObjectMargin').bottom;
  window.LiftEd.Vars.gIntegerPromptsHeight = (aDictGraphArgs.canvasY / 2.3) -  window.LiftEd.Utils.fGetVar('#5709181605', 'gObjectMargin').top - window.LiftEd.Utils.fGetVar('#5709181606', 'gObjectMargin').bottom;

  //sets html document size
  // noinspection Annotator
  document.getElementsByTagName("body")[0].style.maxWidth = (aDictGraphArgs.canvasX/1.1) + 'px';
  // noinspection Annotator
  document.getElementsByTagName("body")[0].style.maxHeight =
  (aDictGraphArgs.canvasY/1.1) + 'px';

  //sets graph title
  if ('title' in aDictGraphArgs) {
    // noinspection Annotator
    window.LiftEd.Graphing.fAttachGraphTitle(aDictGraphArgs.title);
  } else {
    throw 'ERROR #5708302225: ' + e;
  }


  //sets showall selection in dropdown
  window.LiftEd.Vars.dictdata = aDictGraphArgs;
  window.LiftEd.Graphing.fSetShowAllDates(aDictGraphArgs);

  //check for array and notes. build tabs if they are provided.
  // noinspection Annotator
  if ('notes' in aDictGraphArgs && aDictGraphArgs.notes.length > 0) {
    window.LiftEd.Vars.tabLength = window.LiftEd.Utils.fGetVar('#5709271428', 'tabLength') + 1;
  };
  // noinspection Annotator
  if ('tactics' in aDictGraphArgs && aDictGraphArgs.tactics.length > 0) {
    window.LiftEd.Vars.tabLength = window.LiftEd.Utils.fGetVar('#5709271428', 'tabLength') + 1;
  };
  if ('annotations' in aDictGraphArgs) {
    window.LiftEd.Vars.tabLength = window.LiftEd.Utils.fGetVar('#5709271428', 'tabLength') + 1;
  };

  let vDateRange = window.LiftEd.Vars.dateEnd - window.LiftEd.Vars.dateStart;

  if ('prompts' in aDictGraphArgs) {
    // noinspection Annotator
    window.LiftEd.Vars.tabLength = window.LiftEd.Utils.fGetVar('#5709271428', 'tabLength') + 1;
  };
  // noinspection Annotator
  if ('data' in aDictGraphArgs && aDictGraphArgs.data.length >= 1) {
    window.LiftEd.Vars.tabLength = window.LiftEd.Utils.fGetVar('#5709271428', 'tabLength') + 1;
    // noinspection Annotator
    // noinspection Annotator

    window.LiftEd.Graphing.fBuildDataDisplay(aDictGraphArgs.data.length, aDictGraphArgs.dataLabel);
  };


  //build tactics and notes tabs
  // noinspection Annotator
  if ('tactics' in aDictGraphArgs && aDictGraphArgs.tactics.length > 0 && aDictGraphArgs.data.length >= 1) {
    // noinspection Annotator
    window.LiftEd.Graphing.fBuildTacticsDisplay(aDictGraphArgs.tactics.length);
  };
  // noinspection Annotator
  if ('notes' in aDictGraphArgs && aDictGraphArgs.notes.length > 0 && aDictGraphArgs.data.length >= 1) {
    // noinspection Annotator
    window.LiftEd.Graphing.fBuildNotesDisplay(aDictGraphArgs.notes.length);
  };
  // if ('annotations' in aDictGraphArgs && aDictGraphArgs.data.length >= 1 && aDictGraphArgs.annotations.length >= 1) {
    // noinspection Annotator
  window.LiftEd.Graphing.fBuildAnnotationsDisplay(aDictGraphArgs.annotations);
  // };

  if ('prompts' in aDictGraphArgs) {
    // noinspection Annotator
    window.LiftEd.Graphing.fBuildPromptsDisplay();
  };



  //zero time for data

  // noinspection CommaExpressionJS
  vArrayTactics = [],
  vArrayNotes = [],

  vArrayAnnotations = [],

  vArrayJavaScriptTimeTactics = [],
  vArrayJavaScriptTimeNotes = [],

  vArrayJavaScriptTimeAnnotations = [],
  vAnnotationStartDate = null,
  vPlaceHolderAnnotationStartDate  = null,
  vIntGraphStartDate = null,
  vIntGraphEndDate = null,
  vAnnotationEndDate = null,
  vPlaceHolderAnnotationEndDate = null;

  //running tactics and notes through error handling
 if ('tactics' in aDictGraphArgs) {

   // noinspection JSCheckFunctionSignatures
   // noinspection Annotator
   // noinspection Annotator
   // noinspection Annotator
   // noinspection JSCheckFunctionSignatures
   vArrayTactics = window.LiftEd.Graphing.fTacticsAndNotesErrorHandling(aDictGraphArgs.tactics, aDictGraphArgs.uuid, aDictGraphArgs.title);
    vArrayTactics.forEach( (aDictTactic) => {
      if ('hiddenOnGraph' in aDictTactic) {
        vNewTacticDate = new Date(window.LiftEd.Utils.fConvertDate(aDictTactic.date, 'To JS Date Format'));
        vArrayJavaScriptTimeTactics.push({'date': vNewTacticDate.getTime(),'author': aDictTactic.author, 'note': aDictTactic.note, 'hiddenOnGraph': aDictTactic.hiddenOnGraph})
      } else {
        vNewTacticDate = new Date(window.LiftEd.Utils.fConvertDate(aDictTactic.date, 'To JS Date Format'));
        vArrayJavaScriptTimeTactics.push({'date': vNewTacticDate.getTime(),'author': aDictTactic.author, 'note': aDictTactic.note, 'hiddenOnGraph': 0})
      }
    });
  }
 if ('notes' in aDictGraphArgs) {
   // noinspection JSCheckFunctionSignatures
   // noinspection Annotator
   // noinspection Annotator
   // noinspection Annotator
   // noinspection JSCheckFunctionSignatures
   vArrayNotes = window.LiftEd.Graphing.fTacticsAndNotesErrorHandling(aDictGraphArgs.notes, aDictGraphArgs.uuid, aDictGraphArgs.title);

    vArrayNotes.forEach( (aDictNote) => {
      vNewNoteDate = new Date(window.LiftEd.Utils.fConvertDate(aDictNote.date, 'To JS Date Format'));
      vArrayJavaScriptTimeNotes.push({'date': vNewNoteDate.getTime(),'author': aDictNote.author, 'note': aDictNote.note})
    });
  }
  if ('annotations' in aDictGraphArgs) {

    // noinspection Annotator
    vArrayAnnotations = aDictGraphArgs.annotations;
      vArrayAnnotations.forEach( (aDictAnnotation) => {

        vAnnotationStartDate = new Date(window.LiftEd.Utils.fConvertDate(aDictAnnotation.dateStart, 'To JS Date Format'));

        vPlaceHolderAnnotationStartDate = new Date(window.LiftEd.Utils.fConvertDate(aDictAnnotation.dateStart, 'To JS Date Format'));

        vIntGraphStartDate = new Date(window.LiftEd.Utils.fGetVar('#5710211649', 'dateStart'));

        vIntGraphEndDate = new Date(window.LiftEd.Utils.fGetVar('#5710211649', 'dateEnd'));
        if ('dateEnd' in aDictAnnotation) {

          vAnnotationEndDate = new Date(window.LiftEd.Utils.fConvertDate(aDictAnnotation.dateEnd, 'To JS Date Format'));

          vPlaceHolderAnnotationEndDate = new Date(window.LiftEd.Utils.fConvertDate(aDictAnnotation.dateEnd, 'To JS Date Format'));
          // noinspection Annotator
          // noinspection Annotator
          if ('scopeType' !== 0 || 'scopeType' !== '0') {
            if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) >= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate.setHours(0,0,0,0)) {
              vArrayJavaScriptTimeAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
            }
            else if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate.setHours(0,0,0,0)) {
              vArrayJavaScriptTimeAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
            }
          } else {
            if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0) >= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0).setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate) {
              vArrayJavaScriptTimeAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
            } else if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0) && vPlaceHolderAnnotationEndDate.setHours(0,0,0,0).setHours(0,0,0,0) >= vPlaceHolderAnnotationStartDate) {
              vArrayJavaScriptTimeAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'dateEnd': vAnnotationEndDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
            }
          }
        } else {
          // noinspection Annotator
          // noinspection Annotator
          if ('scopeType' !== 0 || 'scopeType' !== '0') {
            if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0)) {
                vArrayJavaScriptTimeAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
            }
          } else {
            if (vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) >= vIntGraphStartDate.setHours(0,0,0,0) && vPlaceHolderAnnotationStartDate.setHours(0,0,0,0) <= vIntGraphEndDate.setHours(0,0,0,0)) {
                vArrayJavaScriptTimeAnnotations.push({'dateStart': vAnnotationStartDate.getTime(), 'note': aDictAnnotation.note, 'author': aDictAnnotation.author, 'uuid': aDictAnnotation.uuid, "scopeType": aDictAnnotation.scopeType, "scopeUUID": aDictAnnotation.scopeUUID})
            }
          }
        }
      });
  }
  //zeroing time for data
  // noinspection Annotator
  vArrayZeroedData = window.LiftEd.Graphing.fZeroData(aDictGraphArgs.data);
  vArrayNoMissingDatesData = [];
  let vArrayTargetNames = [];
  vArrayDataUUID = [];
  vArrayZeroedData.forEach((aDictData) => {
    vArrayTemporaryCoordinates = window.LiftEd.Graphing.fFillInMissingDates(aDictData.coordinates, aDictData.uuid);
    vDictTemporaryDataSet = {};
    vDictTemporaryDataSet.name = aDictData.name;
    vDictTemporaryDataSet.coordinates = vArrayTemporaryCoordinates;
    vDictTemporaryDataSet.summaryData = aDictData.summaryData;
    vDictTemporaryDataSet.uuid = aDictData.uuid;
    vArrayNoMissingDatesData.push(vDictTemporaryDataSet);
    if (aDictData.name) {
      vArrayTargetNames.push(aDictData.name)
    } else {
      vArrayTargetNames.push(aDictData.summaryData[0]);
    }
    vArrayDataUUID.push(aDictData.uuid);
    aDictData.coordinates.forEach( (aDictCoordinate) => {
      aDictCoordinate.realData = 'yes';
    })
  });

  //adding break points for phase change lines
  vArrayLineBreakData = [];
  vArrayJavaScriptTimeTactics.forEach( (aTactic) => {
    vArrayLineBreakData.push({date: aTactic.date + 1, value: null})
  });
  vArrayZeroedData.forEach( (aDictDataSet) => {
    aDictDataSet.coordinates = aDictDataSet.coordinates.concat(vArrayLineBreakData);
    aDictDataSet.coordinates = aDictDataSet.coordinates.sort( (a, b) => {
        return b.date - a.date;
    });
  });

  vArrayNoMissingDatesData.forEach( (aDictDataSet => {
    aDictDataSet.coordinates = aDictDataSet.coordinates.concat(vArrayLineBreakData);
    aDictDataSet.coordinates = aDictDataSet.coordinates.sort( (a, b) => {
        return b.date - a.date;
    });
  }));

  //set scales
  if ('prompts' in aDictGraphArgs) {
    // noinspection Annotator
    window.LiftEd.Graphing.fSetGraphScales(vArrayZeroedData, aDictGraphArgs.data);
    let vArrayPromptsData = window.LiftEd.Graphing.fModifyPromptsData(aDictGraphArgs.data, aDictGraphArgs.prompts, 'Unix')

    let vArrayKeys= []
    for (let key in aDictGraphArgs.prompts) {
      vArrayKeys.push(aDictGraphArgs.prompts[key])
    }

    vPromptsD3fXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth')]).padding(.3)
    vPromptsD3BarfXScale = gD3.scaleBand().domain(vArrayPromptsData.map(function(d) { return d.date; })).range([0, window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerWidth') + 22]).padding(.3)
    vPromptsD3fYScale = gD3.scaleLinear().domain([0, d3.max(vArrayPromptsData, function(d) { return d.total; })]).rangeRound([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerPromptsHeight'), 0]);
    vPromptsD3fZScale = gD3.scaleOrdinal().domain(vArrayKeys).range([" #0000cc",  "#cc6666", "#0066cc", "#0099cc", "#00cccc", "#00ffcc", "#3300cc", "#3333cc", " #3366cc", "#3399cc", " #6600cc", "#6666cc", "#9900cc", " #990066", " #660066", "#006666", " #336633", "#663333", "#993333", "#9900ff", " #cc0066"]);
    window.LiftEd.Graphing.fAddPromptsAxes(vPromptsD3fXScale, vPromptsD3fYScale, vIntTickFrequency, aDictGraphArgs.labelY)
    window.LiftEd.Graphing.fAddPromptsBars(vArrayPromptsData, aDictGraphArgs.prompts, vPromptsD3BarfXScale, vPromptsD3fYScale, vPromptsD3fZScale)
    window.LiftEd.Graphing.fAddPromptsLegend(vArrayKeys, vPromptsD3fZScale)

    //add axes and y axis label
    if (window.LiftEd.Utils.fGetVar('#5710061514', 'numberHandler') !== 2) {
      // noinspection Annotator
      // noinspection JSCheckFunctionSignatures

    }

  } else {
    window.LiftEd.Graphing.fSetGraphScales(vArrayZeroedData);
  }
  // noinspection JSCheckFunctionSignatures
  // window.LiftEd.Graphing.fSetGraphScales(vArrayZeroedData);
  // noinspection CommaExpressionJS
  vD3fXScale = gD3.scaleTime().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMin') - 86400000), parseInt(window.LiftEd.Utils.fGetVar('#5709181706', 'xMax'))]).range([0, parseInt(window.LiftEd.Utils.fGetVar('#5709181707', 'gIntegerWidth'))]),
  vD3fYScale = gD3.scaleLinear().domain([parseInt(window.LiftEd.Utils.fGetVar('#5709181708', 'yMin')), parseInt(window.LiftEd.Utils.fGetVar('#5709181709', 'yMax'))]).range([window.LiftEd.Utils.fGetVar('#5709181710', 'gIntegerHeight'), 0]);






  // //creates scaled lines for graphlines.
  window.LiftEd.Graphing.fSetScaledLines(vD3fXScale, vD3fYScale);
  // noinspection Annotator
  // if (aDictGraphArgs.options.typeDisplay=== 3 || aDictGraphArgs.options.typeDisplay === '3') {
  //   window.LiftEd.Vars.D3ScaledLine = gD3.line()
  //     .defined(function(aDictDataPoint) { return aDictDataPoint.value})
  //     .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
  //     .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.value * 60); });
  // }
  // else { // noinspection Annotator
  //   if (aDictGraphArgs.options.typeDisplay === 0 || aDictGraphArgs.options.typeDisplay === '0') {
  //       window.LiftEd.Vars.D3ScaledMaxLine = gD3.line()
  //         .defined(function(aDictDataPoint) { return aDictDataPoint.max})
  //         .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
  //         .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.max); });
  //     window.LiftEd.Vars.D3ScaledLine = gD3.line()
  //         .defined(function(aDictDataPoint) { return aDictDataPoint.value})
  //         .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
  //         .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.value); });
  //     } else {
  //       window.LiftEd.Vars.D3ScaledLine = gD3.line()
  //         .defined(function(aDictDataPoint) { return aDictDataPoint.value})
  //         .x(function(aDictDataPoint) { return vD3fXScale(aDictDataPoint.date); })
  //         .y(function(aDictDataPoint) { return vD3fYScale(aDictDataPoint.value); });
  //     }
  // }

  //adds tactics and notes tabs and buttons
  // noinspection JSCheckFunctionSignatures

  window.LiftEd.Graphing.fAddTacticsAndNotesButtons(vArrayJavaScriptTimeTactics, vArrayJavaScriptTimeNotes, vArrayJavaScriptTimeAnnotations, vD3fXScale, vD3fYScale, parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));

  //determine tickfrequency
  vIntTickFrequency = null;
  if ('tickFrequency' in aDictGraphArgs) {
    // noinspection Annotator
    if (aDictGraphArgs.tickFrequency === 0) {
      // noinspection JSUnusedLocalSymbols
      let vIntTickFrequency = null;
    }
  }
  //set tick #s for # of days < 14
  vIntegerStartDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181905', 'xMin'));
  vIntegerEndDate = parseInt(window.LiftEd.Utils.fGetVar('#5709181906', 'dateEnd'));
  if (Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000) < 15) {
    vIntTickFrequency = Math.floor((vIntegerEndDate - vIntegerStartDate) / 86400000);
  }
  //add axes and y axis label
  if (window.LiftEd.Utils.fGetVar('#5710061514', 'numberHandler') !== 2) {
    // noinspection Annotator
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Graphing.fAddAxes(vD3fXScale, vD3fYScale, vIntTickFrequency, aDictGraphArgs.labelY)
  }

  //add y axis buttons
  // noinspection Annotator
  // noinspection JSCheckFunctionSignatures
  window.LiftEd.Graphing.fSetUpOptions(aDictGraphArgs.options.typeDisplay, vArrayNoMissingDatesData, vArrayZeroedData, vD3fXScale, vD3fYScale, aDictGraphArgs.summaryColumns, vArrayJavaScriptTimeAnnotations, aDictGraphArgs.prompts);
  //function that adds modal button then initializes the modal


  // noinspection Annotator
  window.LiftEd.Vars.label = aDictGraphArgs.labelY;
  // noinspection Annotator
  window.LiftEd.Graphing.fAddYAxisButtons(aDictGraphArgs.options.typeDisplay);

  if (gD3.selectAll('.cLEScopeRadio')) {
    gD3.selectAll('.cLEScopeRadio').remove();
  }
  // noinspection JSCheckFunctionSignatures
  // noinspection JSCheckFunctionSignatures
  window.LiftEd.Graphing.fAddScopeToModal(vArrayTargetNames, vArrayDataUUID);
  //add graphline buttons and default the data tab to open. also size tables.
  // noinspection Annotator
  if (window.LiftEd.Utils.fGetVar('#5710061446', 'numberHandler')  === 0 && aDictGraphArgs.data.length >= 1) {
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Graphing.fAddGraphLineButtons(vArrayZeroedData, vD3fXScale, vD3fYScale, aDictGraphArgs.options.typeDisplay, aDictGraphArgs.summaryColumns, null, aDictGraphArgs.prompts);
  } else if (window.LiftEd.Utils.fGetVar('#5710061446', 'numberHandler') === 1 && aDictGraphArgs.data.length >= 1) {
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Graphing.fAddGraphLineButtons(vArrayNoMissingDatesData, vD3fXScale, vD3fYScale, aDictGraphArgs.options.typeDisplay, aDictGraphArgs.summaryColumns, null, aDictGraphArgs.prompts);
  }
  else if (window.LiftEd.Utils.fGetVar('#5710061446', 'numberHandler')  === 2 && aDictGraphArgs.data.length >= 1) {
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Graphing.fAddGraphLineButtons(vArrayZeroedData, vD3fXScale, vD3fYScale, aDictGraphArgs.options.typeDisplay, aDictGraphArgs.summaryColumns, vArrayJavaScriptTimeAnnotations);
  }

  window.LiftEd.Graphing.fSizeTables();

  window.LiftEd.Graphing.fChooseTab(window.LiftEd.Vars.tabOnLoad);

  //preselect typedate from dropdown.

  window.LiftEd.Graphing.fSelectDateFromDropDown();

  //initialize datepickers
  if (document.querySelector('input[name="nLEStartDate"]')) {
    vHTMLElStartDate = document.querySelector('input[name="nLEStartDate"]');
  } else {
    throw 'ERROR #5709242031: document.querySelector("input[name="nLEStartDate"]") missing';
  }
  if (document.querySelector('input[name="nLEEndDate"]')) {
    vHTMLElEndDate = document.querySelector('input[name="nLEEndDate"]');
  } else {
    throw 'ERROR #5709242031: document.querySelector("input[name="nLEEndDate"]") missing';
  }
  let vHTMLElAnnotationStartDate = null;
  if (document.querySelector('input[name="nLEAnnotationStartDate"]')) {
    vHTMLElAnnotationStartDate = document.querySelector('input[name="nLEAnnotationStartDate"]');
  }

  let vHTMLElAnnotationEndDate = null;
  if (document.querySelector('input[name="nLEAnnotationEndDate"]')) {
    vHTMLElAnnotationEndDate = document.querySelector('input[name="nLEAnnotationEndDate"]');
  }



  vStartDatePicker = datepicker(vHTMLElStartDate);
  vEndDatePicker = datepicker(vHTMLElEndDate);
  let vAnnotationStartDatePicker = datepicker(vHTMLElAnnotationStartDate),

  vAnnotationEndDatePicker = datepicker(vHTMLElAnnotationEndDate);

  let vHTMLModalBody = document.getElementsByClassName('modal-body');

  for (let i = 0; i < vHTMLModalBody.length; i++) {
    // noinspection JSUnusedLocalSymbols
    vHTMLModalBody[i].addEventListener('click', function(e) {
      vStartDatePicker.close();
      vEndDatePicker.close();
      vAnnotationStartDatePicker.close();
      vAnnotationEndDatePicker.close();
    });
  }
  let vHTMLModalHeader = document.getElementsByClassName('modal-header');
  for (let i = 0; i < vHTMLModalHeader.length; i++) {
    // noinspection JSUnusedLocalSymbols
    vHTMLModalHeader[i].addEventListener('click', function(e) {
      vStartDatePicker.close();
      vEndDatePicker.close();
      vAnnotationStartDatePicker.close();
      vAnnotationEndDatePicker.close();
    });
  }

  let vHTMLModalFooter = document.getElementsByClassName('modal-footer');
  for (let i = 0; i < vHTMLModalFooter.length; i++) {
    // noinspection JSUnusedLocalSymbols
    vHTMLModalFooter[i].addEventListener('click', function(e) {
      vStartDatePicker.close();
      vEndDatePicker.close();
      vAnnotationStartDatePicker.close();
      vAnnotationEndDatePicker.close();
    });
  }
  //initialize annoation
  // noinspection JSCheckFunctionSignatures
  window.LiftEd.Graphing.fAddTacticsAndNoteLines(vArrayJavaScriptTimeTactics,vArrayJavaScriptTimeNotes, vD3fXScale, vD3fYScale, parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));
  if (document.querySelector('.cLEAnnotationModalButton')) {
    vAnnotationModal = document.querySelector('.cLEAnnotationModalButton');
  } else {
    throw 'ERROR #5709242031: document.querySelector(".cLEAnnotationModalButton") missing';
  }
  // noinspection JSCheckFunctionSignatures
  window.LiftEd.Graphing.fHTMLElAnnotationModal(vAnnotationModal , {
    content: '.cLEAnnotationModal'
  });

  let vValuePointModal = null;

  if (document.querySelector('.cLEValuePointModalButton')) {
    vValuePointModal = document.querySelector('.cLEValuePointModalButton');
  } else {
    throw 'ERROR #5712071245: document.querySelector(".cLEValuePointModalButton") missing';
  }

  window.LiftEd.Graphing.fHTMLElValuePointModal(vValuePointModal , {
    content: '.cLEValuePointModal'
  });

  if (document.querySelector('.cLEPromptsBartModalButton')) {
    vPromptsBarModalButton = document.querySelector('.cLEPromptsBartModalButton');
  } else {
    throw 'ERROR #5712071245: document.querySelector(".cLEPromptsBartModalButton") missing';
  }

  window.LiftEd.Graphing.fHTMLElPromptsBarModal(vPromptsBarModalButton, {
    content: '.cLEValuePointModal'
  });

  //LOOK HERE FOR ANNOTATIONS
  if (!gD3.selectAll(".cLEAnnotationsGroup")._groups[0].length > 0 && window.LiftEd.Utils.fGetVar('#5709181757', 'numberHandler') !== 2) {
    // noinspection JSCheckFunctionSignatures
    window.LiftEd.Graphing.fAddAnnotations(vArrayJavaScriptTimeAnnotations, vD3fXScale, vD3fYScale, parseInt(window.LiftEd.Utils.fGetVar('#5709181757', 'yMax')));
  }

  if (window.LiftEd.API.fGetDebug()) {console.log('finished loading');}
  window.LiftEd.GraphingCallbacks.fDidLoadGraph("Copyright (c) 2017 LiftEd, Incorporated. All rights reserved. CrossPlatform Graphing" + window.LiftEd.API.fGetVersionNumber());
};
