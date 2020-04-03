import store from '../store'

let clock = {
    time: 1,
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    seconds: new Date().getSeconds(),
    timeOk: new Date().getHours() < 9 || new Date().getHours() > 20,
}

function updatePoints(){
    console.log(store.points)
    db.collection("users").doc(store.userProfile.displayName).set({
        points: store.points++,
    }, { merge: true })
}

setInterval(() => {
    let now = new Date();
    clock.hours = now.getHours();
    clock.minutes = now.getMinutes();
    clock.seconds = now.getSeconds();
    if(clock.hours < 9 || clock.hours > 20) clock.timeOk = true;
    else {
        //firebase.auth().signOut();
        clock.timeOk = true;
    }
    if(clock.time++%30 == 0){
        updatePoints()
    }
}, 1000);

export default clock