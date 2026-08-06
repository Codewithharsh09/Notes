---
sidebar_position: 1
---

# Module 1 — Introduction to SQL

> 📌 **Estimated Study Time:** 3–4 hours (first pass) + 1 hour revision before interviews

**Prerequisites:** None. This module assumes zero prior database knowledge. Basic comfort with any programming/spreadsheet concept (rows, columns) helps but isn't required.

**Learning Objectives** — by the end of this module you will be able to:
- ✅ Explain what SQL is and why it was invented
- ✅ Explain what a database and a DBMS are, and how they differ
- ✅ Compare Relational vs Non-Relational databases and know when to use which
- ✅ Classify every SQL command into DDL, DML, DQL, DCL, TCL
- ✅ Set up a working SQL environment (PostgreSQL / MySQL) and run your first query
- ✅ Answer the most common "SQL basics" interview questions with confidence

**Where this topic is used in Real Projects:**
Every backend system that stores structured data — user accounts, orders, transactions, medical records, inventory — sits on top of a relational database. SQL is the universal language used to define that data's shape (DDL), populate and modify it (DML), secure it (DCL), and guarantee its correctness under concurrent access (TCL).

**Why Backend Developers must learn this:**
Backend engineering is, at its core, "receive a request → touch the database → return a response." Almost every API endpoint you'll ever write eventually issues a SQL statement. Even when you use an ORM (Prisma, Sequelize, Hibernate, SQLAlchemy), it *generates* SQL for you — and when it generates slow or wrong SQL, you need to read, debug, and rewrite it yourself. No SQL fluency = no real backend fluency.

**Common Interview Questions related to this module:**
- What is SQL? Is SQL a programming language?
- What is the difference between SQL and MySQL/PostgreSQL?
- What is the difference between DBMS and RDBMS?
- What are the categories of SQL commands? Give examples of each.
- What is the difference between SQL and NoSQL? When would you choose one over the other?
- Is SQL case-sensitive?

---

## 1. Introduction

### 📌 What is SQL?

**SQL (Structured Query Language)** is the standard language used to talk to relational databases — to define what data looks like, store it, retrieve it, change it, delete it, and control who can do those things.

Think of SQL as **English for databases**. Instead of writing low-level code to loop through files on disk searching for a record, you write a *declarative* sentence describing **what** you want, and the database engine figures out **how** to get it:

```sql
SELECT name FROM employees WHERE department = 'Engineering';
```

Read literally: *"Give me the `name` from the `employees` table where `department` is `'Engineering'`."* That's almost plain English — and that readability is exactly why SQL has survived, unchanged in spirit, for over 50 years.

### 💡 Why was SQL created?

In the early 1970s, IBM researcher **E. F. Codd** published a paper proposing the **relational model** — the idea that data should be stored in simple tables (relations) with rows and columns, instead of the tangled, pointer-based hierarchical/network databases of the time. IBM engineers **Donald Chamberlin** and **Raymond Boyce** then designed a language called **SEQUEL** (later renamed **SQL** for trademark reasons) so people could query this relational model *without writing custom code for every single question they wanted to ask*.

### What problem does SQL solve?

Before relational databases + SQL:
- Every application had its own bespoke, hand-rolled way of storing and searching data (custom file formats, linked lists on disk).
- Adding a new "way to ask a question" about the data meant writing new low-level code.
- There was no standard way for different tools/languages to talk to the same data store.

SQL solves this by giving you:
1. **A declarative interface** — you say *what* you want, not *how* to fetch it. The database's **query optimizer** decides the fastest way.
2. **A standard** — (mostly) the same language works across PostgreSQL, MySQL, SQL Server, Oracle, SQLite.
3. **Data integrity guarantees** — constraints, transactions (ACID) prevent corrupted or inconsistent data.
4. **Set-based operations** — you operate on entire sets of rows at once instead of looping row-by-row.

### When to use SQL

- ✅ Your data is structured and has clear relationships (users → orders → order items)
- ✅ You need strong consistency and correctness guarantees (banking, inventory, billing)
- ✅ You need complex queries: joins, aggregations, reporting
- ✅ Multiple applications/teams need a shared, well-defined schema

### When NOT to use SQL (or a relational DB)

- ⚠️ Your data is highly unstructured/schema-less and changes shape constantly (use a document store like MongoDB)
- ⚠️ You need to store huge blobs of unstructured text/media with simple key lookups (object storage, key-value stores like Redis/S3)
- ⚠️ You need massive horizontal write scale across many nodes with eventual consistency being acceptable (wide-column stores like Cassandra)

> 💡 **Real-life analogy:** A relational database is like a well-organized **library** with a strict card-catalog system — everything has a defined place, and you can ask precise, complex questions ("find all sci-fi books published after 1990 by authors from Japan, sorted by rating"). A NoSQL document store is more like a **big box of labeled folders** — flexible and fast to dump things into, but harder to cross-reference precisely.

---

## 2. Deep Explanation

### SQL is a *language*, not a database

This is the single most common beginner confusion.

| Term | What it actually is |
|---|---|
| **SQL** | A *language* (syntax + rules) for interacting with relational data |
| **MySQL, PostgreSQL, Oracle DB, SQL Server, SQLite** | *Software products* (RDBMS) that **implement** SQL, each with their own extensions |

Analogy: SQL is like **English grammar**. MySQL and PostgreSQL are like **British English** and **American English** — mostly the same, mutually understandable, but with local dialect differences (e.g., `LIMIT` in MySQL/PostgreSQL vs `TOP` in SQL Server; `SERIAL` in Postgres vs `AUTO_INCREMENT` in MySQL).

### DBMS vs RDBMS

