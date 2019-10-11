//
//  LECPConstants.js
//  LECrossPlatform
//
//  Created by Yong
//  Copyright (c) 2017 LiftEd, Incorporated. All rights reserved.
//
//  Defines the constants used throughout the library, quick way to turn on/off debugging
//


//Create all of our dictionaries so we know they exist:
if  ( ! ( "LiftEd" in window ) ) { window.LiftEd = {}; } //This is our namespace for all variables and functions
if  ( ! ( "API" in window.LiftEd ) ) { window.LiftEd.API = {}; } //This is our namespace for API functions
if  ( ! ( "UtilsCallbacks" in window.LiftEd ) ) { window.LiftEd.UtilsCallbacks = {}; } //This is our namespace for Client-side callback functions
if  ( ! ( "Utils" in window.LiftEd ) ) {
   /**
       * @namespace Utils
   */
   window.LiftEd.Utils = {}; } //This is our namespace for internal shared utilities
if  ( ! ( "Vars" in window.LiftEd ) ) {
  /**
      * @namespace Vars
  */
  window.LiftEd.Vars = {}; } //Global variables for graphing engine.
if  ( ! ( "Const" in window.LiftEd ) ) {
  /**
      * @namespace Const
  */
  window.LiftEd.Const = {}; } //Global variables for graphing engine.

window.LiftEd.gVERSION = '3.5.1';
window.LiftEd.SDKVersion = '1.0.9';

window.LiftEd.gDEBUG = false;
window.LiftEd.gDEBUGVERBOSE = false;
