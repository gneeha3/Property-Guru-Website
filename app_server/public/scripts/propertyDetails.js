//
//
// function sendID(testParam){
//   console.log("Inside sendID(): ");
//   console.log("This is the value passed: ", testParam);
//   if(testParam.length > 0){
//     console.log("THatsf it!!");
//     console.log(testParam);
//     window.location.href="/propertyDetails?id="+testParam;
//     // var propertyValue = testParam;
//   }
//
// }
//
// function getParameterByName(name, url) {
// 	    if (!url) url = window.location.href;
// 	    name = name.replace(/[\[\]]/g, "\\$&");
// 	    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
// 	        results = regex.exec(url);
// 	    if (!results) return null;
// 	    if (!results[2]) return '';
// 	    return decodeURIComponent(results[2].replace(/\+/g, " "));
// 	}
//
//   // Give the parameter a variable name
// var id = getParameterByName('id');
// console.log("On property PAGE: ", id);
//
//
// //Fetch details from DB:
//
//
// //Send to Jade
