export default function reducer (state, action) {
	switch (action.type) {
	case 'EXAMPLE_MUTATION':
		state.example = action.payload;
		return state;


	case 'BUY_GENERATOR':
        state.counter -= 10;

        state.generators.forEach(function(element){
        	if (element.name = action.payload.name){
        		element.quantity += 1;
        	} 
        })

        return state;


    default:
        return state;
    }    
}

