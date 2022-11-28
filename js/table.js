/* 11/27/2022
File: table.js
GUI Assignment: HW5
Created on: 
Description: Contains javascript code for validating input and to create dynamic multiplication table
Kyle Gaudet, UMass Lowell Computer Science, kyle_gaudet@student.uml.edu
Copyright (c) 2022 by Kyle Gaudet. All rights reserved.
Updated by KG on 11/28/2022
*/


// create new rule for mins to check that their value is greater than maxes
$.validator.addMethod('lessOrEqual', function(value, element, max) {
    // if max is not filled return true so no error pops up
    if(!$(max).is(":filled"))
        return true;
    var i = value;
    var j = parseInt($(max).val());
    return i <= j;
});


// create new rule for maxs to check that their value is greater than mins
$.validator.addMethod('greaterOrEqual', function(value, element, min) {
    // if min is not filled return true so no error pops up
    if(!$(min).is(":filled"))
        return true;
    var i = value;
    var j = parseInt($(min).val());
    return i >= j;
});


// validation for input form
$("#inputForm").validate({
    errorPlacement: function(label, element) {
        // add warning class to apply css styling
        label.addClass('warning');
        label.insertAfter(element);
    },
    // rules for different input fields
    rules: {
        minX: {
            required: true,
            number: true,
            min: -50, 
            max: 50,
            lessOrEqual: ("#maxX")
        },
        maxX: {
            required: true,
            number: true,
            min: -50,
            max: 50,
            greaterOrEqual: ("#minX")
        },
        minY: {
            required: true,
            number: true,
            min: -50,
            max: 50,
            lessOrEqual: ("#maxY")
        },
        maxY: {
            required: true,
            number: true,
            min: -50,
            max: 50,
            greaterOrEqual: ("#minY")
        }
    },
    // error messages for different rules
    messages: {
        minX: {
            required: "Please enter a number",
            number: "Please enter a number",
            min: "Min X must be greater than -50",
            max: "Min X must be less than 50",
            lessOrEqual: "Min X must be less than or equal to Max X"
        },
        maxX: {
            required: "Please enter a number",
            number: "Please enter a number",
            min: "Max X must be greater than -50",
            max: "Max X must be less than 50",
            greaterOrEqual: "Max X must be greater than or equal to Min X"
        },
        minY: {
            required: "Please enter a number",
            number: "Please enter a number",
            min: "Min Y must be greater than -50",
            max: "Min Y must be less than 50",
            lessOrEqual: "Min Y must be less than or equal to Max Y"
        },
        maxY: {
            required: "Please enter a number",
            number: "Please enter a number",
            min: "Max Y must be greater than -50",
            max: "Max Y must be less than 50",
            greaterOrEqual: "Max Y must be greater than or equal to Min Y"
        }
    }
})


// validate input whenever the input form is changed
$("#inputForm").change(function(){
    if(!$("#inputForm").valid())
        return false;
});

// on input button click
$("#inputButton").click(function(){
    // if input is invalid do nothing
    if(!$("#inputForm").valid())
        return false;
    makeTable();
    // else, input is good, make table
});


// function to make table based on form input
function makeTable() {
    // remove previous warning messages
    var warnings = Array.from(document.getElementsByClassName('warning'));
    warnings.forEach(warning => {
        warning.remove();
    });

    // remove previous table if one exists
    var table = document.getElementById('table');
    if (table != null)
        table.remove();

    // get values from the table as floats
    var minX = parseFloat(document.getElementById('minX').value);
    var maxX = parseFloat(document.getElementById('maxX').value);
    var minY = parseFloat(document.getElementById('minY').value);
    var maxY = parseFloat(document.getElementById('maxY').value);

    // if number has decimal convert to integer and display warning message
    minX = convertIfDouble("minX", minX);
    maxX = convertIfDouble("maxX", maxX);
    minY = convertIfDouble("minY", minY);
    maxY = convertIfDouble("maxY", maxY);

    // create table
    var table = document.createElement('table');
    table.setAttribute('id', 'table');

    // if inputs are valid fill table 
    
    // create top row and top left td
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(""));
    tr.appendChild(th);

    // fill first row with minX - max X
    for(var j = minX; j <= maxX; j++) {
        var th = document.createElement('th');
        var temp = j;
        var tempstr = temp.toString();
        th.appendChild(document.createTextNode(tempstr));
        tr.appendChild(th);
    }
    table.appendChild(tr);


    // create all other trs and tds
    for(var i = minY; i <= maxY; i++) {
        tr = document.createElement('tr');
        // create first th with vals from minY - maxY
        th = document.createElement('th');
        temp = i;
        tempStr = temp.toString();
        th.appendChild(document.createTextNode(tempStr));
        tr.appendChild(th);

        // create tds with multiplied values for each row
        for(var j = minX; j <= maxX; j++) {
            td = document.createElement('td');
            temp = i * j;
            tempstr = temp.toString();
            td.appendChild(document.createTextNode(tempstr));
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    // add the table to its div
    var tablediv = document.getElementById('tablediv');
    tablediv.appendChild(table);
}


// function to convert inputted numbers to integers
// and to add warning label to let user know conversion was necessary 
function convertIfDouble(varName, num) {
    // if number is not an integer
    if (num % 1 != 0) {
        var label = document.getElementById(varName += "label");
        label.insertAdjacentHTML('afterend', '<div class="warning" <br>Warning! Decimal portion of value entered was removed');
        return Math.trunc(num);
    }
    return num;
}