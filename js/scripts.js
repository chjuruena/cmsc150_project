// import * from "r-script";

//because identity is in base
let simplex = null;
let res = null;
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

$("#solvebtn").on("click", function() {

    // if (!$("#varnum").val() ||  !$("#variables").val() ||  !$("#constraintsnum").val() ||  !$("#objfxn").val() ||  !$("#constr").val()){
    //      console.log('KEKEKE');
    //      alert("Fields cannot be blank!!");
    // }else{

    let optiType = $('input[name="radiogoal"]:checked').val();
    alert(optiType);
    if (optiType == undefined)     alert("Goal cannot be empty");



    if (optiType != undefined) {
        
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
        

        getData(fxn, optiType, function(data) {
            /* do something with q */
            // console.log(data.Object.mat);
            console.log(data["mat"]);
            let tableaus = data["mat"];
            let sttuff = [];
            let iter;
            $('#result').remove();
            $('#inputAndtable').append('<div id="result"></div>');
            for (var i = 0; i < tableaus.length; i++) {
                //sttuff.push(makeTableHTML(tableaus[i]));
                console.log(makeTableHTML(tableaus[i]));
                iter = "<span class=\"asteriskField\"> Iteration"+ i;
                
                $("#result").append(iter+"</span>" + makeTableHTML(tableaus[i]));

                

                // Append <button> to <body>

            }

            console.log(sttuff);


            //     let JSONdata = JSON.stringify({data: data});
            //     console.log(JSONdata);

            //   let tableaus = JSONdata.data.mat[0];
            //   let solutionSet = JSONdata.solutionSet;
            //   let x1 = JSONdata.x1;
            //   let x2 = JSONdata.x2;

            //   console.log(tableaus);




            ///NAKUKUHA NA LINE 46!!!!!!!!!!!!!!!!!!!!


        }); // }
        console.log(res);

    }




});
console.log(res);

function makeTableHTML(myArray) {
    var result = "<table border=1 class=\"tg\">";
    for (var i = 0; i < myArray.length; i++) {
        result += "<tr>";
        for (var j = 0; j < myArray[i].length; j++) {
            result += "<td>" + myArray[i][j] + "</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}


function parseNum(varnum, variables, constraintsnum, objfxn, constr) {

    constr = " " + constr + objfxn;
    let flist = [];
    // constraintsnum++;
    console.log(constr);

    variables = variables.split(",");
    ///comment later
    // variables = ['x1', 'x2'];
    // varnum = 2;
    // constraintsnum = 4;
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
        if (regRes.length <= 1) {
            console.log('solosolosolosolosolosolosolosolosolosolosolosolosolosolo');

            let str = constr[i].split(" ");
            let ab = 0;
            let y = "";
            console.log(str);
            console.log(str.length);
            for (var a = 0; a < str.length; a++) {
                // kung ganito --> x1 <= 9;
                let x = str[a].match(/x\d/g);
                if (x != null) {
                    console.log("XXXXXX    " + x);
                    //      y =  '1'+ ' * ' + x ;

                    for (var b = 0; b < varnum; b++) {
                        //once ang dapat pumasok

                        if (str.indexOf(variables[b]) < 0) { // wala
                            if (b == 0) {
                                y = '0' + ' * ' + variables[b];
                            } else {
                                y = y + ' + ' + '0' + ' * ' + variables[b];

                            }

                        } else if (variables[b] == x) {
                            if (b == 0) {
                                y = '1' + ' * ' + variables[b];
                            } else {
                                y = y + ' + ' + '1' + ' * ' + variables[b];

                            }

                        }
                    }
                }
            }
            y = y + ' + ' + '-' + str[str.length - 1].split(" ").pop();
            constraintsFormatted.push(y);

        } else {

            // [" 7", " 11", "77"]
            console.log('WIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLEWIGGLE');
            console.log(regRes);

            let ab = '';
            // let str = constr[i].split(" ");
            if (i == constraintsnum - 1) regRes.length++;
            let temp = '';
            for (var j = 1; j < regRes.length; j++) {
                // if(j%2!=0 && j==regRes.length-1) regRes.splice(j,1);

                if (i == constraintsnum - 1) {
                    if (j == 1) { // first
                        temp = '-' + regRes[j - 1].split(" ").pop() + ' * ' + variables[j - 1];
                    } else { // first
                        temp = temp + ' + ' + '-' + regRes[j - 1].split(" ").pop() + ' * ' + variables[j - 1];
                    }
                } else {
                    if (j == 1) { // first
                        temp = regRes[j - 1].split(" ").pop() + ' * ' + variables[j - 1];
                    } else {
                        temp = temp + ' + ' + regRes[j - 1].split(" ").pop() + ' * ' + variables[j - 1];
                    }
                }
            }
            if (i != constraintsnum - 1) temp = temp + " + " + '-' + regRes[regRes.length - 1].split(" ").pop();
            else temp = temp + " + " + ' 0';
            constraintsFormatted.push(temp);
        }

        constraintsFormatted[i] = 'E' + i + ' <- function' + '(' + variables + ') ' + constraintsFormatted[i] + ';';
        flist.push('E' + i);

        //   E1 <- function (x1, x2)
    }
    let fxnlist = 'f <- list( ' + flist.toString() + ' );';
    constraintsFormatted.push(fxnlist);

    return constraintsFormatted;
    // console.log(constraintsFormatted);
    // console.log(flist);



}

function get_numbers(input, pattern) {
    return input.match(pattern);
}
//actual handler


function getData(fxn, optiType, callback) {
    console.log(fxn);
    let simplexCODE;
    let snipetty;
    
    if (optiType == "Maximize") {
        snipetty = new ocpu.Snippet(fxn + maxi);
    } else{
        snipetty = new ocpu.Snippet(fxn + mini);
    }

    // if (optiType == "Maximize") {
    //     snipetty = new ocpu.Snippet(fxn + maxi);
    // } else if(optiType == "Minimize") {
    //     snipetty = new ocpu.Snippet(fxn + rString);
    // }else if (optiType == "dietmini"){
    //     snipetty = new ocpu.Snippet(fxn + dietmini);
    // }
    let res = [];
    
    let req = ocpu.rpc("identity", {
        "x": snipetty
    }, function(output) {
        // res
        console.log(output);
        callback(output);

        //   $("#output").text(output.augcoeffmatrix); 
    });

    //if R returns an error, alert the error message
    req.fail(function() {
        alert("Server error: " + req.responseText);
    });
}



//gumagana simplex
// function solveSimplex(fxn){
//     console.log(fxn);

//     let res = [];
//     let snipetty = new ocpu.Snippet(fxn+code);

//     let req = ocpu.rpc("identity", {
//           "x" : snipetty
//     }, function(output){
//         // res
//     console.log(output)
//     //   $("#output").text(output.augcoeffmatrix); 
//     });

//     //if R returns an error, alert the error message
//     req.fail(function(){
//         alert("Server error: " + req.responseText);
//     });  
// }