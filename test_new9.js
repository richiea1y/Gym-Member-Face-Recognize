const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer');
const path = require('path');
const WebSocket = require('ws');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500' // 允許指定的來源
}));

// 設置靜態文件目錄
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 設置 Multer 存儲選項
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// 建立 MySQL 連接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: 'aiml_05'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
    console.log('MySQL server is listening on port: ', connection.config.port);
});

// 設置 WebSocket 伺服器
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', ws => {
    console.log('WebSocket connection established');

    ws.on('message', message => {
        const data = JSON.parse(message);
    });
});

// 處理成員信息更新
app.post('/update_member', upload.single('member_image'), (req, res) => {
    console.log('req.body:', req.body); // 打印表单数据
    console.log('req.file:', req.file); // 打印上传的文件信息
    const {
        member_gender,
        member_name,
        member_phone,
        member_age,
        member_city,
        encoding
    } = req.body;

    const member_image = req.file ? `/uploads/${req.file.filename}` : null;

    const insertQuery = `
        INSERT INTO gym_member (member_gender, member_name, member_phone, member_age, member_city, member_image, encoding)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const queryValues = [
        member_gender,
        member_name,
        member_phone,
        member_age,
        member_city,
        member_image,
        encoding
    ];

    connection.query(insertQuery, queryValues, (err, results) => {
        if (err) {
            console.error('Error inserting member: ', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        const newMemberId = results.insertId;

        // 獲取插入後的資料
        const selectQuery = 'SELECT * FROM gym_member WHERE member_id = ?';
        connection.query(selectQuery, [newMemberId], (err, rows) => {
            if (err) {
                console.error('Error fetching new member: ', err);
                res.status(500).json({ error: 'Database error' });
                return;
            }

            const newMember = rows[0];
            res.json(newMember);

            // 通知所有 WebSocket 客戶端
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ status: 'success', member: newMember }));
                }
            });
        });
    });
});

// 查詢成員信息
app.get('/get_member', (req, res) => {
    const memberName = req.query.name;

    const selectQuery = 'SELECT * FROM gym_member WHERE member_name = ?';
    connection.query(selectQuery, [memberName], (err, rows) => {
        if (err) {
            console.error('Error fetching member: ', err);
            res.status(500).json({ error: 'Database error' });
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }

        const member = rows[0];

        // 將圖片路徑轉換為實際的圖片
        if (member.member_image) {
            member.member_image = `${req.protocol}://${req.get('host')}${member.member_image}`;
        }
        
        res.json(member);
    });
});

// 處理查詢會員資料的請求（基於帳號和密碼）
app.get('/login', (req, res) => {
    const gymAccount = req.query.account;
    const gymPassword = req.query.password;

    // 查詢帳號和密碼是否匹配
    const loginQuery = 'SELECT * FROM gym_login WHERE gym_account = ? AND gym_password = ?';
    connection.query(loginQuery, [gymAccount, gymPassword], (err, loginResults) => {
        if (err) {
            res.json({ error: 'Database query error' });
            return;
        }

        if (loginResults.length > 0) {
            // 查找會員資料
            const memberQuery = 'SELECT * FROM gym_member WHERE member_id = ?';
            connection.query(memberQuery, [loginResults[0].member_id], (err, memberResults) => {
                if (err) {
                    res.json({ error: 'Database query error' });
                    return;
                }

                if (memberResults.length > 0) {
                    const member = memberResults[0];
                    res.json({
                        gym_account: gymAccount,
                        member_name: member.member_name,
                        member_gender: member.member_gender,
                        member_phone: member.member_phone,
                        member_age: member.member_age,
                        member_city: member.member_city,
                        member_image: member.member_image.toString('base64'),
                        encoding: member.encoding
                    });
                } else {
                    res.json({ error: 'Member not found' });
                }
            });
        } else {
            res.json({ error: 'Invalid account or password' });
        }
    });
});

// 設置 HTTP 伺服器
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 將 HTTP 伺服器升級為 WebSocket 伺服器
server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request);
    });
});
