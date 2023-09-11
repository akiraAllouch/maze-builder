class MazeSolver extends Maze{
    constructor(iend, jend){
        super();
        this.running = false;
        this.iend = iend;
        this.jend = jend;
    }

    async solve(i, j){
        this.running = true;
        await this.solveMaze(i, j);
        this.running = false;
    }

    async solveMaze(i, j){
        let current = this.getCurr([i, j]);
        if(current.style.background!="white") return false
        if(!this.running) return true;
        current.style.background="#86f38682";
        if(i==this.iend && j==this.jend) 
            return true;
        let potentialMoves = this.getAvailableMoves(i, j);
        for(let move of potentialMoves){
            if(this.speed > 0)
                await new Promise(resolve => setTimeout(resolve, this.speed));
            if(await this.solveMaze(move[0], move[1]))
                return true;
        }
        current.style.background="#ff353538";
        // current.textContent="X";
        return false;
    }

    getAvailableMoves(i, j){
        let moves = [];
        let current = this.getCurr([i, j]);
        if(j>0 && current.style.borderLeftColor!="black") //left
            moves.push([i, j-1]);
        if(j<this.m-1 && current.style.borderRightColor!="black") //right
            moves.push([i, j+1]);
        if(i>0 && current.style.borderTopColor!="black") //up
            moves.push([i-1, j]);
        if(i<this.n-1 && current.style.borderBottomColor!="black") //down
            moves.push([i+1, j]);
        //shuffle
        for (let i = moves.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [moves[i], moves[j]] = [moves[j], moves[i]];
        }
        return moves;
    }

}