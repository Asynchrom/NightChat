function findCard(username) {
    return new Promise((resolve, reject) => {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().username == username) {
                    resolve(doc.data());
                }
            })
        })
    })
}

function returnPoints(username){
    return new Promise((resolve, reject) => {
        db.collection("users").doc(username).get().then( (user) => {
            resolve(user.data().points)
        });
    })
}

function updateDescription(username, description) {
    if(username && description){
        return new Promise((resolve, reject) => {
            db.collection("users").doc(username).set({
                description: description,
            }, { merge: true })
            .then(resolve())
            .catch(reject())
        })
    }
}

function findRanks() {
    return new Promise((resolve, reject) => {
        let ranks = [{points:0}];
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let flag = false;
                for(let i = 0; i<ranks.length; i++){
                    if(doc.data().points < ranks[i].points){
                        ranks.splice(i,0, {username: doc.data().username, points: doc.data().points, type: doc.data().type});
                        flag=true;
                        break;
                    }
                }
                if(!flag){
                    ranks.splice(ranks.length,0, {username: doc.data().username, points: doc.data().points, type: doc.data().type   });
                }
            })
        })
        .then(resolve(ranks))
    })
}

function checkUsername(user) {
    let isIn = false;
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().username.toUpperCase() == user.toUpperCase()) {
                isIn = true;
                return;
            };
        });
    });
    console.log(isIn);
    return isIn;
}

export default {
    checkUsername, 
    findCard, 
    updateDescription, 
    returnPoints, 
    findRanks 
};
