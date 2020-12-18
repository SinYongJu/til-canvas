class InnerSects {
    constructor(){
        this.memo = {}
    }
    compare (line2, line1){
        for(let i = 0; i < line1.length; i++){
            this.memo[line1[i].y] = line1[i]
        }


        for(let i = 0; i < line2.length; i++){
            let target = line2[i]
            if(this.memo[target.y] &&  this.memo[target.y].y === target.y){
                console.log(this.memo[target.y], target)
                return target
            }
        }
        return null
    }
}

export default InnerSects