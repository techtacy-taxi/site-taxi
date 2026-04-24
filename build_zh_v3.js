const fs = require('fs');
const path = require('path');

const files = [
    'index.html',
    'acropolis-tour.html',
    'argolis-tour.html',
    'delphi-tour.html',
    'meteora-tour.html',
    'sounio-tour.html'
];

const translations = [
    [/Book via\s+WhatsApp/gi, '通过WhatsApp预订'],
    [/The tour concludes with a visit to the ancient Theater of 埃皮达鲁斯[\s\S]*?highest seating\s*rows\./gi, '游览以参观埃皮达鲁斯古剧院结束，该剧院以其完美的音响效果闻名于世。即使在舞台上轻声细语，坐在最高排座位的观众也能听得清清楚楚。'],
    [/Treasury of Atreus/g, '阿特柔斯宝库'],
    [/Internal Entrance/g, '内部入口'],
    [/Aerial View/g, '俯视图'],
    [/Our Premium Fleet and 我们的优质车队和服务/g, '我们的优质车队和服务'], // fixing double translation
    [/Our Premium Fleet and/gi, '我们的优质车队和'],
    [/Services/g, '服务'],
    [/Chat on\s+WhatsApp/gi, '通过WhatsApp聊天'],
    [/Send\s+Inquiry/gi, '发送咨询'],
    [/Send\s+Email/gi, '发送邮件'],
    [/Back to All Tours/gi, '返回所有游览'],
    [/Price Upon Request/gi, '价格另询'],
    [/Entrance Fees Not Included/gi, '不含门票'],
    [/Full Day/gi, '全天'],
    [/Half Day/gi, '半天'],
    [/or Sedan/gi, '或轿车'],
    [/Driver/g, '司机']
];

files.forEach(file => {
    const zhPath = path.join(__dirname, 'zh', file);
    if (fs.existsSync(zhPath)) {
        let content = fs.readFileSync(zhPath, 'utf8');
        
        translations.forEach(([regex, replacement]) => {
            content = content.replace(regex, replacement);
        });

        // specific fixes for the double translation
        content = content.replace(/Our Premium Fleet and 服务/g, '我们的优质车队和服务');

        fs.writeFileSync(zhPath, content, 'utf8');
        console.log(`Updated translations in zh/${file}`);
    }
});
