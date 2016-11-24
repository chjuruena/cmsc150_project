 

$(document).ready(function() {
    
    var selected = [];
    var selectedFoods = [];

    var selectedDataTbl = $('#selectedDataTbl').DataTable({
        data: selectedFoods,
        bLengthChange: false,
        scrollY: "300px",
        scrollCollapse: true,
        fixedColumns: true,

        columnDefs: [{
            width: 200,
            targets: 0
        }],

    });
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
        paging: true,
        scrollY: "300px",
        scrollX: true,
        scrollCollapse: true,
        columnDefs: [{
            width: 200,
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
        // console.log(selectedFoods[selectedFoods.length-1]);
        addFood(selectedFoods[selectedFoods.length-1]);

    });
    
    function addFood(currSelectedFood){
        console.log(currSelectedFood);
    }
    console.log(selectedFoods.length);
    
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
            objectiveFunction += "-" +  + " * x" + foodCount;
            console.log("objectiveFunction: " + objectiveFunction);
            
            //Add to constraints
            //Add calorie constraints
            calories += event.model.item.calories + " * x" + foodCount;
            maxCalories += "-" + event.model.item.calories + " * x" + foodCount;
            console.log("calories: " + calories);
            console.log("maxCalories: " + maxCalories);
            
            //Add cholesterol
            cholesterol += event.model.item.cholesterol + " * x" + foodCount;
            maxCholesterol += "-" + event.model.item.cholesterol + " * x" + foodCount;
            console.log("Cholesterol: " + cholesterol);
            console.log("maxCholesterol: " + maxCholesterol);
            
            //Add totalFat
            totalFat += event.model.item.totalFat + " * x" + foodCount;
            maxTotalFat += "-" + event.model.item.totalFat + " * x" + foodCount;
            console.log("totalFat: " + totalFat);
            console.log("maxTotalFat: " + maxTotalFat);
            
            //Add sodium
            sodium += event.model.item.sodium + " * x" + foodCount;
            maxSodium += "-" + event.model.item.sodium + " * x" + foodCount;
            console.log("sodium: " + sodium);
            console.log("maxSodium: " + maxSodium);
            
            //Add carbohydrates
            carbohydrates += event.model.item.carbohydrates + " * x" + foodCount;
            maxCarbohydrates += "-" + event.model.item.carbohydrates + " * x" + foodCount;
            console.log("carbohydrates: " + carbohydrates);
            console.log("maxCarbohydrates: " + maxCarbohydrates);
            
            //Add dietaryFiber
            dietaryFiber += event.model.item.dietaryFiber + " * x" + foodCount;
            maxDietaryFiber += "-" + event.model.item.dietaryFiber + " * x" + foodCount;
            console.log("dietaryFiber: " + dietaryFiber);
            console.log("maxDietaryFiber: " + maxDietaryFiber);
            
            //Add protein
            protein += event.model.item.protein + " * x" + foodCount;
            maxProtein += "-" + event.model.item.protein + " * x" + foodCount;
            console.log("protein: " + protein);
            console.log("maxProtein: " + maxProtein);
            
            //Add vitA
            vitA += event.model.item.vitA + " * x" + foodCount;
            maxVitA += "-" + event.model.item.vitA + " * x" + foodCount;
            console.log("vitA: " + vitA);
            console.log("maxVitA: " + maxVitA);
            
            //Add vitC
            vitC += event.model.item.vitC + " * x" + foodCount;
            maxVitC += "-" + event.model.item.vitC + " * x" + foodCount;
            console.log("vitC: " + vitC);
            console.log("maxVitC: " + maxVitC);
            
            //Add calcium
            calcium += event.model.item.calcium + " * x" + foodCount;
            maxCalcium += "-" + event.model.item.calcium + " * x" + foodCount;
            console.log("calcium: " + calcium);
            console.log("maxCalcium: " + maxCalcium);
            
            //Add iron
            iron += event.model.item.iron + " * x" + foodCount;
            maxIron += "-" + event.model.item.iron + " * x" + foodCount;
            console.log("iron: " + iron);
            console.log("maxIron: " + maxIron);
            
            
            foodCount++;
            
          };
    //
    var funcStart = "function(";
    
    function compute() {
            
            for (var i=1; i<selectedFoods.length; i++) {
              if (i != 1) funcStart += ", ";
              funcStart += "x" + i;  
            }
            funcStart += ") ";
            
            for (var j=0; j<selectedFoods.length; j++) {
                var currSelect = selectedFoods[j];
                currSelect
            }

            
            //Add Nutrition limits
            
            
            calories = "E1 <- " + funcStart + calories + " + 2000;";
            console.log(calories);
            
            maxCalories = "E2 <- " + funcStart + maxCalories + " + -2250;";
            console.log(maxCalories);
            
            cholesterol = "E3 <- " + funcStart + cholesterol + " + 0;";
            console.log(cholesterol);
            
            maxCholesterol = "E4 <- " + funcStart + maxCholesterol + " + -300;";
            console.log(maxCholesterol);
            
            totalFat = "E5 <- " + funcStart + totalFat + " + 0;";
            console.log(totalFat);
            
            maxTotalFat = "E6 <- " + funcStart + maxTotalFat + " + -65;";
            console.log(maxTotalFat);
            
            sodium = "E7 <- " + funcStart + sodium + " + 0;";
            console.log(sodium);
            
            maxSodium = "E8 <- " + funcStart + maxSodium + " + -2400;";
            console.log(maxSodium);
            
            carbohydrates = "E9 <- " + funcStart + carbohydrates + " + 0;";
            console.log(carbohydrates);
            
            maxCarbohydrates = "E10 <- " + funcStart + maxCarbohydrates + " + -300;";
            console.log(maxCarbohydrates);
            
            dietaryFiber = "E11 <- " + funcStart + dietaryFiber + " + 25;";
            console.log(dietaryFiber);
            
            maxDietaryFiber = "E12 <- " + funcStart + maxDietaryFiber + " + -100;";
            console.log(maxDietaryFiber);
            
            protein = "E13 <- " + funcStart + protein + " + 50;";
            console.log(protein);
            
            maxProtein = "E14 <- " + funcStart + maxProtein + " + -100;";
            console.log(maxProtein);
            
            vitA = "E15 <- " + funcStart + vitA + " + 5000;";
            console.log(vitA);
            
            maxVitA = "E16 <- " + funcStart + maxVitA + " + -50000;";
            console.log(maxVitA);
            
            vitC = "E17 <- " + funcStart + vitC + " + 50;";
            console.log(vitC);
            
            maxVitC = "E18 <- " + funcStart + maxVitC + " + -20000;";
            console.log(maxVitC);
            
            calcium = "E19 <- " + funcStart + calcium + " + 800;";
            console.log(calcium);
            
            maxCalcium = "E20 <- " + funcStart + maxCalcium + " + -1600;";
            console.log(maxCalcium);
            
            iron = "E21 <- " + funcStart + iron + " + 10;";
            console.log(iron);
            
            maxIron = "E22 <- " + funcStart + maxIron + " + -30;";
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
                serving.push("E" + equationCount + " <- " + funcStart + curr + " + -10;");
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
           

          }
});