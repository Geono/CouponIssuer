var express = require("express");
var router = express.Router();
var couponService = require("../service/couponService");

/* GET home page. */
router.get("/list/:page", async function (req, res, next) {
  console.log("req.query: ", req.query);
  const pageSize = !!req.query.pageSize ? req.query.pageSize : 10;
  const coupons = await couponService.getCoupons(
    null,
    req.params.page,
    pageSize
  );
  return res.json({
    payload: coupons,
  });
});

router.get("/:id/list/:page", async function (req, res, next) {
  const pageSize = !!req.query.pageSize ? req.query.pageSize : 10;
  const coupons = await couponService.getCoupons(
    req.params.id,
    req.params.page,
    pageSize
  );
  return res.json({
    payload: coupons,
  });
});

router.post("/", function (req, res, next) {
  const { couponTypeId, issueCount } = req.body;
  if (issueCount > 100000) {
    res.status(400).send("Issue count is too high (<= 100000)");
  }
  if (req.body.couponTypeId) {
    return couponService
      .issueCoupon(couponTypeId, issueCount)
      .then(() => res.json({ message: `success` }))
      .catch((e) => console.log("Issue error occured: ", e));
  } else {
    res.status(400).send("No coupon_type_id given");
    return next("No coupon_type_id given");
  }
});

router.get("/names", async function (req, res, next) {
  const listNames = await couponService.listNames();
  return res.json({
    payload: listNames,
  });
});

router.post("/name", async function (req, res, next) {
  const name = req.body.name;
  if (name) {
    await couponService.addName(name);
  } else {
    res.status(400).send("No name given");
    return next("No name given");
  }
});

module.exports = router;
