

var randomNumber1 =  Math.floor( (Math.random() * 6) + 1 ); // random Number 1-6.
var randomImage = "dice" + randomNumber1 +".png" ; // random image dice1.png - dice6png .
var randomImageSrc = "images/" + randomImage ; //  images/dice1.png.
var image1  = document.querySelectorAll("img")[0];// for select first image.
image1.setAttribute("src", randomImageSrc);  // For set image in src.

var randomNumber2 =  Math.floor( (Math.random() * 6) + 1 ); // new random number 1-6.
var randomImage2 = "dice" + randomNumber2 +".png" ; //---------
var randomImageSrc2 = "images/" + randomImage2 ;   //---------
var image2  = document.querySelectorAll("img")[1]; // For select second image.
image2.setAttribute("src", randomImageSrc2);    // ----------------
 
if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 wins"
}
else if(randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 wins"
}
else {
    document.querySelector("h1").innerHTML = "Draw!"
}