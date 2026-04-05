import fs from 'fs';
import path from 'path';

const appPath = path.join(process.cwd(), 'src', 'App.tsx');
let app = fs.readFileSync(appPath, 'utf8');

app = app.replace(
    "socket.emit('authenticate', data.token);",
    "socket.once('connect', () => socket.emit('authenticate', data.token));"
);

fs.writeFileSync(appPath, app);
console.log('✅ Fixed post-login socket.emit timing in App.tsx');
