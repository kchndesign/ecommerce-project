import firestore from './firebase';

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
        const reply = await documentReference.update(document);
        return reply;
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
