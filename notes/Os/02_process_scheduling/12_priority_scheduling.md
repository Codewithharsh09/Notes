---
title: Priority Scheduling
description: Detailed explanation of Priority Scheduling (Preemptive and Non-Preemptive) in Operating Systems, including examples, Gantt charts, and performance metrics.
---

# Priority Scheduling in Operating System

**Priority Scheduling** is a common scheduling algorithm where each process is assigned a priority value. The process with the highest priority is selected for execution first. If multiple processes have the same priority, they are scheduled using the **FCFS** (First-Come, First-Served) approach.

---

## 🔑 Key Concepts
- **Priority Assignment**: Priorities can be defined internally (e.g., time limits, memory needs) or externally (e.g., importance of the process).
- **Priority Logic**: In some systems, a **lower number** represents a higher priority (e.g., 0 is highest), while in others, a **higher number** represents a higher priority. Always check the system definition!
- **Starvation**: A major issue where low-priority processes wait indefinitely.
- **Aging**: A technique to gradually increase the priority of processes that wait for a long time, preventing starvation.

---

## 1. Non-Preemptive Priority Scheduling
In this approach, once a process starts running, it holds the CPU until it completes, even if a higher-priority process arrives.

### Example (Lower Number = Higher Priority)
| Process | Arrival Time | Burst Time | Priority |
| :--- | :--- | :--- | :--- |
| P1 | 0 | 4 | 2 |
| P2 | 1 | 2 | 1 |
| P3 | 2 | 6 | 3 |

**Step-by-Step Execution:**
- **Time 0**: Only P1 is available. It starts and runs until completion (T=4) because it's non-preemptive.
- **Time 4**: P1 finishes. Both P2 (Pri: 1) and P3 (Pri: 3) are ready. **P2** has higher priority.
- **Time 6**: P2 finishes. **P3** starts.
- **Time 12**: P3 finishes.

**Gantt Chart:**
```text
|    P1    |  P2  |       P3       |
0          4      6               12
```

**Performance Metrics:**
| Process | AT | BT | CT | TAT (CT-AT) | WT (TAT-BT) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 4 | 4 | 4 | 0 |
| **P2** | 1 | 2 | 6 | 5 | 3 |
| **P3** | 2 | 6 | 12 | 10 | 4 |

- **Average TAT**: 6.33 ms
- **Average WT**: 2.33 ms

---

## 2. Preemptive Priority Scheduling
In this approach, the CPU is immediately switched to a newly arrived process if its priority is higher than the currently running process.

### Example A: Same Arrival Time (Higher Number = Higher Priority)
| Process | Arrival Time | Burst Time | Priority |
| :--- | :--- | :--- | :--- |
| P1 | 0 | 7 | 2 |
| P2 | 0 | 4 | 1 |
| P3 | 0 | 6 | 3 |

**Gantt Chart:**
```text
|    P3    |       P1       |    P2    |
0          6                13         17
```

**Performance Metrics:**
| Process | AT | BT | CT | TAT | WT |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 7 | 13 | 13 | 6 |
| **P2** | 0 | 4 | 17 | 17 | 13 |
| **P3** | 0 | 6 | 6 | 6 | 0 |

---

### Example B: Different Arrival Time
| Process | Arrival Time | Burst Time | Priority |
| :--- | :--- | :--- | :--- |
| P1 | 0 | 6 | 2 |
| P2 | 1 | 4 | 3 |
| P3 | 2 | 5 | 1 |

**Step-by-Step Execution:**
- **Time 0**: P1 starts (Rem: 6ms).
- **Time 1**: P2 arrives (Pri: 3). Since **3 > 2**, P1 is preempted. **P2** starts.
- **Time 5**: P2 completes. Ready: P1 (5ms, Pri: 2), P3 (5ms, Pri: 1). **P1** starts.
- **Time 10**: P1 completes. **P3** starts.
- **Time 15**: P3 completes.

**Gantt Chart:**
```text
| P1 |   P2   |    P1    |    P3    |
0    1        5          10         15
```

**Performance Metrics:**
| Process | AT | BT | CT | TAT | WT |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | 0 | 6 | 10 | 10 | 4 |
| **P2** | 1 | 4 | 5 | 4 | 0 |
| **P3** | 2 | 5 | 15 | 13 | 8 |

---

## ✅ Advantages
- **Flexibility**: Allows important tasks to be prioritized.
- **Control**: The OS can adjust priorities dynamically based on resource usage.

## ❌ Disadvantages
- **Starvation**: Low-priority processes may wait indefinitely if the system is busy with high-priority tasks.
- **Solution**: **Aging** is required to ensure fairness.

---

## 🎯 Interview Preparation: Priority Inversion
A common advanced topic is **Priority Inversion**, where a high-priority process is blocked by a low-priority process (e.g., waiting for a resource like a mutex) while a medium-priority process continues to run. This is solved using **Priority Inheritance Protocols**.
