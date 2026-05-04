---
title: SJF Scheduling
description: Detailed explanation of Shortest Job First (SJF) CPU scheduling, including estimation formulas, examples, and advantages.
---

# Shortest Job First (SJF) CPU Scheduling

**Shortest Job First (SJF)**, also known as **Shortest Job Next (SJN)**, is a scheduling policy that selects the waiting process with the smallest execution time (burst time) to execute next. 

SJF is primarily a **non-preemptive** algorithm, but its preemptive version is known as **Shortest Remaining Time First (SRTF)**.

---

## 🧠 Estimation Formula
In many systems, the exact burst time of a process isn't known in advance. The OS predicts the next burst time using exponential averaging:

**T(n+1) = α * t(n) + (1 - α) * T(n)**

Where:
- **T(n+1)**: Predicted burst time for the next process.
- **t(n)**: Actual burst time of the previous process.
- **T(n)**: Previously predicted burst time.
- **α**: Smoothing factor (0 ≤ α ≤ 1). Typically set to 0.5.

---

## ⭐ Characteristics
- **Optimal Average WT**: SJF provides the minimum average waiting time among all scheduling algorithms.
- **Starvation Risk**: Long processes may never get a chance to run if shorter processes keep arriving.
- **Solution to Starvation**: **Aging** (gradually increasing the priority of older processes).

---

## 📊 Example of SJF (Non-Preemptive)

Consider three processes with the following arrival and burst times:

| Process | Burst Time | Arrival Time |
| :--- | :--- | :--- |
| P1 | 6 ms | 0 ms |
| P2 | 8 ms | 2 ms |
| P3 | 3 ms | 4 ms |

**Step-by-Step Execution:**
1.  **Time 0**: Only **P1** is available. It runs for 6ms.
2.  **Time 6**: P1 completes. Both **P2** (arrived at 2) and **P3** (arrived at 4) are in the ready queue.
3.  **Selection**: **P3** has a shorter burst time (3ms) than P2 (8ms), so P3 runs next.
4.  **Time 9**: P3 completes. **P2** starts.
5.  **Time 17**: P2 completes.

**Gantt Chart:**
```text
|    P1    |  P3  |       P2       |
0          6      9               17
```

**Calculations:**

| Process | AT | BT | CT | TAT (CT-AT) | WT (TAT-BT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 6 | 6 | 6 | 0 |
| **P2** | 2 | 8 | 17 | 15 | 7 |
| **P3** | 4 | 3 | 9 | 5 | 2 |

- **Average TAT**: (6 + 15 + 5) / 3 = **8.67 ms**
- **Average WT**: (0 + 7 + 2) / 3 = **3.0 ms**

---

## ✅ Advantages
- **Optimal Efficiency**: Minimizes the average waiting time for a set of processes.
- **Batch Processing**: Excellent for batch systems where run times are known in advance.
- **Overall Speed**: Improves throughput by clearing short jobs quickly.

## ❌ Disadvantages
- **Unpredictability**: Knowing the exact CPU burst time in advance is difficult in real-time systems.
- **Starvation**: Long processes might wait indefinitely (Starvation).
- **Complexity**: Requires tracking previous burst times to predict future ones.

---

## 🎯 Interview Preparation: Starvation & Aging
- **Starvation**: A state where a process is ready to run but is perpetually ignored because the scheduler always finds a "better" (shorter) process.
- **Aging**: The remedy for starvation. The longer a process waits, the more its priority increases (or its effective "burst time" for the scheduler decreases) until it is finally executed.