- **DBMS (Database Management System):** Any software that manages storage, retrieval, and updating of data. This is a broad category — it includes file-based systems, hierarchical databases, and even NoSQL engines.
- **RDBMS (Relational DBMS):** A DBMS that specifically implements the **relational model** — data stored in tables (rows & columns), related to each other via keys, and queried with SQL. PostgreSQL, MySQL, Oracle, SQL Server are all RDBMS.

**Every RDBMS is a DBMS, but not every DBMS is an RDBMS.**

### What is a Database?

A **database** is an organized, persistent collection of related data, stored electronically, designed so it can be efficiently accessed, managed, and updated.

Internally (conceptually), a relational database is organized like this:

```
Database (e.g., "ecommerce_db")
│
├── Schema (e.g., "public")
│    │
│    ├── Table: users
│    │    ├── Columns: id, name, email, created_at
│    │    ├── Rows: actual user records
│    │    └── Constraints: PRIMARY KEY(id), UNIQUE(email)
│    │
│    ├── Table: orders
│    │    ├── Columns: id, user_id, total, status
│    │    └── Constraints: FOREIGN KEY(user_id) REFERENCES users(id)
│    │
│    ├── Indexes (speed up lookups)
│    ├── Views (saved, reusable queries)
│    └── Stored Procedures / Functions
```

### Anatomy of a Table — Columns, Rows, Cells & Primary Key

Zooming into a single table, every relational table is built from the same four ideas:

| Term | Meaning |
|---|---|
| **Column** (Field) | A named property every row has (e.g., `name`, `score`) — defines the *shape* of the data |
| **Row** (Record) | One complete entry in the table (e.g., one customer, one order) |
| **Cell** | The intersection of one row and one column — a single stored value |
| **Primary Key** | The column (or set of columns) that uniquely identifies each row — no two rows may share one, and it can never be `NULL` |

```
        Columns
      ┌───┬──────┬───────┬───────────┐
      │ id│ name │ score │ birthdate │
      ├───┼──────┼───────┼───────────┤
Row → │ 1 │Maria │  350  │1988-01-15 │  ← each row = one record
      ├───┼──────┼───────┼───────────┤
      │ 2 │ John │  900  │2000-02-10 │ ←── this single box (900) = a Cell
      ├───┼──────┼───────┼───────────┤
      │ 3 │Peter │   0   │1990-03-20 │
      └───┴──────┴───────┴───────────┘
        ↑
   Primary Key (id) — unique, never NULL
```

### SQL Data Types

Every column must be given a **data type**, which tells the database exactly how to store and validate the values in that column. The three broad families you'll use constantly:

| Family | Type | Example Values |
|---|---|---|
| **Numeric** | `INT` | `1`, `2`, `30` |
| | `DECIMAL` / `NUMERIC` | `3.14`, `100.50` |
| **String / Text** | `CHAR(n)` | `'E5A6'` (fixed-length, padded) |
| | `VARCHAR(n)` | `'Maria'` (variable-length) |
| **Date & Time** | `DATE` | `'2025-10-30'` |
| | `TIME` | `'09:30:00'` |

> 💡 **CHAR vs VARCHAR:** `CHAR(n)` always stores exactly `n` characters (padding shorter strings with spaces) — use it for fixed-length codes (e.g., a 3-letter country code). `VARCHAR(n)` stores only what's needed, up to `n` characters — use it for almost everything else (names, emails, descriptions).

### Types of Databases

| Type | Model | Examples | Best For |
|---|---|---|---|
| **Relational (SQL)** | Tables with fixed schema, rows/columns, related via keys | PostgreSQL, MySQL, Oracle, SQL Server, SQLite | Structured data, complex relationships, strong consistency (banking, ERP) |
| **Document (NoSQL)** | JSON/BSON-like documents, flexible schema | MongoDB, CouchDB | Rapidly evolving schemas, content management, catalogs |
| **Key-Value** | Simple key → value pairs | Redis, DynamoDB | Caching, session storage, extremely fast lookups |
| **Wide-Column** | Rows with dynamic, sparse columns grouped in column families | Cassandra, HBase | Massive write throughput, time-series, log data |
| **Graph** | Nodes + edges representing relationships | Neo4j, Amazon Neptune | Social networks, recommendation engines, fraud detection |
| **Search Engine** | Inverted indexes over documents | Elasticsearch, Solr | Full-text search, log analytics |

> ⚠️ **Common confusion:** "SQL database" and "relational database" are used interchangeably. "NoSQL" doesn't mean "no SQL commands allowed" — it means "Not Only SQL," i.e., a non-relational storage model. Some NoSQL systems (like CockroachDB descendants or MongoDB's newer aggregation syntax) even borrow SQL-like query interfaces.

### SQL vs NoSQL — the real comparison

| Aspect | SQL (Relational) | NoSQL |
|---|---|---|
| Schema | Fixed, defined upfront | Flexible / dynamic |
| Data relationships | Explicit via foreign keys, JOINs | Usually denormalized/embedded |
| Consistency model | Strong (ACID) by default | Often eventual consistency (BASE) |
| Scaling | Vertical (traditionally); horizontal is harder | Horizontal by design |
| Query language | Standardized SQL | Varies by product (Mongo Query Language, CQL, etc.) |
| Best for | Structured, relational, transactional data | High-volume, flexible, rapidly changing data |

### Categories of SQL Commands

Every SQL statement belongs to one of five categories. This classification is asked in **almost every SQL interview**.

