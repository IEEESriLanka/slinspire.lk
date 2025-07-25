// File: .github/scripts/tsv-to-json.ts

import * as fs from 'fs';
import * as path from 'path';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.TSV_URL;

if (!url) {
    console.error('TSV_URL environment variable is not set.');
    process.exit(1);
}

(async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch TSV. Status: ${response.status}`);
        }

        const data = await response.text();
        const lines = data.trim().split('\n');
        const headers = lines[0].split('\t');

        const json = lines.slice(2).map((line) => {
            const values = line.split('\t');
            const obj: Record<string, string> = {};
            headers.forEach((h, i) => {
                obj[h.trim()] = values[i]?.trim() ?? '';
            });
            return obj;
        });

        const outDir = path.join(process.cwd(), 'public', 'data');
        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir, { recursive: true });
        }

        const outputPath = path.join(outDir, 'sheet-data.json');
        fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));

        console.log(`Converted TSV to JSON successfully! File saved at: ${outputPath}`);
    } catch (error) {
        console.error('Error fetching or converting TSV:', error);
        process.exit(1);
    }
})();
