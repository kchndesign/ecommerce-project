import firestore, { firebase } from './firebase';

/**
 * Get all products within a collection on firestore
 * @param {String} collection ID of the collection
 * @returns an array of all products/documents in the collection
 */
export const getProducts = async (collection) => {
    try {
        const collectionRef = firestore.collection(collection);
        const querySnapshot = await collectionRef.get();
        const documents = querySnapshot.docs;
        const documentsData = documents.map((document) => {
            return { id: document.id, ...document.data() };
        });

        return documentsData;
    } catch (error) {
        console.error(error);
        return;
    }
};

/**
 * Specify collection and product and get an up to date product object.
 * @param {String} collection ID/Name of the collection or category of the product
 * @param {Object} product Product to fetch. If you don't have the whole product, just use the product.id.
 * @returns An up to date product object from the database.
 */
export const getProduct = async (collection, product) => {
    try {
        const collectionRef = firestore.collection(collection);
        const document = collectionRef.doc(product.id);
        const documentData = await document.get();
        return {
            id: documentData.id,
            ...documentData.data(),
        };
    } catch (error) {
        console.error(error);
    }
};

export const updateProduct = async (collection, product) => {
    try {
        const collectionRef = firestore.collection(collection);
        const documentReference = collectionRef.doc(product.id);
        const reply = await documentReference.update(product);
        return reply;
    } catch (error) {
        console.error(error);
    }
};

/**
 * CHECKOUT PRODUCT
 * Specify the product's category, id and quantity and it will update the database as if the product was checked out.
 * @param {String} collection Category of the checkout product
 * @param {String} productId Product ID of the checkout product
 * @param {Number} quantity The quantity of products to check out.
 * @returns reply from firebase server upon attempting to update product
 */
export const checkoutProduct = async (collection, productId, quantity) => {
    // call getProduct() with a fake product with an id: field
    // subtract the checkout quantity from the product quantity
    // if the quantity >= 0, update the product
    try {
        const product = await getProduct(collection, { id: productId });
        const newQuantity = product.quantity - quantity;
        if (newQuantity < 0) {
            throw new Error('checkoutProduct(): resulting quantity below zero');
        }
        const newProduct = {
            ...product,
            quantity: newQuantity,
        };
        console.log(product, newProduct);
        return await updateProduct(collection, newProduct);
    } catch (error) {
        console.error(error);
    }
};

export const seedProducts = async (collection, products) => {
    try {
        const collectionRef = firestore.collection(collection);
        const promiseArray = products.map((product) => {
            return collectionRef.add(product);
        });
        const responseArray = await Promise.all(promiseArray);
        return responseArray;
    } catch (error) {
        console.error(error);
    }
};

/**
 *
 *  access a manually added metadata documents from the firebase and get all
 *  collections
 *  search each collection for documents that match the array of queries
 *  return every document found
 *
 * @param {Array} array Array of product IDs to be searched
 * @returns Array of product objects that were found.
 */
export const getProductsById = async (array) => {
    if (
        !Array.isArray(array) ||
        array.length == 0 ||
        array.some((item) => typeof item !== 'string')
    ) {
        return [];
    }

    try {
        const collectionsDoc = await firestore
            .collection('metadata')
            .doc('firestore')
            .get();

        const collectionsArr = collectionsDoc
            .data()
            .collections.map((string) => firestore.collection(string));

        // this is an array of promises
        const queryPromiseArray = collectionsArr.map((collection) => {
            return collection.where(
                firebase.firestore.FieldPath.documentId(),
                'in',
                array
            );
        });

        // once each every promise is resolved, get() method to get the
        // querysnapshot
        const snapArr = await Promise.all(
            queryPromiseArray.map((query) => query.get())
        );

        const documentsArr = snapArr
            .map((snapshot) => {
                let resultsArr = [];
                snapshot.forEach((doc) => {
                    resultsArr.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                return resultsArr;
            })
            .flat(2);

        return documentsArr;
    } catch (error) {
        console.error(error);
    }
};