| Category | Full Form | Purpose | Commands |
|---|---|---|---|
| **DDL** | Data Definition Language | Define/modify the *structure* of database objects | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **DML** | Data Manipulation Language | Modify the *data* inside tables | `INSERT`, `UPDATE`, `DELETE` |
| **DQL** | Data Query Language | Read/retrieve data | `SELECT` |
| **DCL** | Data Control Language | Control access/permissions | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control Language | Manage transactions | `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `BEGIN` |

> 💡 **Memory trick:** **"D-D-D-D-T"** → **D**efine, **D**ata(manipulate), **D**ata(query), **D**oor(control access), **T**ransaction.
> Or remember: *"DDL builds the house, DML furnishes it, DQL is you looking inside, DCL is who has the keys, TCL is deciding to keep or undo the changes you made."*

> ⚠️ **Common misconception:** Many beginners think `SELECT` is part of DML. Technically, most textbooks and certification exams (and this course) classify `SELECT` as its own category: **DQL**, because it only *reads* data, it never *manipulates* it. Some older references lump it under DML — know both answers for interviews, but lead with DQL as the precise answer.

### Setting Up Your Environment

To practice SQL you need three things:
1. **A database server** (the engine that stores data and runs your queries) — e.g., PostgreSQL or MySQL, running locally or in the cloud.
2. **A client tool** to send SQL and see results — e.g., `psql` (CLI), pgAdmin, DBeaver, TablePlus, or MySQL Workbench.
3. **A way to write and organize your practice** — a `.sql` script file or a scratch database.

**Recommended path for beginners (PostgreSQL):**

```bash
# 1. Install PostgreSQL (Windows: use the official installer, or Docker)
docker run --name my-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres

# 2. Connect using psql
psql -h localhost -U postgres

# 3. Create your first practice database
CREATE DATABASE practice_db;
\c practice_db
```

**Zero-install alternative:** Use an online SQL sandbox (e.g., DB Fiddle, SQLite in-browser tools) to practice without installing anything — great for quick syntax checks, not ideal for building real project experience.

---

## 3. Visual Understanding

```
                         ┌────────────────────────┐
                         │        DATABASE         │
                         │   (e.g., ecommerce_db)  │
                         └────────────┬─────────────┘
                                      │
                     ┌────────────────┼────────────────┐
                     │                │                │
               ┌─────▼─────┐   ┌──────▼──────┐   ┌─────▼─────┐
               │   TABLE    │   │    TABLE     │   │   TABLE   │
               │   users    │   │    orders    │   │  products │
               └─────┬─────┘   └──────┬──────┘   └─────┬─────┘
                     │                │                │
        ┌────────────┼──────────┐     │                │
        │            │          │     │                │
   ┌────▼───┐   ┌────▼───┐  ┌───▼───┐ │                │
   │  ROW    │   │ COLUMN │  │CONSTR-│ │                │
   │ (record)│   │ (field)│  │ AINT  │ │                │
   └────────┘   └────────┘  └───────┘ │                │
                                       │                │
                              FOREIGN KEY ───────────────┘
                          (orders.user_id → users.id)
```

**SQL command category flow:**

```
                    SQL Commands
                        │
   ┌───────┬────────────┼────────────┬───────────┐
   │       │            │            │           │
  DDL     DML          DQL          DCL         TCL
   │       │            │            │           │
CREATE  INSERT       SELECT       GRANT      COMMIT
ALTER   UPDATE                    REVOKE     ROLLBACK
DROP    DELETE                               SAVEPOINT
TRUNCATE                                     BEGIN
```

**Database ecosystem (client → server flow):**

```
 [Your App / psql / DBeaver]
            │  (sends SQL query over the network, e.g. TCP port 5432)
            ▼
 ┌───────────────────────────┐
 │      RDBMS Server          │
 │  (PostgreSQL / MySQL)      │
 │  ┌───────────────────────┐ │
 │  │ Parser → Optimizer →  │ │
 │  │ Executor → Storage    │ │
 │  └───────────────────────┘ │
 └───────────────────────────┘
            │
            ▼
   [Data files on disk]
```

---

## 4. Syntax

SQL syntax at this stage centers on **connecting** and **creating your first structures**. Deeper DML/DQL syntax is covered in later modules.

### General SQL statement rules

```sql
KEYWORD arguments;
```

- Every SQL statement ends with a semicolon `;` (required when running multiple statements; often optional for a single statement in interactive tools, but **always** write it — it's the standard and avoids ambiguity).
- SQL keywords (`SELECT`, `CREATE`, `WHERE`) are **not** case-sensitive — `select` = `SELECT`. Convention: write keywords in **UPPERCASE** for readability.
- Identifiers (table/column names) are **case-sensitivity depends on the RDBMS**:
  - PostgreSQL: unquoted identifiers are folded to lowercase.
  - MySQL: table name case-sensitivity depends on the OS/filesystem.
  - ⚠️ Best practice: always use `snake_case`, lowercase identifiers to avoid cross-platform pain.
- Strings use **single quotes** `'like this'`. Double quotes are reserved for quoting identifiers in PostgreSQL/ANSI SQL (MySQL is more lenient by default, which is another portability trap).

### Creating a database

```sql
CREATE DATABASE database_name;
```

### Creating your first table

```sql
CREATE TABLE table_name (
    column1 datatype constraints,
    column2 datatype constraints,
    ...
);
```

Example:

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,       -- auto-incrementing unique ID
    name VARCHAR(100) NOT NULL,  -- text, required
    department VARCHAR(50),      -- text, optional
    salary NUMERIC(10, 2),       -- decimal number
    hired_on DATE DEFAULT CURRENT_DATE
);
```

