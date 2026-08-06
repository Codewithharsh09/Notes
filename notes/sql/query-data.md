---
sidebar_position: 2
---

# Module 2 — Query Data (SELECT)

> 📌 **Estimated Study Time:** 6–8 hours (first pass) + 2 hours revision before interviews

**Prerequisites:** [Module 1 — Introduction](./introduction) (you should know what a table/row/column is, and how to `CREATE TABLE`).

**Learning Objectives** — by the end of this module you will be able to:
- ✅ Write `SELECT` queries confidently, from trivial to multi-clause
- ✅ Filter rows precisely with `WHERE` and its operators
- ✅ Sort results with `ORDER BY`
- ✅ Aggregate data with `GROUP BY` and filter groups with `HAVING`
- ✅ Remove duplicates with `DISTINCT`
- ✅ Limit result sets with `LIMIT`/`TOP`
- ✅ Recite, from memory, the **logical execution order** of a SELECT query — the single most-tested SQL interview concept
- ✅ Debug wrong or slow `SELECT` queries systematically

**Where this topic is used in Real Projects:**
`SELECT` is the single most-executed SQL statement in any production system. Every dashboard, every API `GET` endpoint, every report, every search bar, every admin panel — all of it is `SELECT` queries. Getting `SELECT` right (correctness *and* performance) is arguably 70% of a backend developer's day-to-day database work.

**Why Backend Developers must learn this:**
When a user hits "search," "filter," "sort," or "load more" in your app, you translate that UI action into a `SELECT` statement. A poorly written `SELECT` (missing index, `SELECT *`, wrong `JOIN`, unfiltered `GROUP BY`) is the #1 cause of slow APIs and database outages in real companies. This module is the foundation everything else — joins, subqueries, window functions — builds on.

**Common Interview Questions related to this module:**
- What is the logical order of execution of a SQL query?
- What is the difference between `WHERE` and `HAVING`?
- Why can't you use a column alias in `WHERE`?
- What does `DISTINCT` do, and how does it affect performance?
- What is the difference between `LIMIT` and `TOP`?
- Does `ORDER BY` run before or after `GROUP BY`?

---

## 1. Introduction

### 📌 What is `SELECT`?

`SELECT` is the SQL statement used to **retrieve** (read) data from one or more tables. It is the only command in the **DQL (Data Query Language)** category, and it's the command you'll type more than any other SQL command combined.

```sql
SELECT column_name FROM table_name;
```

Read as: *"Give me `column_name` from `table_name`."*

### 💡 Why does `SELECT` exist / why was it designed this way?

Before SQL, retrieving data meant writing procedural code: open the file, loop through records, check a condition, collect matches, close the file. That's **imperative** — you describe *how*.

`SELECT` is **declarative** — you describe *what* you want, and the database's **query optimizer** decides *how* to get it (which index to use, which order to filter/join in, etc.). This separation is powerful: the same query can get *faster* over time (better indexes, smarter optimizer) without you changing a single line of application code.

### What problem does `SELECT` (with its clauses) solve?

- **`FROM`** — "which table(s) am I even looking at?"
- **`WHERE`** — "I don't want *all* rows, only ones matching a condition."
- **`ORDER BY`** — "I want the result in a specific sequence, not arbitrary/insertion order."
- **`GROUP BY`** — "I want *summarized* answers (totals, counts, averages) per category, not every individual row."
- **`HAVING`** — "I want to filter those summarized groups, not individual rows."
- **`DISTINCT`** — "I want unique values only, duplicates removed."
- **`LIMIT`/`TOP`** — "I only want the first N results" (pagination, previews, "top 10" reports).

### When to use each

| Clause | Use when... |
|---|---|
| `WHERE` | You need to filter *individual rows* before any grouping |
| `ORDER BY` | You need a specific, predictable order (never assume default order without it) |
| `GROUP BY` | You need per-category summaries (e.g., total sales per region) |
| `HAVING` | You need to filter those *summaries* (e.g., only regions with total sales > 10000) |
| `DISTINCT` | You need unique values, e.g., "list all distinct countries we ship to" |
| `LIMIT`/`TOP` | You need pagination, "top N," or a quick data preview |

### When NOT to use / anti-patterns

- ⚠️ Don't use `DISTINCT` to "fix" a query that's producing duplicates due to a wrong `JOIN` — that hides a real bug instead of solving it.
- ⚠️ Don't use `HAVING` to filter individual rows (use `WHERE` — it's applied earlier and is much faster).
- ⚠️ Don't rely on row order without `ORDER BY` — the database gives **no guarantee** of order otherwise.

