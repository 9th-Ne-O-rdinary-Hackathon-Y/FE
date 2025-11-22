import fs from "fs";

const RAW_JSON = process.env.VERCEL_CONFIG_JSON;

if (!RAW_JSON) {
  console.error("❌ ERROR: 환경변수 VERCEL_CONFIG_JSON 이 설정되지 않았습니다.");
  process.exit(1);
}

let parsed;

try {
  // JSON 파싱 시도
  parsed = JSON.parse(RAW_JSON);
} catch (err) {
  console.error("❌ 직렬화된 JSON 파싱 실패");
  console.error("환경변수 내용:", RAW_JSON);
  console.error(err);
  process.exit(1);
}

try {
  fs.writeFileSync("vercel.json", JSON.stringify(parsed, null, 2), "utf-8");

  console.log("✅ vercel.json 생성 완료!");
} catch (err) {
  console.error("❌ vercel.json 생성 실패");
  console.error(err);
  process.exit(1);
}
