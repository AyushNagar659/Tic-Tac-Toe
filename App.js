let boxes = document.querySelectorAll(".box");

let newGameBtn = document.querySelector("#Reset-btn");
// let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let TurnO = true;

const WinPatterns = [
    [0 ,1 ,2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
      
    if(TurnO){
        box.innerText = 'O';
        TurnO = false;
    }
    else{
        box.innerText = 'X';
        TurnO = true;
    }
    box.disabled = true;
   
    checkWinner();
    });
});

const resetGame = () =>{
    let TurnO = true;
    EnableBoxes();
    msgContainer.classList.add("hide");
}

const DisableBoxes = () =>{
    for(box of boxes){
        box.disabled = true;
    }
}

const EnableBoxes = () =>{
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (Winner) =>{        
        msg.innerText = `Congratulation, Winner is ${Winner}`;
        msgContainer.classList.remove("hide"); 
        DisableBoxes();      
}
    
const checkWinner = () => {

    let allBoxesFilled = true;

    for(pattern of WinPatterns){

        let post1val = boxes[pattern[0]].innerText;
        let post2val = boxes[pattern[1]].innerText;
        let post3val = boxes[pattern[2]].innerText;

        if(post1val != "" && post2val != "" && post3val != ""){
            if(post1val === post2val && post2val === post3val){              
                showWinner(post1val);
            }
        }
    }

    for (box of boxes) {
        if (box.innerText === "") {
            allBoxesFilled = false;
            break;
        }
    }

    // If all boxes are filled and no winner, it's a draw
    if (allBoxesFilled) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        DisableBoxes();
    }

}

newGameBtn.addEventListener('click', resetGame)