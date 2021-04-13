import db from "./services/firebase";

export const initialState = {
    user:null,
    mode:"home",
    follows:[],
    posts:[]
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_MODE: "SET_MODE",
    LOAD_POSTS: "LOAD_POSTS",
    ADD_POST: "ADD_POST"

};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionTypes.SET_MODE:
            return {
                ...state,
                mode: action.mode,
            };
        case actionTypes.LOAD_POSTS:
            var follows = [];
            var posts = [];
            let myPromise = new Promise(function(resolve, reject) {
                // executor (the producing code, "singer")
              });
            var doc = db.collection('users_info').where("uid","==",state.user.uid).get()
            doc.then((snapshot) => {
            try {
                follows = snapshot.docs[0].data().follows;
                //Get the posts related to the user's follows
                //Firestore doesn't allow to make more than 10 selection at a time 
                var post_temp = [];
                for (var i = 0; i===Math.floor(follows.length/10);i++){
                    //Last fetch
                    if (i === (Math.floor(follows.length/10))){
                        myPromise = db.collection('posts')
                        .where("uid","in",follows.slice(i*10,follows.length+1))
                        .onSnapshot((snapshot) => {
                            //Combine post_temp and new fetched posts 
                            post_temp = [...post_temp,...snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }))]
                            post_temp = post_temp.sort((a, b) => a.data.timestamp < b.data.timestamp ? 1 : -1)
                            //Finally set posts
                            posts= post_temp;
                            console.log(posts)
                        });
                    }
                    //normal fetch
                    else {
                        db.collection('posts')
                        .where("uid","in",follows.slice(i*10,i*10+10))
                        .onSnapshot((snapshot) => 
                            post_temp = [...post_temp,...snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }))]
                        );
                    };
                };
            }
            catch{

            }})
            return myPromise.then(() => {
                console.log(state)
                return {
                    ...state,
                    follows: follows,
                    posts: posts
                }
            })
        case actionTypes.ADD_POST:
            var post = action.post;
            state.posts.push(post)  
            db.collection('posts').add({
                message: post.message,
                timestamp: post.timestamp,
                profilePic: post.profilePic,
                username: post.username,
                image: post.image,
                likedBy: post.likedBy,
                uid: post.uid
            })
            return state;

    default:
        return state;
    }
};

export default reducer;