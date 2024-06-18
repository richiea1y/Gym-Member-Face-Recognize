import { Sequelize } from "sequelize";
const sequelize = new Sequelize('gym-db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
// 定義一個叫做 User 的資料結構
const Member = sequelize.define('Member', {
    // 定義 Model 屬性
    member_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    member_gender: { type: Sequelize.STRING(20) },
    member_name: { type: Sequelize.STRING(50) },
    member_phone: { type: Sequelize.STRING(10) },
    member_age: { type: Sequelize.INTEGER },
    member_city: { type: Sequelize.CHAR },
    member_image: { type: Sequelize.BLOB }
}, {
    getterMethods: {
        // Define a virtual URL attribute
        profileUrl() {
            return `/users/member/${this.id}`;
        }
    }
});

export default Member