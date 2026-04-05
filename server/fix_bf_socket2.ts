import fs from 'fs';
import path from 'path';

const bfPath = path.join(process.cwd(), 'src', 'components', 'BattleField.tsx');
let bf = fs.readFileSync(bfPath, 'utf8');

// Normalize line endings
bf = bf.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Find and replace the joinGame useEffect
const oldBlock = `  useEffect(() => {
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

const newBlock = `  useEffect(() => {
    if (!gameId) return;

    const joinAndListen = () => {
      console.log('[BattleField] Joining game:', gameId);
      socket.emit('joinGame', gameId);
      socket.on('gameStateUpdate', (newState: any) => { setGame(newState); });
    };

    // Ensure socket is connected and authenticated before joining
    if (!socket.connected) {
      const token = localStorage.getItem('token');
      socket.connect();
      socket.once('connect', () => {
        console.log('[BattleField] Socket connected, authenticating...');
        if (token) {
          socket.emit('authenticate', token);
        }
      });
      socket.once('authenticated', () => {
        console.log('[BattleField] Authenticated, joining game...');
        joinAndListen();
      });
    } else {
      joinAndListen();
    }

    return () => {
      socket.off('gameStateUpdate');
      socket.off('authenticated');
    };
  }, [gameId]);`;

if (bf.includes(oldBlock)) {
    bf = bf.replace(oldBlock, newBlock);
    fs.writeFileSync(bfPath, bf);
    console.log('✅ Fixed BattleField socket connection race condition');
} else {
    console.log('❌ Could not find the exact block, trying lenient match...');
    // Try finding by key signature
    const sig = "socket.emit('joinGame', gameId)";
    if (bf.includes(sig)) {
        const startIdx = bf.lastIndexOf('useEffect(() => {', bf.indexOf(sig));
        const endSearchFrom = bf.indexOf(sig);
        const endIdx = bf.indexOf('}, [gameId]);', endSearchFrom);
        if (startIdx !== -1 && endIdx !== -1) {
            const lineStart = bf.lastIndexOf('\n', startIdx);
            const fullEnd = endIdx + '}, [gameId]);'.length;
            const oldSection = bf.substring(lineStart + 1, fullEnd);
            bf = bf.replace(oldSection, newBlock);
            fs.writeFileSync(bfPath, bf);
            console.log('✅ Fixed BattleField (lenient match)');
        } else {
            console.log('❌ Failed to find boundaries');
        }
    }
}
