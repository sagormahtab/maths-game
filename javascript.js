//if we click on the start/reset
    //if we are playing
        //reload page
    //if we are not playing
        //set score to 0
        //show countdown box
        //reduce time by 1sec in loops
            //timeleft?
                //yes->continue
                //no->gameover
            //change button to reset
            //generate new Q&A

//if we click on answer box
    //if we are playing
        //correct?
            //yes
                //increase score
                //show correct box for 1 sec
                //generate new Q&A
            //no
                //show try again box for 1 sec


//To get this work correctly, you have to call the following functions in index.html:
//<div id="startreset" onclick="main()">
//<div id="box1" class="box" onclick="check(this.id)"></div> & this should be called on
//every div having the class box.

var result;
var playing = false; //This variable is used to prevent the accidental click from starting and ending of the match
var score;

function main(){
if(playing == true){ // It means now the buttons should work as a reset button
    location.reload(true); //reload page
}

if(playing == false){
    playing = true;
    score = 0;
    numberGenerator();
    
    show("timeremaining"); //time box would appear
    
    var timeValue = 60;
    
    var myCounter = setInterval(function(){
        timeValue--;
        if(timeValue == 0){
            clearInterval(myCounter);
            show("gameover"); //showing gameover after reaching 0 second
            hide("timeremaining");
            playing = false;
            startagain();
        }
        document.getElementById("timevalue").innerHTML = timeValue;
    },1000);
    
    document.getElementById("startreset").innerHTML="Reset Game"; //changing the button name while game started
    }
}


function numberGenerator(){
    var firstNum = 1 + Math.floor(Math.random()*9); // 1 plus kora hoyeche jate kono number
    var secondNum = 1 + Math.floor(Math.random()*9); // 0 na ashe
    
    result = firstNum * secondNum;
    
    //generating numbers in questions
    document.getElementById("firstNum").innerHTML = firstNum;
    document.getElementById("cross").innerHTML = "x";
    document.getElementById("secondNum").innerHTML= secondNum;
    
    //showing random number in options
    var i;
    for(i = 1; i < 5; i++){
        document.getElementById("box" + i).innerHTML = generateWrongAnswer();
    }
    
    //choosing a random postion for the result
    var y = (Math.floor(Math.random()*10))%4
    if(y != 0){
    document.getElementById("box"+y).innerHTML = result;
    }
    else{ //if the remainder is zero, we are choosing the last position
    document.getElementById("box4").innerHTML = result;
    }
}


function check(clicked_id){
    if(playing == true){ //if game is running then these code will generate
        var z = document.getElementById(clicked_id).innerHTML; //getting the clicked number
        if(z == result){
            show("correct"); //if correct then showing the correct box-
            
            var hideCrct = setTimeout(function (){
                hide("correct"); //for 0.5 second and also-
            },500);
            
            score++; //increasing the score
            document.getElementById("scorevalue").innerHTML = score; //setting the score to score and-
            document.getElementById("fscore").innerHTML = score;//final score
            
            numberGenerator(); //Generating new numbers after getting a correct answer
        }
        
        else{
            show("tryagain"); //if the answer is wrong then
            var hideTrAgn = setTimeout(function (){
                hide("tryagain"); //shwoing the try again box for 0.5 second
            },500);
        }
    }
}




function show(id){
    document.getElementById(id).style.display = "block";
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function generateWrongAnswer(){
    do{
        var tempA = 1 + Math.floor(Math.random()*9);
        var tempB = 1 + Math.floor(Math.random()*9);
    
        wrongResult = tempA * tempB;
    } while(wrongResult == result);// if the wrong aswers are identical to the original result then
                                    // we are generating new wrong answers
        return wrongResult;
}

function startagain(){
    document.getElementById("startreset").innerHTML = "Start Game"; //first change the button's name
    document.getElementById("startreset").onclick = function(){
        score = 0; //setting the score to 0
        document.getElementById("scorevalue").innerHTML = score; //putting the score 0
        hide("gameover");
        main(); // start the process again
    }
}





























