# 果果照護日誌

這是手機點選式的失智症照護紀錄 App。每位長輩都用水果代號，不輸入姓名，適合照護者每天快速記錄心情、行為、黃昏症候群、譫妄警訊、身體狀況與安撫方式。

線上網址：

https://kerwinkuo.github.io/nursing-journal/

Google 試算表：

https://docs.google.com/spreadsheets/d/10pgcUnrD_TFzz0qu2UkHDfBZedoMT8LN67CpJW5S1dk/edit

## App 使用方式

1. 用手機打開線上網址。
2. 選水果個案，例如蘋果01、香蕉02。
3. 點選今天狀況。
4. 按「儲存今天」。
5. 需要給醫師或家屬看時，按「匯出 CSV」。

## Google 試算表同步設定

只需要設定一次。

1. 打開上面的 Google 試算表。
2. 點「擴充功能」。
3. 點「Apps Script」。
4. 把 `google_apps_script.gs` 的內容全部貼進去。
5. 按儲存。
6. 點「部署」。
7. 選「新增部署作業」。
8. 類型選「網路應用程式」。
9. 執行身分選「我」。
10. 存取權選「任何人」。
11. 部署後複製「網路應用程式網址」。
12. 回到 App，打開「Google 試算表同步」，貼上網址並按「儲存網址」。

之後按「儲存今天」時，App 會先存手機本機；如果已設定同步網址，也會送到 Google 試算表。網路不好時可以之後按「補送未同步」。

## 匿名規則

- 不輸入姓名。
- 不輸入生日、身分證、電話、地址。
- 只用水果代號，例如蘋果01、香蕉02、芒果06。
- 若要自己對照真實姓名，請另外保存在安全地方，不要放進這個 App 或公開試算表。

## 檔案

- `index.html`：手機 App 主程式。
- `manifest.webmanifest`：加入手機主畫面的設定。
- `sw.js`：基本離線快取。
- `icon.svg`：App 圖示。
- `google_apps_script.gs`：貼到 Google Apps Script 的同步程式。