> 💡 **Real-life analogy:** Think of a table as a **spreadsheet**. `SELECT` picks which *columns* you want to see. `FROM` says *which sheet*. `WHERE` is a *filter* (like Excel's AutoFilter). `ORDER BY` is *sorting*. `GROUP BY` is a *pivot table* summary. `HAVING` filters *that* pivot summary. `DISTINCT` is "remove duplicate rows." `LIMIT` is "show me only the top N rows."

---

## 2. Deep Explanation

### The Anatomy of a SQL Statement — SQL Components

Before diving into each clause, it helps to know the vocabulary for the *pieces* that make up any SQL statement — this terminology shows up constantly in documentation, error messages, and interviews. Take this example:

```sql
-- Retrieve Customers Data
SELECT
    name,
    LOWER(country)
FROM customers
WHERE country = 'Italy'
```

| Component | What it is | Example from above |
|---|---|---|
| **SQL Statement** | The entire block of SQL — everything from `SELECT` to the final clause — that the engine executes as one unit | The whole query above |
| **Comment** | Text ignored by the engine, used to document intent for humans | `-- Retrieve Customers Data` |
| **Clause** | A major building block of a statement, each starting with a keyword and doing one job | `SELECT ...`, `FROM customers`, `WHERE country = 'Italy'` |
| **Keyword** | A reserved word with special meaning to SQL | `SELECT`, `FROM`, `WHERE` |
| **Function** | A named operation that transforms a value | `LOWER(country)` |
| **Identifier** | The name of a real database object — a table or column | `name`, `country`, `customers` |
| **Operator** | A symbol used to compare or combine values | `=` |
| **Value** | A literal piece of data supplied in the query | `'Italy'` |

> 💡 **Why this matters:** when an error says *"syntax error near ..."* or *"column does not exist"*, knowing whether the engine is complaining about a **keyword**, an **identifier**, or a **value** tells you exactly where to look. This vocabulary is also a common quick warm-up question in interviews ("what's the difference between a keyword and an identifier?").

### The full anatomy of a SELECT statement

```sql
SELECT [DISTINCT] column1, column2, ...
FROM table_name
[WHERE condition]
[GROUP BY column(s)]
[HAVING group_condition]
[ORDER BY column(s) [ASC|DESC]]
[LIMIT n];
```

Every clause is optional except `SELECT` and `FROM` (and even `FROM` is optional in some RDBMS for a literal-only query like `SELECT 1+1;`).

### `SELECT` — choosing columns

```sql
SELECT name, salary FROM employees;
SELECT * FROM employees;              -- all columns (avoid in production code)
SELECT name AS employee_name FROM employees;   -- alias
SELECT salary * 12 AS annual_salary FROM employees;  -- computed column
```

- `AS` renames a column in the *output only* — it doesn't change the table.
- You can use expressions, function calls, and even literals in `SELECT`.

### `FROM` — the source table

```sql
SELECT * FROM employees;
```
Later modules cover `FROM` with multiple tables (`JOIN`s). For now: `FROM` just names the table being read.

### `WHERE` — filtering rows

`WHERE` filters **individual rows** *before* any grouping or aggregation happens.

```sql
SELECT * FROM employees WHERE department = 'Engineering';
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE department = 'Engineering' AND salary > 50000;
SELECT * FROM employees WHERE department IN ('Engineering', 'Sales');
SELECT * FROM employees WHERE name LIKE 'A%';         -- starts with 'A'
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 80000;
SELECT * FROM employees WHERE manager_id IS NULL;     -- NULL check (never use = NULL)
```

**Common operators:**

| Operator | Meaning |
|---|---|
| `=`, `!=` / `<>` | Equal, not equal |
| `>`, `<`, `>=`, `<=` | Comparison |
| `AND`, `OR`, `NOT` | Logical combination |
| `IN (...)` | Matches any value in a list |
| `BETWEEN a AND b` | Inclusive range |
| `LIKE` / `ILIKE` (Postgres, case-insensitive) | Pattern matching (`%` = any chars, `_` = one char) |
| `IS NULL` / `IS NOT NULL` | NULL checks (⚠️ never `= NULL`, it always evaluates to unknown) |

> ⚠️ **Common misconception:** `NULL` is not a value — it means "unknown/absent." `salary = NULL` is **never true**, even for rows where salary is `NULL`. You must use `IS NULL`.

### `ORDER BY` — sorting

```sql
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY department ASC, salary DESC;  -- multi-column sort
```
- Default direction is `ASC` (ascending) if unspecified.
- Sorts by multiple columns left to right — first column is the primary sort key, ties broken by the next.
- Can sort by column **alias** or **position number** (`ORDER BY 2`) — position-based sorting is fragile (breaks if columns reorder) and discouraged in production code.

### `GROUP BY` — aggregating rows into summaries

`GROUP BY` collapses multiple rows sharing the same value(s) into a single summary row, typically paired with **aggregate functions**.

```sql
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

**Common aggregate functions:** `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`.

> 📌 **Golden Rule:** Every column in `SELECT` that is *not* wrapped in an aggregate function **must** appear in `GROUP BY`. This is enforced strictly by PostgreSQL (and standard SQL); MySQL historically allowed violations silently (returning an arbitrary row) unless `ONLY_FULL_GROUP_BY` mode is enabled — a classic portability trap.

### `HAVING` — filtering *groups*

```sql
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

`HAVING` is like `WHERE`, but it runs **after** grouping/aggregation, so it can reference aggregate functions (`COUNT(*)`, `SUM(salary)`), which `WHERE` cannot.

### `WHERE` vs `HAVING` — the #1 asked interview distinction

| | `WHERE` | `HAVING` |
|---|---|---|
| Filters | Individual rows | Grouped/aggregated results |
| Runs | Before `GROUP BY` | After `GROUP BY` |
| Can use aggregate functions? | ❌ No | ✅ Yes |
| Performance | Faster (filters early, reduces rows before grouping) | Slower if misused (filters after doing all the grouping work) |

> 💡 **Memory trick:** **"WHERE comes before the party (grouping) starts; HAVING judges the party after it's already happened."**

### `DISTINCT` — removing duplicates

```sql
SELECT DISTINCT department FROM employees;
SELECT DISTINCT department, job_title FROM employees;  -- distinct COMBINATIONS
```
`DISTINCT` applies to the **entire row** of selected columns, not each column independently. `SELECT DISTINCT a, b` returns unique `(a, b)` pairs, not unique `a` values and unique `b` values separately.

### `LIMIT` / `TOP` — restricting row count

```sql
-- PostgreSQL / MySQL / SQLite
SELECT * FROM employees ORDER BY salary DESC LIMIT 5;

-- SQL Server
SELECT TOP 5 * FROM employees ORDER BY salary DESC;

-- With offset (pagination) — PostgreSQL/MySQL
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 20;
```

> ⚠️ **Common confusion:** `LIMIT` (PostgreSQL/MySQL/SQLite) vs `TOP` (SQL Server) vs `FETCH FIRST n ROWS ONLY` (Oracle, ANSI standard) — same concept, different syntax per vendor. Always pair with `ORDER BY`; without it, "top N" is meaningless because row order isn't guaranteed.

### 🚀 The Most Important Concept in This Module: Logical Query Execution Order

SQL is **written** in one order, but the database engine **executes (evaluates)** it in a *completely different, fixed logical order*. This mismatch is the source of many "why doesn't this work" bugs and is a top-tier interview topic.

**Written order:**
```
SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT
```

**Logical execution order:**
```
1. FROM        (identify source table(s))
2. WHERE       (filter individual rows)
3. GROUP BY    (group filtered rows)
4. HAVING      (filter groups)
5. SELECT      (compute/select final columns, apply aliases)
6. DISTINCT    (remove duplicate rows from the selected output)
7. ORDER BY    (sort the final result)
8. LIMIT/OFFSET (restrict row count)
```

This ordering explains **every** "gotcha" in this module:
- **Why `WHERE` can't use column aliases from `SELECT`** → because `WHERE` (step 2) runs *before* `SELECT` (step 5) even computes those aliases.
- **Why `HAVING` can use aggregate functions but `WHERE` can't** → because `HAVING` (step 4) runs *after* `GROUP BY` (step 3) has already computed aggregates.
- **Why `ORDER BY` *can* use column aliases** → because it runs (step 7) *after* `SELECT` (step 5) has defined them.
- **Why `LIMIT` applies to the final sorted result** → it's dead last (step 8).

> 💡 **Memory trick (mnemonic for logical order):** **"F**riends **W**ho **G**o **H**iking **S**hould **D**rink **O**ften, **L**ater"**
> **F**ROM → **W**HERE → **G**ROUP BY → **H**AVING → **S**ELECT → **D**ISTINCT → **O**RDER BY → **L**IMIT

---

## 3. Visual Understanding

**Written order vs. Execution order:**

```
WRITTEN ORDER (how you type it)
┌────────┬──────┬───────┬──────────┬────────┬──────────┬───────┐
│ SELECT │ FROM │ WHERE │ GROUP BY │ HAVING │ ORDER BY │ LIMIT │
└────────┴──────┴───────┴──────────┴────────┴──────────┴───────┘

LOGICAL EXECUTION ORDER (how the engine actually evaluates it)
 ①FROM → ②WHERE → ③GROUP BY → ④HAVING → ⑤SELECT → ⑥DISTINCT → ⑦ORDER BY → ⑧LIMIT
```

**Data flowing through the pipeline:**

```
 [ employees table: 1000 rows ]
            │
            ▼  ① FROM — load the table
 [ 1000 rows ]
            │
            ▼  ② WHERE — keep only department = 'Engineering'
 [ 120 rows ]
            │
            ▼  ③ GROUP BY job_title — collapse into groups
 [ 6 groups: Backend, Frontend, DevOps, QA, Data, ML ]
            │
            ▼  ④ HAVING COUNT(*) > 10 — keep only big groups
 [ 3 groups: Backend, Frontend, QA ]
            │
            ▼  ⑤ SELECT job_title, COUNT(*) — compute output columns
 [ 3 rows: (Backend, 25), (Frontend, 18), (QA, 14) ]
            │
            ▼  ⑥ DISTINCT (if used) — dedupe final rows
            ▼  ⑦ ORDER BY COUNT(*) DESC — sort
 [ (Backend, 25), (Frontend, 18), (QA, 14) ]
            │
            ▼  ⑧ LIMIT 2
 [ (Backend, 25), (Frontend, 18) ]  ← FINAL RESULT
```

**GROUP BY as a "bucket sort":**

```
 Rows:                    GROUP BY department:
 (Alice, Sales, 40k)      ┌─────────────┐
 (Bob, Eng, 60k)          │   Sales     │ → Alice(40k), Carol(45k)
 (Carol, Sales, 45k)      ├─────────────┤
 (Dave, Eng, 70k)         │   Eng       │ → Bob(60k), Dave(70k)
                          └─────────────┘
```

---

## 4. Syntax

### Full syntax reference

```sql
SELECT [DISTINCT] select_list
FROM table_name
[WHERE condition]
[GROUP BY grouping_columns]
[HAVING group_condition]
[ORDER BY sort_columns [ASC | DESC]]
[LIMIT count [OFFSET skip]];
```

| Clause | Optional? | Purpose | Can reference aggregates? |
|---|---|---|---|
| `SELECT` | ❌ Required | Choose output columns/expressions | ✅ Yes |
| `FROM` | ⚠️ Usually required | Source table(s) | — |
| `WHERE` | ✅ Optional | Filter rows | ❌ No |
| `GROUP BY` | ✅ Optional | Group rows | — |
| `HAVING` | ✅ Optional (requires GROUP BY conceptually) | Filter groups | ✅ Yes |
| `ORDER BY` | ✅ Optional | Sort output | ✅ Yes (via alias or expression) |
| `LIMIT` / `TOP` | ✅ Optional | Restrict row count | — |

**Best practices:**
- ✅ Always list explicit column names instead of `SELECT *` in application code.
- ✅ Always pair `LIMIT`/`TOP` with `ORDER BY`.
- ✅ Use meaningful aliases (`AS total_sales`, not `AS x`).
- ✅ Format multi-clause queries with each clause on its own line, indented consistently.

**Bad practices:**
- ⚠️ `SELECT *` in production — wastes bandwidth, breaks if columns are added/reordered, and defeats certain index-only optimizations.
- ⚠️ Mixing aggregated and non-aggregated columns without `GROUP BY` (undefined/inconsistent behavior on lenient RDBMS).
- ⚠️ Using `HAVING` for row-level filters that `WHERE` could handle far more efficiently.

---

## 5. Examples

Assume this `employees` table:

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary NUMERIC(10,2),
    hired_on DATE
);
```

### Very Basic
```sql
SELECT name FROM employees;
SELECT * FROM employees;
```

### Intermediate
```sql
SELECT name, salary
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC;
```

```sql
SELECT DISTINCT department FROM employees;
```

```sql
SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department;
```

### Advanced
```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE hired_on >= '2023-01-01'
GROUP BY department
HAVING AVG(salary) > 60000
ORDER BY avg_salary DESC
LIMIT 3;
```
*Reads as: "Among employees hired since 2023, group by department, keep only departments averaging over 60k, sort highest-average first, and show the top 3."*

### Real Project Example — Backend API
```sql
-- GET /api/employees?department=Engineering&sort=salary_desc&page=2
SELECT id, name, salary
FROM employees
WHERE department = 'Engineering'
ORDER BY salary DESC
LIMIT 10 OFFSET 10;   -- page 2, 10 per page
```
*This single query IS the pagination + filter + sort logic behind a typical "employee list" API endpoint.*

### E-commerce Example
```sql
-- Top 5 best-selling products by quantity sold
SELECT product_id, SUM(quantity) AS total_sold
FROM order_items
GROUP BY product_id
ORDER BY total_sold DESC
LIMIT 5;
```

```sql
-- Distinct list of countries customers ship to
SELECT DISTINCT shipping_country FROM orders;
```

### Hospital Management Example
```sql
-- Doctors with more than 20 appointments this month
SELECT doctor_id, COUNT(*) AS appointment_count
FROM appointments
WHERE appointment_date >= '2026-08-01'
GROUP BY doctor_id
HAVING COUNT(*) > 20
ORDER BY appointment_count DESC;
```

### Banking Example
```sql
-- Accounts with balance over 100000, sorted highest first
SELECT account_number, balance
FROM accounts
WHERE balance > 100000
ORDER BY balance DESC
LIMIT 10;
```

```sql
-- Total transaction amount per account this month, only accounts with 50+ transactions
SELECT account_id, SUM(amount) AS total_amount, COUNT(*) AS txn_count
FROM transactions
WHERE transaction_date >= '2026-08-01'
GROUP BY account_id
HAVING COUNT(*) >= 50;
```

### Analytics Example
```sql
-- Page views per URL, top 10, last 7 days
SELECT page_url, COUNT(*) AS views
FROM page_views
WHERE viewed_at >= NOW() - INTERVAL '7 days'
GROUP BY page_url
ORDER BY views DESC
LIMIT 10;
```

---

## 6. Behind the Scenes

When the RDBMS receives a `SELECT` statement, here's the internal pipeline:

```
 SQL text
    │
    ▼
 1. PARSER — validates syntax, builds a parse tree
    │
    ▼
 2. ANALYZER — resolves table/column names against the system catalog,
    checks types & permissions
    │
    ▼
 3. QUERY REWRITER — expands views, applies rules
    │
    ▼
 4. OPTIMIZER (Query Planner) — THE MOST IMPORTANT STEP
    - Considers multiple possible "execution plans"
      (e.g., full table scan vs. index scan for WHERE)
    - Estimates cost of each plan using table statistics
      (row counts, data distribution histograms)
    - Picks the cheapest plan
    │
    ▼
 5. EXECUTOR — runs the chosen plan:
    - Reads pages from disk/buffer cache
    - Applies WHERE filter (often pushed down to the scan itself)
    - Performs GROUP BY (via hashing or pre-sorted data)
    - Performs ORDER BY (via sorting, often using work_mem/sort buffers)
    - Applies LIMIT (can stop early once N rows found!)
    │
    ▼
 [ Result set streamed back to client ]
