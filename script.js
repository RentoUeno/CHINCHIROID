let player = 3;
// プレイヤーごとの点数を記憶する配列
let scores = [];

function changeplayers(){
    const result = confirm("本当にプレイヤーを作成しますか？\n（現在の入力内容や点数はリセットされます）");
    if (!result) {
        return;
    }

    const p = Number(document.getElementById("population").value);
    player = p;

    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";
    
    // 点数データを初期化（全員最初は0点）
    scores = new Array(p).fill(0);
    
    // 【追加】プレイヤー作成時に合計点表示も一度リセット（0点にする）
    updateTotalScore();

    for(let i = 0; i < p; i++){
        const li = document.createElement("li");
        li.style.marginBottom = "10px";

        // 1. 名前入力欄
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = `プレイヤー ${i + 1}`;
        nameInput.placeholder = "名前を入力";

        // 2. 持ち点表示用のテキスト
        const scoreDisplay = document.createElement("span");
        scoreDisplay.id = `score-display-${i}`;
        scoreDisplay.innerText = " 持ち点: 0 ";
        scoreDisplay.style.fontSize = "1.2em";
        scoreDisplay.style.fontWeight = "bold";
        scoreDisplay.style.margin = "0 10px";

        // 3. 減点ボタン（ー）
        const minusBtn = document.createElement("button");
        minusBtn.type = "button";
        minusBtn.innerText = "ー";
        minusBtn.style.padding = "10px 15px";
        minusBtn.style.fontSize = "1em";
        minusBtn.onclick = function() {
            changeScore(i, -1, scoreDisplay);
        };

        // 4. 加点ボタン（＋）
        const plusBtn = document.createElement("button");
        plusBtn.type = "button";
        plusBtn.innerText = "＋";
        plusBtn.style.padding = "10px 15px";
        plusBtn.style.fontSize = "1em";
        plusBtn.onclick = function() {
            changeScore(i, 1, scoreDisplay);
        };

        // li要素の中に順番に追加
        li.appendChild(nameInput);
        li.appendChild(scoreDisplay);
        li.appendChild(minusBtn);
        li.appendChild(plusBtn);

        // 最後にul要素に追加
        playerList.appendChild(li);
    }
}

// 点数を変更して画面を更新する共通の関数
function changeScore(index, amount, displayElement) {
    scores[index] += amount;
    displayElement.innerText = ` 持ち点: ${scores[index]} `;
    
    // 【追加】点数が変わったら、全体の合計点も再計算して更新する
    updateTotalScore();
}

// 【追加】全員の持ち点の合計を計算して画面に表示する関数
function updateTotalScore() {
    let total = 0;
    for (let i = 0; i < scores.length; i++) {
        total += scores[i];
    }
    
    // 画面の合計点表示を書き換える
    document.getElementById("total-score").innerText = total;
}
