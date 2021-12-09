/*   
    Kush Patel
    November 16, 2021
    Assignment: Scrabble and Drag and Drop
    The purpose of this assignment it to make a scrabble game using jQuery. We had to use multiple features. In this file, i use JS and jQuery 
    to make the scrabble game. I use jQuery to make the image tiles draggable, droppable, accept, etc. I get the value of the tiles are 
    being dragged. Wrote a function that randomly generates a number, than i used that function to randomly generate an image. Add up the values
    of the letters to get the points of the word. I used button to clear out the previous round and reset for the next round.
*/

//data set for the images of letters
const file_J = [
	{"letter":"A", "value":1,  "amount":9, "image": "./images/Scrabble_Tile_1"},
	{"letter":"B", "value":3,  "amount":2, "image": "./images/Scrabble_Tile_2"},
	{"letter":"C", "value":3,  "amount":2, "image": "./images/Scrabble_Tile_3"},
	{"letter":"D", "value":2,  "amount":4, "image": "./images/Scrabble_Tile_4"},
	{"letter":"E", "value":1,  "amount":12, "image": "./images/Scrabble_Tile_5"},
	{"letter":"F", "value":4,  "amount":2, "image": "./images/Scrabble_Tile_6"},
	{"letter":"G", "value":2,  "amount":3, "image": "./images/Scrabble_Tile_7"},
	{"letter":"H", "value":4,  "amount":2, "image": "./images/Scrabble_Tile_8"},
	{"letter":"I", "value":1,  "amount":9, "image": "./images/Scrabble_Tile_9"},
	{"letter":"J", "value":8,  "amount":1, "image": "./images/Scrabble_Tile_10"},
	{"letter":"K", "value":5,  "amount":1, "image": "./images/Scrabble_Tile_11"},
	{"letter":"L", "value":1,  "amount":4, "image": "./images/Scrabble_Tile_12"},
	{"letter":"M", "value":3,  "amount":2, "image": "./images/Scrabble_Tile_13"},
	{"letter":"N", "value":1,  "amount":6, "image": "./images/Scrabble_Tile_14"},
	{"letter":"O", "value":1,  "amount":8, "image": "./images/Scrabble_Tile_15"},
	{"letter":"P", "value":3,  "amount":2, "image": "./images/Scrabble_Tile_16"},
	{"letter":"Q", "value":10, "amount":1, "image": "./images/Scrabble_Tile_17"},
	{"letter":"R", "value":1,  "amount":6, "image": "./images/Scrabble_Tile_18"},
	{"letter":"S", "value":1,  "amount":4, "image": "./images/Scrabble_Tile_19"},
	{"letter":"T", "value":1,  "amount":6, "image": "./images/Scrabble_Tile_20"},
	{"letter":"U", "value":1,  "amount":4, "image": "./images/Scrabble_Tile_21"},
	{"letter":"V", "value":4,  "amount":2, "image": "./images/Scrabble_Tile_21"},
	{"letter":"W", "value":4,  "amount":2, "image": "./images/Scrabble_Tile_22"},
	{"letter":"X", "value":8,  "amount":1, "image": "./images/Scrabble_Tile_23"},
	{"letter":"Y", "value":4,  "amount":2, "image": "./images/Scrabble_Tile_24"},
	{"letter":"Z", "value":10, "amount":1, "image": "./images/Scrabble_Tile_25"},
	{"letter":"_", "value":0,  "amount":2, "image": "./images/Scrabble_Tile_Blank"}
]


let sum = 0;
let total = 0;
let final = 0;
var word = "";
var wordFinal = "";

let double = false;


const statements = "#tile1, #tile2, #tile3, #tile4, #tile5, #tile6, #tile7"
$(function(){

    $(statements).draggable({  //makes the image tiles draggable
        revert: 'invalid',                                                   //goes back to original spot if not snapped
        snap: ".dropable",           //images will snap to these spots
        snapMode: "inner"                                                                       //snaps to the inner side
    });         

    $(".dropable").droppable({                                              //makes the image droppable at this div
        accept: statements,  //accepts these tiles
        revert: statements,  
        drop: function(e,ui){     
            
            statements && $(this).droppable( 'disable' );                                 //if one of the tiles are already placed on the board, it 
                                                                               //wont allow another one in the spot, will revert
                                                                                    //when dropped, will go to the target div
            var value = getValue(ui.draggable[0].childNodes[0].src)               //gets the value of the letter by checking the dragged image
            var src = ui.draggable[0].childNodes[0].src

            var letter = getLetter(ui.draggable[0].childNodes[0].src)           //than the child nodes. Same thing for getting the letter
            // console.log(letter)

            var img = document.createElement("img");                           //creates image element of the tile you drag
            $(img).attr("src", src)                                             //created img element
            document.querySelector(`#${e.target.id}`).appendChild(img)          // puts the image into the target you dragged

            $(e.target.id).remove(img) 


            var new_Letter = document.querySelector(`#${ui.draggable[0].id}`)    //clears out the letter when i drag
            new_Letter.innerHTML = ""

            $(new_Letter).css({                                            //styling to the image in the target_bar
                "top": "auto",
                "left": "auto"
            })     
            
            if(e.target.classList.contains("double"))                      //if the tile is placed in a class 'double'
            {
                double = true
            }

            if(e.target.classList.contains("dropable"))                    // if the tile is placed in a class 'dropable'
            {
                sum += parseInt(value);
            }

            word += letter                                                  //adds each letter up to create word
            wordFinal = word;

        }
    
    })

});