```

**How `WHERE` is actually executed:**
- If there's an **index** on the filtered column, the optimizer may choose an **Index Scan** (jump straight to matching rows) instead of a **Sequential/Full Table Scan** (read every row and check the condition). This is *the* single biggest performance lever in SQL.
- You can see the chosen plan with `EXPLAIN SELECT ...` (and `EXPLAIN ANALYZE` for actual runtime stats) — an essential real-world debugging tool.

**How `GROUP BY` is executed internally (two common strategies):**
1. **Hash Aggregate:** Build an in-memory hash table keyed by the group columns, accumulate aggregates per bucket. Fast, but memory-hungry for high-cardinality groups.
2. **Sort + Group:** Sort rows by the group columns first (often reusing an index), then walk through sequentially, aggregating adjacent identical keys. Slower to start but memory-efficient.
The optimizer picks based on estimated group count and available memory (`work_mem` in PostgreSQL).

**How `ORDER BY` is executed:**
- If an index already exists in the required sort order, the engine can skip sorting entirely (**index already sorted** — very fast).
- Otherwise, it performs an explicit **sort** operation, which uses memory (and can spill to disk for huge result sets — visible as "external merge sort" in `EXPLAIN ANALYZE` output).

**How `LIMIT` is executed:**
- Crucially, `LIMIT` is applied **last**, but a smart optimizer combined with `ORDER BY` + an index can **stop scanning early** once it has enough rows — this is why `ORDER BY indexed_col LIMIT 10` can be dramatically faster than sorting the entire table.

**Indexing impact — the golden rule:**
> Any column frequently used in `WHERE`, `JOIN`, or `ORDER BY` is a strong candidate for an index. Without one, the engine must scan every row (`O(n)`); with one, lookups approach `O(log n)`.

---

## 7. Common Mistakes

| Mistake | Why it happens | How to avoid it |
|---|---|---|
| Using a `SELECT` column alias inside `WHERE` | Beginners assume top-to-bottom execution | Remember logical order: `WHERE` runs before `SELECT` computes aliases. Repeat the full expression in `WHERE`, or use a subquery/CTE |
| Putting aggregate conditions in `WHERE` instead of `HAVING` | Doesn't realize `WHERE` can't see aggregated values yet | Use `HAVING` for conditions on `COUNT()`, `SUM()`, etc. |
| Selecting non-aggregated columns not in `GROUP BY` | MySQL (legacy mode) silently allows it, masking the bug | Always include every non-aggregated `SELECT` column in `GROUP BY`; enable strict mode |
| Assuming row order without `ORDER BY` | Data often *appears* to come back in insertion order by coincidence | Never rely on implicit order — always specify `ORDER BY` when order matters |
| Using `DISTINCT` to hide duplicate rows from a bad `JOIN` | Quick "fix" that suppresses symptoms | Investigate *why* duplicates appear (usually a `JOIN` fan-out) rather than masking with `DISTINCT` |
| Writing `salary = NULL` instead of `salary IS NULL` | `NULL` looks like a normal value | Always use `IS NULL` / `IS NOT NULL` for NULL checks |
| Forgetting `LIMIT` needs `ORDER BY` to be meaningful | "Top N" feels intuitive without sorting | Always pair `LIMIT`/`TOP` with an explicit `ORDER BY` |
| Using `SELECT *` and then being surprised when a schema change breaks the app | Convenient during quick prototyping | List explicit columns, especially in production/API code |
| Confusing `HAVING` and `WHERE` performance | Doesn't know `HAVING` runs after all rows are already grouped | Push filters into `WHERE` whenever they don't depend on an aggregate |

---

## 8. Best Practices

- ✅ Always use explicit column lists in `SELECT`, never `*`, in application/production code.
- ✅ Filter as early as possible — prefer `WHERE` over `HAVING` whenever the condition doesn't need an aggregate.
- ✅ Always pair `LIMIT`/`TOP` with `ORDER BY`.
- ✅ Use clear, descriptive aliases (`AS total_revenue`, not `AS x` or `AS t`).
- ✅ Format complex queries with each clause on a new line and consistent indentation — readability matters as much in SQL as in any other code.
- ✅ Use `EXPLAIN` / `EXPLAIN ANALYZE` before shipping a query that touches a large table.
- ✅ Index columns used in `WHERE`, `ORDER BY`, and `JOIN` conditions on large tables.
- ⚠️ Avoid functions on indexed columns in `WHERE` (e.g., `WHERE YEAR(hired_on) = 2024`) — this often prevents the index from being used. Prefer range conditions: `WHERE hired_on >= '2024-01-01' AND hired_on < '2025-01-01'`.
- ⚠️ Don't overuse `DISTINCT` as a crutch — understand and fix the root cause of duplicate rows.
- ⚠️ Avoid deeply nested, unreadable one-liners — break complex logic into CTEs (covered in a later module) for clarity.

---

## 9. Interview Preparation

### Beginner
0. What are the components of a SQL statement (clause, keyword, identifier, operator, value)? Give an example of each.
1. What does `SELECT *` do, and why is it discouraged in production?
2. What is the default sort order of `ORDER BY`?
3. What does `DISTINCT` do?
4. How do you limit the number of rows returned?
5. How do you check for `NULL` values correctly?

### Intermediate
6. What is the difference between `WHERE` and `HAVING`?
7. Can you use an aggregate function in `WHERE`? Why or why not?
8. What is the difference between `LIMIT` and `TOP`?
9. Why can't you reference a `SELECT` alias inside `WHERE`?
10. What happens if you `SELECT` a column that isn't in `GROUP BY` and isn't aggregated?

### Advanced
11. Explain the full logical execution order of a SQL `SELECT` query.
12. How does an RDBMS decide between a full table scan and an index scan for a `WHERE` clause?
13. How does `GROUP BY` work internally — name two strategies the engine might use.
14. Why can `ORDER BY` sometimes be "free" (no extra cost)?
15. Why might `LIMIT` make a query dramatically faster, and when does it *not* help?

### Scenario-Based
16. *"A `SELECT` query with a `WHERE` clause is timing out on a 10-million-row table. Walk me through your debugging steps."*
17. *"Your report shows duplicate customer rows even though you didn't expect duplicates. Diagnose."*

### Follow-up Questions
18. If `HAVING` can filter aggregates, why not just always use `HAVING` instead of `WHERE`?
19. Does `DISTINCT` guarantee any particular row order?

### Tricky Questions
20. Can `GROUP BY` be used without any aggregate function in `SELECT`? What would that even mean?
21. Is `ORDER BY` guaranteed to run before or after `LIMIT`? What happens if you get this backwards mentally?

### MCQs
22. Which clause filters groups after aggregation?
    a) WHERE  b) HAVING  c) GROUP BY  d) ORDER BY
23. Which clause runs first in logical execution order?
    a) SELECT  b) WHERE  c) FROM  d) ORDER BY

### True/False
24. `WHERE` can reference aggregate functions like `COUNT()`. (False)
25. `ORDER BY` can reference a `SELECT` column alias. (True)
26. `DISTINCT` operates on each column independently. (False — operates on the full row/tuple of selected columns)

### Explain the Output
```sql
SELECT department, COUNT(*) AS cnt
FROM employees
GROUP BY department
ORDER BY cnt DESC
LIMIT 1;
```
27. What does this return? *(The single department with the most employees.)*

### Debug the Query
```sql
SELECT department, salary
FROM employees
WHERE COUNT(*) > 5
GROUP BY department;
```
28. Find and fix the bug. *(`COUNT(*)` can't be used in `WHERE`; move it to `HAVING` and fix the `SELECT` list — `salary` isn't aggregated or grouped.)*

---

## 10. Practice Section

> Solve first, then check the [Quick Revision Notes](#11-quick-revision-notes) and your own test database to verify.

Assume tables: `employees(id, name, department, salary, hired_on)`, `orders(id, customer_id, amount, order_date, status)`.

**10 Easy**
1. Select all columns from `employees`.
2. Select only `name` and `salary` from `employees`.
3. Select employees in the `'Sales'` department.
4. Select employees with `salary > 50000`.
5. Select all distinct `department` values.
6. Select employees sorted by `salary` descending.
7. Select the top 5 highest-paid employees.
8. Select employees hired after `'2023-01-01'`.
9. Select employees whose `department` is `NULL`.
10. Select employees whose `name` starts with `'A'`.

**10 Medium**
11. Count the number of employees in each department.
12. Find the average salary per department.
13. Find departments with more than 10 employees.
14. Find the highest salary in each department.
15. List orders with `status = 'pending'`, sorted by `order_date` ascending.
16. Find the total order `amount` per `customer_id`.
17. Find customers with total order amount greater than 5000.
18. Select distinct combinations of `department` and whether `salary > 60000` (hint: use a computed column).
19. Find the 3 most recent orders.
20. Count how many orders each status has, sorted by count descending.

**10 Hard**
21. Find departments where the average salary exceeds the company-wide average salary of 55000, showing only departments with more than 5 employees.
22. Find the second-highest salary overall using `ORDER BY` + `LIMIT`/`OFFSET` (without `MAX`).
23. Explain why `SELECT department, salary FROM employees GROUP BY department` fails/misbehaves, and rewrite it correctly depending on intent.
24. Write a query returning departments and their employee count, but only for departments with an average salary above 60000 AND more than 3 employees.
25. Find all orders placed in the last 30 days, per customer, only customers with more than 2 such orders, sorted by order count descending, limited to the top 5 customers.
26. Explain, using the logical execution order, why this fails: `SELECT id, COUNT(*) AS cnt FROM orders WHERE cnt > 1 GROUP BY id;`
27. Rewrite the same query correctly.
28. A query using `LIMIT 10` after `ORDER BY` on an indexed column runs instantly; the same `LIMIT 10` after `ORDER BY` on a non-indexed column is slow. Explain why.
29. Design a query to detect duplicate customer emails (same email appearing more than once).
30. Explain what happens (correctness-wise) if you use `HAVING` without a preceding `GROUP BY`.

**5 Real Interview Problems**
31. *"Write a query to find the top 3 departments by total salary spend."*
32. *"Find all employees who earn more than the average salary in their own department."* (hint: needs a subquery — foreshadowing next module, but attempt with what you know)
33. *"Explain, step by step, what happens internally when this query runs: `SELECT dept, COUNT(*) FROM employees GROUP BY dept HAVING COUNT(*) > 5 ORDER BY COUNT(*) DESC LIMIT 3;`"*
34. *"Why would adding `DISTINCT` to a query silently 'fix' a bug, and why is that dangerous?"*
35. *"When would `ORDER BY` not need to perform any actual sorting work?"*

**5 Business Problems**
36. An e-commerce dashboard needs "Top 10 products by revenue this month." Write the query.
37. A hospital admin wants "doctors who saw more than 15 patients this week," sorted by patient count. Write the query.
38. A bank compliance team wants "accounts with more than 20 transactions in a single day" (a fraud-detection style query). Write the query.
39. A CRM needs "list of distinct industries our customers belong to, alphabetically sorted."
40. An analytics team wants "the 5 least-visited pages in the last 7 days" (to find candidates for removal).

---

## 11. Quick Revision Notes

- A SQL statement is built from: comments (`--`), clauses (`SELECT`/`FROM`/`WHERE`), keywords, functions (`LOWER()`), identifiers (table/column names), operators (`=`), and values (`'Italy'`).
- `SELECT` picks columns; `FROM` picks the table; `WHERE` filters rows; `GROUP BY` summarizes; `HAVING` filters summaries; `ORDER BY` sorts; `LIMIT`/`TOP` caps row count.
- **Logical execution order:** `FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT`.
- `WHERE` filters rows *before* grouping and **cannot** use aggregate functions.
- `HAVING` filters groups *after* aggregation and **can** use aggregate functions.
- Every non-aggregated `SELECT` column must appear in `GROUP BY`.
- `DISTINCT` removes duplicate full rows (tuples), not per-column.
- `LIMIT` (Postgres/MySQL/SQLite) = `TOP` (SQL Server) = `FETCH FIRST n ROWS ONLY` (Oracle/ANSI).
- Always pair `LIMIT`/`TOP` with `ORDER BY` — otherwise "top N" is meaningless.
- `NULL` checks always use `IS NULL` / `IS NOT NULL`, never `= NULL`.
- Column aliases defined in `SELECT` can be used in `ORDER BY` but **not** in `WHERE`/`GROUP BY`/`HAVING` in most RDBMS (PostgreSQL allows alias in `GROUP BY`/`ORDER BY` as an extension; MySQL is similarly lenient — but not in standard-strict engines).

---

## 12. Cheat Sheet

| Clause | Filters/Acts On | Runs (logical order) | Can use aggregates? |
|---|---|---|---|
| `FROM` | Source table(s) | 1st | — |
| `WHERE` | Individual rows | 2nd | ❌ |
| `GROUP BY` | Groups rows by column(s) | 3rd | — |
| `HAVING` | Groups | 4th | ✅ |
| `SELECT` | Output columns/expressions | 5th | ✅ |
| `DISTINCT` | Final row set | 6th | — |
| `ORDER BY` | Final row set | 7th | ✅ (via alias) |
| `LIMIT`/`TOP` | Final row set | 8th | — |

| Aggregate Function | Purpose |
|---|---|
| `COUNT(*)` | Number of rows |
| `COUNT(column)` | Number of non-NULL values in column |
| `SUM(column)` | Total |
| `AVG(column)` | Average |
| `MIN(column)` | Smallest value |
| `MAX(column)` | Largest value |

| RDBMS | "Top N" syntax |
|---|---|
| PostgreSQL / MySQL / SQLite | `LIMIT n` |
| SQL Server | `TOP n` |
| Oracle / ANSI SQL | `FETCH FIRST n ROWS ONLY` |

---

## 13. Mind Map

```
SELECT (Query Data)
├── SQL Components — comment, statement, clause, keyword, function, identifier, operator, value
├── SELECT — choose columns / expressions / aliases
├── FROM — source table
├── WHERE — filter rows
│   ├── =, !=, >, <, >=, <=
│   ├── AND / OR / NOT
│   ├── IN, BETWEEN, LIKE
│   └── IS NULL / IS NOT NULL
├── GROUP BY — summarize rows into groups
│   └── paired with COUNT/SUM/AVG/MIN/MAX
├── HAVING — filter groups (post-aggregation)
├── DISTINCT — remove duplicate rows
├── ORDER BY — sort (ASC default / DESC)
├── LIMIT / TOP / OFFSET — restrict + paginate results
└── Query Order & Execution
    ├── Written order: SELECT→FROM→WHERE→GROUP BY→HAVING→ORDER BY→LIMIT
    └── Logical order: FROM→WHERE→GROUP BY→HAVING→SELECT→DISTINCT→ORDER BY→LIMIT
