import {db} from '@/firestore.js'

const ChatModule = {
  state: {
    chats: {}
  },
  actions: {
    sendMessage (context, payload ) {
     alert("+++++");

 /*     //let chatID = payload.chatID
const increment = firebase.firestore.FieldValue.increment(1);

// Document reference
const storyRef = db.collection('messages').doc('hoho');

// Update read count
storyRef.update({ reads: increment });

      const message = {
        user: payload.username,
        content: payload.content,
        date: payload.date
      };
       //event.preventDefault();
       console.log(message,db.collection("message"));
      // db.collection('messages').doc('hoho').set({a:"++"})
*/


let setMsg = db.collection('messages').doc(payload[0].chatID).collection('message').add(payload[1]);

setMsg.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
//console.log(setMsg);
   

    },
}
}
export default ChatModule