// import * from "r-script";

//because identity is in base
let simplex = null;
let fxn = null;
ocpu.seturl("//public.opencpu.org/ocpu/library/base/R")

var $error = $(".alert-danger");
 $("form input#varnum, form input#variables, form input#constraintsnum , form input#objfxn, form input#constr ").on("blur", function() {
    if (!$(this).val()) {
        
      $error.removeClass("hide").text("Some fields are  be blank");
    } else {
      $error.addClass("hide");
    }
  });

$("#solvebtn").on("click", function(){
    
    // if (!$("#varnum").val() ||  !$("#variables").val() ||  !$("#constraintsnum").val() ||  !$("#objfxn").val() ||  !$("#constr").val()){
    //      console.log('KEKEKE');
    //      alert("Fields cannot be blank!!");
    // }else{
        let varnum = $("#varnum").val();
        let variables = $("#variables").val();
        let constraintsnum = $("#constraintsnum").val();
        let objfxn = $("#objfxn").val();
        let constr = $("#constr").val();
        
        
        
        let fxn = objfxn + constr;
        console.log(fxn);
        let arr = parseNum(varnum, variables, constraintsnum, objfxn, constr);
        
        console.log(arr);
        fxn = arr.join("");
                console.log("HAHAHAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        console.log(fxn);

        solveSimplex(fxn);
    // }
    
    

}); 
console.log(fxn);

function parseNum(varnum, variables, constraintsnum, objfxn, constr){
    
    constr = " " + constr + objfxn  ;
    let flist = [];
    // constraintsnum++;
	console.log(constr);

// 	variables = variables.split(",");
///comment later
	    variables = ['x1', 'x2'];
	    varnum = 2;
	    constraintsnum = 4;
///comment later

	    
	        constraintsnum++;


	let formatted = [];

	constr = constr.split(";");	
	console.log(constr);
	let regRes = null;
	let pattern = /[-+]?[0-9]*\.?[0-9]+x/g;
	let patternNOX = /[^x=+] ?[-+]?[0-9]*\.?[0-9]+/g;
	let constraintsFormatted = [];
	 for (var i = 0; i < constraintsnum; i++) {
	 	//regex
	 	let regRes = get_numbers(constr[i], patternNOX);

	 	console.log(regRes);
	 	console.log(regRes.length);
	 	// 7 1 11 2 77
	 	if(regRes.length <= 1){
	 	    console.log('solosolosolosolosolosolosolosolosolosolosolosolosolosolo');

	 		let str = constr[i].split(" ");
	 		let ab = 0;
	 		let y = "";
	 			console.log(str);
	 	    console.log(str.length);
	 			for (var a = 0; a < str.length; a++) {
	 				// kung ganito --> x1 <= 9;
			 		let x = str[a].match(/x\d/g);
 			 		if(x!=null){
 			 		    console.log("XXXXXX    " + x);
    				  	y =  '1'+ ' * ' + x ;
    
    			 		for (var b = 0; b < varnum; b++) {
    			 			//once ang dapat pumasok
    			 			if(str.indexOf(variables[b])<0) y = y + ' + ' + '0' + ' * ' + variables[b];
    			 		}
 			 		}
	 			}
	 			y = y + ' + ' + '-' + str[str.length-1];
	 			constraintsFormatted.push(y);

	 	}else{

	 		// [" 7", " 11", "77"]
	 		  	   console.log('WIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLE');
            console.log(regRes);
            
	 		let ab = '';
	 		// let str = constr[i].split(" ");
	 		if(i == constraintsnum-1 ) regRes.length++;
	 		let temp = '';
			for (var j = 1; j < regRes.length; j++) {
				// if(j%2!=0 && j==regRes.length-1) regRes.splice(j,1);
				if( j == 1) { // first
			 		 	temp =  regRes[j-1]  + ' * ' + variables[j-1];
			 	}else{
			 		 	temp =  temp + ' + ' +  regRes[j-1] + ' * ' + variables[j-1];
			 	}
			}
			if(i != constraintsnum-1 ) temp = temp + " + " + '-' + regRes[regRes.length-1];
			else  temp = temp + " + " + ' 0';
	 		constraintsFormatted.push(temp);	 		
	 	}
	 	
	 constraintsFormatted[i] = 'E' + i + ' <- function' + '(' + variables + ') ' + constraintsFormatted[i] +';';
	 flist.push( 'E' + i);
	 
// 	 E1 <- function (x1, x2)
    }
    let fxnlist = 'f <- list( ' + flist.toString() + ' );' ;
    constraintsFormatted.push(fxnlist);	

    return constraintsFormatted;
    // console.log(constraintsFormatted);
    // console.log(flist);

    
     
}
function get_numbers(input,pattern ) {
    return input.match(pattern);
}
//actual handler
$("#submitbutton").on("click", function(){

let simplex = "";

     //disable button
    $("button").attr("disabled", "disabled");

    //perform the request
   let req = ocpu.rpc("identity", {
    //     // what : mysnippet,
    //     // args : {
    //     //   mylist : "list(E1 <- function (x1, x2) 7 * x1 + 11 * x2 + -77, E2 <- function (x1, x2) 10 * x1 + 8 * x2 + -80, E3 <- function (x1, x2) 1 * x1 + 0 * x2 + -9, E4 <- function (x1, x2) 0 * x1 + 1 * x2 + -6,  E5 <- function (x1, x2) -150 * x1 + -175 * x2 + 0)"
        "x" : snipetty
    //     // }
    }, function(output){
        simplex = req;
        console.log(output)
      $("#output").text(output.augcoeffmatrix); 
    });
    
    // TAMA TO
    //  //perform the request
    // let req = ocpu.rpc("identity", {
    //     // what : mysnippet,
    //     // args : {
    //     //   mylist : "list(E1 <- function (x1, x2) 7 * x1 + 11 * x2 + -77, E2 <- function (x1, x2) 10 * x1 + 8 * x2 + -80, E3 <- function (x1, x2) 1 * x1 + 0 * x2 + -9, E4 <- function (x1, x2) 0 * x1 + 1 * x2 + -6,  E5 <- function (x1, x2) -150 * x1 + -175 * x2 + 0)"
    //     "x" : mysnippet
    //     // }
    // }, function(output){
    // console.log(output)
    //   $("#output").text(output.augcoeffmatrix); 
    // });
        
        
        console.log(simplex);
    //if R returns an error, alert the error message
    req.fail(function(){
        alert("Server error: " + req.responseText);
    });      
    
    req.always(function(){
        $("button").removeAttr("disabled");    
    });
});    

function solveSimplex(fxn){
    console.log(fxn);

    let res = [];
    let snipetty = new ocpu.Snippet(fxn+code);

    let req = ocpu.rpc("identity", {
          "x" : snipetty
    }, function(output){
        // res
    console.log(output)
    //   $("#output").text(output.augcoeffmatrix); 
    });
    
    //if R returns an error, alert the error message
    req.fail(function(){
        alert("Server error: " + req.responseText);
    });  
}

// function getData(callback){
    
//     let req = ocpu.rpc("identity", {
//           "x" : snipetty
//     }, function(output){
        
//     // console.log(output)
//     //   $("#output").text(output.augcoeffmatrix); 
//     callback(returnData(output));

//     });
    
//     //if R returns an error, alert the error message
//     req.fail(function(){
//         alert("Server error: " + req.responseText);
//     });  
// }


// function returnData(data){
//     console.log(data.length); // 3
//     return data;
// }

// getData(function(data) {
//     /* do something with q */
//     simplex = data;
// });