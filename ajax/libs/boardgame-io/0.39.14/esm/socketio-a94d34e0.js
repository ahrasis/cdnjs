import { s as sync, H as update, r as reset } from './turn-order-d7fe23d9.js';
import { S as Sync } from './base-c99f5be2.js';
import { M as Master } from './master-0cb45fdb.js';
import io from 'socket.io-client';

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * InMemory data storage.
 */
class InMemory extends Sync {
    /**
     * Creates a new InMemory storage.
     */
    constructor() {
        super();
        this.state = new Map();
        this.initial = new Map();
        this.metadata = new Map();
        this.log = new Map();
    }
    /**
     * Create a new game.
     */
    createGame(gameID, opts) {
        this.initial.set(gameID, opts.initialState);
        this.setState(gameID, opts.initialState);
        this.setMetadata(gameID, opts.metadata);
    }
    /**
     * Write the game metadata to the in-memory object.
     */
    setMetadata(gameID, metadata) {
        this.metadata.set(gameID, metadata);
    }
    /**
     * Write the game state to the in-memory object.
     */
    setState(gameID, state, deltalog) {
        if (deltalog && deltalog.length > 0) {
            const log = this.log.get(gameID) || [];
            this.log.set(gameID, log.concat(deltalog));
        }
        this.state.set(gameID, state);
    }
    /**
     * Fetches state for a particular gameID.
     */
    fetch(gameID, opts) {
        let result = {};
        if (opts.state) {
            result.state = this.state.get(gameID);
        }
        if (opts.metadata) {
            result.metadata = this.metadata.get(gameID);
        }
        if (opts.log) {
            result.log = this.log.get(gameID) || [];
        }
        if (opts.initialState) {
            result.initialState = this.initial.get(gameID);
        }
        return result;
    }
    /**
     * Remove the game state from the in-memory object.
     */
    wipe(gameID) {
        this.state.delete(gameID);
        this.metadata.delete(gameID);
    }
    /**
     * Return all keys.
     */
    listGames(opts) {
        if (opts && opts.gameName !== undefined) {
            let gameIDs = [];
            this.metadata.forEach((metadata, gameID) => {
                if (metadata.gameName === opts.gameName) {
                    gameIDs.push(gameID);
                }
            });
            return gameIDs;
        }
        return [...this.metadata.keys()];
    }
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class Transport {
    constructor({ store, gameName, playerID, gameID, numPlayers, }) {
        this.store = store;
        this.gameName = gameName || 'default';
        this.playerID = playerID || null;
        this.gameID = gameID || 'default';
        this.numPlayers = numPlayers || 2;
    }
}

/*
 * Copyright 2018 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * Returns null if it is not a bot's turn.
 * Otherwise, returns a playerID of a bot that may play now.
 */
function GetBotPlayer(state, bots) {
    if (state.ctx.gameover !== undefined) {
        return null;
    }
    if (state.ctx.activePlayers) {
        for (const key of Object.keys(bots)) {
            if (key in state.ctx.activePlayers) {
                return key;
            }
        }
    }
    else if (state.ctx.currentPlayer in bots) {
        return state.ctx.currentPlayer;
    }
    return null;
}
/**
 * Creates a local version of the master that the client
 * can interact with.
 */
class LocalMaster extends Master {
    constructor({ game, bots }) {
        const clientCallbacks = {};
        const initializedBots = {};
        if (game && game.ai && bots) {
            for (const playerID in bots) {
                const bot = bots[playerID];
                initializedBots[playerID] = new bot({
                    game,
                    enumerate: game.ai.enumerate,
                    seed: game.seed,
                });
            }
        }
        const send = ({ playerID, type, args }) => {
            const callback = clientCallbacks[playerID];
            if (callback !== undefined) {
                callback.apply(null, [type, ...args]);
            }
        };
        const transportAPI = {
            send,
            sendAll: makePlayerData => {
                for (const playerID in clientCallbacks) {
                    const data = makePlayerData(playerID);
                    send({ playerID, ...data });
                }
            },
        };
        super(game, new InMemory(), transportAPI, false);
        this.connect = (gameID, playerID, callback) => {
            clientCallbacks[playerID] = callback;
        };
        this.subscribe(({ state, gameID }) => {
            if (!bots) {
                return;
            }
            const botPlayer = GetBotPlayer(state, initializedBots);
            if (botPlayer !== null) {
                setTimeout(async () => {
                    const botAction = await initializedBots[botPlayer].play(state, botPlayer);
                    await this.onUpdate(botAction.action, state._stateID, gameID, botAction.action.payload.playerID);
                }, 100);
            }
        });
    }
}
/**
 * Local
 *
 * Transport interface that embeds a GameMaster within it
 * that you can connect multiple clients to.
 */
class LocalTransport extends Transport {
    /**
     * Creates a new Mutiplayer instance.
     * @param {string} gameID - The game ID to connect to.
     * @param {string} playerID - The player ID associated with this client.
     * @param {string} gameName - The game type (the `name` field in `Game`).
     * @param {string} numPlayers - The number of players.
     */
    constructor({ master, store, gameID, playerID, gameName, numPlayers, }) {
        super({ store, gameName, playerID, gameID, numPlayers });
        this.master = master;
        this.isConnected = true;
    }
    /**
     * Called when another player makes a move and the
     * master broadcasts the update to other clients (including
     * this one).
     */
    async onUpdate(gameID, state, deltalog) {
        const currentState = this.store.getState();
        if (gameID == this.gameID && state._stateID >= currentState._stateID) {
            const action = update(state, deltalog);
            this.store.dispatch(action);
        }
    }
    /**
     * Called when the client first connects to the master
     * and requests the current game state.
     */
    onSync(gameID, syncInfo) {
        if (gameID == this.gameID) {
            const action = sync(syncInfo);
            this.store.dispatch(action);
        }
    }
    /**
     * Called when an action that has to be relayed to the
     * game master is made.
     */
    onAction(state, action) {
        this.master.onUpdate(action, state._stateID, this.gameID, this.playerID);
    }
    /**
     * Connect to the master.
     */
    connect() {
        this.master.connect(this.gameID, this.playerID, (type, ...args) => {
            if (type == 'sync') {
                this.onSync.apply(this, args);
            }
            if (type == 'update') {
                this.onUpdate.apply(this, args);
            }
        });
        this.master.onSync(this.gameID, this.playerID, this.numPlayers);
    }
    /**
     * Disconnect from the master.
     */
    disconnect() { }
    /**
     * Subscribe to connection state changes.
     */
    subscribe() { }
    subscribeGameMetadata() { }
    /**
     * Updates the game id.
     * @param {string} id - The new game id.
     */
    updateGameID(id) {
        this.gameID = id;
        const action = reset(null);
        this.store.dispatch(action);
        this.connect();
    }
    /**
     * Updates the player associated with this client.
     * @param {string} id - The new player id.
     */
    updatePlayerID(id) {
        this.playerID = id;
        const action = reset(null);
        this.store.dispatch(action);
        this.connect();
    }
}
const localMasters = new Map();
function Local(opts) {
    return (transportOpts) => {
        let master;
        if (localMasters.has(transportOpts.gameKey) && !opts) {
            master = localMasters.get(transportOpts.gameKey);
        }
        else {
            master = new LocalMaster({
                game: transportOpts.game,
                bots: opts && opts.bots,
            });
            localMasters.set(transportOpts.gameKey, master);
        }
        return new LocalTransport({ master, ...transportOpts });
    };
}

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * SocketIO
 *
 * Transport interface that interacts with the Master via socket.io.
 */
class SocketIOTransport extends Transport {
    /**
     * Creates a new Mutiplayer instance.
     * @param {object} socket - Override for unit tests.
     * @param {object} socketOpts - Options to pass to socket.io.
     * @param {string} gameID - The game ID to connect to.
     * @param {string} playerID - The player ID associated with this client.
     * @param {string} gameName - The game type (the `name` field in `Game`).
     * @param {string} numPlayers - The number of players.
     * @param {string} server - The game server in the form of 'hostname:port'. Defaults to the server serving the client if not provided.
     */
    constructor({ socket, socketOpts, store, gameID, playerID, gameName, numPlayers, server, } = {}) {
        super({ store, gameName, playerID, gameID, numPlayers });
        this.server = server;
        this.socket = socket;
        this.socketOpts = socketOpts;
        this.isConnected = false;
        this.callback = () => { };
        this.gameMetadataCallback = () => { };
    }
    /**
     * Called when an action that has to be relayed to the
     * game master is made.
     */
    onAction(state, action) {
        this.socket.emit('update', action, state._stateID, this.gameID, this.playerID);
    }
    /**
     * Connect to the server.
     */
    connect() {
        if (!this.socket) {
            if (this.server) {
                let server = this.server;
                if (server.search(/^https?:\/\//) == -1) {
                    server = 'http://' + this.server;
                }
                if (server.substr(-1) != '/') {
                    // add trailing slash if not already present
                    server = server + '/';
                }
                this.socket = io(server + this.gameName, this.socketOpts);
            }
            else {
                this.socket = io('/' + this.gameName, this.socketOpts);
            }
        }
        // Called when another player makes a move and the
        // master broadcasts the update to other clients (including
        // this one).
        this.socket.on('update', (gameID, state, deltalog) => {
            const currentState = this.store.getState();
            if (gameID == this.gameID && state._stateID >= currentState._stateID) {
                const action = update(state, deltalog);
                this.store.dispatch(action);
            }
        });
        // Called when the client first connects to the master
        // and requests the current game state.
        this.socket.on('sync', (gameID, syncInfo) => {
            if (gameID == this.gameID) {
                const action = sync(syncInfo);
                this.gameMetadataCallback(syncInfo.filteredMetadata);
                this.store.dispatch(action);
            }
        });
        // Keep track of connection status.
        this.socket.on('connect', () => {
            // Initial sync to get game state.
            this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);
            this.isConnected = true;
            this.callback();
        });
        this.socket.on('disconnect', () => {
            this.isConnected = false;
            this.callback();
        });
    }
    /**
     * Disconnect from the server.
     */
    disconnect() {
        this.socket.close();
        this.socket = null;
        this.isConnected = false;
        this.callback();
    }
    /**
     * Subscribe to connection state changes.
     */
    subscribe(fn) {
        this.callback = fn;
    }
    subscribeGameMetadata(fn) {
        this.gameMetadataCallback = fn;
    }
    /**
     * Updates the game id.
     * @param {string} id - The new game id.
     */
    updateGameID(id) {
        this.gameID = id;
        const action = reset(null);
        this.store.dispatch(action);
        if (this.socket) {
            this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);
        }
    }
    /**
     * Updates the player associated with this client.
     * @param {string} id - The new player id.
     */
    updatePlayerID(id) {
        this.playerID = id;
        const action = reset(null);
        this.store.dispatch(action);
        if (this.socket) {
            this.socket.emit('sync', this.gameID, this.playerID, this.numPlayers);
        }
    }
}
function SocketIO({ server, socketOpts } = {}) {
    return (transportOpts) => new SocketIOTransport({
        server,
        socketOpts,
        ...transportOpts,
    });
}

export { Local as L, SocketIO as S };
