
class mazeSolver{
    constructor(m, n, iend, jend, speed){
        this.m = m;
        this.n = n;
        this.iend = iend;
        this.jend = jend;
        this.speed = speed;
    }

    async solveMaze(i, j){
        if(i==this.iend && j==this.jend) return true;
        let current = this.getCurr(i, j);
        if(current.textContent!="") return false
        current.textContent=".";
        if(await this.move(i, j, "l"))
            return true;
        if(await this.move(i, j, "r"))
            return true;
        if(await this.move(i, j, "u"))
            return true;
        if(await this.move(i, j, "d"))
            return true;
        current.textContent="X";
        return false;
    }
    async move(i, j, type){ //l, r, u, d
        let i1 = i, j1 = j;
        let current = this.getCurr(i, j);
        switch(type){
            case "l":
                if(j==0 || current.style.borderLeftColor=="black")
                    return false;
                j1--;
                break;
            case "r":
                if(j==this.m-1 || current.style.borderRightColor=="black")
                    return false;
                j1++;
                break;
            case "u":
                if(i==0 || current.style.borderTopColor=="black")
                    return false;
                i1--;
                break;
            case "d":
                if(i==this.n-1 || current.style.borderBottomColor=="black")
                    return false;
                i1++;
        }
        if(this.speed > 0)
            await new Promise(resolve => setTimeout(resolve, this.speed));
        return await this.solveMaze(i1, j1);
    }

    getCurr(i, j)
    {
        return document.querySelector("#cell-"+i+"-"+j);
    }

}

