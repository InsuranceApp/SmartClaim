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

function wlCommonInit(){
	if (WL.Client.getEnvironment() == WL.Environment.ANDROID) {
	    path = "www/default/";
	}
	
	$("#pagePort").load(path + "pages/ClaimDetails.html", function(){
		//callAdditionalCoveragesAPI();
			if (currentPage.init) {
				currentPage.init();
			WL.Logger.info("inside main.js");
		}
	});
}


function inquireClaim(){
		WL.Logger.info("Calling inquireClaim Function");
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
        			//onFailure : loadFailure
        	        }
        	    
        	        WL.Client.invokeProcedure(invocationData,options);
        			
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