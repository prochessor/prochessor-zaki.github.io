'use strict'
let peices = document.querySelector(".peices");
let peiceArray = [...document.querySelectorAll(".peice")];
let peice = document.querySelectorAll(".peice");
let clicked;
let controlDoubleClickMovement = 0;
let controlDifferentSquareMovement = 0;
let squaresAllowedToMove = [];
let clickedPeice = false;
let firstMove = false;
let row = 0,
    col = 0;
let turn = 0;
let chessPeiceSound = new Audio("audio/chess-peice-2.mp3");
let castlingSound = new Audio("audio/castling-sound-effect.mp3");
let chessPeiceCapture = new Audio("audio/chess-peice-capture-2.mp3");
let images = [...document.body.querySelector(".peices").querySelectorAll("img")];

let positions = [
    ['br', 'bk', 'bb', 'bq', 'bK', 'bb', 'bk', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wk', 'wb', 'wq', 'wK', 'wb', 'wk', 'wr'],
]

let peice2dArray = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];
for (let i = 0, k = 0; i < 8; ++i) {
    for (let j = 0; j < 8; ++j) {
        peice2dArray[i][j] = peiceArray[k];
        k++;
    }
}

function resetHighlightSquares() {
    peiceArray.forEach(p => {
        p.style.backgroundColor = "";
    })
}

function setPeicesClassControl() {
    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            let bool = false;
            let bool1 = false;
            let bool2 = false;
            if (peice2dArray[i][j].classList.contains('secondMove'))
                bool = true;
            if (peice2dArray[i][j].classList.contains('castlingNotAllowed'))
                bool1 = true;
            if (peice2dArray[i][j].classList.contains('castled'))
                bool2 = true;
            peice2dArray[i][j].classList.value = '';

            peice2dArray[i][j].classList.add("peice");
            if (bool === true) {
                peice2dArray[i][j].classList.add("secondMove");
            }
            if (bool1 === true) {
                peice2dArray[i][j].classList.add("castlingNotAllowed");
            }
            if (bool2 === true) {
                peice2dArray[i][j].classList.add("seconcastleddMove");
            }
        }
    }

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            let type = "empty";
            if (positions[i][j] == 'br') {
                peice2dArray[i][j].classList.add("black-rook");
                type = "black";
            } else if (positions[i][j] == 'wr') {
                peice2dArray[i][j].classList.add("white-rook");
                type = "white";
            } else if (positions[i][j] == 'bk') {
                peice2dArray[i][j].classList.add("black-knight");
                type = "black";

            } else if (positions[i][j] == 'wk') {
                peice2dArray[i][j].classList.add("white-knight");
                type = "white";

            } else if (positions[i][j] == 'bb') {
                peice2dArray[i][j].classList.add("black-bishop");
                type = "black";

            } else if (positions[i][j] == 'wb') {
                peice2dArray[i][j].classList.add("white-bishop");
                type = "white";

            } else if (positions[i][j] == 'bq') {
                peice2dArray[i][j].classList.add("black-queen");
                type = "black";

            } else if (positions[i][j] == 'wq') {
                peice2dArray[i][j].classList.add("white-queen");
                type = "white";

            } else if (positions[i][j] == 'bK') {
                peice2dArray[i][j].classList.add("black-king");
                type = "black";

            } else if (positions[i][j] == 'wK') {
                peice2dArray[i][j].classList.add("white-king");
                type = "white";

            } else if (positions[i][j] == 'bp') {
                peice2dArray[i][j].classList.add("black-pawn");
                type = "black";

            } else if (positions[i][j] == 'wp') {
                peice2dArray[i][j].classList.add("white-pawn");
                type = "white";

            } else {
                peice2dArray[i][j].classList.add("empty-square");
            }

            peice2dArray[i][j].classList.add(type);

        }

    }

}

