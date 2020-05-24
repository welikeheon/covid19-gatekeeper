var express = require('express');
var router = express.Router();
const UserHandler = require('./functions/User/handler');
const BuildingHandler = require('./functions/Building/handler');
/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
    title: "홈"
  }
  res.render('index', data);
});

// 새로운 방문자 저장
router.post("/visitor/new", BuildingHandler.SaveVisitor)

// 새로운 건물 정보 저장
router.post("/helper/building/save", BuildingHandler.SaveNewBuilding);

// 학번으로 등록되어있는지 조회
router.post('/helper/check/reference', UserHandler.CheckReference);

// 새로운 사용자 등록
router.post('/helper/register', UserHandler.GenerateNewUser);

module.exports = router;
