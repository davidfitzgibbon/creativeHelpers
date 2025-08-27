export default class Repeater {
  constructor(fn, loops = []) {
    this.fn = fn;
    this.loops = loops;
		this.storeItems = false;
		this.items = []
  }
  loop(newFn){
    let functionToRun  = this.fn;
    if(newFn) functionToRun=newFn;
    
    this.iteration(functionToRun, this.loops);
  }
	array (fn = null) {
		this.storeItems = true;
		this.loop(fn)
	}
  iteration(fn, loops, values = []) {
    if(!loops.length) {
			if(this.storeItems) {
				return this.items.push(fn(...values));
			}
			
			return fn(...values);
		}
    
    const loop = loops[0];
    
    // settings
    let s = { start: 0, end: 1, step: 1, }
    
    if(typeof loop == "number") {
      s.end = loop
    } else {
      s = {...s,...loop}
    }
    
    let equalityFn = this.lessThan;
    if(s.inclusive) {
      equalityFn = this.lessThanOrEqual
    }
    
    let state = s.start
    while (equalityFn(state,s.end)) {  
      this.iteration(fn,loops.slice(1,loops.length),[...values,state]);
      state += s.step
    }
  }
  lessThan (a,b) {
    return a < b
  }
  lessThanOrEqual (a,b) {
    return a <= b
  }
}