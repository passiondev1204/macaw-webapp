
//  LECPGraphingConstants.js
//  LECrossPlatform
//
//  Created by Yong
//  Copyright (c) 2017 LiftEd, Incorporated. All rights reserved.
//
//  Defines the graphings constants used throughout the library, quick way to turn on/off debugging
//


//Create all of our dictionaries so we know they exist:
if  ( ! ( "GraphingCallbacks" in window.LiftEd ) ) { window.LiftEd.GraphingCallbacks = {}; } //This is our namespace for Client-side graphing callback functions
if  ( ! ( "Graphing" in window.LiftEd ) ) {
  /**
      * @namespace Graphing
  */
  window.LiftEd.Graphing = {}; } //This is our namespace for internal Graphing functions

//constants
window.LiftEd.Const.kAnnotationBackGroundAttributeID = 6;
