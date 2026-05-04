---
title: FCFS Scheduling
description: Detailed explanation of First Come First Serve (FCFS) CPU scheduling algorithm with examples and Gantt charts.
---

# FCFS - First Come First Serve CPU Scheduling

**First Come, First Serve (FCFS)** is the simplest CPU scheduling algorithm. As the name suggests, the process that requests the CPU first is allocated the CPU first. It is managed with a **FIFO (First-In, First-Out)** queue.

FCFS is a **non-preemptive** algorithm. Once a process starts executing, it continues until it terminates or blocks for I/O.

---

## ⚙️ How Does FCFS Work?
1.  **Arrival**: Processes enter the ready queue in the order they arrive (FIFO order).
2.  **Execution**: The CPU selects the process at the front of the queue and executes it completely (since FCFS is non-preemptive).
3.  **Repeat**: Once the current process finishes, the CPU picks the next process in the queue and continues this until the queue is empty.

    **Explanation**: In FCFS scheduling, processes are executed in the order they arrive in the ready queue. The CPU always picks the first process in the queue and runs it to completion without interruption. After it finishes, the next process is selected. This continues until all processes are executed.
---

## 📊 Examples of FCFS Scheduling

### Scenario 1: Processes with Same Arrival Time
Consider three processes arriving at time **0**.

| Process | Arrival Time | Burst Time |
| :--- | :--- | :--- |
| P1 | 0 | 5 |
| P2 | 0 | 3 |
| P3 | 0 | 8 |

**Gantt Chart:**
```text
|    P1    |  P2  |       P3       |
0          5      8               16
```

**Calculations:**
- **Turnaround Time (TAT)** = Completion Time - Arrival Time
- **Waiting Time (WT)** = Turnaround Time - Burst Time

| Process | AT | BT | CT | TAT | WT |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 5 | 5 | 5 | 0 |
| **P2** | 0 | 3 | 8 | 8 | 5 |
| **P3** | 0 | 8 | 16 | 16 | 8 |

- **Average TAT**: (5 + 8 + 16) / 3 = **9.67 ms**
- **Average WT**: (0 + 5 + 8) / 3 = **4.33 ms**

---

### Scenario 2: Processes with Different Arrival Times
Consider three processes arriving at different times.

| Process | Arrival Time | Burst Time |
| :--- | :--- | :--- |
| P1 | 2 | 5 |
| P2 | 0 | 3 |
| P3 | 4 | 4 |

**Step-by-Step Execution:**
1.  **Time 0**: P2 arrives and starts running (BT=3).
2.  **Time 3**: P2 finishes. P1 (arrived at 2) starts (BT=5).
3.  **Time 8**: P1 finishes. P3 (arrived at 4) starts (BT=4).
4.  **Time 12**: P3 finishes.

**Gantt Chart:**
```text
|  P2  |    P1    |   P3   |
0      3          8       12
```

**Calculations:**

| Process | AT | BT | CT | TAT | WT |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P2** | 0 | 3 | 3 | 3 | 0 |
| **P1** | 2 | 5 | 8 | 6 | 1 |
| **P3** | 4 | 4 | 12 | 8 | 4 |

- **Average TAT**: (3 + 6 + 8) / 3 = **5.67 ms**
- **Average WT**: (0 + 1 + 4) / 3 = **1.67 ms**

---

## ✅ Advantages
- **Simple**: Easy to understand and implement using a FIFO queue.
- **Fair**: Every process gets a chance to execute in the order it arrived.
- **No Starvation**: Every process will eventually be executed.

## ❌ Disadvantages
- **Convoy Effect**: Short processes might have to wait for a very long process to finish (e.g., if P1 is huge and P2 is tiny).
- **High Average WT**: The average waiting time is often higher compared to other algorithms like SJF.
- **Not for Time-Sharing**: Inefficient for interactive systems where quick responses are needed.

---

## 🎯 Interview Tips: Convoy Effect
The **Convoy Effect** is a common interview topic. It occurs when multiple short processes wait for one long, CPU-bound process to finish. This leads to poor utilization of I/O devices (which sit idle while the CPU-bound process runs) and the CPU (which might sit idle later while all the I/O-bound processes do their I/O).
