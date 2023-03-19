var number = document.querySelectorAll(".drum").length ;

for (var i = 0 ; i < number ; i++) {
    document.querySelectorAll(".set")[i].addEventListener("click" , handleclick);

}

function handleclick() {
    var audio = new Audio("sounds/tom-1.mp3");
    audio.play();
}