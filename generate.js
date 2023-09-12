const px=1;
const activeColor="#86f38682";
class MatrixGenerator extends Maze {
    constructor(){
        super();
        this.open=true;
        this.visited = Array.from({ length: this.m }, () => Array(this.n).fill(false));
        let matrixEl = document.getElementById("matrix");
        matrixEl.style.gridTemplateRows = "repeat("+this.m+", 1fr)";
        matrixEl.style.gridTemplateColumns = "repeat("+this.n+", 1fr)";
        matrixEl.innerHTML = "";
        for(let i=0; i<this.m; i++){
            for(let j=0; j<this.n; j++){
                let cell = document.createElement("div");
                cell.id="cell-"+i+"-"+j;
                cell.style.borderLeft = (j==0 ? 2*px : px)+"px solid black";
                cell.style.borderRight = (j==this.m-1 ? 2*px : px)+"px solid black";
                cell.style.borderTop = (i==0 ? 2*px : px)+"px solid black";
                cell.style.borderBottom = (i==this.n-1 ? 2*px : px)+"px solid black";
                cell.style.overflow= "hidden";
                cell.style.minHeight="5px";
                cell.style.minWidth="5px";
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
    
    async create(i, j){
        await this.dfs([i,j]);
        this.open=false;
    }
    async dfs(curr){
        let i=curr[0], j=curr[1];
        this.visited[i][j]=true;
        let next = this.getUnvisitedNeighbor(curr);
        while(next && this.open) {
            this.getCurr(curr).style.background =activeColor;
            if(this.speed>0)
                await new Promise(resolve => setTimeout(resolve, this.speed));
            if(!this.open)  return;
            this.connect(curr, next);
            this.getCurr(curr).style.background="transparent";
            await this.dfs(next)
            next = this.getUnvisitedNeighbor(curr);
        }
    }

    connect(curr1,curr2){
        if(!this.open)  return
        let currEl1 = this.getCurr(curr1);
        let currEl2 = this.getCurr(curr2);
        if(curr1[0] < curr2[0]) {
            currEl1.style.borderBottomColor = "transparent";
            currEl2.style.borderTopColor = "transparent";  
        }
        else if(curr1[0] > curr2[0]) {
            currEl1.style.borderTopColor = "transparent";
            currEl2.style.borderBottomColor = "transparent";
        }
        else if(curr1[1] < curr2[1]){
            currEl1.style.borderRightColor = "transparent";
            currEl2.style.borderLeftColor = "transparent";
        }
        else if(curr1[1] > curr2[1]){
            currEl1.style.borderLeftColor = "transparent";
            currEl2.style.borderRightColor = "transparent";
        }
    }

}
