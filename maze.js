class Maze{
    constructor(){
        this.m = parseInt(document.querySelector("#rowInput").value);
        this.n = parseInt(document.querySelector("#colInput").value);
        this.speed = parseInt(document.querySelector("#speedInput").value);
    
    }

    getCurr(curr)
    {
        return document.querySelector("#cell-"+curr[0]+"-"+curr[1]);
    }
}