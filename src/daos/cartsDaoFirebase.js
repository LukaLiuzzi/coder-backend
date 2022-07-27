import FirebaseContainer from '../containers/firebaseContainer.js';

export default class CartsDaoFirebase extends FirebaseContainer {
	constructor() {
		super('carts');
	}
}
