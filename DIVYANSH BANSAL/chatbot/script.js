const send_but = document.querySelector("#send");
const ans = document.querySelector(".reply")
const api_key = document.querySelector("#api-key");
function add_msg(text){
    ans.innerHTML+=`<p class="response">${text}</p>`
}

window.addEventListener("load", () => {
    const history = JSON.parse(localStorage.getItem("chats") || "[]");

    history.forEach(pair => {
        add_msg(`You: ${pair.user}`);
        add_msg(`Bot: ${pair.bot}`);
    });

    ans.scrollTop = ans.scrollHeight;
});

send_but.addEventListener("click",async ()=>{
    const msg = document.querySelector("#ques").value;
    const bot = document.querySelector("select").value;
    
    if (!msg) {
        alert("Please enter a message!");
        return;
    }
    add_msg(`You: ${msg}`);
    document.querySelector("#ques").value="";

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${api_key.value}`,
        'HTTP-Referer': '<YOUR_SITE_URL>',
        'X-Title': '<YOUR_SITE_NAME>',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        model: bot,
        messages: [
        {
            role: 'user',
            content: msg,
        },
        ],
    }),
    });

    const data = await response.json();
    const bot_reply = data.choices[0].message.content || "Sorry! Try Again";

    const history = JSON.parse(localStorage.getItem("chats") || "[]");
    history.push({ user: msg, bot: bot_reply });
    localStorage.setItem("chats", JSON.stringify(history));
    add_msg(`Bot: ${bot_reply}`)

    ans.scrollTop = ans.scrollHeight;
});

const clear_but = document.querySelector("#clear");
clear_but.addEventListener("click",()=>{
    localStorage.clear();
    document.querySelector("#ques").value = "";
    ans.innerHTML="";
})
