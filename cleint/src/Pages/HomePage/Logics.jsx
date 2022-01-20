import {collection, onSnapshot, doc, addDoc, setDoc, deleteDoc} from 'firebase/firestore';
import {db} from '../../Firebase/config.jsx';



export const handleDeleteFood = async (item1,item) => {
    const docRef = await doc(db, 'changeFoods', item.defaultId)
    console.log(docRef);
    deleteDoc(docRef)
    
    const docRef1 = await doc(db, "foodValue", item.defaultId);
    const payload = await {...item1, id: item.id, num: 0, orderVizible: true}
    setDoc(docRef1, payload)
}


export const onClickCard = async (item, item1, item2, changeProductModalVizible) => {
    changeProductModalVizible(false)
    localStorage.setItem('productItem', JSON.stringify(item))
    const docRef = await doc(db, "clickCard", 'vJYjpitihFOJcLkGnbC0');
    const payload = await {...item,
        title: item.title,
        ceil1: item2,
        body: item.body,
        img: item.img,
        id: item.id,
        ceil: item.ceil,
        defaultId: item1.defaultId,
        num: item1.num
    }
    setDoc(docRef, payload)
    if(item1.num === 0){
        const docRef1 = await doc(db, "foodValue", item1.defaultId);
        const payload1 = await {...item1, num: 1}
        setDoc(docRef1, payload1)
    }
}

export const onClickvibrat = async (item1, item2, setFoodFlyingVizible) =>{
    localStorage.setItem('foodItemForPopUpCard', JSON.stringify({item1}))
    setFoodFlyingVizible(true)

    const docRef = await doc(db, "foodValue", item2.defaultId);
    const payload = await {...item2, num: 1, orderVizible: false}
    setDoc(docRef, payload)

    const collectionRef = await doc(db, 'changeFoods', item2.defaultId);
    const payload1 = await {...item1, defaultId: item2.defaultId, staticCeil: item1.ceil, count:1};
    setDoc(collectionRef, payload1)

    const docRef2 = await doc(db, 'generalPrice', 'buCDPjFEfaBlbmgVqy4M');
    const payload2 = await {generalPrice: parseInt(item1.ceil.slice(0,6))};
    setDoc(docRef2, payload2)
}

export const onClickIncreaseProductItem = async (item, item1) => {
    const docRef = await doc(db, "foodValue", item.defaultId);
    let num = await item.num
    const payload = await {...item, num: num+1}
    setDoc(docRef, payload);

    const docRef1 = await doc(db, 'changeFoods', item.defaultId);
    const ceil = await parseInt(item1.ceil.slice(0,6)) * (num+1)
    const payload1 = await {...item1, ceil: ceil+' 000 сум',staticCeil: item1.ceil, count: num+1}
    setDoc(docRef1, payload1)

    const docRef3 = await doc(db, 'clickCard', 'vJYjpitihFOJcLkGnbC0');
    const payload3 = await {...item, ceil1: ceil + ' 000 сум'}
    setDoc(docRef3, payload3)

    const docRef2 = await doc(db, 'generalPrice', 'buCDPjFEfaBlbmgVqy4M');
    onSnapshot(collection(db, "generalPrice"), snapshot => 
    (snapshot.docs.map((doc) => ({...doc.data(), defaultId: doc.id})))
    )
    const payload2 = await {generalPrice: ceil};
    setDoc(docRef2, payload2)
}

export const onClickDecreaseProductItem = async (item, item1) => {
    const docRef = await doc(db, "foodValue", item.defaultId);
    let num = await item.num
    const payload = await {...item,num: num-1}
    setDoc(docRef, payload);

    const docRef1 = await doc(db, 'changeFoods', item.defaultId);
    const ceil = await (parseInt(item1.ceil.slice(0,6))) * (num-1)
    const payload1 = await {...item1, ceil: ceil+' 000 сум', count: num-1, staticCeil: item1.ceil,}
    setDoc(docRef1, payload1)

    const docRef3 = await doc(db, 'clickCard', 'vJYjpitihFOJcLkGnbC0');
    const payload3 = await {...item, ceil1: ceil + ' 000 сум'}
    setDoc(docRef3, payload3)
    if(num === 1) {
        handleDeleteFood(item1,item)
    }
}

