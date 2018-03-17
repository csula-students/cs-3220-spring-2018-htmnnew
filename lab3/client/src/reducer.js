import constants from './constants.js'
import Generator from './models/generator.js'
import Story from './models/story.js'

export default function reducer (state, action) {
	switch (action.type) {
	case constants.actions.EXAMPLE:
		state.example = action.payload;
		return state;

    case constants.actions.BUTTON_CLICK:
        state.counter += 1;
        return state;    

	case constants.actions.BUY_GENERATOR:
        state.generators.forEach(function(element){
            const temp = new Generator(element);
        	if (temp.name == action.payload && state.counter >= temp.getCost()){
        		console.log('buying...');
                state.counter -= Math.round(temp.getCost());
                temp.quantity += 1;
                element.quantity = temp.quantity;
        	}
        })
        return state;

    case constants.actions.INCREMENT:
        state.counter += Math.round(action.payload);

        return state;
    case constants.actions.CHECK_STORY:
        //change story state
        //if any of my stories are past trigger point
        //change state.story.state to visable
        state.story.forEach(function(element){
            const temp = new Story(element);
            if(temp.isUnlockYet(state.counter) == true){
                temp.unlock();
                element.state = temp.state;
            }
        })

        return state;


    default:
        return state;
    }    
}