| Keyword | Meaning |
|---|---|
| `SERIAL` | PostgreSQL auto-incrementing integer (like `AUTO_INCREMENT` in MySQL) |
| `PRIMARY KEY` | Uniquely identifies each row; cannot be `NULL` |
| `VARCHAR(n)` | Variable-length text, max `n` characters |
| `NOT NULL` | Column must always have a value |
| `NUMERIC(p, s)` | Exact decimal number: `p` = total digits, `s` = digits after decimal |
| `DEFAULT` | Value used automatically if none is provided |

✅ **Best practice:** Always define a `PRIMARY KEY`, name tables/columns descriptively in `snake_case`, and prefer explicit column lists over relying on defaults you'll forget.

⚠️ **Bad practice:** Skipping constraints ("I'll validate in the app layer only") — this lets bad data slip in the moment any other process touches the database directly.

---

## 5. Examples

### Very Basic

```sql
CREATE DATABASE school;
```
*Creates a new, empty database named `school`.*

### Intermediate

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    grade INT CHECK (grade BETWEEN 1 AND 12)
);
```
*Creates a table with a constraint ensuring `grade` is always between 1 and 12 — enforced by the database itself, not just app code.*

### Advanced

```sql
CREATE SCHEMA hr;

CREATE TABLE hr.employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT REFERENCES hr.departments(id),
    salary NUMERIC(10,2) CHECK (salary > 0)
);
```
*Introduces schemas (namespaces within a database) and a foreign key reference — organizing tables into logical groups, common in large enterprise databases.*

### Real Project Example — Backend API (Node/Express + PostgreSQL)

```sql
-- Table backing a /users signup endpoint
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```
*This is the exact kind of table a `POST /signup` endpoint writes to — `UNIQUE` on email prevents duplicate accounts at the database level, even if the app has a race condition.*

### E-commerce Example

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    stock_quantity INT DEFAULT 0
);
```

### Hospital Management Example

```sql
CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    blood_group VARCHAR(3)
);
```

### Banking Example

```sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (balance >= 0)
);
```
*The `CHECK (balance >= 0)` is a real-world example of using the database as the last line of defense against an overdraft bug in the application layer.*

### Analytics Example

```sql
CREATE TABLE page_views (
    id BIGSERIAL PRIMARY KEY,
    user_id INT,
    page_url TEXT,
    viewed_at TIMESTAMP DEFAULT NOW()
);
```
*`BIGSERIAL` is used because analytics/event tables grow extremely fast and can exceed the ~2.1 billion row limit of a regular `SERIAL` (INT).*

---

## 6. Behind the Scenes

When you run **any** SQL statement, the RDBMS engine performs these steps internally:

```
 SQL text ("CREATE TABLE ...")
        │
        ▼
 1. PARSER
    - Checks syntax is valid
    - Builds a "parse tree"
        │
        ▼
 2. ANALYZER / SEMANTIC CHECK
    - Confirms table/columns exist (for DML/DQL)
    - Checks permissions
        │
        ▼
 3. OPTIMIZER (for DML/DQL)
    - Chooses the most efficient execution plan
    - (Not very relevant yet for DDL like CREATE TABLE)
        │
        ▼
 4. EXECUTOR
    - Actually performs the operation
    - Allocates disk pages, writes metadata (system catalogs)
        │
        ▼
 5. STORAGE ENGINE
    - Physically persists data/structure to disk
    - Updates system catalog tables (e.g., pg_catalog in PostgreSQL,
      information_schema across RDBMS)
```

**What `CREATE TABLE` actually does internally:**
- The RDBMS registers the new table in its **system catalog** — internal metadata tables that describe every table, column, constraint, and index in the database (in PostgreSQL: `pg_class`, `pg_attribute`; you can query them like normal tables!).
- Disk space isn't necessarily pre-allocated for data — most RDBMSs allocate storage lazily as rows are inserted.
- Constraints (`PRIMARY KEY`, `UNIQUE`) usually **automatically create an index** behind the scenes to enforce uniqueness efficiently — this is a subtlety that surprises many beginners.

**Memory:** At this stage (before you start running heavy `SELECT`/`JOIN` queries) there's minimal buffer/cache activity — that becomes important starting Module 2, where the query planner and buffer cache (e.g., PostgreSQL's `shared_buffers`) start mattering a lot.

**How tables are physically stored:**

```
 DATABASE FILES (on disk)          COLUMNS
 ┌───────────────────┐        ┌────┬──────┬───────┐
 │ file 1             │        │ ID │ NAME │ SCORE │
 │ file 2             │  ⇄     ├────┼──────┼───────┤
 │ file 3 ...         │        │ 1  │ John │  20   │ ← Row
 └─────────┬──────────┘        │ 2  │ Mary │  50   │
           │                   │ 3  │Martin│  30   │
           ▼                   └────┴──────┴───────┘
      [ DISK ]
```

A table isn't a spreadsheet floating in memory — the RDBMS serializes its rows/columns into its own on-disk **database files** (in PostgreSQL: files under a per-database directory in `PGDATA/base/`, organized into fixed-size **pages**, typically 8KB each). The engine's job is to translate your logical `CREATE TABLE`/`SELECT` statements into reads and writes against these physical files, while hiding that complexity from you entirely — you only ever think in terms of tables, rows, and columns.

---

## 7. Common Mistakes

