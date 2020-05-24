const pool = require("../../config/db");

module.exports = {
    CheckReference: async (reference_number) => {
        if (!typeof reference_number === 'number' || reference_number === undefined) {
            console.log("잘못된 접근입니다.");
        }

        try {
            var [username] = await pool.query("select `name`, `version` from users where reference_number = ? order by version desc limit 1", [reference_number])
        } catch(e) {
            console.log("학번 조회 중 오류발생", e);
        }

        if (username.length === 0) {
            return false;
        } else {
            return username[0].name
        }
    },
    GetVersion: async(ref_number) => {
        let [result] = await pool.query("select `reference_number` from users where reference_number = ?", [ref_number])
        
        if (result.length === 0) {
            return 1;
        } else {
            return result.length + 1; // 버전 개수 + 1
        }
    },
    GenerateNewUser: async(name, ref_number, tel, email, dept) => {
        if (ref_number.length === 8) {
            var usertype = "학생"
        } else {
            var usertype = "교원"
        }

        let version = await module.exports.GetVersion(ref_number);
        
        try {
            var save = await pool.execute("insert into users (name, reference_number, tel, email, usertype, version, department) values (?, ?, ?, ?, ?, ?, ?) ", [name, ref_number, tel, email, usertype, version, dept]);
            return true
        } catch(err) {
            console.log("새로운 사용자를 저장하는 중 발생한 오류: ", err)
            return false;
        }
    },
}