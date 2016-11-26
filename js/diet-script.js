 

$(document).ready(function() {
    //nutrienta
    var objectiveFunction="";
    var pricePerServing = "";
    var calories="";
    var maxCalories="";
    var cholesterol="";
    var maxCholesterol="";
    var totalFat="";
    var maxTotalFat="";
    var sodium="";
    var maxSodium="";
    var carbohydrates="";
    var maxCarbohydrates="";
    var dietaryFiber="";
    var maxDietaryFiber="";
    var protein="";
    var maxProtein="";
    var vitA="";
    var maxVitA="";
    var vitC="";
    var maxVitC="";
    var calcium="";
    var maxCalcium="";
    var iron="";
    var maxIron="";
    var serving = [];
    var foodCount = 1;
    
    
    var selected = [];
    var selectedFoods = [];
    
    
    var menuData = [];

    var selectedDataTbl = $('#selectedDataTbl').DataTable({
        data: selectedFoods,
        bLengthChange: false,
        scrollY: "300px",
        scrollCollapse: true,
        fixedColumns: true,

        columnDefs: [{
            width: 200,
            targets: 0
        }]

    });
    
    var optimizedDataTbl = $('#resMenudataTable').DataTable({
        data: menuData
    });
    $('#resultMenudiv').hide();
    
    $('#selectedDataTbl tbody').on('click', 'tr', function() {
        if (selectedFoods.length != 0) {

            var selected = selectedDataTbl.row(this).data();
            selectedDataTbl.rows(this).remove().draw();
            selectedFoods.splice($.inArray(selected, selectedFoods), 1);
            console.log(selectedFoods);
        }
        // console.log(selectedFoods.length);


    });


    var table = $('#dataTable').removeAttr('width').DataTable({
        ajax: 'foods.json',
        // fixedColumns: true,
        aaSorting  : [],
        paging: true,
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        columnDefs: [{
            width: 150,
            targets: 0
        }],
        rowCallback: function(row, data) {
            if ($.inArray(data.DT_RowId, selected) !== -1) {
                $(row).addClass('selected');
            }
        }


    });
    
    $('#dataTable tbody').on('click', 'tr', function() {
        var food = table.row(this).data();
        selectedFoods.push(table.row(this).data());
        // console.log(selectedFoods.length);
        var id = this.id;
        var index = $.inArray(id, selected);
        if (index === -1) {
            selected.push(id);
        } else {
            selected.splice(index, 1);
        }
        $(this).toggleClass('selected');


        selectedDataTbl.row.add([table.row(this).data()[0], "Remove"]).draw(false);
       

    });
    
    $(document).on('click', '#removeSelected', function(){ 
        selectedDataTbl.clear().draw();
        selectedFoods.length = [];
        table.ajax.reload();
    });

    $(document).on('click', '#solveDIETbtn', function(){ 

        $('#dietRes').remove();

        if (selectedFoods.length != 0){
           for (var i=0; i<selectedFoods.length; i++) {
                addFoody(selectedFoods[i]);
            }
        
            var fxn = compute();
            var str = 'dietmini';
        
             getData(fxn, str, function(data) {
                console.log(data);
                ////display diet
                
                $('#foodTable').hide();
                $("#mainRow").append(
                '<div id="dietRes" class="col-md-8">'+
                '<div id="optimize_diet"><h2>The Optimized Menu</h2></div>'+
                '<div id="food_breakdown"><h4>The Solution and Cost Breakdown by Food</h3></div>'+
                '<button class="btn btn-primary " name="" type="button" id="showTblbtn">Try Again!</button>'+
                '</div>'
                );
                
                if(data.length>1){
                    //display solution
                    //result
                    var res = data;
                    // var res = [0, 250, 56.7694, 243.2306, 59.5096, 5.4904, 2400, 0, 300, 0, 10.2057, 64.7943, 134.518, 15.482, 4000.7897, 40999.2103, 196.5572, 19753.4428, 0, 800, 20, 0, 1.496, 8.504, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0.368, 9.632, 1.6283, 8.3717, 0.437, 9.563, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 0, 10, 1.5636, 8.4364, 10, 0, 10, 0, 1.496, 0, 0, 0, 0, 0, 0.368, 1.6283, 0.437, 0, 0, 0, 0, 0, 0, 0, 0, 1.5636, 10, 10, 1, 2.7115];
                    //20 na lang
                    // [1.496, 0, 0, 0, 0, 0, 0.368, 1.6283, 0.437, 0, 0, 0, 0, 0, 0, 0, 0, 1.5636, 10, 10, 1, 2.7115]
                    
                    var flen = selectedFoods.length;
                    var optiCost = data[data.length];
                    res = res.slice(Math.max(res.length - (flen+2)));
                    console.log(res);
                    var optimizedServs = [];
                    console.log(optimizedServs);
                    for (var i=0; i<(flen-2); i++) {
                        if (res[i]!=0) optimizedServs.push(res[i]);
                    }
                    // price of ffood
                    var optCostperFood = [];
                     for (var i=0; i<res.len; i++) {
                         var tempFood = selectedFoods[i];
                         //price*nutrient
                         optCostperFood.push((Math.ciel(tempFood[1]*optimizedServs[i])*100)/100);
                        //  console.log(optCostperFood[i]);
                    }
                    console.log(optimizedServs);
                    console.log(optCostperFood);
                    var menuData = [];
                    
                    for (var i = 0; i < res.length; i++) {
                        //or check with: if (b.length > i) { assignment }
                        // menuData[optimizedServs[i]] = optCostperFood[i] 
                    }
                    console.log(menuData);
                    
                    optimizedDataTbl.ajax.reload();
                    $('#resultMenudiv').show();

                   								
                    

                    


                    
                    
                    
                    
                    
    
                }else{
                    $('#food_breakdown').remove();    
                    $("#optimize_diet").append("<h3> The problem is infeasible. </h3><h5>It is not possible to meet the nutritional constraints with the foods that you have selected. </h5>");
                    
                }
            });
             emptyNutrients(); 
             
             
        }else{
            bootstrap_alert = function() {};
            bootstrap_alert.warning = function(message) {
                $('#selectedFoodTbl').append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>')
            }
            bootstrap_alert.warning('Food selected cannot be zero');
            
            
        }
        
        
        // mainRow.append
        
    });
    $(document).on('click', '#showTblbtn', function(){ 
        $('#dietRes').remove();
        $('#foodTable').show();
    });

    
    function addFood(currSelectedFood){
        console.log(currSelectedFood);
    }
    console.log(selectedFoods.length);
        
        
    function emptyNutrients(){
        objectiveFunction="";
         pricePerServing = "";
         calories="";
         maxCalories="";
         cholesterol="";
         maxCholesterol="";
         totalFat="";
         maxTotalFat="";
         sodium="";
         maxSodium="";
         carbohydrates="";
         maxCarbohydrates="";
         dietaryFiber="";
         maxDietaryFiber="";
         protein="";
         maxProtein="";
         vitA="";
         maxVitA="";
         vitC="";
         maxVitC="";
         calcium="";
         maxCalcium="";
         iron="";
         maxIron="";
         serving = [];
         foodCount = 1;
         
    }
    
    
   function addFoody (currSelectedFood) {
            //Add to objective function
            if (foodCount != 1) {
              objectiveFunction += " + "; 
              pricePerServing += " + ";
              calories += " + ";
              maxCalories += " + ";
              cholesterol += " + ";
              maxCholesterol += " + ";
              totalFat += " + ";
              maxTotalFat += " + ";
              sodium += " + ";
              maxSodium += " + ";
              carbohydrates += " + ";
              maxCarbohydrates += " + ";
              dietaryFiber += " + ";
              maxDietaryFiber += " + ";
              protein += " + ";
              maxProtein += " + ";
              vitA += " + ";
              maxVitA += " + ";
              vitC += " + ";
              maxVitC += " + ";
              calcium += " + ";
              maxCalcium += " + ";
              iron += " + ";
              maxIron += " + ";
              
            }
            
      // 0<th>Foods</th>
      // 1<th>Price/Serving</th>
      // 2<th>Serving Size</th>
      // 3<th>Calories.</th>
      // 4<th>Colesterol mg</th>

      // 5<th>Total_Fat g</th>
      // 6<th>Sodium mg</th>
      // 7<th>Carbohydrates </th>
      // 8<th>Dietary_Fiber\ng g</th>
      // 9<th>Protein g</th>
      // 10<th>Vit_A IU</th>
      // 11<th>Vit_C IU</th>
      // 12<th>Calcium mg</th>
      // 13<th>Iron mg</th>
      
            // <th>Price/Serving</th>
            objectiveFunction +=  currSelectedFood[1] + " * x" + foodCount;
            console.log("objectiveFunction: " + objectiveFunction);
            
            //Add to constraints
            //Add calorie constraints
            calories += currSelectedFood[3] + " * x" + foodCount;
            maxCalories += "-" + currSelectedFood[3] + " * x" + foodCount;
            console.log("calories: " + calories);
            console.log("maxCalories: " + maxCalories);
            
            //Add cholesterol
            cholesterol += currSelectedFood[4] + " * x" + foodCount;
            maxCholesterol += "-" + currSelectedFood[4] + " * x" + foodCount;
            console.log("Cholesterol: " + cholesterol);
            console.log("maxCholesterol: " + maxCholesterol);
            
            //Add totalFat
            totalFat += currSelectedFood[5] + " * x" + foodCount;
            maxTotalFat += "-" + currSelectedFood[5] + " * x" + foodCount;
            console.log("totalFat: " + totalFat);
            console.log("maxTotalFat: " + maxTotalFat);
            
            //Add sodium
            sodium += currSelectedFood[6] + " * x" + foodCount;
            maxSodium += "-" + currSelectedFood[6] + " * x" + foodCount;
            console.log("sodium: " + sodium);
            console.log("maxSodium: " + maxSodium);
            
            //Add carbohydrates
            carbohydrates += currSelectedFood[7] + " * x" + foodCount;
            maxCarbohydrates += "-" + currSelectedFood[7] + " * x" + foodCount;
            console.log("carbohydrates: " + carbohydrates);
            console.log("maxCarbohydrates: " + maxCarbohydrates);
            
            //Add dietaryFiber
            dietaryFiber += currSelectedFood[8] + " * x" + foodCount;
            maxDietaryFiber += "-" + currSelectedFood[8] + " * x" + foodCount;
            console.log("dietaryFiber: " + dietaryFiber);
            console.log("maxDietaryFiber: " + maxDietaryFiber);
            
            //Add protein
            protein += currSelectedFood[9] + " * x" + foodCount;
            maxProtein += "-" + currSelectedFood[9] + " * x" + foodCount;
            console.log("protein: " + protein);
            console.log("maxProtein: " + maxProtein);
            
            //Add vitA
            vitA += currSelectedFood[10] + " * x" + foodCount;
            maxVitA += "-" + currSelectedFood[10] + " * x" + foodCount;
            console.log("vitA: " + vitA);
            console.log("maxVitA: " + maxVitA);
            
            //Add vitC
            vitC += currSelectedFood[11] + " * x" + foodCount;
            maxVitC += "-" + currSelectedFood[11] + " * x" + foodCount;
            console.log("vitC: " + vitC);
            console.log("maxVitC: " + maxVitC);
            
            //Add calcium
            calcium += currSelectedFood[12] + " * x" + foodCount;
            maxCalcium += "-" + currSelectedFood[12] + " * x" + foodCount;
            console.log("calcium: " + calcium);
            console.log("maxCalcium: " + maxCalcium);
            
            //Add iron
            iron += currSelectedFood[13] + " * x" + foodCount;
            maxIron += "-" + currSelectedFood[13] + " * x" + foodCount;
            console.log("iron: " + iron);
            console.log("maxIron: " + maxIron);
            
            
            foodCount++;
            
          };
    //
   
    
    function compute() {
        var linearFunc = [];

         var funcStart = "function(";
            for (var i=1; i<=selectedFoods.length; i++) {
              if (i != 1) funcStart += ", ";
              funcStart += "x" + i;  
            }
            funcStart += ") ";
            
           
            //Add Nutrition limits
           calories = "E1 <- " + funcStart + calories + " + -2000;";
            linearFunc.push(calories);
            console.log(calories);
            
            
            maxCalories = "E2 <- " + funcStart + maxCalories + " + 2250;";
            linearFunc.push(maxCalories);
            console.log(maxCalories);
            
            cholesterol = "E3 <- " + funcStart + cholesterol + " + 0;";
            linearFunc.push(cholesterol);
            console.log(cholesterol);
            
            maxCholesterol = "E4 <- " + funcStart + maxCholesterol + " + 300;";
            linearFunc.push(maxCholesterol);
            console.log(maxCholesterol);
            
            totalFat = "E5 <- " + funcStart + totalFat + " + -0;";
            linearFunc.push(totalFat);
            console.log(totalFat);
            
            maxTotalFat = "E6 <- " + funcStart + maxTotalFat + " + 65;";
            linearFunc.push(maxTotalFat);
            console.log(maxTotalFat);
            
            sodium = "E7 <- " + funcStart + sodium + " + 0;";
            linearFunc.push(sodium);
            console.log(sodium);
            
            maxSodium = "E8 <- " + funcStart + maxSodium + " + 2400;";
            linearFunc.push(maxSodium);
            console.log(maxSodium);
            
            carbohydrates = "E9 <- " + funcStart + carbohydrates + " + 0;";
            linearFunc.push(carbohydrates);
            console.log(carbohydrates);
            
            maxCarbohydrates = "E10 <- " + funcStart + maxCarbohydrates + " + 300;";
            linearFunc.push(maxCarbohydrates);
            console.log(maxCarbohydrates);
            
            dietaryFiber = "E11 <- " + funcStart + dietaryFiber + " + -25;";
            linearFunc.push(dietaryFiber);
            console.log(dietaryFiber);
            
            maxDietaryFiber = "E12 <- " + funcStart + maxDietaryFiber + " + 100;";
            linearFunc.push(maxDietaryFiber);
            console.log(maxDietaryFiber);
            
            protein = "E13 <- " + funcStart + protein + " - 50;";
            linearFunc.push(protein);
            console.log(protein);
            
            maxProtein = "E14 <- " + funcStart + maxProtein + " + 100;";
            linearFunc.push(maxProtein);
            console.log(maxProtein);
            
            vitA = "E15 <- " + funcStart + vitA + " + -5000;";
            linearFunc.push(vitA);
            console.log(vitA);
            
            maxVitA = "E16 <- " + funcStart + maxVitA + " + 50000;";
            linearFunc.push(maxVitA);
            console.log(maxVitA);
            
            vitC = "E17 <- " + funcStart + vitC + " + -50;";
            linearFunc.push(vitC);
            console.log(vitC);
            
            maxVitC = "E18 <- " + funcStart + maxVitC + " + 20000;";
            linearFunc.push(maxVitC);
            console.log(maxVitC);
            
            calcium = "E19 <- " + funcStart + calcium + " + -800;";
            linearFunc.push(calcium);
            console.log(calcium);
            
            maxCalcium = "E20 <- " + funcStart + maxCalcium + " + 1600;";
            linearFunc.push(maxCalcium);
            console.log(maxCalcium);
            
            iron = "E21 <- " + funcStart + iron + " + -10;";
            linearFunc.push(iron);
            console.log(iron);
            
            maxIron = "E22 <- " + funcStart + maxIron + " + 30;";
            linearFunc.push(maxIron);
            console.log(maxIron);
            
            var equationCount = 23;
            var curr = "";
            var negativePart = true;
            
            for (var i=1; i<foodCount; i++) {
              for (var j=1; j<foodCount; j++) {
                if (i != j) {
                  if (j != 1) curr += " + ";
                  curr += "0 * x" + j;
                } else {
                  if (j != 1) curr += " + ";
                  curr += (!negativePart) ? "-1 * x" + j : "1 * x" + j;
                }
              }
              if (!negativePart) {
                serving.push("E" + equationCount + " <- " + funcStart + curr + " + 10;");
                negativePart = true;
              } else {
                serving.push("E" + equationCount + " <- " + funcStart + curr + " + 0;");
                negativePart = false;
                i--;
              }
              equationCount++;
              curr = "";
            }
            
            
           
            console.log(serving);
            
            objectiveFunction = "E" + equationCount + " <- " + funcStart + objectiveFunction + " + 0;"
            console.log(objectiveFunction);
           
            linearFunc =  $.merge( $.merge( [], linearFunc ), serving );

            
            // linearFunc.push(serving);
            linearFunc.push(objectiveFunction);
            console.log(linearFunc.length);
            
            
            
            //add 
            // /    let fxnlist = 'f <- list( ' + flist.toString() + ' );';
            var flist = [];
            for (var i = 1; i <=linearFunc.length; i++){
                flist.push('E' + i);
            }

            var fxnlist = 'f <- list( ' + flist.toString() + ' );';
            linearFunc.push(fxnlist);


            linearFunc = linearFunc.join(" ");

            console.log(linearFunc);
            return linearFunc;
          }
});

