fGetGraphData(aTypeDate, aDateStart, aDateEnd, aTypeChart, aTypeDisplay, aUUID)

Date display
no padding (D-MMM-YYYY)

{
//typeDate: Integers
//0 = last 7 days, 1 = last 14 days, 2 = last 30 days, 3 = last 60 days, 4 = last 90 days, 5 = last 180 days, 6 = ShowAll, 99=custom date range
“typeDate”: 0,


//visibility: integers
// 0 = false, 1 = true.
// scope: 0 = hide global, 1 = hide all activities/behaviors, 2 = hide all targets(not used for behavior), 3 = individual targets
"visibility": {
  "scope": {
   "0": "1" ,   
   "1": "1" ,    
   "2": "1" ,  
   "3": "1" ,     
   }
},

//Dictionary of key-value pairs
//optional
"prompts":{
  "e234-sf12-a3c4": 'Gestural',
  "a938-k123-c184": 'Physical'
},


//Dictionary of integers
"options": {
  // 0 = Number graph (requires max & # correct values), 1 = % Percentage graph, 2 = Frequency graph, 3 = Duration graph.
  "typeDisplay": 0,
  // 0 = Activity Chart, 1 = Behavior Chart
  “typeChart”: 0,
  //0 = null === no point, 1 = null === 0, 2 = hidden days
  "numberHandler": 0,
  //0 = data tab, 1 = tactics tab, 2 = notes tab, 3 = annotations tab
  "tabOnLoad": 0
},

//Data Label
//String labeling for data button
"dataLabel": "Activity Data",


//Dates: Integer (Unix Time Stamp)
”dateEarliest”: 1489990400,
“dateLatest”: 1511200000,

//Labels: Strings
“title”: ‘Behaviors for Jane Doe’,
“labelX”: ‘Date’,
“labelY”: ‘Number of correct responses’,


//Graph: Integers
“tickFrequency”: 0,
“canvasX”: 650,
“canvasY”: 350,


//UUID: String
"uuid": "9F4B6BB2-C90A-4D02-A9C8-98439A6DB55D",

//summaryColumns: Array of strings
"summaryColumns": [
    "Target",
    "Mastered",
    "Baseline %",
    "Avg. Probe %",
    "Avg. Maint. %"
  ],


//Tactics:
//Phase change lines:  array of unix date integers + text
//hiddenOnGraph (optional. default === 0): 0 ===  show, 1 === hidden
“tactics”:[
  {"date": 1493622000, “author”: “Smith, Bob”, "note": "Decision: Generalization"},
  {"date": 1493622000, “author”: “Smith, Bob”, "note": "Decision: Generalization", "hiddenOnGraph": 0},
  {"date": 1493622000, “author”: “Doe, Jane”,  "note": "another log", "hiddenOnGraph": 1}
],


//Notes:
//Array of unix date integers + text
“notes”:[
	{
		"date": 1501113600,
		"author": "Smith, Bob",
		"note": "Decision: Generalization"
	}, {
		"date": 1501113600,
		"author": "Smith, Bob",
		"note": "Decision: Generalization"
	},

],

//Annotations:
//Array of unix date integers + text
//Scope: 0 === global, 1 = activity/behavior, 2 = target
"annotations":[
  {
    "note": "Decision: Generalization"
    "dateStart": 1501113600,
    "dateEnd" 1507495599,
    "author": 'John Doe',
    "uuid": "9F4B6BB2-C90A-4D02-A9C8-98439A6DB55D",
    "scopeUuid": "9F4B6BB2-C90A-4D02-A9C8-98439A6DB55D",
    "scopeType": 0,
  },
  {
    "note": "Decision: Generalization"
    "dateStart": 1501113600,
    "dateEnd" 1507495599,
    "author": 'John Doe',
    "uuid": "9F4B6BB2-C90A-4D02-A9C8-98439A6DB55D",
    "scopeUuid": "9F4B6BB2-C90A-4D02-A9C8-98439A6DB55D",
    "scopeType": 0,
  }
]


//Data
//Array of dictionaries.
//Dictionary contains strings, array of coordinate dictionaries with integers, and a dictionary of masteryData.
“data”: [{
	"name": "Target 1",
  "uuid": "9F4B6BB2-C90A-4D02-A9C8-98439A6DB55D",
	“coordinates: [{
		"date": 1501200000,
		"value": 58.13,
		"max": 80,
    "prompts": {
      "e234-sf12-a3c4": 2,
      "a938-k123-c184": 4
    }
	}, {
		"date": 1501113600,
		"value": 53.98,
		"max": 80,
    "prompts": {
      "e234-sf12-a3c4": 1,
      "a938-k123-c184": 5
    }
	}],
  "summaryData": [
      "(6/19/2017)",
      "5% (6/13/2017)",
      "4%",
      "7%"
  ],
},
{
	"name": "Target 2",
	“coordinates: [{
		"date": 1501200000,
		"value": 58.13,
		"max": 80,
    "prompts": {
      "e234-sf12-a3c4": 1,
      "a938-k123-c184": 5
    }
	}, {
		"date": 1501113600,
		"value": 53.98,
		"max": 80,
    "prompts": {
      "e234-sf12-a3c4": 1,
      "a938-k123-c184": 5
    }
	}],
  "summaryData": [
      "(6/19/2017)",
      "5% (6/13/2017)",
      "4%",
      "7%"
  ],
}




//Value Point Data
//A Large HTML String
Format:'
<div class="cLEAnnotationModalDate">12-13-2017</div> Date
<div class="cLEAnnotationModalTitle">Geometry Computer Program</div> Title
<div class="cLEAnnotationModalValueType">Activity</div> Activity/Behavior
<div class="cLEAnnotationValueCorrect">Correct: 3</div> Number of correct responses.
<div class="cLEAnnotationModalValueTotal">Total: 10</div> Number of total questions. (Optional)
<div class="cLEAnnotationModalProctors">Jane Doe, Jane Doe</div> Proctors
<div class="cLEAnnotationModalPrompts">Physical, Gestural</div> Prompts
<dl class="cLEValuePointDataList"> Descriptive List
<dt class="cLEValuePointPromptDT">Prompts:</dt> Descriptive List Name
<dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
<dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
<dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
<dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
<dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
<dd class="cLEValuePointPromptDD"> X - 14:30 - Geometry Computer Program - Prompts: Gesutral, Physical</dd> Descriptive List Item Individual Prompts used that day.
</dl>'
