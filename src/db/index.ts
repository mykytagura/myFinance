import * as SQLite from 'expo-sqlite';

// ============================================
// ТИПЫ
// ============================================

export interface User {
    id: number;
    name: string;
    email?: string;
    avatar_url?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserSettings {
    theme: 'dark' | 'light';
    currency: string;
    language: string;
    notifications_enabled: boolean;
}

export interface Card {
    id?: number;
    bank_name: string;
    card_type: string;
    last_four_digits: string;
    balance: number;
    color_gradient?: string;
    is_main?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Transaction {
    id?: number;
    card_id?: number;
    category_id?: number;
    title: string;
    amount: number;
    type: 'income' | 'expense';
    description?: string;
    transaction_date: string;
    created_at?: string;
    updated_at?: string;
    // Joined fields
    category_name?: string;
    category_icon?: string;
    bank_name?: string;
    last_four_digits?: string;
}

export interface Category {
    id?: number;
    name: string;
    icon?: string;
    color_gradient?: string;
    type: 'income' | 'expense';
    is_default?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Budget {
    id?: number;
    category_id: number;
    amount: number;
    period: 'daily' | 'weekly' | 'monthly' | 'yearly';
    start_date: string;
    end_date: string;
    created_at?: string;
    updated_at?: string;
}

export interface SavingsGoal {
    id?: number;
    title: string;
    target_amount: number;
    current_amount?: number;
    deadline?: string;
    icon?: string;
    color?: string;
    is_completed?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface CategoryStats {
    id: number;
    name: string;
    icon: string;
    color_gradient: string;
    total_amount: number;
    transaction_count: number;
}

export interface IncomExpenseSummary {
    total_income: number;
    total_expense: number;
}

// ============================================
// КЛАСС БАЗЫ ДАННЫХ (SINGLETON)
// ============================================

class Database {
    private static instance: Database;
    private db: SQLite.SQLiteDatabase | null = null;
    private initialized: boolean = false;
    private userId: number = 1; // Всегда один пользователь

    private constructor() {}

    /**
     * Получает единственный экземпляр базы данных (Singleton)
     */
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    /**
     * Инициализирует базу данных и создает все таблицы
     */
    public async init(): Promise<void> {
        if (this.initialized) {
            console.log('Database already initialized');
            return;
        }

        try {
            this.db = await SQLite.openDatabaseAsync('finance_app.db');

            // Таблица пользователя (один пользователь)
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          name TEXT NOT NULL,
          email TEXT,
          avatar_url TEXT,
          phone TEXT,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `);

            // Таблица настроек пользователя
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS settings (
          id INTEGER PRIMARY KEY CHECK (id = 1),
          theme TEXT DEFAULT 'dark',
          currency TEXT DEFAULT 'UAH',
          language TEXT DEFAULT 'uk',
          notifications_enabled INTEGER DEFAULT 1,
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `);

            // Таблица банковских карт
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS cards (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          bank_name TEXT NOT NULL,
          card_type TEXT NOT NULL,
          last_four_digits TEXT NOT NULL,
          balance REAL DEFAULT 0.00,
          color_gradient TEXT,
          is_main INTEGER DEFAULT 0,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `);

            // Таблица категорий
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          icon TEXT,
          color_gradient TEXT,
          type TEXT NOT NULL,
          is_default INTEGER DEFAULT 0,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `);

            // Таблица транзакций
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          card_id INTEGER,
          category_id INTEGER,
          title TEXT NOT NULL,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          description TEXT,
          transaction_date TEXT NOT NULL,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now')),
          FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE SET NULL,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        );
      `);

            // Таблица бюджетов
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS budgets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER NOT NULL,
          amount REAL NOT NULL,
          period TEXT NOT NULL,
          start_date TEXT NOT NULL,
          end_date TEXT NOT NULL,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now')),
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
          UNIQUE(category_id, period, start_date)
        );
      `);

