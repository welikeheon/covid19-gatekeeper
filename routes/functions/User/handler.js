const UserHelper = require('../../helper/UserHelper')

module.exports = {
    // 학번 / 교직원번호 조회
    CheckReference: async (req, res, next) => {
        let reference_num = req.body.reference_num;
        let username = await UserHelper.CheckReference(reference_num);
        if (username === false) {
            return res.json({"status": false}) // 검색해도 새 사용자가 없는 경우
        } else {
            return res.json({"status": true}) // 새 사용자가 있는 경우
        }
    },
    GenerateNewUser: async(req, res, next) => {
        let name = req.body.name;
        let ref_number = req.body.ref_number;
        let tel = req.body.telephone;
        let email = req.body.email;
        let dept = req.body.dept;

        let savedata = await UserHelper.GenerateNewUser(name, ref_number, tel, email, dept);
        if (savedata === true) {
            return res.json({"status": true})
        } else {
            return res.json({"status": false})
        }
    },
} 