var tile = document.createElement("img");
$(tile).attr("src", "./images/tileHolder.png")        //created img element
$(tile).attr("id","tHold")                            //gives img an id
$("#test").append(tile)                               //appends the image to the div

var oneRow = document.createElement("img");
$(oneRow).attr("src", "./images/oneRow.png")          //^same thing except for the tiles accepters
$(oneRow).attr("id","oneRow")
$("#placement").append(oneRow)


var min = 1;
var max = 26

function getNumber(min, max){
    return Math.round(Math.random() * (max - min) + min);       //function that generates a random number
}

$("#letters").click(function(){
    $(".dropable").droppable({    
        disabled: false
    })

    sum = 0;


    // document.querySelector("#points").innerHTML = "";           //clears the points and total when clicking
    // document.querySelector("#total").innerHTML = "";   
    // document.querySelector("#scroll").innerHTML = "";


    document.querySelector(".dropable").innerHTML = ""


    var clear  = document.querySelectorAll(".dropable");         
    clear.forEach(function(e){                                  //for loop to clear the target_bar
        // console.log("e", e)
        // console.log(e.classList)
        e.innerHTML = "";
        
    })

    var clearTile  = document.querySelectorAll(".select");              //for loop to clear out the images on top
    clearTile.forEach(function(e){
        // console.log("e", e)
        e.innerHTML = "";      
    })

    document.querySelector("#tile1").innerHTML = "";                                //resets the tile
    var tileA = document.createElement("img");                                      //creates img tag
    $(tileA).attr("src", "./images/Scrabble_Tile_" + getNumber(min,max) + ".jpg")   //applies the scr attribute and generates a random image(letter)
    $(tileA).attr("id", "tFirst")                                                   //gives the image an id
    $("#tile1").append(tileA);                                                      //puts the image in the div



    document.querySelector("#tile2").innerHTML = "";
    var tileB = document.createElement("img");
    $(tileB).attr("src", "./images/Scrabble_Tile_" + getNumber(min,max) + ".jpg")
    $(tileB).attr("id", "tSecond")
    $("#tile2").append(tileB);


    document.querySelector("#tile3").innerHTML = "";
    var tileC = document.createElement("img");
    $(tileC).attr("src", "./images/Scrabble_Tile_" + getNumber(min,max) + ".jpg")
    $(tileC).attr("id", "tThird")
    $("#tile3").append(tileC);


    document.querySelector("#tile4").innerHTML = "";
    var tileD = document.createElement("img");
    $(tileD).attr("src", "./images/Scrabble_Tile_" + getNumber(min,max) + ".jpg")
    $(tileD).attr("id", "tFourth")
    $("#tile4").append(tileD);


    document.querySelector("#tile5").innerHTML = "";
    var tileE = document.createElement("img");
    $(tileE).attr("src", "./images/Scrabble_Tile_" + getNumber(min,max) + ".jpg")
    $(tileE).attr("id", "tFifth")
    $("#tile5").append(tileE);


    document.querySelector("#tile6").innerHTML = "";
    var tileF = document.createElement("img");
    $(tileF).attr("src", "./images/Scrabble_Tile_" + getNumber(min,max) + ".jpg")
    $(tileF).attr("id", "tSixth")
    $("#tile6").append(tileF);



    document.querySelector("#tile7").innerHTML = "";
    var tileG = document.createElement("img");
    $(tileG).attr("src", "./images/Scrabble_Tile_" + getNumber(min,max) + ".jpg")
    $(tileG).attr("id", "tSeventh")
    $("#tile7").append(tileG);
})

function getValue(img) {
    var find = img.lastIndexOf("_")                                         //goes to the last _ in the image source
    var output = parseInt(img.slice(find + 1, -4))                          //parses the string/source between the last _ and th elast 4 characters
    // console.log(file_J[output-1].value)                                             //outputs the value/letter number
    return file_J[output-1].value
}

function getLetter(img) {
    var find = img.lastIndexOf("_")                                         //goes to the last _ in the image source
    var output = parseInt(img.slice(find + 1, -4))                          //parses the string/source between the last _ and th elast 4 characters
    // console.log(file_J[output-1].letter)                                             //outputs the value/letter number
    return file_J[output-1].letter
}

$("#submit").click(function(){

    console.log("sum",sum)
    console.log("double",double)
    if(double == true)                                                      //if double == true, than double the total of the word
    {
        sum += sum
        double = false
    }

    
    $(".dropable").droppable({    
        disabled: false
    })

    var clearTile  = document.querySelectorAll(".select");              //for loop to clear out the images on top
    clearTile.forEach(function(e){
        e.innerHTML = "";      
    })

    
    document.querySelector("#pointsFinal").innerHTML = "";               //clears the points messages each time you click 'submit'
    document.querySelector("#totalFinal").innerHTML = "";
    document.querySelector("#word").innerHTML = "";

    total += sum
    
    $("#pointsFinal").append(sum)           //prints the points below board into the div inside the text
    $("#totalFinal").append(total)
    $("#word").append(wordFinal)                //prints out the word 

    word = "";
    sum = 0;
})

$("#newGame").click(function(){             //reset the total score back to 0
    sum = 0;
    total = 0;
    final = 0;

    document.querySelector("#pointsFinal").innerHTML = "";               //clears the points messages each time you click 'submit'
    document.querySelector("#totalFinal").innerHTML = "";
    document.querySelector("#word").innerHTML = "";
})

$("#points").append("Points for this word: ")           //prints the points below board
$("#total").append("Total points for entire game: ")