            // Таблица целей сбережений
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS savings_goals (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          target_amount REAL NOT NULL,
          current_amount REAL DEFAULT 0.00,
          deadline TEXT,
          icon TEXT,
          color TEXT,
          is_completed INTEGER DEFAULT 0,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `);

            // Таблица повторяющихся транзакций
            await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS recurring_transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          card_id INTEGER,
          category_id INTEGER,
          title TEXT NOT NULL,
          amount REAL NOT NULL,
          type TEXT NOT NULL,
          frequency TEXT NOT NULL,
          next_date TEXT NOT NULL,
          is_active INTEGER DEFAULT 1,
          created_at TEXT DEFAULT (datetime('now')),
          updated_at TEXT DEFAULT (datetime('now')),
          FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE SET NULL,
          FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
        );
      `);

            // Создаем индексы для оптимизации
            await this.db.execAsync('CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(transaction_date);');
            await this.db.execAsync('CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);');
            await this.db.execAsync('CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category_id);');

            // Добавляем дефолтные категории
            await this.db.execAsync(`
        INSERT OR IGNORE INTO categories (id, name, icon, color_gradient, type, is_default) VALUES
        (1, 'Еда', '🛒', 'from-orange-500 to-orange-600', 'expense', 1),
        (2, 'Транспорт', '🚌', 'from-blue-500 to-blue-600', 'expense', 1),
        (3, 'Развлечения', '🎬', 'from-purple-500 to-purple-600', 'expense', 1),
        (4, 'Здоровье', '💊', 'from-red-500 to-red-600', 'expense', 1),
        (5, 'Образование', '📚', 'from-green-500 to-green-600', 'expense', 1),
        (6, 'Покупки', '🛍️', 'from-pink-500 to-pink-600', 'expense', 1),
        (7, 'Зарплата', '💰', 'from-emerald-500 to-emerald-600', 'income', 1),
        (8, 'Фриланс', '💻', 'from-indigo-500 to-indigo-600', 'income', 1),
        (9, 'Другое', '📌', 'from-gray-400 to-gray-500', 'expense', 1);
      `);

            // Создаем дефолтные настройки если их нет
            await this.db.execAsync(`
        INSERT OR IGNORE INTO settings (id, theme, currency, language, notifications_enabled)
        VALUES (1, 'dark', 'UAH', 'uk', 1);
      `);

            this.initialized = true;
            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Error initializing database:', error);
            throw error;
        }
    }

    /**
     * Проверяет, инициализирована ли база данных
     */
    private ensureInitialized(): void {
        if (!this.initialized || !this.db) {
            throw new Error('Database not initialized. Call init() first.');
        }
    }

    // ============================================
    // ПОЛЬЗОВАТЕЛЬ И НАСТРОЙКИ
    // ============================================

    /**
     * Проверяет, существует ли пользователь
     */
    public async hasUser(): Promise<boolean> {
        this.ensureInitialized();
        const result = await this.db!.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM user');
        return (result?.count || 0) > 0;
    }

    /**
     * Создает/обновляет пользователя (первая настройка)
     */
    public async setupUser(user: Omit<User, 'id'>): Promise<void> {
        this.ensureInitialized();
        await this.db!.runAsync(
            `INSERT OR REPLACE INTO user (id, name, email, avatar_url, phone) 
       VALUES (1, ?, ?, ?, ?)`,
            [user.name, user.email || null, user.avatar_url || null, user.phone || null]
        );
    }

    /**
     * Получает данные пользователя
     */
    public async getUser(): Promise<User | null> {
        this.ensureInitialized();
        const result = await this.db!.getFirstAsync<User>('SELECT * FROM user WHERE id = 1');
        return result || null;
    }

    /**
     * Обновляет данные пользователя
     */
    public async updateUser(updates: Partial<User>): Promise<void> {
        this.ensureInitialized();
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updates);
        await this.db!.runAsync(
            `UPDATE user SET ${fields}, updated_at = datetime('now') WHERE id = 1`,
            values
        );
    }

    /**
     * Получает настройки пользователя
     */
    public async getSettings(): Promise<UserSettings> {
        this.ensureInitialized();
        const result = await this.db!.getFirstAsync<any>('SELECT * FROM settings WHERE id = 1');
        return {
            theme: result?.theme || 'dark',
            currency: result?.currency || 'UAH',
            language: result?.language || 'uk',
            notifications_enabled: result?.notifications_enabled === 1
        };
    }

