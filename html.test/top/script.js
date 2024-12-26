// チャットボックスにメッセージを追加する関数
function appendMessage(message, isUser) {
    const chatBox = document.getElementById("chat-box");

    const messageElement = document.createElement("div");
    messageElement.classList.add(isUser ? "user-message" : "bot-message");
    messageElement.innerText = message;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // スクロールを最新のメッセージに合わせる
}

// ユーザーがメッセージを送信したときの処理
function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (message !== "") {
        // ユーザーのメッセージを表示
        appendMessage(message, true);

        // ユーザーの入力をクリア
        userInput.value = "";

        // ボットのレスポンスをシミュレート
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            appendMessage(botResponse, false);
        }, 1000);
    }
}

// ボットのレスポンスを生成する関数
function generateBotResponse(userMessage) {
    // ここでは簡単な例として、特定のキーワードに対するボットの返答を返す
    if (userMessage.includes("こんにちは")) {
        return "こんにちは！どうしましたか？";
    } else if (userMessage.includes("元気")) {
        return "元気です！ありがとうございます。";
    } else {
        return "すみません、よく分かりませんでした。";
    }
}

// エンターキーでメッセージ送信を可能にする
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
