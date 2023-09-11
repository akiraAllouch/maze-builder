const px=1;
const activeColor="#eb141466";
class MatrixGenerator {
    constructor(m, n, speed = 100){
        this.speed = speed;
        this.open=true;
        this.m = m;
        this.n = n;
        this.visited = Array.from({ length: m }, () => Array(n).fill(false));
        let matrixEl = document.getElementById("matrix");
        matrixEl.style.gridTemplateRows = "repeat("+m+", 1fr)";
        matrixEl.style.gridTemplateColumns = "repeat("+n+", 1fr)";
        matrixEl.innerHTML = "";
        for(let i=0; i<m; i++){
            for(let j=0; j<n; j++){
                let cell = document.createElement("div");
                cell.id="cell-"+i+"-"+j;
                cell.style.borderLeft = px+"px solid black";
                cell.style.borderRight = px+"px solid black";
                cell.style.borderTop = px+"px solid black";
                cell.style.borderBottom = px+"px solid black";
                cell.style.minHeight="10px";
                cell.style.minWidth="10px";
                cell.style.textAlign="center";
                matrixEl.appendChild(cell);
            }
        }
    }
    getUnvisitedNeighbor(curr){
        let unvisited = [];
        let m = this.visited.length, n = this.visited[0].length;
        if (curr[0]>0 && !this.visited[curr[0]-1][curr[1]]) unvisited.push([curr[0]-1,curr[1]]);
        if (curr[0]<m-1 && !this.visited[curr[0]+1][curr[1]]) unvisited.push([curr[0]+1,curr[1]]);
        if (curr[1]>0 && !this.visited[curr[0]][curr[1]-1]) unvisited.push([curr[0],curr[1]-1]);
        if (curr[1]<n-1 && !this.visited[curr[0]][curr[1]+1]) unvisited.push([curr[0],curr[1]+1]);
        if (unvisited.length==0) return false;
        return unvisited[Math.floor(Math.random() * unvisited.length)];
    }
    
    async dfs(curr){
        let i=curr[0], j=curr[1];
        this.visited[i][j]=true;
        let next = this.getUnvisitedNeighbor(curr);
        while(next && this.open) {
            this.getCurr(curr).style.background=activeColor;
            await new Promise(resolve => setTimeout(resolve, this.speed));
            if(!this.open)  return;
            this.connect(curr, next);
            this.getCurr(curr).style.background="white";
            await this.dfs(next)
            next = this.getUnvisitedNeighbor(curr);
        }
    }
    
    getCurr(curr)
    {
        return document.querySelector("#cell-"+curr[0]+"-"+curr[1]);
    }

    connect(curr1,curr2){
        if(!this.open)  return
        let currEl1 = this.getCurr(curr1);
        let currEl2 = this.getCurr(curr2);
        if(curr1[0] < curr2[0]) {
            currEl1.style.borderBottomColor = "white";
            currEl2.style.borderTopColor = "white";  
        }
        else if(curr1[0] > curr2[0]) {
            currEl1.style.borderTopColor = "white";
            currEl2.style.borderBottomColor = "white";
        }
        else if(curr1[1] < curr2[1]){
            currEl1.style.borderRightColor = "white";
            currEl2.style.borderLeftColor = "white";
        }
        else if(curr1[1] > curr2[1]){
            currEl1.style.borderLeftColor = "white";
            currEl2.style.borderRightColor = "white";
        }
    }

}

let prev = {open:false};
function reset(){
    prev.open = false;
    let m = parseInt(document.querySelector("#rowInput").value);
    let n = parseInt(document.querySelector("#colInput").value);
    let speed = parseInt(document.querySelector("#speedInput").value)
    return new MatrixGenerator(m, n, speed);
}

function generate(){
    let matrix = reset();
    let start= [0, Math.floor(Math.random() * matrix.n)];
    matrix.getCurr(start).style.borderTopColor="white";
    matrix.dfs(start);
    let last = [matrix.m-1, Math.floor(Math.random() * matrix.n)];
    matrix.getCurr(last).style.borderBottomColor="white";    
    prev = matrix
}

generate()