    /**
     * Обновляет настройки пользователя
     */
    public async updateSettings(settings: Partial<UserSettings>): Promise<void> {
        this.ensureInitialized();
        const updates: any = {};
        if (settings.theme) updates.theme = settings.theme;
        if (settings.currency) updates.currency = settings.currency;
        if (settings.language) updates.language = settings.language;
        if (settings.notifications_enabled !== undefined) {
            updates.notifications_enabled = settings.notifications_enabled ? 1 : 0;
        }

        const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const values = Object.values(updates);

        await this.db!.runAsync(
            `UPDATE settings SET ${fields}, updated_at = datetime('now') WHERE id = 1`,
            //@ts-ignore
            values
        );
    }

    // ============================================
    // CRUD ОПЕРАЦИИ - КАРТЫ
    // ============================================

    /**
     * Добавляет новую карту
     */
    public async insertCard(card: Omit<Card, 'id'>): Promise<number> {
        this.ensureInitialized();
        const result = await this.db!.runAsync(
            `INSERT INTO cards (bank_name, card_type, last_four_digits, balance, color_gradient, is_main)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                card.bank_name,
                card.card_type,
                card.last_four_digits,
                card.balance,
                card.color_gradient || null,
                card.is_main ? 1 : 0
            ]
        );
        return result.lastInsertRowId;
    }

    /**
     * Получает все карты
     */
    public async getCards(): Promise<Card[]> {
        this.ensureInitialized();
        const cards = await this.db!.getAllAsync<any>(
            'SELECT * FROM cards ORDER BY is_main DESC, created_at DESC'
        );
        return cards.map(card => ({
            ...card,
            is_main: card.is_main === 1
        }));
    }

    /**
     * Получает карту по ID
     */
    public async getCardById(cardId: number): Promise<Card | null> {
        this.ensureInitialized();
        const result = await this.db!.getFirstAsync<any>('SELECT * FROM cards WHERE id = ?', [cardId]);
        if (!result) return null;
        return {
            ...result,
            is_main: result.is_main === 1
        };
    }

    /**
     * Обновляет карту
     */
    public async updateCard(cardId: number, updates: Partial<Card>): Promise<void> {
        this.ensureInitialized();
        const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(updates), cardId];
        await this.db!.runAsync(
            `UPDATE cards SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
            values
        );
    }

    /**
     * Удаляет карту
     */
    public async deleteCard(cardId: number): Promise<void> {
        this.ensureInitialized();
        await this.db!.runAsync('DELETE FROM cards WHERE id = ?', [cardId]);
    }

    // ============================================
    // CRUD ОПЕРАЦИИ - ТРАНЗАКЦИИ
    // ============================================

