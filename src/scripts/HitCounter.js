import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

export default function HitCounter(){
    const firebaseConfig = {
        _name: "HitCounter",
        authDomain: "hitcounter-c6795.firebaseapp.com",
        projectId: "hitcounter-c6795",
        storageBucket: "hitcounter-c6795.appspot.com",
        messagingSenderId: "337902042079",
        appId: "1:337902042079:web:f5396784d6cba619ed626a"
    };
    const app = initializeApp(firebaseConfig, "HitCounter");
    const db = getFirestore(app);

    // Returns the current count of particular counter
    HitCounter.getHits = async function(counter_name){
        const docRef = await doc(db, "Hits", counter_name);
        let fetchedDoc = await getDoc(docRef);
        const data = fetchedDoc?.data() || {count: 0};
        return data;
    }
    
    // Increment existing or create new counter
    // Create document containing userAgent data for this hit
    HitCounter.inc = async function inc(counter_name){
        const docRef = await doc(db, "Hits", counter_name);
        let fetchedDoc = await getDoc(docRef);
        const data = fetchedDoc?.data() || {count: 0};
        data.count += 1;
        setDoc(docRef, data).then(async ()=>{
            const logRef = await doc(db, "Logs", String(Date.now()));
            const data = navigator.userAgentData.toJSON();
            data.app = counter_name;
            setDoc(logRef, data);
        })
        .catch((error) => console.error(error, "Send Error"));
    }

    return HitCounter;
}



