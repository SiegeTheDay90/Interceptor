import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

export default function HitCounter(){
    const firebaseConfig = {
        authDomain: "hitcounter-c6795.firebaseapp.com",
        projectId: "hitcounter-c6795",
        storageBucket: "hitcounter-c6795.appspot.com",
        messagingSenderId: "337902042079",
        appId: "1:337902042079:web:f5396784d6cba619ed626a"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    HitCounter.getHits = async function(counter_name){
        const docRef = await doc(db, "Hits", counter_name);
        let fetchedDoc = await getDoc(docRef);
        const data = fetchedDoc?.data() || {count: 0};
        return data;
    }
    
    HitCounter.inc = async function inc(counter_name){
        const docRef = await doc(db, "Hits", counter_name);
        let fetchedDoc = await getDoc(docRef);
        const data = fetchedDoc?.data() || {count: 0};
        data.count += 1;
        setDoc(docRef, data).then(async ()=>{
            const logRef = await doc(db, "Logs", String(Date.now()));
            const data = navigator.userAgentData.toJSON();
            setDoc(logRef, data);
        })
        .catch((error) => console.error(error, "Send Error"));
    }

    return HitCounter;
}