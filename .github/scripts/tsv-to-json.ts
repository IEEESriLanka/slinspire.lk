// File: .github/scripts/tsv-to-json.ts

import fs from 'fs';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.TSV_URL;

if (!url) {
    console.error('TSV_URL environment variable is not set.');
    process.exit(1);
}

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk: Buffer) => {
        data += chunk.toString();
    });

    res.on('end', () => {
        const lines = data.trim().split('\n');
        const headers = lines[0].split('\t');

        const json = lines.slice(1).map((line) => {
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

        fs.writeFileSync(
            path.join(outDir, 'sheet-data.json'),
            JSON.stringify(json, null, 2)
        );

        console.log('Converted TSV to JSON successfully!');
    });
}).on('error', (err) => {
    console.error('Error fetching TSV:', err);
});
