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

function returnType(username){
    return new Promise((resolve, reject) => {
        db.collection("users").doc(username).get().then( (user) => {
            resolve(user.data().type)
        });
    })
}

function updateDescription(username, description) {
    if(username && description){
        return new Promise((resolve, reject) => {
            db.collection("users").doc(username).set({
                description: description,
            }, { merge: true })
            .then(() => resolve())
            .catch(() => reject())
        })
    }
}

function findRanks() {
    return new Promise((resolve, reject) => {
        let ranks = [{points:999999}];
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                let flag = false;
                for(let i = 0; i<ranks.length; i++){
                    if(doc.data().points > ranks[i].points){
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
        .then(() => resolve(ranks))
    })
}

function checkUsername(user) {
    return new Promise((resolve, reject) => {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().username.toUpperCase() == user.toUpperCase()) {
                    resolve(true);
                };
            })
        }).then(() => resolve(false));
    })
}

export default {
    checkUsername, 
    findCard, 
    updateDescription, 
    returnPoints, 
    findRanks,
    returnType
};
