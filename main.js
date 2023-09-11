let running_matrix = {open:false};
let running_interval=-1;
let start, end;
function reset(){
    running_matrix.open = false;
    let m = parseInt(document.querySelector("#rowInput").value);
    let n = parseInt(document.querySelector("#colInput").value);
    let speed = parseInt(document.querySelector("#speedInput").value)
    document.querySelector("#solveButton").disabled=true;
    return new MatrixGenerator(m, n, speed);
}

function generate(){
    if(running_interval>0) clearInterval(running_interval);
    let matrix = reset();
    start= [0, Math.floor(Math.random() * matrix.n)];
    matrix.getCurr(start).style.borderTopColor="white";
    matrix.create(start[0], start[1]    );
    end = [matrix.m-1, Math.floor(Math.random() * matrix.n)];
    matrix.getCurr(end).style.borderBottomColor="white";    
    running_matrix = matrix
    running_interval = setInterval(() => {
        if(running_matrix.open) return;
        document.querySelector("#solveButton").disabled=false;
        clearInterval(running_interval)
    }, 500);
}

function solve(){
    clearSolution();
    let m = parseInt(document.querySelector("#rowInput").value);
    let n = parseInt(document.querySelector("#colInput").value);
    let speed = parseInt(document.querySelector("#speedInput").value)

    solver = new mazeSolver(m, n, end[0], end[1], speed);
    solver.solveMaze(start[0], start[1]);
}

function clearSolution(){
    let matrixEl = document.getElementById("matrix");
    for(let div of matrixEl.children){
        div.textContent="";
    }
}
generate()