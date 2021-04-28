import {firebase,db} from '@/firestore'
import  router  from '@/router'
//console.log(router);
var firebaseAuth=firebase.auth();
const AuthModule = {
  state: {
    user: null
  },
  actions: {
    signUserUp ({commit}, payload) {

      firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
               .then(auth => {
                alert("Your registration has been successfully completed");
                
let data = {
 email:payload.email,
fullName:"hocino"
};

let setUser = db.collection('users').doc(auth.user.uid).set(data);

console.log(setUser);
                const newUser = {
                    id: auth.user.uid,
                    username: payload.username
                  }
                  commit('setUser', newUser)
                  
                 firebaseAuth.signOut().then(() => {
                  router.go("/login");
            });
               }).catch(err => {
                  this.errorMessage = err.message;
                 alert("errorMessage3: "+ this.errorMessage);
               });   
               
     /* commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          auth => {
            firebase.database().ref('users').child(auth.user.uid).set({
              name: payload.username
            })
              .then(
                message => {
                  commit('setLoading', false)
                  const newUser = {
                    id: auth.user.uid,
                    username: payload.username
                  }
                  commit('setUser', newUser)
                }
              )
              .catch(
                error => {
                  commit('setLoading', false)
                  commit('setError', error)
                }
              )
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )*/
    },
    signUserIn ({commit}, payload) {

   firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
               .then(auth => {
                  console.log(auth);
                  const newUser = {
                id: auth.user.uid,
                username: auth.user.email
              }
              commit('setUser', newUser)
                  router.go("/chat");
               
               })
               .catch(err => {
                   //myFormLog.reset();
                   //alert("The email address or password is incorrect. Please retry...");
                   alert(err.message)
                  this.errorMessage = err.message
               });


    
      /*commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          auth => {
            firebase.database().ref('users').child(auth.user.uid).once('value', function (data) {
              commit('setLoading', false)
              const newUser = {
                id: auth.user.uid,
                username: auth.user.email
              }
              commit('setUser', newUser)
            })
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
          }
        )*/
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    setUser (state, payload) {
          state.user = payload;
    }
}
}
export default AuthModule