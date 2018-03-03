export default function reducer (state, action) {
	switch (action.type) {
	case 'EXAMPLE_MUTATION':
		state.example = action.payload;
		return state;


	case 'BUY_GENERATOR':
        state.generators.forEach(function(element){
        	if (element.name = action.payload.name){
        		element.quantity += 1;
        		state.counter -= element.baseCost;
        	} 
        })

        return state;


    default:
        return state;
    }    
}

