"use strict";
// File: .github/scripts/tsv-to-json.ts
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var https_1 = require("https");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var url = process.env.TSV_URL;
if (!url) {
    console.error('TSV_URL environment variable is not set.');
    process.exit(1);
}
https_1.default.get(url, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk.toString();
    });
    res.on('end', function () {
        var lines = data.trim().split('\n');
        var headers = lines[0].split('\t');
        var json = lines.slice(1).map(function (line) {
            var values = line.split('\t');
            var obj = {};
            headers.forEach(function (h, i) {
                var _a, _b;
                obj[h.trim()] = (_b = (_a = values[i]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
            });
            return obj;
        });
        var outDir = path_1.default.join(process.cwd(), 'public', 'data');
        if (!fs_1.default.existsSync(outDir)) {
            fs_1.default.mkdirSync(outDir, { recursive: true });
        }
        fs_1.default.writeFileSync(path_1.default.join(outDir, 'sheet-data.json'), JSON.stringify(json, null, 2));
        console.log('Converted TSV to JSON successfully!');
    });
}).on('error', function (err) {
    console.error('Error fetching TSV:', err);
});