| Mistake | Why it happens | How to avoid it |
|---|---|---|
| Thinking "SQL" and "MySQL" are the same thing | Names sound alike; many first tutorials only use MySQL | Remember: SQL = language, MySQL/PostgreSQL = products that implement it |
| Forgetting the semicolon `;` | Many GUI tools auto-run a single statement without it | Always type `;` — it becomes essential once running multiple statements |
| Using reserved words as table/column names (e.g., `user`, `order`) | Beginners don't know SQL has reserved keywords | Check reserved word lists; when unavoidable, quote the identifier or rename (`users`, `orders`) |
| Assuming identifiers are case-insensitive everywhere | Different RDBMS handle case differently | Stick to lowercase `snake_case` identifiers always |
| Not defining a `PRIMARY KEY` | "I'll add it later" mentality | Every table should have a primary key from day one — retrofitting is painful on a live table |
| Confusing `DROP` and `DELETE`/`TRUNCATE` | All three "remove things," names sound similar | `DROP` removes the *table structure entirely*; `TRUNCATE` empties *all rows* but keeps structure; `DELETE` removes *specific rows* (with `WHERE`) or all rows without dropping structure |
| Believing NoSQL is always "faster" than SQL | Marketing hype, blog posts | Speed depends entirely on the access pattern and schema design — a well-indexed SQL query on a well-modeled schema is extremely fast |

---

## 8. Best Practices

- ✅ **Naming convention:** `snake_case`, lowercase, plural table names (`users`, `order_items`), singular-implied meaning (`id`, `created_at`).
- ✅ Always define a `PRIMARY KEY` on every table.
- ✅ Use `NOT NULL` wherever a value is logically required — don't rely only on app-level validation.
- ✅ Write SQL keywords in **UPPERCASE**, identifiers in **lowercase** — improves readability instantly.
- ✅ Keep one statement per line for multi-statement scripts; indent nested clauses.
- ✅ Use meaningful, descriptive names (`created_at` not `c_dt`).
- ✅ Version-control your schema (migration files), never edit production schema by hand.
- ⚠️ Avoid `SELECT *` in production code (covered deeply in Module 2) — it's a habit worth breaking from day one.
- ⚠️ Don't store passwords in plaintext — this is a schema-design decision made *now* (`password_hash`, not `password`).
- ⚠️ Avoid vendor-specific syntax unless necessary — write portable, ANSI-standard SQL where possible so migrating between RDBMS is easier.

---

## 9. Interview Preparation

### Beginner
1. What is SQL, and is it a programming language?
2. What is the difference between SQL and MySQL?
3. What is a database?
4. What is a table, row, and column?
5. Is SQL case-sensitive?

### Intermediate
6. What is the difference between DBMS and RDBMS?
7. List and explain the 5 categories of SQL commands.
8. What is the difference between `CHAR` and `VARCHAR`?
9. What is a primary key? Can a table have more than one?
10. What is a schema in SQL?

### Advanced
11. Why was the relational model invented — what problem did it solve over earlier database models?
12. Explain how a `CREATE TABLE` statement is processed internally by the database engine.
13. What are ACID properties, and why do they matter?
14. Compare vertical and horizontal scaling in the context of relational databases.

### Scenario-Based
15. *"Your team wants to store rapidly changing, deeply nested product catalog data with no fixed schema, alongside strict financial transaction records. What database strategy would you recommend?"*
16. *"A junior developer suggests skipping primary keys 'to save time.' How do you respond?"*

### Follow-up Questions
17. If `SELECT` doesn't modify data, why do some sources classify it under DML instead of DQL?
18. Is `TRUNCATE` a DDL or DML command, and why?

### Tricky Questions
19. Can a database exist without any tables?
20. If two RDBMS both "support SQL," why can the exact same query sometimes fail on one and work on the other?

### MCQs
21. Which of these is **not** an RDBMS?
    a) PostgreSQL  b) MongoDB  c) MySQL  d) Oracle
22. `GRANT` and `REVOKE` belong to:
    a) DDL  b) DML  c) DCL  d) TCL

### True/False
23. SQL keywords must always be written in uppercase. (False — convention, not a rule)
24. Every RDBMS is also a DBMS. (True)
25. `TRUNCATE TABLE` can be rolled back in every RDBMS. (False — depends on RDBMS/transactional DDL support)

### Explain the Output
```sql
CREATE TABLE test (id INT);
CREATE TABLE test (id INT);
```
26. What happens when the second statement runs? *(Error: relation "test" already exists)*

### Debug the Query
```sql
CREATE TABEL users (id INT, name VARCHAR(50))
```
27. Find and fix the errors. *(Typo: `TABEL` → `TABLE`; missing semicolon)*

---

## 10. Practice Section