    /**
     * Добавляет новую транзакцию и автоматически обновляет баланс карты
     */
    public async insertTransaction(transaction: Omit<Transaction, 'id'>): Promise<number> {
        this.ensureInitialized();

        try {
            await this.db!.execAsync('BEGIN TRANSACTION');

            const result = await this.db!.runAsync(
                `INSERT INTO transactions (card_id, category_id, title, amount, type, description, transaction_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    transaction.card_id || null,
                    transaction.category_id || null,
                    transaction.title,
                    transaction.amount,
                    transaction.type,
                    transaction.description || null,
                    transaction.transaction_date
                ]
            );

            // Обновляем баланс карты, если указана
            if (transaction.card_id) {
                const balanceChange = transaction.type === 'income' ? transaction.amount : -transaction.amount;
                await this.db!.runAsync(
                    'UPDATE cards SET balance = balance + ?, updated_at = datetime("now") WHERE id = ?',
                    [balanceChange, transaction.card_id]
                );
            }

            await this.db!.execAsync('COMMIT');
            return result.lastInsertRowId;
        } catch (error) {
            await this.db!.execAsync('ROLLBACK');
            throw error;
        }
    }

    /**
     * Получает транзакции с фильтрацией
     */
    public async getTransactions(options: {
        limit?: number;
        startDate?: string;
        endDate?: string;
        type?: 'income' | 'expense';
        categoryId?: number;
    } = {}): Promise<Transaction[]> {
        this.ensureInitialized();

        let query = `
      SELECT t.*, c.name as category_name, c.icon as category_icon, 
             card.bank_name, card.last_four_digits
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN cards card ON t.card_id = card.id
      WHERE 1=1
    `;
        const params: any[] = [];

        if (options.startDate) {
            query += ' AND t.transaction_date >= ?';
            params.push(options.startDate);
        }

        if (options.endDate) {
            query += ' AND t.transaction_date <= ?';
            params.push(options.endDate);
        }

        if (options.type) {
            query += ' AND t.type = ?';
            params.push(options.type);
        }

        if (options.categoryId) {
            query += ' AND t.category_id = ?';
            params.push(options.categoryId);
        }

        query += ' ORDER BY t.transaction_date DESC, t.created_at DESC';

        if (options.limit) {
            query += ' LIMIT ?';
            params.push(options.limit);
        }

        return await this.db!.getAllAsync<Transaction>(query, params);
    }

    /**
     * Обновляет транзакцию
     */
    public async updateTransaction(transactionId: number, updates: Partial<Transaction>): Promise<void> {
        this.ensureInitialized();

        try {
            await this.db!.execAsync('BEGIN TRANSACTION');

            // Получаем старую транзакцию
            const oldTransaction = await this.db!.getFirstAsync<Transaction>(
                'SELECT * FROM transactions WHERE id = ?',
                [transactionId]
            );

            if (!oldTransaction) {
                throw new Error('Transaction not found');
            }

            // Возвращаем старый баланс
            if (oldTransaction.card_id) {
                const oldBalanceChange = oldTransaction.type === 'income' ? -oldTransaction.amount : oldTransaction.amount;
                await this.db!.runAsync(
                    'UPDATE cards SET balance = balance + ? WHERE id = ?',
                    [oldBalanceChange, oldTransaction.card_id]
                );
            }

            // Обновляем транзакцию
            const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
            const values = [...Object.values(updates), transactionId];
            await this.db!.runAsync(
                `UPDATE transactions SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
                values
            );

            // Применяем новый баланс
            const newCardId = updates.card_id !== undefined ? updates.card_id : oldTransaction.card_id;
            const newAmount = updates.amount !== undefined ? updates.amount : oldTransaction.amount;
            const newType = updates.type !== undefined ? updates.type : oldTransaction.type;

            if (newCardId) {
                const newBalanceChange = newType === 'income' ? newAmount : -newAmount;
                await this.db!.runAsync(
                    'UPDATE cards SET balance = balance + ? WHERE id = ?',
                    [newBalanceChange, newCardId]
                );
            }

            await this.db!.execAsync('COMMIT');
        } catch (error) {
            await this.db!.execAsync('ROLLBACK');
            throw error;
        }
    }

    /**
     * Удаляет транзакцию и возвращает баланс карты
     */
    public async deleteTransaction(transactionId: number): Promise<void> {
        this.ensureInitialized();

        try {
            await this.db!.execAsync('BEGIN TRANSACTION');

            const transaction = await this.db!.getFirstAsync<Transaction>(
                'SELECT card_id, amount, type FROM transactions WHERE id = ?',
                [transactionId]
            );

            await this.db!.runAsync('DELETE FROM transactions WHERE id = ?', [transactionId]);

            if (transaction && transaction.card_id) {
                const balanceChange = transaction.type === 'income' ? -transaction.amount : transaction.amount;
                await this.db!.runAsync(
                    'UPDATE cards SET balance = balance + ?, updated_at = datetime("now") WHERE id = ?',
                    [balanceChange, transaction.card_id]
                );
            }

            await this.db!.execAsync('COMMIT');
        } catch (error) {
            await this.db!.execAsync('ROLLBACK');
            throw error;
        }
    }

    // ============================================
    // CRUD ОПЕРАЦИИ - КАТЕГОРИИ
    // ============================================

    /**
     * Получает все категории
     */
    public async getCategories(type?: 'income' | 'expense'): Promise<Category[]> {
        this.ensureInitialized();

        let query = 'SELECT * FROM categories WHERE 1=1';
        const params: any[] = [];

        if (type) {
            query += ' AND type = ?';
            params.push(type);
        }

        query += ' ORDER BY is_default DESC, name ASC';

        const categories = await this.db!.getAllAsync<any>(query, params);
        return categories.map(cat => ({
            ...cat,
            is_default: cat.is_default === 1
        }));
    }

