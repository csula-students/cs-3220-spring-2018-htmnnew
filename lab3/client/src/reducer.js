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

    case 'INCREMENT':
        state.counter += action.payload;

        return state;

    case 'CHECK_STORY':
        //change story state
        //if any of my stories are past trigger point
        //change state.story.state to visable
        state.story.forEach(function(element){
            if(element.triggeredAt <= state.counter){
                element.state = 'visible';
            }
        })

        return state;


    default:
        return state;
    }    
}