> Try to solve these yourself first. Full solutions are in the [Quick Revision](#11-quick-revision-notes) companion — write your SQL, then compare.

**10 Easy**
1. Create a database named `library`.
2. Create a table `books` with columns: `id`, `title`, `author`.
3. Add a `PRIMARY KEY` to the `id` column of `books`.
4. Create a table `members` with a `NOT NULL` constraint on `name`.
5. Create a table `authors` with a `UNIQUE` constraint on `email`.
6. What SQL category does `CREATE TABLE` belong to?
7. What SQL category does `INSERT INTO` belong to?
8. Name two RDBMS products.
9. What is the difference between a database and a table?
10. Write the command to switch to (connect to) a database called `shop` in `psql`.

**10 Medium**
11. Create a table `orders` with a `CHECK` constraint ensuring `quantity > 0`.
12. Create a table `employees` with a `DEFAULT` value of `CURRENT_DATE` for a `joined_on` column.
13. Explain why `DROP TABLE` cannot easily be undone, while `DELETE FROM table` sometimes can.
14. Create a `departments` table and an `employees` table with a foreign key relationship.
15. What's the difference between `NULL` and an empty string `''`?
16. Create a schema named `sales` and a table inside it.
17. Why might you choose `NUMERIC` over `FLOAT` for storing money?
18. What happens if you insert a row without providing a value for a `NOT NULL` column with no `DEFAULT`?
19. List all 5 SQL command categories with one example command each.
20. What is the purpose of `information_schema`?

**10 Hard**
21. Design a minimal schema (tables + keys) for a hospital's patient-appointment system.
22. Explain, step by step, what happens internally when `CREATE TABLE` executes.
23. Why is `SELECT` sometimes classified as DQL and sometimes as DML? Justify both viewpoints.
24. Compare ACID vs BASE consistency models with a real-world example each.
25. When would a senior engineer deliberately choose a NoSQL database *alongside* a SQL database in the same system (polyglot persistence)? Give a concrete example.
26. What's the risk of using a reserved keyword like `order` as a table name, and how do you work around it if unavoidable?
27. Explain why `TRUNCATE` is generally faster than `DELETE FROM table_name` with no `WHERE`.
28. What is the difference between a `DBMS` crashing versus violating ACID guarantees — connect this to why transactions matter.
29. In production, why is directly running `ALTER TABLE` / `DROP TABLE` on a live database considered risky, and what's the standard mitigation?
30. Explain the difference between "schema" as in `CREATE SCHEMA` and "schema" as in "the structure/shape of a table."

**5 Real Interview Problems**
31. *"Walk me through what happens from the moment I type a SQL query in a terminal to the moment I see results."*
32. *"Why would you pick PostgreSQL over MySQL for a new project, or vice versa?"*
33. *"Explain DDL vs DML vs DCL vs TCL to someone who has never used a database."*
34. *"What's the difference between a `PRIMARY KEY` and a `UNIQUE` constraint?"*
35. *"If I told you our schema has no foreign keys anywhere, what would you infer, and what would you ask next?"*

**5 Business Problems**
36. An e-commerce startup asks you to design the very first two tables for their MVP. Which two tables, and why?
37. A hospital wants patient records to *never* be silently duplicated. Which constraint(s) enforce this at the database level?
38. A bank wants to guarantee an account balance is never negative without relying on application code. How do you enforce this in the schema?
39. A social media app needs to store posts with wildly inconsistent metadata per post type (poll, image, video). Would you model this in SQL, NoSQL, or a hybrid? Justify.
40. A CRM company's engineers keep accidentally running `DROP TABLE` on production. Propose a process/technical safeguard (not just "be careful").

---

## 11. Quick Revision Notes

- SQL = language; MySQL/PostgreSQL/Oracle/SQL Server = RDBMS products implementing it.
- DBMS = manages any data; RDBMS = manages *relational* (table-based) data specifically.
- 5 command categories: **DDL** (structure), **DML** (data changes), **DQL** (read), **DCL** (permissions), **TCL** (transactions).
- Relational model invented by E. F. Codd (1970); SQL created by Chamberlin & Boyce at IBM.
- Relational DB = fixed schema, strong consistency (ACID), best for structured/related data.
- NoSQL = flexible schema, horizontal scale, eventual consistency common.
- `PRIMARY KEY` = unique + not null identifier of a row; every table should have one.
- A **cell** = intersection of a row and column = one stored value.
- 3 data type families: **Numeric** (`INT`, `DECIMAL`), **String** (`CHAR`, `VARCHAR`), **Date & Time** (`DATE`, `TIME`).
- Tables aren't "in memory spreadsheets" — the RDBMS persists them into physical **database files on disk**, organized into fixed-size pages.
- Always: lowercase snake_case identifiers, UPPERCASE keywords, semicolons on every statement.

---

## 12. Cheat Sheet

| Category | Commands | Purpose |
|---|---|---|
| DDL | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` | Define/change structure |
| DML | `INSERT`, `UPDATE`, `DELETE` | Change data |
| DQL | `SELECT` | Read data |
| DCL | `GRANT`, `REVOKE` | Control access |
| TCL | `COMMIT`, `ROLLBACK`, `SAVEPOINT`, `BEGIN` | Manage transactions |

| Concept | Quick Definition |
|---|---|
| Database | Organized collection of related data |
| Table | Structured set of rows & columns holding one type of entity |
| Row (Record/Tuple) | A single entry in a table |
| Column (Field/Attribute) | A single property/data point across all rows |
| Primary Key | Column(s) uniquely identifying each row; not null |
| Foreign Key | Column referencing a primary key in another table |
| Schema | Namespace grouping related tables; also means "structure of data" |
| RDBMS | Software implementing relational model + SQL |

---

## 13. Mind Map

```
SQL
├── What is SQL
│   ├── Language, not a product
│   └── Declarative (say WHAT, not HOW)
├── Why learn SQL
│   ├── Every backend touches a database
│   └── Portable, in-demand, foundational skill
├── Table Anatomy
│   ├── Column (field), Row (record), Cell (row∩column)
│   ├── Primary Key — unique, never NULL
│   └── Data Types → Numeric (INT/DECIMAL), String (CHAR/VARCHAR), Date&Time (DATE/TIME)
├── Database & Types
│   ├── Relational (SQL): PostgreSQL, MySQL, Oracle
│   ├── Document: MongoDB
│   ├── Key-Value: Redis
│   ├── Wide-Column: Cassandra
│   └── Graph: Neo4j
├── SQL Commands
│   ├── DDL → CREATE, ALTER, DROP, TRUNCATE
│   ├── DML → INSERT, UPDATE, DELETE
│   ├── DQL → SELECT
│   ├── DCL → GRANT, REVOKE
│   └── TCL → COMMIT, ROLLBACK, SAVEPOINT
└── Environment Setup
    ├── Install server (PostgreSQL/MySQL)
    ├── Connect via client (psql/DBeaver)
    └── CREATE DATABASE → first practice DB
```

---

## 14. Flashcards

1. **Q:** What does SQL stand for? → **A:** Structured Query Language.
2. **Q:** Is SQL a programming language? → **A:** No — it's a declarative query/data language, not general-purpose.
3. **Q:** Who proposed the relational model? → **A:** E. F. Codd (1970, IBM).
4. **Q:** Who created the original SEQUEL language? → **A:** Donald Chamberlin and Raymond Boyce.
5. **Q:** DBMS vs RDBMS? → **A:** DBMS manages any data; RDBMS specifically manages relational (tabular) data.
6. **Q:** What is a table? → **A:** A structured collection of rows and columns representing one entity type.
7. **Q:** What is a row also called? → **A:** Record or tuple.
8. **Q:** What is a column also called? → **A:** Field or attribute.
8a. **Q:** What is a "cell" in a table? → **A:** The intersection of one row and one column — a single stored value.
8b. **Q:** Name the three broad SQL data type families. → **A:** Numeric (`INT`, `DECIMAL`), String/Text (`CHAR`, `VARCHAR`), Date & Time (`DATE`, `TIME`).
8c. **Q:** Difference between `CHAR(n)` and `VARCHAR(n)`? → **A:** `CHAR` always stores exactly `n` characters (space-padded); `VARCHAR` stores only what's needed, up to `n`.
9. **Q:** What does DDL stand for? → **A:** Data Definition Language.
10. **Q:** What does DML stand for? → **A:** Data Manipulation Language.
11. **Q:** What does DQL stand for? → **A:** Data Query Language.
12. **Q:** What does DCL stand for? → **A:** Data Control Language.
13. **Q:** What does TCL stand for? → **A:** Transaction Control Language.
14. **Q:** Give 3 DDL commands. → **A:** CREATE, ALTER, DROP.
15. **Q:** Give 3 DML commands. → **A:** INSERT, UPDATE, DELETE.
16. **Q:** Which command is DQL? → **A:** SELECT.
17. **Q:** Give 2 DCL commands. → **A:** GRANT, REVOKE.
18. **Q:** Give 2 TCL commands. → **A:** COMMIT, ROLLBACK.
19. **Q:** What is a primary key? → **A:** A column (or set of columns) that uniquely identifies each row and cannot be NULL.
20. **Q:** What is a foreign key? → **A:** A column that references the primary key of another table, linking records.
21. **Q:** Are SQL keywords case-sensitive? → **A:** No, but identifiers may be, depending on the RDBMS.
22. **Q:** What character ends a SQL statement? → **A:** A semicolon `;`.
23. **Q:** Difference between `DROP` and `TRUNCATE`? → **A:** `DROP` removes the table entirely (structure + data); `TRUNCATE` removes all rows but keeps the structure.
24. **Q:** Difference between `TRUNCATE` and `DELETE`? → **A:** `TRUNCATE` removes all rows and can't use `WHERE`; `DELETE` can remove specific rows with `WHERE`.
25. **Q:** What is a schema? → **A:** A namespace that groups related database objects (tables, views, etc.); also used loosely to mean "structure of data."
26. **Q:** What is ACID? → **A:** Atomicity, Consistency, Isolation, Durability — guarantees for reliable transactions.
27. **Q:** What is BASE (NoSQL)? → **A:** Basically Available, Soft state, Eventual consistency.
28. **Q:** Name 3 RDBMS products. → **A:** PostgreSQL, MySQL, Oracle Database (or SQL Server, SQLite).
29. **Q:** Name 2 NoSQL document databases. → **A:** MongoDB, CouchDB.
30. **Q:** What does `SERIAL` do in PostgreSQL? → **A:** Auto-generates an incrementing integer, typically used for primary keys.
31. **Q:** VARCHAR vs CHAR? → **A:** VARCHAR is variable-length (stores only what's needed); CHAR is fixed-length (pads with spaces).
32. **Q:** What is `information_schema`? → **A:** A standardized set of system views describing database metadata (tables, columns, constraints).

---

## 15. Real Project Usage

| Domain | How this module's concepts show up |
|---|---|
| **Hospital ERP** | `patients`, `doctors`, `appointments` tables with strict `PRIMARY KEY`/`FOREIGN KEY` constraints to prevent duplicate or orphaned medical records |
| **Banking** | Every schema decision (e.g., `NOT NULL`, `CHECK (balance >= 0)`) is a compliance/audit requirement, not just good practice |
| **E-commerce** | `products`, `orders`, `users` tables designed with DDL upfront; DML (`INSERT`/`UPDATE`) drives checkout flows |
| **Inventory** | `CHECK` constraints prevent negative stock; `DEFAULT` values simplify warehouse data entry |
| **CRM** | `DCL` (`GRANT`/`REVOKE`) controls which sales reps can view/edit which customer records |
| **Analytics** | High-volume event tables use `BIGSERIAL`/partitioned tables designed from day one for scale |
| **Social Media** | Mixed strategy: SQL for core relational data (users, follows), NoSQL for flexible content metadata |

---

## 16. Interview Revision

**Top 20 Interview Questions**
1. What is SQL? 2. SQL vs MySQL? 3. DBMS vs RDBMS? 4. What are the 5 SQL command categories? 5. What is DDL? 6. What is DML? 7. What is DQL? 8. What is DCL? 9. What is TCL? 10. What is a primary key? 11. What is a foreign key? 12. SQL vs NoSQL? 13. What is a schema? 14. DROP vs TRUNCATE vs DELETE? 15. What is ACID? 16. Is SQL case-sensitive? 17. What is a relational database? 18. Name popular RDBMS products. 19. Why is SELECT sometimes called DQL, sometimes DML? 20. What problem did the relational model solve?

**Top 20 One-Line Answers**
1. Structured Query Language — a language for relational databases. 2. SQL is the language; MySQL is a product implementing it. 3. DBMS manages any data; RDBMS manages tabular/relational data. 4. DDL, DML, DQL, DCL, TCL. 5. Defines structure: CREATE/ALTER/DROP. 6. Manipulates data: INSERT/UPDATE/DELETE. 7. Queries/reads data: SELECT. 8. Controls access: GRANT/REVOKE. 9. Manages transactions: COMMIT/ROLLBACK. 10. Uniquely identifies a row, cannot be NULL. 11. References another table's primary key to link data. 12. SQL = structured/strong consistency; NoSQL = flexible/eventual consistency. 13. A namespace grouping related database objects. 14. DROP deletes the table; TRUNCATE empties rows fast; DELETE removes specific rows. 15. Atomicity, Consistency, Isolation, Durability. 16. Keywords aren't; identifiers sometimes are, depending on RDBMS. 17. A database storing data in related tables. 18. PostgreSQL, MySQL, Oracle, SQL Server, SQLite. 19. It only reads data (DQL) but some classic texts group it under DML since it's part of core data operations. 20. Rigid, pointer-based hierarchical models that were hard to query flexibly.

**Top 20 Quick Facts**
1. SQL was originally called SEQUEL. 2. Relational model proposed in 1970 by E. F. Codd. 3. `SELECT` is the most used SQL keyword in the world. 4. Every RDBMS is a DBMS, not vice versa. 5. `PRIMARY KEY` implicitly creates a unique index. 6. `NULL` is not equal to `''` (empty string). 7. SQL keywords conventionally are UPPERCASE. 8. Table/column names should be lowercase `snake_case` for portability. 9. `TRUNCATE` is DDL in most RDBMS. 10. PostgreSQL uses `SERIAL`; MySQL uses `AUTO_INCREMENT`. 11. MongoDB is the most popular NoSQL document database. 12. ACID applies to SQL transactions; BASE is common in NoSQL. 13. `information_schema` is a cross-RDBMS standard for metadata. 14. A table can have only ONE primary key (possibly composite). 15. A table can have MANY unique constraints. 16. Foreign keys are optional but critical for relational integrity. 17. SQL is a declarative language — you state *what*, not *how*. 18. Docker is the fastest way to spin up a local PostgreSQL/MySQL instance. 19. `CHECK` constraints enforce business rules at the database level. 20. NoSQL doesn't mean "no SQL" — it means "Not Only SQL."

---

## 17. Final Summary

SQL is the standard **declarative language** used to define, manipulate, query, and secure data stored in **relational databases (RDBMS)**. It was born out of E. F. Codd's 1970 relational model — a way to organize data into simple, related tables instead of rigid, hard-to-query hierarchical structures — and implemented by IBM researchers as SEQUEL, later SQL.

Every RDBMS (PostgreSQL, MySQL, Oracle, SQL Server, SQLite) speaks SQL, but each has its own dialect and extensions — SQL the *language* is standardized; the *products* that implement it are not identical. Understanding this distinction alone resolves most beginner confusion.

SQL commands fall into five categories, each answering a different question:
- **DDL** — *"What does the data look like?"* (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`)
- **DML** — *"How do I change the data?"* (`INSERT`, `UPDATE`, `DELETE`)
- **DQL** — *"How do I read the data?"* (`SELECT`)
- **DCL** — *"Who is allowed to touch the data?"* (`GRANT`, `REVOKE`)
- **TCL** — *"How do I make a group of changes safe and atomic?"* (`COMMIT`, `ROLLBACK`, `SAVEPOINT`)

