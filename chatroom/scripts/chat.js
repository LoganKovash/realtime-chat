// adding new chat documents

// setting up a listener

//updating username

//updating room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save to database
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
        this.chats
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //update ui
                        callback(change.doc.data())
                    }
                });
        });
    }
}

const chatroom = new Chatroom('gaming', 'Logan');

chatroom.getChats((data) => {
    console.log(data);
})