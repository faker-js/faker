import { mergeArrays } from '../../../internal/merge';

// https://happykorat.com/info-of-korat-english-version/54-happykorat-articles/history-korat-nakhonaratchasima/1986-korat-surname.html
const common_isan_prefix = [
  'เทิบ',
  'หนอก',
  'วงศ์',
  'เกิด',
  'เจียว',
  'เกตุ',
  'งาม',
  'บาง',
  'มณี',
  'แข',
];
const common_isan_suffix = [
  'จันทึก',
  'กระโทก',
  'ค้างพลู',
  'สีสุก',
  'พิมาย',
  'นอก',
];
const isan_complete = common_isan_prefix
  .map((prefix) => common_isan_suffix.map((suffix) => `${prefix}${suffix}`))
  .flat();

// https://www.thairath.co.th/lifestyle/culture/2030525
const chinese = [
  'ลิ้ม',
  'ตั้ง',
  'อึ๊ง',
  'โง้ว',
  'อู๋',
  'หวง',
  'หลี่',
  'เฉิน',
  'เจิ้ง',
  'หลิน',
].map((suffix) => `แซ่${suffix}`);

// https://www.sanook.com/men/15709/
const thai = [
  'บุนนาค',
  'ณ บางช้าง',
  'วัชโรทัย',
  'สุจริตกุล',
  'ณ ป้อมเพชร',
  'โรจนกุล',
  'อมาตยกุล',
  'ณ นคร',
  'บุรณศิริ',
  'นรินทรางกูร',
  'เทพหัสดิน',
  'มนตรีกุล',
  'อิศรางกูร',
  'เจษฎางกูร',
  'นาคสวัสดิ์',
  'นรินทรกุล',
  'ชุมพล',
  'ชาญโลหะ',
  'ปราบพล',
  'วงศา',
  'กีรติวัฒนานุศาสน์',
  'ฮะมงคล',
  'หิรัญ',
  'หยูด้วง',
  'รอดแก้ว',
  'เพื่อนรักษ์',
  'สมตระกูล',
  'อินทโชติ',
  'อริยวงสกุล',
  'จันทรโชติ',
  'พลจรัส',
  'มธุรส',
  'สมศักดิ์',
  'จินดาพล',
  'ดำใส',
  'สมุทบาล',
  'วารีศรี',
  'จันทโชติ',
  'ศิริกุล',
  'ธรรมเสน',
  'สืบกระพันธ์',
];

// https://sites.google.com/site/thailandsurname/home

export default mergeArrays(thai, isan_complete, chinese);