A **database** is an organized, persistent collection of related data; a **table** holds one type of entity as rows (records) and columns (fields); a **primary key** uniquely identifies each row; a **foreign key** links rows across tables, forming the "relational" part of "relational database."

Relational databases favor **strong consistency and structure** (ACID transactions), which is why they dominate domains like banking, hospital records, and e-commerce order systems — anywhere correctness matters more than raw write throughput. NoSQL databases trade some of that structure/consistency for flexibility and horizontal scale, and are common for content catalogs, caching, and massive event/log ingestion. Modern systems frequently use **both** together ("polyglot persistence").

Setting up your environment is simple: install PostgreSQL (or MySQL) locally or via Docker, connect with a client (`psql`, DBeaver, pgAdmin), and run your first `CREATE DATABASE` / `CREATE TABLE` statements. From here, Module 2 builds directly on this foundation by teaching you to actually **query** the data you now know how to define.

---

## 🧠 20 Revision Questions — Test Yourself

1. What is SQL, and how is it different from MySQL?
2. What is the difference between DBMS and RDBMS?
3. Name and describe all 5 SQL command categories with one example command each.
4. Is `SELECT` DML or DQL — and why do sources disagree?
5. What is a primary key, and why must every table have one?
6. What is a foreign key, and what problem does it solve?
7. Compare relational and document databases with a real example of when you'd pick each.
8. What does ACID stand for, and why does it matter for a banking system?
9. What is the difference between `DROP`, `TRUNCATE`, and `DELETE`?
10. Why are SQL identifiers conventionally lowercase `snake_case`?
11. What internally happens when you run `CREATE TABLE`?
12. What is `information_schema`, and why is it useful?
13. Give one real-world example each of when you'd use SQL vs NoSQL.
14. What is a schema, and how is the term used in two different senses?
15. Why is `VARCHAR` generally preferred over `CHAR` for most text fields?
16. What's the risk of never defining `NOT NULL` or `CHECK` constraints?
17. Explain, in plain English, the flow from typing a SQL query to seeing a result.
18. Why might a company deliberately run both PostgreSQL and MongoDB in the same system?
19. What does `GRANT`/`REVOKE` control, and which category do they belong to?
20. In your own words, why must every backend developer learn SQL, even if they mostly use an ORM?
