---
title: SRTF Scheduling
description: Detailed explanation of Shortest Remaining Time First (SRTF) CPU scheduling, a preemptive version of SJF, with examples and performance analysis.
---

# Shortest Remaining Time First (SRTF) Scheduling

**Shortest Remaining Time First (SRTF)** is the **preemptive** version of the Shortest Job First (SJF) scheduling algorithm. 

In SRTF, the process with the smallest remaining execution time is selected to execute. If a new process arrives with a remaining time shorter than the current running process's remaining time, the current process is **preempted** (interrupted), and the new process is given the CPU.

---

## 📊 Example 1: Processes with Same Arrival Time
If all processes arrive at the same time, SRTF behaves exactly like Non-Preemptive SJF.

| Process | Burst Time | Arrival Time |
| :--- | :--- | :--- |
| P1 | 6 ms | 0 ms |
| P2 | 8 ms | 0 ms |
| P3 | 5 ms | 0 ms |

**Gantt Chart:**
```text
|  P3  |    P1    |       P2       |
0      5          11              19
```

**Calculations:**

| Process | AT | BT | CT | TAT (CT-AT) | WT (TAT-BT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 6 | 11 | 11 | 5 |
| **P2** | 0 | 8 | 19 | 19 | 11 |
| **P3** | 0 | 5 | 5 | 5 | 0 |

- **Average TAT**: (11 + 19 + 5) / 3 = **11.67 ms**
- **Average WT**: (5 + 11 + 0) / 3 = **5.33 ms**

---

## 📊 Example 2: Processes with Different Arrival Times (Preemption)
This scenario demonstrates the preemptive nature of SRTF.

| Process | Burst Time | Arrival Time |
| :--- | :--- | :--- |
| P1 | 6 ms | 0 ms |
| P2 | 3 ms | 1 ms |
| P3 | 7 ms | 2 ms |

**Step-by-Step Execution:**
1.  **Time 0**: **P1** arrives and starts (Rem: 6ms).
2.  **Time 1**: **P2** (BT: 3ms) arrives. P1's remaining time is 5ms. Since **3ms < 5ms**, P1 is preempted, and **P2** starts.
3.  **Time 2**: **P3** (BT: 7ms) arrives. P2's remaining time is 2ms. P2 continues because 2ms is the smallest among all.
4.  **Time 4**: P2 completes. Remaining: P1 (5ms), P3 (7ms). **P1** starts.
5.  **Time 9**: P1 completes. **P3** starts.
6.  **Time 16**: P3 completes.

**Gantt Chart:**
```text
| P1 |   P2   |    P1    |       P3       |
0    1        4          9               16
```

**Calculations:**

| Process | AT | BT | CT | TAT (CT-AT) | WT (TAT-BT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 6 | 9 | 9 | 3 |
| **P2** | 1 | 3 | 4 | 3 | 0 |
| **P3** | 2 | 7 | 16 | 14 | 7 |

- **Average TAT**: (9 + 3 + 14) / 3 = **8.67 ms**
- **Average WT**: (3 + 0 + 7) / 3 = **3.33 ms**

---

## ✅ Advantages
- **Optimal Average WT**: Like SJF, it minimizes the average waiting time.
- **Responsiveness**: Short processes finish very quickly, even if they arrive after long ones.
- **Priority**: Ensures that time-critical (short) tasks get CPU attention immediately.

## ❌ Disadvantages
- **Starvation**: Long processes may never finish if a steady stream of short processes keeps arriving.
- **Overhead**: Frequent context switches (every time a shorter job arrives) can reduce overall system performance.
- **Complexity**: Requires the OS to constantly monitor remaining times and handle preemption.

---

## 🎯 Interview Preparation: SJF vs SRTF
- **SJF (Non-Preemptive)**: Only checks for the shortest job when the current one *finishes*.
- **SRTF (Preemptive)**: Checks for the shortest job *every time* a new process arrives.
- **Starvation**: Both are prone to it, and the solution is always **Aging**.
