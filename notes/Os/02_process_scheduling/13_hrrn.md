---
title: HRRN Scheduling
description: Detailed explanation of Highest Response Ratio Next (HRRN) CPU scheduling, including the Response Ratio formula, characteristics, and its advantages over SJF.
---

# Highest Response Ratio Next (HRRN) Scheduling

**Highest Response Ratio Next (HRRN)** is a non-preemptive CPU scheduling algorithm that is considered one of the most optimal. It is designed to overcome the problem of starvation found in the Shortest Job First (SJF) algorithm by introducing an "Aging" factor into the selection criteria.

---

## 📈 The Response Ratio Formula
In HRRN, the process with the **highest response ratio** is selected for execution next. The ratio is calculated using the following formula:

**Response Ratio (RR) = (W + S) / S**

Where:
- **W**: Waiting time of the process so far.
- **S**: Burst time (Service time) of the process.

> 💡 **Why it works**: 
> - If burst time (S) is small, the ratio becomes large (favors **Short Jobs**).
> - If waiting time (W) is large, the ratio becomes large (favors **Long-waiting Jobs**).

---

## ⭐ Characteristics
- **Non-Preemptive**: Once a process starts, it runs until completion.
- **Starvation-Free**: Unlike SJF, it prevents starvation because the response ratio increases as a process waits longer.
- **Optimal Balance**: It balances the needs of both short processes and long-waiting processes.

---

## 📊 Example Calculation
Consider the following set of processes:

| Process | Arrival Time | Burst Time |
| :--- | :--- | :--- |
| P1 | 0 | 5 |
| P2 | 1 | 3 |
| P3 | 2 | 8 |
| P4 | 3 | 6 |

**Step-by-Step Execution:**
1.  **Time 0**: Only **P1** is available. It runs for 5ms (finishes at T=5).
2.  **Time 5**: P2, P3, and P4 have all arrived. We calculate their Response Ratios:
    - **P2**: W = 5 - 1 = 4. RR = (4 + 3) / 3 = **2.33**
    - **P3**: W = 5 - 2 = 3. RR = (3 + 8) / 8 = **1.375**
    - **P4**: W = 5 - 3 = 2. RR = (2 + 6) / 6 = **1.33**
    - **P2** has the highest RR, so it runs next.
3.  **Time 8**: P2 finishes. Ready: P3, P4.
    - **P3**: W = 8 - 2 = 6. RR = (6 + 8) / 8 = **1.75**
    - **P4**: W = 8 - 3 = 5. RR = (5 + 6) / 6 = **1.83**
    - **P4** has the highest RR, so it runs next.
4.  **Time 14**: P4 finishes. Only **P3** remains.
5.  **Time 22**: P3 finishes.

**Final Table:**
| Process | AT | BT | CT | TAT (CT-AT) | WT (TAT-BT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 5 | 5 | 5 | 0 |
| **P2** | 1 | 3 | 8 | 7 | 4 |
| **P4** | 3 | 6 | 14 | 11 | 5 |
| **P3** | 2 | 8 | 22 | 20 | 12 |

- **Average TAT**: 10.75 ms
- **Average WT**: 5.25 ms

---

## ✅ Advantages
- **Fairness**: Balances waiting time and burst time.
- **No Starvation**: Long processes eventually get a high enough ratio to execute.
- **Performance**: Generally provides a better response time than FCFS.

## ❌ Disadvantages
- **Feasibility**: Difficult to implement in practice because burst times (S) are often unknown.
- **Overhead**: Requires frequent RR calculations for all waiting processes.

---

## 🎯 Interview Preparation
- **HRRN vs SJF**: HRRN is a modification of SJF that uses **Response Ratio** instead of just **Burst Time** to select the next process.
- **Aging in HRRN**: The waiting time **W** in the numerator acts as a natural aging mechanism.
