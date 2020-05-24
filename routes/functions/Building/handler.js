// const pool = require("../../../config/db");
const BuildingHelper = require('../../helper/BuildingHelper')
const MessageHelper = require('../../helper/MessageHelper')
const UserHelper = require('../../helper/UserHelper');

module.exports = {
    SaveNewBuilding: async (req, res, next) => {
        let building_no = req.body.building_no;
        let building_name = req.body.building_name;

        let save = await BuildingHelper.SaveNewBuilding(building_no, building_name);
        if (save === true) {
            let message = await MessageHelper.SuccessMessage('write')
            return res.json(message)
        } else {
            let message = await MessageHelper.FailedMessage('write')
            return res.json(message)
        }
    },
    SaveVisitor: async (req, res, next) => {
        let username = req.body.name;
        let reference_num = req.body.reference_num;
        let building_id = req.body.building_id; // 공과대학의 경우 9 임.
        let visiting_dept = req.body.visiting_dept;

        // 한번도 들어온 적 없는 사용자를 위한 처리
        let telephone = req.body.telephone || undefined
        let email = req.body.email || undefined;
        let department = req.body.department || undefined

        let name = await UserHelper.CheckReference(reference_num);
        
        if (name === false) {
            try {
                let saveuser = await UserHelper.GenerateNewUser(username, reference_num, telephone, email, department);
                let result = await BuildingHelper.SaveVisitingData(reference_num, building_id, visiting_dept);
                if (result === true) {
                    let message = await MessageHelper.SuccessMessage('write')
                    return res.json(message)
                } else {
                    let message = await MessageHelper.FailedMessage('write')
                    return res.json(message)
                }
            
            } catch(err) {
                console.log("Failed to save new User ==> ", err);
                let message = await MessageHelper.FailedMessage('write')
                return res.json(message)
            }
        }

        if (name !== username) {
            console.log("사용자와 데이터베이스의 이름이 다릅니다. 정확한 정보를 입력해주세요.")
            let data = await MessageHelper.FailedMessage("write", "사용자와 데이터베이스의 이름이 다릅니다. 정확한 정보를 입력해주세요.")
            return res.json(data);
        }

        try {
            let result = await BuildingHelper.SaveVisitingData(reference_num, building_id, visiting_dept);
            if (result === true) {
                let message = MessageHelper.SuccessMessage('write')
                return res.json(message)
            } else {
                let message = MessageHelper.FailedMessage('write')
                return res.json(message)
            }
        } catch(err) {
            console.log("Error while saving new Building Data ==> ", err);
            let message = MessageHelper.FailedMessage('write')
            return res.json(message)
        }
    }
} 