    /**
     * Создает пользовательскую категорию
     */
    public async createCategory(category: Omit<Category, 'id'>): Promise<number> {
        this.ensureInitialized();
        const result = await this.db!.runAsync(
            'INSERT INTO categories (name, icon, color_gradient, type, is_default) VALUES (?, ?, ?, ?, 0)',
            [category.name, category.icon || null, category.color_gradient || null, category.type]
        );
        return result.lastInsertRowId;
    }

    /**
     * Удаляет пользовательскую категорию
     */
    public async deleteCategory(categoryId: number): Promise<void> {
        this.ensureInitialized();
        await this.db!.runAsync('DELETE FROM categories WHERE id = ? AND is_default = 0', [categoryId]);
    }

    // ============================================
    // СТАТИСТИКА И АНАЛИТИКА
    // ============================================

    /**
     * Получает статистику по категориям за период
     */
    public async getCategoryStats(startDate: string, endDate: string): Promise<CategoryStats[]> {
        this.ensureInitialized();
        return await this.db!.getAllAsync<CategoryStats>(
            `SELECT
                 c.id, c.name, c.icon, c.color_gradient,
                 COALESCE(SUM(t.amount), 0) as total_amount,
                 COUNT(t.id) as transaction_count
             FROM categories c
                      LEFT JOIN transactions t ON c.id = t.category_id
                 AND t.transaction_date BETWEEN ? AND ?
                 AND t.type = 'expense'
             GROUP BY c.id
             HAVING total_amount > 0
             ORDER BY total_amount DESC`,
            [startDate, endDate]
        );
    }

    /**
     * Получает общую статистику доходов и расходов
     */
    public async getIncomeExpenseSummary(startDate: string, endDate: string): Promise<IncomExpenseSummary> {
        this.ensureInitialized();
        const result = await this.db!.getFirstAsync<IncomExpenseSummary>(
            `SELECT
                 COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) as total_income,
                 COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) as total_expense
             FROM transactions
             WHERE transaction_date BETWEEN ? AND ?`,
            [startDate, endDate]
        );
        return result || { total_income: 0, total_expense: 0 };
    }

    /**
     * Получает баланс всех карт
     */
    public async getTotalBalance(): Promise<number> {
        this.ensureInitialized();
        const result = await this.db!.getFirstAsync<{ total_balance: number }>(
            'SELECT COALESCE(SUM(balance), 0) as total_balance FROM cards'
        );
        return result?.total_balance || 0;
    }

    /**
     * Получает транзакции по дням для графика
     */
    public async getDailyTransactions(startDate: string, endDate: string): Promise<any[]> {
        this.ensureInitialized();
        return await this.db!.getAllAsync(
            `SELECT
                 transaction_date,
                 SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expenses,
                 SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income
             FROM transactions
             WHERE transaction_date BETWEEN ? AND ?
             GROUP BY transaction_date
             ORDER BY transaction_date ASC`,
            [startDate, endDate]
        );
    }

    // ============================================
    // УТИЛИТЫ
    // ============================================

    /**
     * Очищает все данные пользователя (для сброса приложения)
     */
    public async resetApp(): Promise<void> {
        this.ensureInitialized();
        await this.db!.execAsync('DELETE FROM transactions');
        await this.db!.execAsync('DELETE FROM cards');
        await this.db!.execAsync('DELETE FROM categories WHERE is_default = 0');
        await this.db!.execAsync('DELETE FROM budgets');
        await this.db!.execAsync('DELETE FROM savings_goals');
        await this.db!.execAsync('DELETE FROM recurring_transactions');
        await this.db!.execAsync('DELETE FROM user');
        await this.db!.execAsync('UPDATE settings SET theme = "dark", currency = "UAH", language = "uk", notifications_enabled = 1');
        console.log('App reset successfully');
    }

    /**
     * Закрывает соединение с базой данных
     */
    public async close(): Promise<void> {
        if (this.db) {
            await this.db.closeAsync();
            this.db = null;
            this.initialized = false;
            console.log('Database connection closed');
        }
    }
}

// Экспортируем единственный экземпляр
export default Database.getInstance();