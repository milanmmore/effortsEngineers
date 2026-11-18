const XLSX = require("xlsx");
const backlog = require("./s1_backlog.js");
const endpoints = require("./s2_endpoints.js");
const schema = require("./s3_schema.js");
const { routes, roles, portal, rfq, railway } = require("./s4_s8.js");

const wb = XLSX.utils.book_new();

function addSheet(name, data) {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const range = XLSX.utils.decode_range(ws["!ref"]);
  ws["!cols"] = Array.from({ length: range.e.c + 1 }, (_, ci) => {
    let max = 10;
    for (let r = 0; r <= range.e.r; r++) {
      const cell = ws[XLSX.utils.encode_cell({ r, c: ci })];
      if (cell && cell.v) max = Math.min(80, Math.max(max, String(cell.v).length + 2));
    }
    return { wch: max };
  });
  XLSX.utils.book_append_sheet(wb, ws, name);
}

addSheet("1_Product_Backlog", backlog);
addSheet("2_API_Endpoints", endpoints);
addSheet("3_DB_Schema", schema);
addSheet("4_Route_List", routes);
addSheet("5_User_Roles", roles);
addSheet("6_Portal_Functionality", portal);
addSheet("7_RFQ_Workflow", rfq);
addSheet("8_Railway_Deployment", railway);

XLSX.writeFile(wb, "docs/EffortsEngineers_Platform_Workbook.xlsx");
console.log("Done: docs/EffortsEngineers_Platform_Workbook.xlsx");