```

---

## 14. Flashcards

0a. **Q:** What is a "clause" in SQL? → **A:** A major building block of a statement that starts with a keyword and does one job (e.g., `WHERE country = 'Italy'`).
0b. **Q:** What is an "identifier" in SQL? → **A:** The name of a real database object — a table or column (e.g., `customers`, `country`).
0c. **Q:** What's the difference between a keyword and a function? → **A:** A keyword is a reserved word (`SELECT`, `WHERE`); a function is a named operation applied to a value (`LOWER(country)`).
1. **Q:** What does `SELECT` do? → **A:** Retrieves specified columns/expressions from a table.
2. **Q:** What is the only DQL command? → **A:** `SELECT`.
3. **Q:** What does `WHERE` filter? → **A:** Individual rows, before grouping.
4. **Q:** What does `HAVING` filter? → **A:** Grouped/aggregated results, after `GROUP BY`.
5. **Q:** Can `WHERE` use aggregate functions? → **A:** No.
6. **Q:** Can `HAVING` use aggregate functions? → **A:** Yes.
7. **Q:** What is the default `ORDER BY` direction? → **A:** Ascending (`ASC`).
8. **Q:** What does `DISTINCT` remove? → **A:** Duplicate rows (based on the full selected row, not per column).
9. **Q:** What's the correct way to check for `NULL`? → **A:** `IS NULL` / `IS NOT NULL`, never `= NULL`.
10. **Q:** What's the SQL Server equivalent of `LIMIT`? → **A:** `TOP`.
11. **Q:** What's the Oracle/ANSI equivalent of `LIMIT`? → **A:** `FETCH FIRST n ROWS ONLY`.
12. **Q:** What must every non-aggregated `SELECT` column also appear in? → **A:** The `GROUP BY` clause.
13. **Q:** What's the logical execution order of a SELECT query? → **A:** FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT.
14. **Q:** Why can't `WHERE` use a `SELECT` alias? → **A:** Because `WHERE` executes before `SELECT` computes that alias.
15. **Q:** Why can `ORDER BY` use a `SELECT` alias? → **A:** Because `ORDER BY` executes after `SELECT`.
16. **Q:** What does `COUNT(*)` count? → **A:** All rows, including those with NULLs.
17. **Q:** What does `COUNT(column)` count? → **A:** Only non-NULL values in that column.
18. **Q:** What SQL keyword combines `LIMIT` with skipping rows? → **A:** `OFFSET`.
19. **Q:** What's the risk of `SELECT *` in production code? → **A:** Breaks on schema changes, wastes bandwidth, prevents some optimizations.
20. **Q:** What does `LIKE 'A%'` match? → **A:** Any string starting with 'A'.
21. **Q:** What does `LIKE '%a'` match? → **A:** Any string ending with 'a'.
22. **Q:** What does `_` mean in a `LIKE` pattern? → **A:** Exactly one character.
23. **Q:** What does `BETWEEN a AND b` include? → **A:** An inclusive range from a to b.
24. **Q:** How do you sort by two columns? → **A:** `ORDER BY col1, col2` (col1 is primary sort key).
25. **Q:** What is a "full table scan"? → **A:** Reading every row to evaluate a condition, used when no suitable index exists.
26. **Q:** What tool shows the query execution plan? → **A:** `EXPLAIN` (`EXPLAIN ANALYZE` for actual runtime).
27. **Q:** What are the two common internal strategies for `GROUP BY`? → **A:** Hash Aggregate and Sort + Group.
28. **Q:** Why should `LIMIT` always be paired with `ORDER BY`? → **A:** Without a defined order, "the first N rows" is arbitrary/undefined.
29. **Q:** Does `DISTINCT` guarantee any output order? → **A:** No, unless combined with `ORDER BY`.
30. **Q:** What happens if a `GROUP BY` column has NULL values? → **A:** All NULLs are grouped together into a single group.
31. **Q:** Is `HAVING` typically slower than an equivalent `WHERE` filter? → **A:** Yes, because it filters after all grouping/aggregation work is already done.
32. **Q:** What is the correct fix for "column X must appear in GROUP BY" errors? → **A:** Either add X to `GROUP BY` or wrap it in an aggregate function.

---

## 15. Real Project Usage

| Domain | How SELECT/WHERE/GROUP BY/HAVING/ORDER BY/LIMIT show up |
|---|---|
| **Hospital ERP** | "Doctors with >15 appointments this week" = `GROUP BY` + `HAVING`; "next 10 upcoming appointments" = `WHERE` + `ORDER BY` + `LIMIT` |
| **Banking** | Fraud detection queries: `GROUP BY account_id HAVING COUNT(*) > threshold`; statements: `WHERE date BETWEEN ... ORDER BY date` |
| **E-commerce** | Product listing pages: `WHERE category = ? ORDER BY price LIMIT 20 OFFSET ?` (pagination); "best sellers": `GROUP BY product_id ORDER BY SUM(qty) DESC LIMIT 10` |
| **Inventory** | "Items below reorder threshold": `WHERE stock_quantity < reorder_level`; "distinct suppliers": `SELECT DISTINCT supplier_id` |
| **CRM** | Lead lists filtered by `WHERE status = 'hot'`, sorted by `ORDER BY last_contacted ASC` for follow-up prioritization |
| **Analytics** | Every dashboard chart is a `GROUP BY` + aggregate + `ORDER BY`, often with a `LIMIT` for "top N" widgets |
| **Social Media** | Feed queries: `WHERE user_id IN (following list) ORDER BY created_at DESC LIMIT 20` (infinite scroll pagination) |

---

## 16. Interview Revision

**Top 20 Interview Questions**
1. What is the logical order of execution of a SELECT query? 2. WHERE vs HAVING? 3. Why can't WHERE use aggregate functions? 4. Why can't WHERE use a SELECT alias? 5. What does DISTINCT operate on? 6. LIMIT vs TOP? 7. What's the default ORDER BY direction? 8. What must accompany every non-aggregated SELECT column when GROUP BY is used? 9. COUNT(*) vs COUNT(column)? 10. How do you correctly check for NULL? 11. Why pair LIMIT with ORDER BY? 12. What is a full table scan vs an index scan? 13. How does GROUP BY work internally? 14. Can ORDER BY use a computed/aliased column? 15. What is OFFSET used for? 16. What's the risk of SELECT *? 17. What does LIKE '%x%' match? 18. What are the 5 core aggregate functions? 19. Why might HAVING be slower than WHERE for the same logical filter? 20. What happens to NULLs during GROUP BY?

**Top 20 One-Line Answers**
1. FROM→WHERE→GROUP BY→HAVING→SELECT→DISTINCT→ORDER BY→LIMIT. 2. WHERE filters rows before grouping; HAVING filters groups after. 3. Aggregates don't exist yet when WHERE runs. 4. SELECT (and its aliases) execute after WHERE. 5. The entire selected row (tuple), not individual columns. 6. Same purpose, different vendors: LIMIT (Postgres/MySQL), TOP (SQL Server). 7. Ascending (ASC). 8. It must be included in GROUP BY. 9. COUNT(*) counts all rows; COUNT(column) skips NULLs in that column. 10. Use IS NULL / IS NOT NULL. 11. Without explicit order, "top N" rows are undefined/arbitrary. 12. Full scan reads every row; index scan jumps directly via an index structure. 13. Via Hash Aggregate or Sort+Group strategies. 14. Yes — ORDER BY runs after SELECT computes aliases. 15. Skipping N rows before returning results (pagination). 16. Breaks on schema changes, wastes bandwidth, hides intent. 17. Any string containing 'x' anywhere. 18. COUNT, SUM, AVG, MIN, MAX. 19. Because HAVING runs after all the grouping work is already complete. 20. All NULL values are grouped together as one group.

**Top 20 Quick Facts**
1. SELECT is the only DQL command. 2. WHERE always runs before GROUP BY. 3. HAVING always runs after GROUP BY. 4. DISTINCT applies to full rows, not per column. 5. LIMIT without ORDER BY gives unpredictable rows. 6. Column aliases work in ORDER BY, not in WHERE. 7. MySQL historically allowed non-standard GROUP BY (before strict mode). 8. PostgreSQL strictly enforces the GROUP BY rule. 9. EXPLAIN ANALYZE shows real execution stats, not just estimates. 10. Index scans beat full table scans on large filtered tables. 11. LIMIT can allow early-exit optimization when combined with an index-backed ORDER BY. 12. NULL is never equal to anything, including itself, under `=`. 13. BETWEEN is inclusive on both ends. 14. LIKE '%' wildcards can prevent index usage if the pattern starts with '%'. 15. AVG() ignores NULL values by default. 16. GROUP BY can group by multiple columns. 17. ORDER BY can sort by multiple columns with independent ASC/DESC per column. 18. OFFSET can be slow on large tables (it still scans/skips rows). 19. SQL Server's TOP goes right after SELECT, not at the end of the query. 20. FETCH FIRST n ROWS ONLY is the ANSI SQL standard, adopted by Oracle/PostgreSQL/DB2.

---

## 17. Final Summary

`SELECT` is SQL's single query-reading command (DQL), and its clauses — `FROM`, `WHERE`, `GROUP BY`, `HAVING`, `ORDER BY`, `DISTINCT`, `LIMIT`/`TOP` — each answer a specific question about *which* data you want and *how* you want it shaped. `FROM` picks the source; `WHERE` filters individual rows; `GROUP BY` collapses rows into per-category summaries (usually with `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`); `HAVING` filters those summaries; `DISTINCT` removes duplicate output rows; `ORDER BY` sorts; `LIMIT`/`TOP`/`OFFSET` restricts and paginates the final result.

The single most important idea in this entire module is that **the order you write a query is not the order the database evaluates it**. The engine actually processes `FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT`. This explains why `WHERE` cannot use aggregate functions or `SELECT` aliases (they don't exist yet at that stage), why `HAVING` *can* use aggregates (grouping already happened), and why `ORDER BY` *can* use aliases (`SELECT` has already run). Internalizing this pipeline turns "SQL syntax memorization" into "SQL reasoning" — and it is one of the most frequently tested concepts in technical interviews.

Behind the scenes, the RDBMS parses your query, resolves it against the system catalog, and — critically — runs it through a **query optimizer** that chooses the cheapest execution plan: full table scan vs. index scan for `WHERE`, hash-aggregate vs. sort-based grouping for `GROUP BY`, and whether `ORDER BY` needs an explicit sort or can piggyback on an existing index. Understanding this is what separates "a query that returns correct results" from "a query that also performs well at scale" — the difference that matters the moment your table grows from 1,000 rows to 10 million.

In real systems, this module's clauses power nearly every read-heavy feature you'll build: paginated product/employee/order lists (`WHERE` + `ORDER BY` + `LIMIT`/`OFFSET`), dashboards and reports (`GROUP BY` + aggregates + `HAVING`), search/autocomplete (`WHERE ... LIKE`), and fraud/anomaly detection (`GROUP BY` + `HAVING COUNT(*) > threshold`). Mastering `SELECT` well is the single highest-leverage skill in this entire SQL course — the next modules (joins, subqueries, window functions) are all extensions built directly on top of it.

---

## 🧠 20 Revision Questions — Test Yourself

1. What is the full logical execution order of a `SELECT` query, and how does it differ from the order you write it in?
2. What is the difference between `WHERE` and `HAVING`, with an example of each?
3. Why can't you use an aggregate function inside `WHERE`?
4. Why can't you reference a `SELECT` column alias inside `WHERE`, but you *can* inside `ORDER BY`?
5. What does `DISTINCT` actually operate on — individual columns or full rows?
6. What is the difference between `COUNT(*)` and `COUNT(column_name)`?
7. Why should `LIMIT`/`TOP` always be paired with `ORDER BY`?
8. What happens if a `SELECT` list includes a non-aggregated column that isn't in `GROUP BY`?
9. What's the correct way to filter for `NULL` values, and why doesn't `= NULL` work?
10. Name the five core aggregate functions.
11. What is the difference between `LIMIT`, `TOP`, and `FETCH FIRST n ROWS ONLY`?
12. Explain, internally, how the database engine decides between a full table scan and an index scan for a `WHERE` clause.
13. Name the two common internal strategies a database might use to execute `GROUP BY`.
14. Why can `ORDER BY` sometimes require zero extra sorting cost?
15. What's wrong with routinely using `DISTINCT` to "clean up" query results that show unexpected duplicates?
16. What does `BETWEEN a AND b` include — is it inclusive or exclusive on the bounds?
17. How would you find the "top 3 customers by total order amount, only among customers with more than 5 orders"? (Name the clauses you'd use, in order.)
18. What tool would you use to inspect how the database plans to execute a slow query?
19. Why is `SELECT *` discouraged in production backend code?
20. In your own words, explain why understanding logical query execution order helps you debug SQL faster than memorizing syntax alone.
