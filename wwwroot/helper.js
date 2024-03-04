// helper.js

// igRegisterScript については、下記ナレッジベースを参照してください。
// https://kb.jp.infragistics.com/?p=12487

igRegisterScript("formatDateInRowExporting", () => {

    // グリッドの行エクスポートイベントを購読するオブジェクトです。
    const formatDateCells = {
        // 1行エクスポートするごとに next メソッドが呼び出されます。
        next: (context) => {

            // 引数から、エクスポートする行データが参照できるので、
            const rowData = context.rowData;

            // このサンプルでは、行データ内の日付型のプロパティをすべて
            // 巡回し、"yyyy/MM/dd" 形式の文字列に差し替えます。
            Object.keys(rowData).forEach(key => {
                const cellValue = rowData[key];
                if (!cellValue instanceof Date) return;

                rowData[key] = cellValue.toLocaleString("ja-JP", {
                    year: "numeric", month: "2-digit", day: "2-digit"
                });
            });
        }
    };

    // グリッドがエクスポート処理を実行するときに呼び出されます
    return (e) => {

        // エクスポートするファイルがCSVファイルである場合、
        const { options, exporter } = e.detail;
        const isCSVfile = options.fileName.endsWith(".csv");
        if (!isCSVfile) return;

        // かつ、イベント未購読の場合に、
        const observers = exporter.rowExporting.observers;
        if (observers.find(o => o === formatDateCells)) return;

        // エクスポート機能の行エクスポートイベントに、
        // 先に定義した購読オブジェクトを追加します。
        observers.push(formatDateCells);
    };

}, true);