function setPeices() {
    peice.forEach(p => {
        if (p.classList.contains("black-bishop")) {
            p.children[0].src = "images/bishop.png"
        } else if (p.classList.contains("white-bishop")) {
            p.children[0].src = "images/bishopW.png"
        } else if (p.classList.contains("black-knight")) {
            p.children[0].src = "images/knight.png"
        } else if (p.classList.contains("white-knight")) {
            p.children[0].src = "images/knightW.png"
        } else if (p.classList.contains("black-rook")) {
            p.children[0].src = "images/rook.png"
        } else if (p.classList.contains("white-rook")) {
            p.children[0].src = "images/rookW.png"
        } else if (p.classList.contains("black-king")) {
            p.children[0].src = "images/king.png"
        } else if (p.classList.contains("white-king")) {
            p.children[0].src = "images/kingW.png"
        } else if (p.classList.contains("black-queen")) {
            p.children[0].src = "images/queen.png"
        } else if (p.classList.contains("white-queen")) {
            p.children[0].src = "images/queenW.png"
        } else if (p.classList.contains("black-pawn")) {
            p.children[0].src = "images/pawn.png"
        } else if (p.classList.contains("white-pawn")) {
            p.children[0].src = "images/pawnW.png"
        } else if (p.classList.contains("empty-square")) {
            p.children[0].src = "images/empty.png"
        }
    })
}
setPeicesClassControl();
setPeices();



function helpGDMS(i, j, squaresAllowedToMove, type) {


    let againstType = type == "black" ? "white" : "black";
    if (peice2dArray[i][j].classList.contains("empty-square")) {
        squaresAllowedToMove.push(peice2dArray[i][j])
        return 0;
    } else if (peice2dArray[i][j].classList.contains(againstType)) {
        squaresAllowedToMove.push(peice2dArray[i][j]);
        return 1;
    } else if (peice2dArray[i][j].classList.contains(type)) {
        return 1;
    }
}


