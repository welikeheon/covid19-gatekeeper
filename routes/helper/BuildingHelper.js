const pool = require('../../config/db')
const MessageHelper = require('./MessageHelper')

module.exports = {
    SaveNewBuilding: async (building_id, building_name) => {
        try {
            let save = await pool.query("insert into building (building_id, building_name) values (?,?)", [building_id, building_name]);
            return true;
        } catch(err) {
            console.log("Failed to store new building information ==> ", err);
            return false;
        }
    },
    // GetBuildingID: async( building_name ) => {
    //     try {
    //         let [building] = await pool.query("select `id` from building where building_name = ?", [building_name]);
    //         return building[0].id
    //     } catch(err) {
    //         console.log("Failed to get Building ID from building Number. ", e)
    //         return false
    //     }
    // },
    SaveVisitingData: async (ref_number, building_id, visiting_dept) => {
        try {
            let save = await pool.query("insert into visited_log (reference_number, building_id, visiting_dept) values (?, ?, ?)", [ref_number, building_id, visiting_dept]);
            return true;
        } catch(err) {
            console.log("Failed to store new Visitor Information ==> ", err);
            return false;
        }
    }
}