const canvas = document.getElementById("cardCanvas");
const ctx = canvas.getContext("2d");

const attributeColors = {
  fire: "#ff6666",
  water: "#66ccff",
  grass: "#66ff66",
  light: "#ffff99",
  dark: "#9999cc",
  neutral: "#cccccc"
};

const maruNumbers = {
  0: "⓪",
  1: "①", 2: "②", 3: "③", 4: "④", 5: "⑤",
  6: "⑥", 7: "⑦", 8: "⑧", 9: "⑨", 10: "⑩"
};

function generateCard() {
  const name = document.getElementById("cardName").value.trim();
  const cost = parseInt(document.getElementById("cardCost").value, 10);
  const power = parseInt(document.getElementById("cardPower").value, 10);
  const attr = document.getElementById("cardAttr").value;
  const text = document.getElementById("cardText").value;

  drawCard({ name, cost, power, attr, text });
}

function drawCard({ name, cost, power, attr, text }) {
  const attrColor = attributeColors[attr] || "#cccccc";
  const width = 400;
  const height = 600;

  ctx.clearRect(0, 0, width, height);

  // 背景
  ctx.fillStyle = attrColor;
  ctx.fillRect(0, 0, width, height);

  // 上部白帯（名前・コスト）
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(10, 10, width - 20, 40);

  // 下部白帯（テキスト・パワー）
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(10, 330, width - 20, 260);

  // 外枠
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, width - 4, height - 4);

  // コスト（左上） ※0は描画しない
  if (cost > 0 && cost <= 10) {
    ctx.fillStyle = "#000";
    ctx.font = "20px bold sans-serif";
    const maruCost = maruNumbers[cost] || cost;
    ctx.fillText(maruCost, 20, 38);
  }

  // 名前（中央）
  ctx.fillStyle = "#000";
  ctx.font = "20px sans-serif";
  const nameWidth = ctx.measureText(name).width;
  const nameX = width / 2 - nameWidth / 2;
  ctx.fillText(name, nameX, 38);

  // キャラクター画像領域（仮：灰色）
  ctx.fillStyle = "#dddddd";
  ctx.fillRect(20, 60, width - 40, 250);

  // テキスト（あれば）
  if (text && text.trim() !== "") {
    ctx.fillStyle = "#000";
    ctx.font = "16px sans-serif";
    wrapText(ctx, text.trim(), 20, 360, width - 60, 22);
  }

  // パワー（右下） 0なら"M"
  ctx.font = "32px bold sans-serif";
  ctx.textAlign = "right";
  ctx.fillStyle = "#000";
  const powerLabel = (power === 0 || isNaN(power)) ? "M" : power.toString();
  ctx.fillText(powerLabel, width - 30, 590);
  ctx.textAlign = "left";
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(/\s+/);
  let line = "";
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function downloadCard() {
  const link = document.createElement("a");
  link.download = "card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