function giveDiagnolMovementSquares(square, squaresAllowedToMove, row, col) {
    let type = (square.classList.contains("black")) ? "black" : "white";

    for (let i = row - 1, j = col + 1; i >= 0 && j <= 7; --i, ++j) {
        if (helpGDMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
        if (helpGDMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }
    for (let i = row + 1, j = col + 1; i <= 7 && j <= 7; ++i, ++j) {
        if (helpGDMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }
    for (let i = row + 1, j = col - 1; i <= 7 && j >= 0; ++i, --j) {
        if (helpGDMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }

}

function helpGPMS(i, j, squaresAllowedToMove, type) {


    let againstType = type == "black" ? "white" : "black";
    if (peice2dArray[i][j].classList.contains("empty-square")) {
        squaresAllowedToMove.push(peice2dArray[i][j])
        return 0;
    } else if (peice2dArray[i][j].classList.contains(againstType)) {
        squaresAllowedToMove.push(peice2dArray[i][j]);
        return 1;
    } else if (peice2dArray[i][j].classList.contains(type)) {
        return 1;
    }
}

function givePerpendicularMovementSquares(square, squaresAllowedToMove, row, col) {
    let type = (square.classList.contains("black")) ? "black" : "white";

    for (let i = row - 1, j = col; i >= 0; --i) {
        if (helpGPMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }
    for (let i = row, j = col + 1; j <= 7; ++j) {
        if (helpGPMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }
    for (let i = row + 1, j = col; i <= 7; ++i) {
        if (helpGPMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }
    for (let i = row, j = col - 1; j >= 0; --j) {
        if (helpGPMS(i, j, squaresAllowedToMove, type)) {
            break;
        }
    }


}

function giveLshapeMovementSquares(square, squaresAllowedToMove, row, col) {
    let type = (square.classList.contains("black")) ? "white" : "black";

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (i == row - 2 || i == row + 2) {
                if (j == col - 1 || j == col + 1) {
                    if (peice2dArray[i][j].classList.contains(type) || peice2dArray[i][j].classList.contains("empty-square")) {
                        squaresAllowedToMove.push(peice2dArray[i][j]);
                    }
                }
            } else if (i == row + 1 || i == row - 1) {
                if (j == col - 2 || j == col + 2) {
                    if (peice2dArray[i][j].classList.contains(type) || peice2dArray[i][j].classList.contains("empty-square")) {
                        squaresAllowedToMove.push(peice2dArray[i][j]);
                    }
                }
            }
        }

    }
}

function getKingMovement(type, squaresAllowedToMove, row, col) {
    type = (type.slice(0, 5) == "black") ? "white" : "black";

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            let check = false;

            if (i == row && j == col - 1) {
                check = true;
            } else if (i == row && j == col + 1) {
                check = true;
            } else if (i == row - 1 && j == col) {
                check = true;
            } else if (i == row - 1 && j == col - 1) {
                check = true;
            } else if (i == row - 1 && j == col + 1) {
                check = true;
            } else if (i == row + 1 && j == col) {
                check = true;
            } else if (i == row + 1 && j == col - 1) {
                check = true;
            } else if (i == row + 1 && j == col + 1) {
                check = true;
            }

            if (check)
                if (peice2dArray[i][j].classList.contains("empty-square") || peice2dArray[i][j].classList.contains(type))
                    squaresAllowedToMove.push(peice2dArray[i][j]);
        }
    }
}

function showPeiceMovement(peiceType, square) {
    resetHighlightSquares();
    squaresAllowedToMove = [];

    for (let i = 0; i < 8; ++i) {
        for (let j = 0; j < 8; ++j) {
            if (peice2dArray[i][j] == square) {
                row = i;
                col = j;
            }
        }
    }
    if (peiceType == "black-pawn") {
        if (square.classList.contains("secondMove") === false) {
            firstMove = true;

            for (let i = row + 1, j = col; i <= row + 2 && i <= 7; ++i) {
                if (peice2dArray[i][j].classList.contains("empty-square")) {
                    squaresAllowedToMove.push(peice2dArray[i][j]);
                } else
                    break;
            }


        } else {
            if (row + 1 <= 7 && peice2dArray[row + 1][col].classList.contains("empty-square")) {
                squaresAllowedToMove.push(peice2dArray[row + 1][col]);
            }
        }
        if (row + 1 <= 7 && col - 1 >= 0 && peice2dArray[row + 1][col - 1].classList.contains("white")) {
            squaresAllowedToMove.push(peice2dArray[row + 1][col - 1]);
        }
        if (row + 1 <= 7 && col + 1 <= 7 && peice2dArray[row + 1][col + 1].classList.contains("white")) {
            squaresAllowedToMove.push(peice2dArray[row + 1][col + 1]);
        }
        squaresAllowedToMove.forEach((s) => {
            if (s.classList.contains("white")) {
                s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"

            } else
                s.style.backgroundColor = "rgba(51, 244, 74, 0.4)";
        })

    } else if (peiceType == "white-pawn") {
        if (square.classList.contains("secondMove") === false) {
            firstMove = true;
            for (let i = row - 1, j = col; i >= row - 2 && i >= 0; --i) {
                if (peice2dArray[i][j].classList.contains("empty-square")) {
                    squaresAllowedToMove.push(peice2dArray[i][j]);

                } else
                    break;
            }

        } else {
            if (row - 1 >= 0 && peice2dArray[row - 1][col].classList.contains("empty-square")) {
                squaresAllowedToMove.push(peice2dArray[row - 1][col]);
            }
        }
        if (row - 1 >= 0 && col - 1 >= 0 && peice2dArray[row - 1][col - 1].classList.contains("black")) {
            squaresAllowedToMove.push(peice2dArray[row - 1][col - 1]);
        }
        if (row - 1 >= 0 && col + 1 <= 7 && peice2dArray[row - 1][col + 1].classList.contains("black")) {
            squaresAllowedToMove.push(peice2dArray[row - 1][col + 1]);
        }

        squaresAllowedToMove.forEach((s) => {
            if (s.classList.contains("black")) {
                s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"

            } else
                s.style.backgroundColor = "rgba(51, 244, 74, 0.4)";
        })
    } else if (peiceType == "black-king" || peiceType == "white-king") {

        getKingMovement(peiceType, squaresAllowedToMove, row, col);

        squaresAllowedToMove.forEach(s => {
            s.style.backgroundColor = "rgba(51, 244, 74, 0.4)"
            if (peiceType == "white-king") {
                if (s.classList.contains('black'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
            if (peiceType == "black-king") {
                if (s.classList.contains('white'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
        })

        if (square.classList.contains("castled") === false && square.classList.contains("castlingNotAllowed") === false) {




            if (peice2dArray[row][col + 1].classList.contains("empty-square") && peice2dArray[row][col + 2].classList.contains("empty-square") && (peice2dArray[row][col + 3].classList[1].slice(-4) == "rook")) {

                squaresAllowedToMove.push(peice2dArray[row][col + 2]);

                peice2dArray[row][col + 2].style.backgroundColor = "rgba(255,255,0,0.5)";
            }
            // else if (peice2dArray[row][col - 1].classList.contains("empty-square") && peice2dArray[row][col - 2].classList.contains("empty-square") && peice2dArray[row][col - 3].classList.contains("empty-square") && (peice2dArray[row][col - 4].classList[1].slice(-4) == "rook"))

            //     squaresAllowedToMove.push(peice2dArray[row][col - 3]);

            // peice2dArray[row][col - 3].style.backgroundColor = "rgba(255,255,0,0.5)";

        }


    } else if (peiceType == "white-bishop" || peiceType == "black-bishop") {

        giveDiagnolMovementSquares(square, squaresAllowedToMove, row, col);


        squaresAllowedToMove.forEach(s => {
            s.style.backgroundColor = "rgba(51, 244, 74, 0.4)"
            if (peiceType == "white-bishop") {
                if (s.classList.contains('black'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
            if (peiceType == "black-bishop") {
                if (s.classList.contains('white'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
        })

    } else if (peiceType == "white-rook" || peiceType == "black-rook") {

        givePerpendicularMovementSquares(square, squaresAllowedToMove, row, col);


        squaresAllowedToMove.forEach(s => {
            s.style.backgroundColor = "rgba(51, 244, 74, 0.4)"
            if (peiceType == "white-rook") {
                if (s.classList.contains('black'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
            if (peiceType == "black-rook") {
                if (s.classList.contains('white'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
        })

    } else if (peiceType == "white-knight" || peiceType == "black-knight") {

        giveLshapeMovementSquares(square, squaresAllowedToMove, row, col);


        squaresAllowedToMove.forEach(s => {
            s.style.backgroundColor = "rgba(51, 244, 74, 0.4)"
            if (peiceType == "white-knight") {
                if (s.classList.contains('black'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
            if (peiceType == "black-knight") {
                if (s.classList.contains('white'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
        })

    } else if (peiceType == "white-queen" || peiceType == "black-queen") {
        giveDiagnolMovementSquares(square, squaresAllowedToMove, row, col);
        givePerpendicularMovementSquares(square, squaresAllowedToMove, row, col);
        squaresAllowedToMove.forEach(s => {
            s.style.backgroundColor = "rgba(51, 244, 74, 0.4)"
            if (peiceType == "white-queen") {
                if (s.classList.contains('black'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }
            if (peiceType == "black-queen") {
                if (s.classList.contains('white'))
                    s.style.backgroundColor = "rgba(244, 51, 51, 0.611)"
            }

        })
    }
}

// function checkValidMove(playerType) {
//     let againstType = playerType === "white" ? "black" : "white";
//     let squaresToCheck = [];
//     giveDiagnolMovementSquares()
//     givePerpendicularMovementSquares()
//     giveLshapeMovementSquares();
//     getKingMovement()
// }



function controlPeiceMovement(peiceType, square) {
    let flag = false;
    squaresAllowedToMove.forEach((s) => {
        if (s == square)
            flag = true;
    })
    if (flag) {
        let row1, col1;
        for (let i = 0; i < 8; ++i)
            for (let j = 0; j < 8; ++j) {
                if (peice2dArray[i][j] == square) {
                    row1 = i;
                    col1 = j;
                }
            }

        if (peice2dArray[row][col].classList[1].slice(-4) == "king" && col1 - 2 == col) {
            peice2dArray[row1][col1].classList.add("castlingNotAllowed");
            peice2dArray[row1][col1].classList.add("castled");

            positions[row1][col1] = positions[row][col];
            positions[row][col] = 'e';


            if (peice2dArray[row][col].classList.contains("white")) {
                positions[row][col + 1] = 'wr';
            } else {
                positions[row][col + 1] = 'br';
            }
            positions[row][col + 3] = 'e';
            castlingSound.play();
        }
        // } else if (peice2dArray[row][col].classList[1].slice(-4) == "king" && col - col1 == ) {
        //     peice2dArray[row1][col1].classList.add("castlingNotAllowed");
        //     peice2dArray[row1][col1].classList.add("castled");

        //     positions[row1][col1] = positions[row][col];
        //     positions[row][col] = 'e';


        //     if (peice2dArray[row][col].classList.contains("white")) {
        //         positions[row][col + 1] = 'wr';
        //     } else {
        //         positions[row][col + 1] = 'br';
        //     }
        //     positions[row][col + 3] = 'e';
        //     castlingSound.play();

        // } 
        else if (peice2dArray[row][col].classList[1].slice(-4) == "king" && col1 - 2 != col) {
            peice2dArray[row1][col1].classList.add("castlingNotAllowed");
            positions[row1][col1] = positions[row][col];
            positions[row][col] = 'e';

            chessPeiceSound.play();


        } else {
            if (row1 != row && firstMove == true) {
                if (peice2dArray[row][col].classList.contains("secondMove")) {
                    peice2dArray[row][col].classList.remove("secondMove");

                }
                peice2dArray[row1][col1].classList.add("secondMove");
                firstMove = false;
            }
            if (positions[row1][col1] != 'e')
                chessPeiceCapture.play();
            else
                chessPeiceSound.play();
            positions[row1][col1] = positions[row][col];
            positions[row][col] = 'e';

            chessPeiceSound.play();

        }
        if (peice2dArray[row][col].classList.contains("secondMove")) {
            peice2dArray[row1][col1].classList.add("secondMove")
            peice2dArray[row][col].classList.remove("secondMove")
        }
        if (peice2dArray[row][col].classList.contains("castled")) {
            peice2dArray[row1][col1].classList.add("castled")
            peice2dArray[row][col].classList.remove("castled")
        }
        if (peice2dArray[row][col].classList.contains("castlingNotAllowed")) {
            peice2dArray[row1][col1].classList.add("castlingNotAllowed")
            peice2dArray[row][col].classList.remove("castlingNotAllowed")
        }
        setPeicesClassControl();
        setPeices();
        resetHighlightSquares();
        clickedPeice = false;
        turn = turn == 1 ? 0 : 1;






    } else {

        resetHighlightSquares();
        clickedPeice = false;

        if (turn == 1 && clicked.slice(0, 5) == "black")
            showPeiceMovement(peiceType, square);
        else if (turn == 0 && clicked.slice(0, 5) == "white")
            showPeiceMovement(peiceType, square);
        clickedPeice = true;
        if (firstMove == true) {
            firstMove = false;
        }
    }

}
let firstClick = false;


peiceArray.forEach(p => {


    p.addEventListener("click", (e) => {

        let square = e.target.closest("div");
        if (square.classList.contains("black-bishop"))
            clicked = "black-bishop";
        else if (square.classList.contains("black-knight"))
            clicked = "black-knight";
        else if (square.classList.contains("black-king"))
            clicked = "black-king";
        else if (square.classList.contains("black-queen"))
            clicked = "black-queen";
        else if (square.classList.contains("black-rook"))
            clicked = "black-rook";
        else if (square.classList.contains("black-pawn"))
            clicked = "black-pawn";
        else if (square.classList.contains("white-bishop"))
            clicked = "white-bishop";
        else if (square.classList.contains("white-knight"))
            clicked = "white-knight";
        else if (square.classList.contains("white-king"))
            clicked = "white-king";
        else if (square.classList.contains("white-queen"))
            clicked = "white-queen";
        else if (square.classList.contains("white-rook"))
            clicked = "white-rook";
        else if (square.classList.contains("white-pawn"))
            clicked = "white-pawn";
        else
            clicked = "empty-square"


        if (clickedPeice == true) {
            controlPeiceMovement(clicked, square);
        } else {
            if (turn == 0 && clicked.slice(0, 5) == "white") {
                showPeiceMovement(clicked, square);
                clickedPeice = true;
            } else if (turn == 1 && clicked.slice(0, 5) == "black") {
                showPeiceMovement(clicked, square);
                clickedPeice = true;
            }


        }
        if (clickedPeice == true && clicked == "empty-square") {
            clickedPeice = false;
        }
    })
})

document.querySelector(".flip-board").addEventListener("click", () => {
    if (turn == 1) {
        images.forEach(image => {
            image.style.transform = "rotateX(180deg)"
        })
    } else {
        images.forEach(image => {
            image.style.transform = "rotateX(0deg)"

        })
    }
})
let data = [];
function dataManipulate() {
    if (localStorage.getItem("data"))
        data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    data.push(
        document.querySelector(".input").value
    );
    let ele = document.createElement('p');
    data.forEach(d => {
        ele.textContent += d;
    })
    document.querySelector(".game").insertAdjacentElement("afterbegin", ele);
    localStorage.setItem("data", JSON.stringify(data));
}
document.querySelector(".input-btn").addEventListener("click", () => {

    dataManipulate();

})
