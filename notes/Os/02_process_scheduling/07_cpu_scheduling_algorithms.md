---
title: CPU Scheduling Algorithms
description: Overview of CPU scheduling terminologies, factors, types, and various algorithms like FCFS, SJF, SRTF, and Round Robin.
---

# CPU Scheduling in Operating Systems

CPU scheduling is a process used by the operating system to decide which task or process gets to use the CPU at a particular time. Since a CPU can only handle one task at a time, but many tasks typically compete for processing, the OS must manage this resource efficiently.

## Core Purposes of CPU Scheduling
- **Maximize CPU Utilization**: Keep the CPU as busy as possible.
- **Minimize Response & Waiting Time**: Ensure processes aren't sitting in queues longer than necessary.
- **Maximize Throughput**: Complete as many processes as possible per unit of time.

---

## Key Terminologies
Understanding these terms is crucial for solving scheduling problems:

| Term | Definition |
| :--- | :--- |
| **Arrival Time (AT)** | The time at which the process arrives in the ready queue. |
| **Completion Time (CT)** | The time at which the process finishes its execution. |
| **Burst Time (BT)** | The actual time required by a process for CPU execution. |
| **Turn Around Time (TAT)** | Total time spent in the system. `TAT = CT - AT` |
| **Waiting Time (WT)** | Time spent waiting in the ready queue. `WT = TAT - BT` |
| **Response Time (RT)** | Time from submission until the *first* response is produced. |

---

## Important Factors in CPU Scheduling
1. **CPU Utilization**: Real-time systems aim for 40% to 90% usage.
2. **Throughput**: The number of processes completed per unit of time.
3. **Turnaround Time**: Total time from submission to completion.
4. **Waiting Time**: Time spent waiting in the ready queue (the scheduler only affects this).
5. **Response Time**: Crucial in interactive systems where a quick first response is better than a late complete output.

---

## Types of Scheduling Methods

### 1. Preemptive Scheduling
The OS can interrupt a running process to allocate the CPU to another (e.g., when a higher priority process arrives or a time quantum expires).
*   **Transitions**: Running → Ready, Waiting → Ready.

### 2. Non-Preemptive Scheduling
Once a process starts running, it holds the CPU until it terminates or blocks itself for I/O.
*   **Transitions**: Running → Terminated, Running → Waiting.

> 📖 **Deep Dive**: For a detailed comparison, see [Preemptive vs Non-Preemptive Scheduling](./16_preemptive_non_preemptive.md).

---

## List of CPU Scheduling Algorithms

1.  **[FCFS (First Come, First Serve)](./08_fcfs.md)**: Simplest; processes are handled in arrival order. (Non-preemptive)
2.  **[SJF (Shortest Job First)](./09_sjf.md)**: Picks the process with the smallest burst time. (Non-preemptive)
3.  **[SRTF (Shortest Remaining Time First)](./10_srtf.md)**: Preemptive version of SJF.
4.  **[Round Robin (RR)](./11_round_robin.md)**: Each process gets a fixed time unit (Time Quantum). (Preemptive)
5.  **[Priority Scheduling](./12_priority_scheduling.md)**: CPU is allocated based on priority levels. (Can be both)
6.  **[HRRN (Highest Response Ratio Next)](./13_hrrn.md)**: Prevents starvation by considering waiting time.
7.  **[Multilevel Queue (MLQ)](./14_multilevel_queue.md)**: Processes are partitioned into different queues.
8.  **[Multilevel Feedback Queue (MLFQ)](./15_multilevel_feedback_queue.md)**: Processes can move between queues based on behavior.

---

## Comparison Table

| Algorithm | Allocation | Complexity | Preemption | Starvation |
| :--- | :--- | :--- | :--- | :--- |
| **FCFS** | Arrival Time | Simple | No | No |
| **SJF** | Shortest BT | Medium | No | Yes |
| **SRTF** | Shortest Remaining BT | High | Yes | Yes |
| **RR** | Time Quantum | Medium | Yes | No |
| **Priority** | Priority Level | Medium | Both | Yes |
| **MLFQ** | Priority + TQ | Very High | Yes | No |

---

## 📝 Practice Questions

**Q1: Which of the following is true about SJF?**
- S1: It causes minimum average waiting time.
- S2: It can cause starvation.
*Answer*: Both S1 and S2 are true.

**Q2: Average Waiting Time Calculation (SRTF)**
| Process | Arrival Time | Burst Time |
| :--- | :--- | :--- |
| P0 | 0 ms | 9 ms |
| P1 | 1 ms | 4 ms |
| P2 | 2 ms | 9 ms |
*Solution*: 
- P0 runs for 1ms, then P1 (shorter) arrives and preempts P0.
- P1 runs for 4ms (finishes at 5ms).
- P0 resumes (rem. 8ms) because P2 (9ms) is longer. P0 finishes at 13ms.
- P2 runs (finishes at 22ms).
- **Average WT**: (P0: 4 + P1: 0 + P2: 11) / 3 = **5.0 ms**.

---

## 🎯 Interview Preparation

1.  **Why does SJF give the minimum average waiting time?**
    - *Tip*: It’s mathematically proven that by executing the shortest tasks first, you reduce the sum of waiting times for all subsequent processes.
2.  **What is the "Convoy Effect" in FCFS?**
    - *Answer*: When a large CPU-bound process blocks smaller I/O-bound processes, causing low resource utilization.
3.  **How do you solve Starvation in Priority Scheduling?**
    - *Answer*: Using **Aging**—gradually increasing the priority of processes that wait in the system for a long time.
