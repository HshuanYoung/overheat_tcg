import fs from 'fs';
import path from 'path';

const bfPath = path.join(process.cwd(), 'src', 'components', 'BattleField.tsx');
let bf = fs.readFileSync(bfPath, 'utf8');

// Find and replace the joinGame useEffect block
const oldBlock = `  useEffect(() => {
    if (!gameId) return;
    socket.emit('joinGame', gameId);
socket.on('gameStateUpdate', (newState) => { setGame(newState); });
return () => { socket.off('gameStateUpdate'); };
  }, [gameId]);`;

const newBlock = `  useEffect(() => {
    if (!gameId) return;

    const joinAndListen = () => {
      socket.emit('joinGame', gameId);
      socket.on('gameStateUpdate', (newState: any) => { setGame(newState); });
    };

    // Ensure socket is connected and authenticated before joining
    if (!socket.connected) {
      const token = localStorage.getItem('token');
      socket.connect();
      if (token) {
        socket.emit('authenticate', token);
      }
      // Wait for authentication before joining
      socket.once('authenticated', joinAndListen);
    } else {
      joinAndListen();
    }

    return () => {
      socket.off('gameStateUpdate');
      socket.off('authenticated', joinAndListen);
    };
  }, [gameId]);`;

// Normalize line endings for matching
const normalizedBf = bf.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const normalizedOld = oldBlock.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

if (normalizedBf.includes(normalizedOld)) {
    bf = normalizedBf.replace(normalizedOld, newBlock);
    fs.writeFileSync(bfPath, bf);
    console.log('✅ BattleField joinGame useEffect fixed');
} else {
    console.log('❌ Could not find the target block. Searching...');
    // Try a more lenient search
    const idx = normalizedBf.indexOf("socket.emit('joinGame', gameId);");
    if (idx !== -1) {
        console.log('Found joinGame at index', idx);
        // Find the useEffect start before it
        const beforeJoin = normalizedBf.lastIndexOf('useEffect(() => {', idx);
        // Find the closing of this useEffect
        const afterJoin = normalizedBf.indexOf('}, [gameId]);', idx);
        if (beforeJoin !== -1 && afterJoin !== -1) {
            const endIdx = afterJoin + '}, [gameId]);'.length;
            const startSearch = normalizedBf.lastIndexOf('\n', beforeJoin);
            const fullOld = normalizedBf.substring(startSearch + 1, endIdx);
            console.log('Replacing block:\n---\n' + fullOld + '\n---');
            bf = normalizedBf.replace(fullOld, newBlock);
            fs.writeFileSync(bfPath, bf);
            console.log('✅ BattleField joinGame useEffect fixed (lenient match)');
        }
    }
}
