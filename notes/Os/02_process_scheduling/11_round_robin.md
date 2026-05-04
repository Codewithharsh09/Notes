---
title: Round Robin Scheduling
description: Detailed explanation of Round Robin (RR) CPU scheduling, including time quantum mechanics, examples, and its use in time-sharing systems.
---

# Round Robin (RR) Scheduling

**Round Robin (RR)** is one of the most popular and fair CPU scheduling algorithms. It is specifically designed for **time-sharing systems**. It allocates a fixed time unit per process, called a **Time Quantum** or **Time Slice**, and cycles through all ready processes.

---

## ⚙️ How Round Robin Works
1.  **Process Arrival**: Processes enter the system and are placed in a FIFO ready queue.
2.  **Time Allocation**: Each process is assigned a small unit of CPU time (e.g., 2ms), called the **Time Quantum**.
3.  **Execution**: 
    - If the process's burst time is **≤ Time Quantum**, it executes and terminates.
    - If the burst time is **> Time Quantum**, it executes for one quantum and is then moved to the **back of the ready queue**.
4.  **Repeat**: The CPU cycles through the queue until all processes are complete.

---

## 📊 Example 1: Same Arrival Time
Consider three processes arriving at time **0** with **Time Quantum = 2ms**.

| Process | Burst Time | Arrival Time |
| :--- | :--- | :--- |
| P1 | 4 ms | 0 ms |
| P2 | 5 ms | 0 ms |
| P3 | 3 ms | 0 ms |

**Step-by-Step Execution:**
- **Time 0-2**: P1 runs (Rem: 2ms). Queue: [P2, P3, P1]
- **Time 2-4**: P2 runs (Rem: 3ms). Queue: [P3, P1, P2]
- **Time 4-6**: P3 runs (Rem: 1ms). Queue: [P1, P2, P3]
- **Time 6-8**: P1 finishes. Queue: [P2, P3]
- **Time 8-10**: P2 runs (Rem: 1ms). Queue: [P3, P2]
- **Time 10-11**: P3 finishes. Queue: [P2]
- **Time 11-12**: P2 finishes.

**Gantt Chart:**
```text
| P1 | P2 | P3 | P1 | P2 | P3 | P2 |
0    2    4    6    8    10   11   12
```

**Calculations:**

| Process | AT | BT | CT | TAT (CT-AT) | WT (TAT-BT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 4 | 8 | 8 | 4 |
| **P2** | 0 | 5 | 12 | 12 | 7 |
| **P3** | 0 | 3 | 11 | 11 | 8 |

- **Average TAT**: (8 + 12 + 11) / 3 = **10.33 ms**
- **Average WT**: (4 + 7 + 8) / 3 = **6.33 ms**

---

## 📊 Example 2: Different Arrival Times
Consider processes with different arrival times and **Time Quantum = 2ms**.

| Process | Burst Time | Arrival Time |
| :--- | :--- | :--- |
| P1 | 5 ms | 0 ms |
| P2 | 2 ms | 4 ms |
| P3 | 4 ms | 5 ms |

**Step-by-Step Execution:**
1.  **Time 0-4**: P1 runs for two quanta (since no one else is there). Rem: 1ms. At T=4, P2 arrives. Queue: [P2, P1]
2.  **Time 4-6**: P2 runs and finishes. At T=5, P3 arrives. Queue: [P1, P3]
3.  **Time 6-7**: P1 runs and finishes. Queue: [P3]
4.  **Time 7-11**: P3 runs for two quanta and finishes.

**Gantt Chart:**
```text
| P1 | P1 | P2 | P1 | P3 | P3 |
0    2    4    6    7    9    11
```

**Calculations:**

| Process | AT | BT | CT | TAT (CT-AT) | WT (TAT-BT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 5 | 7 | 7 | 2 |
| **P2** | 4 | 2 | 6 | 2 | 0 |
| **P3** | 5 | 4 | 11 | 6 | 2 |

- **Average TAT**: (7 + 2 + 6) / 3 = **5.0 ms**
- **Average WT**: (2 + 0 + 2) / 3 = **1.33 ms**

---

## ✅ Advantages
- **Fairness**: Every process gets an equal share of the CPU.
- **Interactive Friendly**: Ideal for time-sharing systems where every user needs a quick response.
- **Starvation-Free**: No process waits indefinitely; it will always get its turn.

## ❌ Disadvantages
- **High Overhead**: If the Time Quantum is very small, frequent context switching wastes CPU time.
- **Unresponsive**: If the Time Quantum is too large, it behaves like FCFS and loses its interactive benefits.
- **AWT Performance**: Average waiting time is often higher than in SJF or SRTF.

---

## 🎯 Interview Preparation: Time Quantum
- **If Time Quantum is too large**: Round Robin degrades into **FCFS**.
- **If Time Quantum is too small**: Context switching overhead becomes too high, leading to low efficiency.
- **Rule of Thumb**: About 80% of CPU bursts should be shorter than the time quantum.
