function startGame() {
    newSudoku()
}

let countF=0,board;
let moves = Array(9).fill().map(()=> Array(9).fill(0) );

let Sudoku = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

let cellF={
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": []
}

function newSudoku() {
    const container=document.getElementById('container');
    shuffle()
    container.innerHTML='';
    moves = Array(9).fill().map(()=> Array(9).fill(0) );

    const table=document.createElement('table');
    table.style.border='1px solid black';
    table.setAttribute("border","solid")
    table.setAttribute("id","sudokuTable")
    let row="",value,classs='cell';

    for (let i = 0; i < 9 ; i++) {
         row+="<tr>";
        for (let j = 0; j < 9 ; j++) {
          classs="cell";
		 if ((i>=3 && i < 6 ) || (j>=3 && j < 6 )) {
            if ((i>=3 && i < 6) && (j>=3 && j < 6 )) {
                classs += '5';
                
            }
            else{
                if (i<3) {
                    classs += '2';
                }
                else if(i>=6){
                    classs +='8';

                }
                else if(j>=6){
                    classs += '6';
                }
                else if(j<6){
                    classs +='4';
                }
            }
            
        }
         else {
            if (i < 3 && j < 3) {
                classs += "1";
            }
            else if (i >= 6 && j < 3) {
                classs += "7";
            }
            else if (j >= 6 && i < 3) {
                classs += "3";
            }
            else if (j >= 6 && i >= 6) {
                classs += "9";
            }
        }
        // console.log(classs,"log class ");
        let flag = 1, random, count = 0, cellNo = classs.substring(4);
            while (flag == 1) {
                flag = 0;
                random = Math.floor(Math.random() * 9) + 1;
                if (moves[i].includes(random)) {
                    flag = 1;
                }
                for (let k = 0; k < 9; k++) {
                    if (moves[k][j] == random) {
                        flag = 1;
                    }
                }


                for (let k = 0; k < cellF[cellNo].length ; k++) {
                    if (cellF[cellNo][k] == random) {
                        flag = 1;
                    }
                }
                if (flag == 0 || count == 100) {
                    value = random;
                    break;
                }
                else {
                    count++;
                }

            }
            

            if (value == i || value == j || value == (i + j) || (value % 2) == ((i + j) % 2)) {
                row += "<td><input type='text' id='ip" + i + j + "' oninput='validation(" + i + "," + j + "," + cellNo + ")' class='" + classs + "' name='num'></td>";
            }
            else {
                // row += "<td>" + (Math.floor(Math.random()*9)+1) + "</td>";
                moves[i][j] = value;
                cellF[cellNo].push(value);
                row += "<td><input class='" + classs + "' id='ip" + i + j + "' style='color:#2889d4; ' disabled name='num' value='" + Sudoku[i][j] + "'></td>";
            } 
           
        }

        row += "</tr>";
  
        }
		table.innerHTML = row;
        container.appendChild(table);
        countF=1;
       
        
    }
    

    // function validation(i,j,cellNo) {
    //     let inp=document.getElementById("ip"+i+j).value;
    //     if (isNaN(inp)) {
    //         inp=inp.substring(0,inp.length-1);
    //         document.getElementById("ip"+i+j).value=inp;
    //     }
    //     else if(inp.length > 1){
    //         inp=inp.substring(inp.length-1);
    //         document.getElementById("ip" + i + j).value = inp;
    //     }
    //     let color = "green";
    // for (let k = 0; k < 9; k++) {
    //     if (moves[k][j] == inp || moves[i][k] == inp) {
    //         color = "red";
    //         break;
    //     }
    // }
    // for (let k = 0; k < cellF[cellNo].length; k++) {
    //     if (cellF[cellNo][k] == inp) {
    //         color = "red";
    //         break;
    //     }
    // }
    // document.getElementById("ip" + i + j).style.color = color;
    
    
    // }

    // function validation(i, j, cellNo) {
    //     let inp = document.getElementById("ip" + i + j).value;
    //     if (isNaN(inp)) {
    //         inp = inp.substring(0, inp.length - 1);
    //         document.getElementById("ip" + i + j).value = inp;
    //     } else if (inp.length > 1) {
    //         inp = inp.substring(inp.length - 1);
    //         document.getElementById("ip" + i + j).value = inp;
    //     }
    
    //     let color = "green";
    //      console.log(inp,'inp');
    //     // Check conflict in row
    //     for (let k = 0; k < 9; k++) {
    //         if (k !== j && moves[i][k] == inp) {
    //             color = "red";
    //             break;
    //         }
    //     }
    
    //     // Check conflict in column
    //     if (color === "green") {
    //         for (let k = 0; k < 9; k++) {
    //             if (k !== i && moves[k][j] == inp) {
    //                 color = "red";
    //                 break;
    //             }
    //         }
    //     }
    
    //     // Check conflict in 3x3 matrix
    //     if (color === "green") {
    //         let startRow = Math.floor(i / 3) * 3;
    //         let startCol = Math.floor(j / 3) * 3;
    //         for (let x = startRow; x < startRow + 3; x++) {
    //             for (let y = startCol; y < startCol + 3; y++) {
    //                 if (x !== i && y !== j && moves[x][y] == inp) {
    //                     color = "red";
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    
    //     document.getElementById("ip" + i + j).style.color = color;
    // }

    function validation(i, j, cellNo) {
        let inp = document.getElementById("ip" + i + j).value;
        console.log(inp,"input")
        if (isNaN(inp)) {
            inp = inp.substring(0, inp.length - 1);
            document.getElementById("ip" + i + j).value = inp;
        } else if (inp.length > 1) {
            inp = inp.substring(inp.length - 1);
            document.getElementById("ip" + i + j).value = inp;
        }
        
        let color = "green";
        
        // Check if the input value is not present in the same row
        for (let k = 0; k < 9; k++) {
            if (k !== j && moves[i][k] == inp) {
                color = "red";
                break;
            }
        }
        
        // Check if the input value is not present in the same column
        if (color === "green") {
            for (let k = 0; k < 9; k++) {
                if (k !== i && moves[k][j] == inp) {
                    color = "red";
                    break;
                }
            }
        }
        
        // Check if the input value is not present in the same 3x3 subgrid
        if (color === "green") {
            let startRow = Math.floor(i / 3) * 3;
            let startCol = Math.floor(j / 3) * 3;
            for (let x = startRow; x < startRow + 3; x++) {
                for (let y = startCol; y < startCol + 3; y++) {
                    if (x == i && y == j && moves[x][y] == inp) {
                        color = "red";
                        break;
                    }
                }
            }
        }
        
        document.getElementById("ip" + i + j).style.color = color;
    }
    

    function checkAnswer(grid,e,i, j, cellNo){
        //console.log(e,grid);
        // var row = e.target.row
        // var col = e.target.col
        // var num = Number(e.data)
        // var id = e.target.id
        let inp = document.getElementById("ip" + i + j).value;
        console.log(inp,"inp");
        if(inp==''){
            return false
        }
        for(var x=0;x<9;x++){
            //check for a row and inc column
            if(moves[x][i]==inp){
                showColors('red')
                return false
            }
        }
        for(var y=0;y<9;y++){
            //check for a row and inc column
            if(moves[y][j]==inp){
                showColors('red')
                return false
            }
        }
        //check for mini-grid /cell
        //end 8,8
        //[6,6] to [8,8]
        //3 elements
        var startRow = i - (i%3)
        var startCol = j - (j%3)
        for(var m=0;m<3;m++){
            for(n=0;n<3;n++){
    
                if(moves[m+startRow][n+startCol]==inp){
                    showColors('red')
                    return false
                }
    
            }
        }
        showColors('green')
        return true   
    }
    function showColors(color,id){
        var inp=document.getElementById("ip" + i + j)
        if(color=='red'){
            inp.style.backgroundColor='red'
        }
        else{
            inp.style.backgroundColor='green'
        }
    }
    
    function shuffle() {
        let count = 0, randomNum;
        while (count < 10) {
            randomNum = Math.floor(Math.random() * 8) + 1;
            for (let n = 0; n < 9; n++) {
                if (count % 3 == 0) {
                    let temp1 = Sudoku[randomNum][n];
                    if (randomNum % 3 == 0) {
                        Sudoku[randomNum][n] = Sudoku[randomNum + 1][n];
                        Sudoku[randomNum + 1][n] = temp1;
                    } else {
                        Sudoku[randomNum][n] = Sudoku[randomNum - 1][n];
                        Sudoku[randomNum - 1][n] = temp1;
                    }
                }
                else {
                    let temp2 = Sudoku[n][randomNum];
                    if (randomNum % 3 == 0) {
                        Sudoku[n][randomNum] = Sudoku[n][randomNum + 1];
                        Sudoku[n][randomNum + 1] = temp2;
                    } else {
                        Sudoku[n][randomNum] = Sudoku[n][randomNum - 1];
                        Sudoku[n][randomNum - 1] = temp2;
                    }
                }
            }
            count++;
        }
    }
    
    function checkSudoku() {
        var sudokuBoard = [];
        
        // Construct Sudoku board from user input
        for (let i = 0; i < 9; i++) {
            var row = [];
            for (let j = 0; j < 9; j++) {
                var cellValue = document.getElementById("ip" + i + j).value;
                console.log(cellValue,"cell");
                row.push(parseInt(cellValue) || 0); // Convert input value to integer or 0 if empty
            }
            sudokuBoard.push(row);
        }
    
        // Validate rows
        for (let i = 0; i < 9; i++) {
            let rowSet = new Set();
            for (let j = 0; j < 9; j++) {
                if (sudokuBoard[i][j] !== 0 && rowSet.has(sudokuBoard[i][j])) {
                    alert('Duplicate value in row ' + (i + 1));
                    return false;
                }
                rowSet.add(sudokuBoard[i][j]);
            }
        }
    
        // Validate columns
        for (let j = 0; j < 9; j++) {
            let colSet = new Set();
            for (let i = 0; i < 9; i++) {
                if (sudokuBoard[i][j] !== 0 && colSet.has(sudokuBoard[i][j])) {
                    alert('Duplicate value in column ' + (j + 1));
                    return false;
                }
                colSet.add(sudokuBoard[i][j]);
            }
        }
    
        // Validate 3x3 subgrids
        for (let block = 0; block < 9; block++) {
            let subgridSet = new Set();
            let startRow = Math.floor(block / 3) * 3;
            let startCol = (block % 3) * 3;
            for (let i = startRow; i < startRow + 3; i++) {
                for (let j = startCol; j < startCol + 3; j++) {
                    if (sudokuBoard[i][j] !== 0 && subgridSet.has(sudokuBoard[i][j])) {
                        alert('Duplicate value in subgrid ' + (startRow / 3 + 1) + '-' + (startCol / 3 + 1));
                       
                        return false;
                    }
                    subgridSet.add(sudokuBoard[i][j]);
                }
            }
        }
    
        alert('Sudoku is valid!');
        return true;
    }

    function solution() {
       let tab;
	   for(let i=0; i<9 ;i++){
	     for(let j=0 ; j<9 ;j++){
		    tab=document.getElementById('ip' + i + j);
			if(moves[i][j]==0){

				tab.value=Sudoku[i][j];
				tab.style.color='green'
					}
		 }
	   }
       

    }
	



