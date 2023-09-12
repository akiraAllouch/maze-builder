class Hive extends Maze{
    constructor(istart, jstart, iend, jend){
        super();
        this.counter = 0
        this.istart = istart; 
        this.jstart = jstart;
        this.iend = iend;
        this.jend = jend;
        this.hive = [];
        this.intervalID = setInterval(()=>{
            for(let i=0; i< this.hive.length; i++){
                if(this.hive[i].running==false)
                {
                    this.hive.splice(i, 1);
                    i--;
                }   
            }
        })
    }

    add(){
        this.hive.push(new AntSolver(this.iend, this.jend, "ant"+this.counter));
        this.hive[this.hive.length-1].solve(this.istart, this.jstart);
        this.counter++;
    }

    close(){
        clearInterval(this.intervalID);
        for(let ant of this.hive){
            ant.running = false;
        }
    }
}

class AntSolver extends Maze{
    constructor(iend, jend, id){
        super();
        this.id = id;
        this.running = false;
        this.iend = iend;
        this.jend = jend;
        this.visited = Array.from({ length: this.m }, () => Array(this.n).fill(false));
        // this.failed = Array.from({ length: this.m }, () => Array(this.n).fill(false));
    }

    async solve(i, j){
        this.running = true;
        let x = this.getCurr([i, j]);
        await this.solveMaze(i, j);
        this.running = false;
    }
    
    genImg(goingLeft){
        let img = document.createElement("img");
        img.id=this.id;
        img.src="images/ant-"+(goingLeft ? "left" : "right")+".png"
        img.style.height="100%";
        img.style.width="100%";
        return img;

    }

    async solveMaze(i, j, goingLeft=true){
        let current = this.getCurr([i, j]);
        if(this.visited[i][j] || current.style.background=="rgba(255, 53, 53, 0.22)") return false
        this.visited[i][j]=true;
        if(!this.running) return true;
        if(i==this.iend && j==this.jend) 
        return true;
        current.appendChild(this.genImg(goingLeft));
        let potentialMoves = this.getAvailableMoves(i, j);
        for(let move of potentialMoves){
            if(this.speed > 0)
                await new Promise(resolve => setTimeout(resolve, this.speed));
            document.querySelector("#"+this.id).remove();
            if(await this.solveMaze(move[0], move[1], j > move[1]))
                return true;
            current.appendChild(this.genImg(goingLeft));
        }
        document.querySelector("#"+this.id).remove();
        // current.textContent="X";
        return false;
    }

    getAvailableMoves(i, j){
        let moves = [];
        let current = this.getCurr([i, j]);
        if(j>0 && current.style.borderLeftColor!="black") //left
            moves.push([i, j-1]);
        if(j<this.n-1 && current.style.borderRightColor!="black") //right
            moves.push([i, j+1]);
        if(i>0 && current.style.borderTopColor!="black") //up
            moves.push([i-1, j]);
        if(i<this.m-1 && current.style.borderBottomColor!="black") //down
            moves.push([i+1, j]);
        //shuffle
        for (let i = moves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [moves[i], moves[j]] = [moves[j], moves[i]];
        }
        return moves;
    }

}