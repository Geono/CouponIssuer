var db = require("../db");

function listNames() {
  return db.query("SELECT ID, NAME FROM COUPON_TYPE").then((res) => {
    return res.rows;
  });
}

function addName(name) {
  return db
    .query("INSERT INTO COUPON_TYPE(NAME) VALUES($1)", [name])
    .then((res) => {
      console.log("res: ", res);
      return;
    });
}

function countCoupons(id) {
  const query = !!id
    ? `SELECT COUNT(*) FROM COUPON WHERE coupon_type_id = ${id}`
    : `SELECT COUNT(*) FROM COUPON`;
  return db.query(query).then((res) => {
    return res.rows.map((row) => row.count)[0];
  });
}

function getCoupons(id, page, pageSize) {
  const query = !!id
    ? `SELECT ID, COUPON_TYPE_ID FROM COUPON WHERE COUPON_TYPE_ID = ${id} LIMIT ${pageSize} OFFSET ${page}`
    : `SELECT ID, COUPON_TYPE_ID FROM COUPON LIMIT ${pageSize} OFFSET ${page}`;
  return db.queryAsync(query).then((queryResult) => {
    console.log("queryResult.rows: ", queryResult.rows);
    const result = [];
    queryResult.rows.forEach((row) => {
      console.log("row: ", row);
      result.push({
        couponTypeId: row.coupon_type_id,
        id: row.id,
      });
    });
    console.log("result: ", result);
    return result;
  });
}

async function issueCoupon(couponTypeId, issueCount) {
  console.log("couponTypeId: ", couponTypeId);
  console.log("issueCount: ", issueCount);
  const query = `INSERT INTO coupon(coupon_type_id) VALUES(${couponTypeId})`;
  console.log(query);
  for (let i = 0; i < issueCount; i++) {
    await db.queryAsync(query);
  }
}

module.exports = {
  listNames,
  addName,
  countCoupons,
  getCoupons,
  issueCoupon,
};
