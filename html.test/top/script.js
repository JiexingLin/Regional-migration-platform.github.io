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

// フォーム送信処理
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ

    // 入力内容を取得
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // 簡単なバリデーション（空白チェック）
    if (name === "" || email === "" || message === "") {
        displayMessage("すべての項目を入力してください。", "error");
        return;
    }

    // メッセージ送信完了後の処理
    // 通常はここでフォーム内容をサーバーに送信しますが、今回はシミュレーション
    setTimeout(() => {
        displayMessage("お問い合わせありがとうございます。後ほど担当者からご連絡いたします。");
        // フォームをクリア
        document.getElementById("contact-form").reset();
    }, 1000); // 1秒後に送信完了メッセージを表示
});

// メッセージ表示関数
function displayMessage(message, type = "success") {
    const formMessageElement = document.getElementById("form-message");
    formMessageElement.textContent = message;
    
    // メッセージのスタイルを設定
    formMessageElement.classList.remove("error", "success");
    formMessageElement.classList.add(type);
    
    // メッセージを表示
    formMessageElement.style.display = "block";
}

// エンターキーでメッセージ送信を可能にする
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.scrollBtn'); // 修正

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
});

// お問い合わせフォーム送信処理
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ

    // 入力内容を取得
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // 簡単なバリデーション（空白チェック）
    if (name === "" || email === "" || message === "") {
        displayMessage("すべての項目を入力してください。", "error");
        return;
    }

    // メッセージ送信完了後の処理
    // 通常はここでフォーム内容をサーバーに送信しますが、今回はシミュレーション
    setTimeout(() => {
        displayMessage("お問い合わせありがとうございます。後ほど担当者からご連絡いたします。");
        // フォームをクリア
        document.getElementById("contact-form").reset();
    }, 1000); // 1秒後に送信完了メッセージを表示
});

// メッセージ表示関数
function displayMessage(message, type = "success") {
    const formMessageElement = document.getElementById("form-message");
    formMessageElement.textContent = message;
    
    // メッセージのスタイルを設定
    formMessageElement.classList.remove("error", "success");
    formMessageElement.classList.add(type);
    
    // メッセージを表示
    formMessageElement.style.display = "block";
}


// モーダル関連の要素
const privacyPolicyLink = document.getElementById('privacy-policy-link');
const modal = document.getElementById('privacy-policy-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

// リンクがクリックされた時にモーダルを表示
privacyPolicyLink.addEventListener('click', (e) => {
    e.preventDefault(); // リンクのデフォルトの動作（ページ遷移）を防ぐ
    // モーダルが表示されていない場合、表示
    if (modal.style.display === 'none' || modal.style.display === '') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
});

// モーダルを閉じる処理
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // モーダルを非表示にする
});

// モーダル外をクリックした場合にも閉じる
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'; // モーダル外をクリックしたときにモーダルを閉じる
    }
});

