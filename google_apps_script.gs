const HEADERS = [
  '同步時間',
  '日期',
  '水果代號',
  '整體',
  '心情',
  '行為',
  '黃昏症候群',
  '譫妄警訊',
  '睡眠吃喝',
  '身體排泄',
  '安撫方式',
  '效果',
  '備註',
  '本機ID'
];

function doGet() {
  ensureSheet_();
  return json_({ ok: true, message: '果果照護日誌同步服務正常' });
}

function doPost(e) {
  const sheet = ensureSheet_();
  const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  const records = Array.isArray(body.records) ? body.records : [];

  records.forEach(record => upsertRecord_(sheet, record));
  return json_({ ok: true, count: records.length });
}

function setupFruitCareSheet() {
  ensureSheet_();
}

function ensureSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('紀錄') || spreadsheet.insertSheet('紀錄');
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = headerRange.getValues()[0];
  const needsHeader = JSON.stringify(currentHeaders) !== JSON.stringify(HEADERS);

  if (needsHeader) {
    headerRange.setValues([HEADERS]);
    headerRange
      .setBackground('#ffe1eb')
      .setFontWeight('bold')
      .setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function upsertRecord_(sheet, record) {
  const rowValues = [
    new Date(),
    record.date || '',
    record.residentLabel || '',
    record.overall || '',
    record.mood || '',
    record.behavior || '',
    record.sundown || '',
    record.delirium || '',
    record.daily || '',
    record.body || '',
    record.comfort || '',
    record.effect || '',
    record.note || '',
    record.id || ''
  ];

  const rowIndex = findRowById_(sheet, record.id);
  if (rowIndex) {
    sheet.getRange(rowIndex, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }
}

function findRowById_(sheet, id) {
  if (!id) return 0;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 0;
  const ids = sheet.getRange(2, HEADERS.length, lastRow - 1, 1).getValues();
  for (let index = 0; index < ids.length; index += 1) {
    if (ids[index][0] === id) return index + 2;
  }
  return 0;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
