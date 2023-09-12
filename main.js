let running_generator = {open:false};
let running_solver = {running: false};
let hive;
let running_interval=-1;
let start, end;
function reset(){
}

function generate(){
    if(running_interval>0) clearInterval(running_interval);
    
    running_generator.open = false;
    document.querySelector("#solveButton").disabled=true;
    document.querySelector("#antButton").disabled=true;
    running_generator = new MatrixGenerator();
    start= [0, Math.floor(Math.random() * running_generator.n)];
    running_generator.getCurr(start).style.borderTopColor="transparent";
    running_generator.create(start[0], start[1]);
    if(hive)
        hive.close();
    end = [running_generator.m-1, Math.floor(Math.random() * running_generator.n)];
    running_generator.getCurr(end).style.borderBottomColor="transparent";    
    hive = new Hive(start[0], start[1], end[0], end[1]);
    running_interval = setInterval(() => {
        if(running_generator.open) return;
        document.querySelector("#solveButton").disabled=false;
        document.querySelector("#antButton").disabled=false;
        clearInterval(running_interval)
    }, 500);
}


function solve(){
    running_solver.running = false;
    clearSolution();
    running_solver = new MazeSolver(end[0], end[1]);
    running_solver.solve(start[0], start[1]);
}

function clearSolution(){
    let matrixEl = document.getElementById("matrix");
    for(let div of matrixEl.children){
        div.style.background="white";
    }
}
generate()