export const onClickIncreasePopUpCart = async (item1,item) => {
    const docRef = await doc(db, "foodValue", item.defaultId);
    let num = await item.count
    const payload = await {...item1, num: num+1, orderVizible: false}
    setDoc(docRef, payload);
    
    const ceil = await parseInt(item.ceil.slice(0,6)) + parseInt(item.staticCeil.slice(0,6))
    const docRef3 = await doc(db, 'clickCard', 'vJYjpitihFOJcLkGnbC0');
    const payload3 = await {...item, ceil1: ceil + ' 000 сум'}
    setDoc(docRef3, payload3)
    
    const docRef1 = await doc(db, 'changeFoods', item.defaultId);
    const payload1 = await {...item, ceil: ceil+' 000 сум',  count: num+1}
    setDoc(docRef1, payload1)
}

export const onClickDecreasePopUpCart = async(item1, item) => {
    const docRef = await doc(db, "foodValue", item.defaultId);
    let num = await item.count
    const payload = await {...item1, num: num-1}
    setDoc(docRef, payload);
    
    const docRef1 = await doc(db, 'changeFoods', item.defaultId);
    const ceil = await parseInt(item.ceil.slice(0,6)) - parseInt(item.staticCeil.slice(0,6))
    const payload1 = await {...item, ceil: ceil+' 000 сум',  count: num-1}
    setDoc(docRef1, payload1)

    const docRef3 = await doc(db, 'clickCard', 'vJYjpitihFOJcLkGnbC0');
    const payload3 = await {...item, ceil1: ceil + ' 000 сум'}
    setDoc(docRef3, payload3)
    if(item.count === 1) {
        handleDeleteFood(item1,item)
    }
}

export const onClickIncreaseProductModal = async (item, item1, orderOrJoin) => {
    const docRef = await doc(db, "foodValue", item1.defaultId);
    let num = await item.num
    console.log(num);
    const payload = await {...item, num: num+1}
    setDoc(docRef, payload);
    const ceil = await (parseInt(item1.ceil.slice(0,6))) * (num+1)

    if(orderOrJoin){
        const docRef1 = await doc(db, 'changeFoods', item.defaultId);
        const ceil = await (parseInt(item1.ceil.slice(0,6))) * (num+1)
        const payload1 = await {...item1, ceil: ceil+' 000 сум', count: num+1, staticCeil: item1.ceil,}
        setDoc(docRef1, payload1)
    }

    const docRef2 = await doc(db, 'clickCard', 'vJYjpitihFOJcLkGnbC0');
    const payload2 = await {...item1, ceil1: ceil + ' 000 сум'}
    setDoc(docRef2, payload2)
}

export const onClickDecreaseProductModal = async (item, item1, orderOrJoin, setOrderOrJoin) => {
    let num = await item.num
    if(num === 1) {
        const docRef2 = await doc(db, 'foodValue', item.defaultId);
        const payload2 = await {...item, orderVizible: true, num: 0};
        setDoc(docRef2, payload2)
        handleDeleteFood(item, item1)

    }
    if(num > 1) {
        const docRef = await doc(db, "foodValue", item.defaultId);
        const payload = await {...item,num: num-1}
        setDoc(docRef, payload);
        const ceil = await (parseInt(item1.ceil.slice(0,6))) * (num-1)

        if(orderOrJoin) {
            const docRef1 = await doc(db, 'changeFoods', item.defaultId);
            const ceil = await (parseInt(item1.ceil.slice(0,6))) * (num-1)
            const payload1 = await {...item1, ceil: ceil+' 000 сум', count: num-1, staticCeil: item1.ceil,}
            setDoc(docRef1, payload1)
        }

        const docRef3 = await doc(db, 'clickCard', 'vJYjpitihFOJcLkGnbC0');
        const payload3 = await {...item1, ceil1: ceil + ' 000 сум'}
        setDoc(docRef3, payload3)
    }
}

export const handleOrder = async (item, item1) => {
    if(item.num !== 0) {
        const docRef1 = await doc(db, 'changeFoods', item.defaultId);
        const ceil = await parseInt(item1.ceil.slice(0,6)) * (item.num)
        const payload1 = await {...item1, ceil: ceil+' 000 сум',staticCeil: item1.ceil, count: item.num}
        setDoc(docRef1, payload1)
    }

    if(item.num !== 0) {
        const docRef2 = await doc(db, 'foodValue', item.defaultId);
        const payload2 = await {...item, orderVizible: false};
        setDoc(docRef2, payload2)
    }

}

export const saveThings = async (user) => {
    const docRef2 = await doc(db, 'saveThings', "h657xG00zVtKUSDULOPW");
    const payload2 = await {...user, name: user.name, email: user.email};
    setDoc(docRef2, payload2)
}

export const commonData = async (user) => {
    const collectionRef = await doc(db, 'commonData', '72B5aEkolKNCVW1ThdM5');
    const payload1 = await {...user, paymentType: user.paymentType, shippingMethods: user.shippingMethods,};
    setDoc(collectionRef, payload1)
}