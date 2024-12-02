import { db, collection, addDoc, onSnapshot, serverTimestamp, orderBy, query } from "./firebase.js";

const nameModal = document.getElementById("name-modal");
const nameInput = document.getElementById("name-input");
const startChatButton = document.getElementById("start-chat");
const chatApp = document.getElementById("chat-app");
const messagesDiv = document.getElementById("messages");
const messeageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

let userName = "";

startChatButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  if (name) {
    userName = name;
    localStorage.setItem("chatUserName", name);
    nameModal.style.display = "none";
    chatApp.style.display = "flex";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "please Enter your Name!",
    });
  }
})

window.onload = () => {
  const storedName = localStorage.getItem("chatUserName");
  if (storedName) {
    userName = storedName;
    nameModal.style.display = "none";
    chatApp.style.display = "flex";
  }
};

let sendMessage = async () => {
  const message = messeageInput.value.trim();
  if (!message) {
    Swal.fire("message cannot by empty!");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "messages"), {
      text: message,
      sender: userName,
      timestamp: serverTimestamp(),
    });
    messeageInput.value = "";

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

sendButton.addEventListener("click", sendMessage);
messeageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
})


const getMessages = () => {
  const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
  onSnapshot(q, (querySnapshot) => {
    messagesDiv.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const messageData = doc.data();

      const messageDiv = document.createElement("div")
      messageDiv.classList.add("message")

      if (messageData.sender === userName) {
        messageDiv.classList.add("sent");
        messageDiv.textContent = `you: ${messageData.text}`;
      }
      else {
        messageDiv.classList.add("received");
        messageDiv.textContent = `${messageData.sender}: ${messageData.text}`;
      }

      messagesDiv.appendChild(messageDiv);
    })
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

getMessages()