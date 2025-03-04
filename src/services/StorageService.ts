export interface GameItem {
  id?: number;
  x: number;
  y: number;
  turn: string;
  color: string;
  gameId: string;
}

class StorageService {

  private dbName: string;
  private version: number;
  private db: IDBDatabase | null = null;
  private tableName: string;

  constructor(
    dbName: string = "tictactoe",
    version: number = 1,
    tableName = "games"
  ) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.tableName = tableName;
  }

  async init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(
        this.dbName,
        this.version
      );

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.tableName)) {
          const objectStore = db.createObjectStore(this.tableName, {
            keyPath: "id",
            autoIncrement: true,
          });
          objectStore.createIndex("x", "x", { unique: false });
          objectStore.createIndex("y", "y", { unique: false });
          objectStore.createIndex("turn", "turn", { unique: false });
          objectStore.createIndex("color", "color", { unique: false });
          objectStore.createIndex("gameId", "gameId", { unique: false });
        }
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (event: Event) =>
        reject(
          "Database error: " + (event.target as IDBOpenDBRequest).error?.message
        );
    });
  }

  async addMatch(games: GameItem[]) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database is not initialized");

      const transaction = this.db.transaction([this.tableName], "readwrite");
      const store = transaction.objectStore(this.tableName);

      games.forEach((game: GameItem) => {
        const request = store.add(game);
        request.onerror = () =>
          console.error(`Error adding user: ${game.gameId}`);
      });

      transaction.oncomplete = () => resolve("All Steps added successfully");
      transaction.onerror = () => reject("Error adding steps");
    });
  }
}

export const db = new StorageService('tictactoe',1,'games');
