export interface MatchItem {
  id?: number;
  x: number;
  y: number;
  turn: string;
  color: string;
  gameId: string;
}

export interface GameItem {
  gameId: string;
  winner: string;
}

class StorageService {
  private dbName: string;
  private version: number;
  private db: IDBDatabase | null = null;
  private tableName: string;
  private gameTableName: string;

  constructor(
    dbName: string = "tictactoe",
    version: number = 1,
    tableName = "steps",
    gameTableName = "games"
  ) {
    this.dbName = dbName;
    this.version = version;
    this.db = null;
    this.tableName = tableName;
    this.gameTableName = gameTableName;
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
          db.createObjectStore(this.tableName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }

        if (!db.objectStoreNames.contains(this.gameTableName)) {
          db.createObjectStore(this.gameTableName, {
            keyPath: "gameId",
          });
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

  async addMatch(matches: MatchItem[]) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database is not initialized");

      const transaction = this.db.transaction([this.tableName], "readwrite");
      const store = transaction.objectStore(this.tableName);

      matches.forEach((match: MatchItem) => {
        const request = store.add(match);
        request.onerror = () =>
          console.error(`Error adding user: ${match.gameId}`);
      });

      transaction.oncomplete = () => resolve("All Steps added successfully");
      transaction.onerror = () => reject("Error adding steps");
    });
  }

  async addGame(game: GameItem) {
    return new Promise((resolve, reject) => {
      if (!this.db) return reject("Database is not initialized");

      const transaction = this.db.transaction(
        [this.gameTableName],
        "readwrite"
      );
      const store = transaction.objectStore(this.gameTableName);

      const request = store.add(game);

      request.onsuccess = () => resolve("Game added successfully");
      request.onerror = () => reject("Error adding steps");
    });
  }
}

export const db = new StorageService("tictactoe", 1, "steps", "games");
