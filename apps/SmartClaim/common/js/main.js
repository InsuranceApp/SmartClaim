/*
 * COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
 * these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
 * application programs conforming to the application programming interface for the operating platform for which the sample code is written.
 * Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
 * EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
 * FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
 * IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.
 */

var path="";
var currentPage={};
var claimAmt = 0;
var Status = 0;
var SubmittedDate = 0;
var claimId = 0;
var i = 0;
var vehicleList=[];
var submitDetails ="";

function wlCommonInit(){
	if (WL.Client.getEnvironment() == WL.Environment.ANDROID) {
	    path = "www/default/";
	    WL.Logger.info("Calling inquireClaim Function");
	}
	
	$("#pagePort").load(path + "pages/ClaimDetails.html", function(){
		//callAdditionalCoveragesAPI();
		WL.Logger.info("i am here");
		try{
			var invocationData={
					adapter: 'GetInquireClaimDetails',
					procedure: 'getVehicleDetails',
					parameters:[]
			};
			WL.Client.invokeProcedure(invocationData,{
				onSuccess: getVehiclesSuccess,
				onFailure: getVehiclesFailure
			})
			WL.Logger.info("i am here procedure is invoked");
		}catch(e){
			
		}
			if (currentPage.init) {
				currentPage.init();
			WL.Logger.info("inside main.js");
		}
	});
}

function getVehiclesSuccess(response){
	WL.Logger.info("i am here procedure is invoked"+JSON.stringify(response));
	responseText=JSON.stringify(response);
	var responseText=response['responseText'];
	responseText = responseText.replace("/*-secure-","");
	responseText = responseText.replace("*/","");
	WL.Logger.info("success manufacturer res"+responseText);
	responseText=JSON.parse(responseText);
	responseText = responseText['array'];
	populateVehicles(responseText);
	WL.Logger.info("success manufacturer"+responseText.length);
}

function populateVehicles(vehicleList){
	var options = "";
	for (i=0; i<vehicleList.length; i++){
		vehicleListOption =  vehicleList[i];
		options = $('<option/>').html(vehicleListOption.vehicle_name);
		$("#vehicle").append(options);
		WL.Logger.info("I m here7"+vehicleListOption.vehicle_name);
	}
	
} 


function getVehiclesFailure(){
	WL.Logger.info("failure");
}


function inquireClaim(){
		WL.Logger.info("Calling inquireClaim Function");
		
		var claimNumber ="0123456789";
		var claimSubmissionDate = "16-AUG-2016";
		var status = "Open";
		var completionDate = "";
		var clientID = "madhurya.malladi@gmail.com";
		var weatherDetails = "25 C, Sunny";
		var locationDetails = "Hyderabad" ;
		var policyID = "xyz1234" ;
		var driverName = "ABCD" ;
		var needTowTruck = document.getElementById("flip-3");
		var wintnessDetails = "";
		var claimAmount = "5000";
		var approvedAmount ="2000";
		var claimID = "1111";
		var documentID = "9087";
		var documentType = "pdf";
		var documentContent = "xyz";
		var vehicle = document.getElementById("vehicle");
		
		
		submitDetails = {
			"Claim" : {
				"claimNumber" : claimNumber,
				"claimSubmissionDate" : claimSubmissionDate,
				"status" : status,
				"completionDate" : completionDate,
				"clientID" : clientID,
				"claimant" :  {
					"weatherDetails" : weatherDetails,
					"locationDetails" : locationDetails,
					"policyID" : policyID,
					"driverName" : driverName,
					"needTowTruck" : needTowTruck,
					"wintnessDetails" : wintnessDetails,
					"claimAmount" : claimAmount,
					"approvedAmount" : approvedAmount,
					"claimDocuments" : {
						"claimID" : claimID,
						"documentID" : documentID,
						"documentType" : documentType,
						"documentContent" : documentContent
					}		
				}
			}
		}
		WL.Logger.info("message going: "+submitDetails);
		
		$("#pagePort").load(path + "pages/InquireClaim.html");
		callInquireClaimDetailsAPI();
		WL.Logger.info("I m here9");
}


function callInquireClaimDetailsAPI(){
	WL.Logger.info("I m here1");
	
		WL.Logger.info("I m here2");
          var invocationData = {
        		  
                  adapter : 'GetInquireClaimDetails',
                  procedure : 'getInquireClaimHTTPAdapters',
                  parameters : []
                  //WL.Logger.info("I m here3");
              };
          
          var options = {
        	        onSuccess : getAPICallSuccess,
        			onFailure : loadFailure
        	        }
        	    
        	        WL.Client.invokeProcedure(invocationData,options);
        			
        	}
         

function loadFailure(){
	
}

function getAPICallSuccess(result){
	
	responseText = result['responseText'];
	responseText = responseText.replace("/*-secure-","");
	responseText = responseText.replace("*/","");
	WL.Logger.info("success manufacturer"+responseText);
	var responseText = JSON.parse(responseText);
	responseText = responseText['array'];
	responseText = responseText[0];
	WL.Logger.info("I m here7"+responseText['claim_id']);
	WL.Logger.info("I m here7"+responseText['submitted_on']);
	WL.Logger.info("I m here7"+responseText['status']);
	WL.Logger.info("I m here7"+responseText['claim_amt']);
	var claim = "";
	var option = "";
	var labelclaimId = document.getElementById("claimNumberDiv");
	var labelSubmittedDate = document.getElementById("submittedDateDiv");
	var labelStatus = document.getElementById("statusOfClaimDiv");
	var labelclaimAmt = document.getElementById("claimAmountDiv");
	labelclaimId.innerHTML = "Claim Number  : "+responseText['claim_id'];
	labelSubmittedDate.innerHTML = "Submitted On : "+responseText['submitted_on'];
	labelStatus.innerHTML = "Status : "+responseText['status'];
	labelclaimAmt.innerHTML = "Claim Amount : Rs. "+responseText['claim_amt'];
}


function captureImage(){
	navigator.camera.getPicture(getPictureSuccess, getPictureFail, { quality: 50,
	            destinationType: Camera.DestinationType.FILE_URI });
	            
	}

	function getPictureSuccess(imageURI){
		WL.Logger.info("getPicture success "+imageURI);
	       document.getElementById("imageCam").setAttribute("src", imageURI);
	}

	function  getPictureFail(){
	        WL.Logger.error("getPicture failed");
	    }

function captureDriverImage(){
		navigator.camera.getPicture(getDrivPictureSuccess, getDrivPictureFail, { quality: 50,
		            destinationType: Camera.DestinationType.FILE_URI });
		            
		}

		function getDrivPictureSuccess(imageURI){
			WL.Logger.info("getPicture success "+imageURI);
		       document.getElementById("imageDrivCam").setAttribute("src", imageURI);
		}

		function  getDrivPictureFail(){
		        WL.Logger.error("getPicture failed");
		    }

