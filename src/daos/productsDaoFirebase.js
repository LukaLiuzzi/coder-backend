import FirebaseContainer from '../containers/firebaseContainer.js';

export default class ProductsDaoFirebase extends FirebaseContainer {
	constructor() {
		super('products');
	}
}
