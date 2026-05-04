---
title: Multilevel Feedback Queue Scheduling
description: Detailed explanation of Multilevel Feedback Queue (MLFQ) CPU scheduling, its dynamic priority adjustment, starvation solutions, and advantages over standard MLQ.
---

# Multilevel Feedback Queue Scheduling (MLFQ)

**Multilevel Feedback Queue (MLFQ)** is one of the most sophisticated CPU scheduling algorithms. While it is similar to Multilevel Queue (MLQ) scheduling, its defining feature is that **processes can move between queues**.

This flexibility allows the operating system to dynamically adjust a process's priority based on its past behavior, making it highly efficient for diverse workloads.

---

## ⭐ Core Characteristics
- **Dynamic Movement**: Processes are not permanently assigned to a queue; they move up or down based on CPU usage.
- **Feedback Loop**: The OS "learns" from the process's behavior (CPU-bound vs. I/O-bound) and adjusts its placement accordingly.
- **Fairness**: It aims to give high priority to short and interactive tasks while ensuring long tasks eventually finish.

---

## 🛠️ How it Works (Implementation)
A typical MLFQ setup might look like this:
1.  **Queue 1 (Highest Priority)**: Uses Round Robin with a very small Time Quantum (e.g., 4ms).
2.  **Queue 2 (Medium Priority)**: Uses Round Robin with a larger Time Quantum (e.g., 8ms).
3.  **Queue 3 (Lowest Priority)**: Uses FCFS (First-Come, First-Served).

**Rules of Movement:**
- **Demotion**: If a process in Queue 1 uses its full time quantum without blocking for I/O, it is considered "CPU-heavy" and is moved down to Queue 2.
- **Promotion**: If a process waits too long in a lower-priority queue, the OS can "boost" its priority back to a higher queue to prevent starvation.
- **Execution**: A process in a lower queue only runs if all higher queues are empty.

---

## 📊 Example: CPU-Bound Process
Consider a process **P** that requires **40 seconds** of burst time in a system with 5 queues:
- **Q1**: TQ = 2s
- **Q2**: TQ = 7s
- **Q3**: TQ = 12s
- **Q4**: TQ = 17s
- **Q5**: TQ = 22s

**Execution Flow:**
1.  **Q1**: P runs for 2s $\rightarrow$ Interrupted (Remaining: 38s) $\rightarrow$ Moves to **Q2**.
2.  **Q2**: P runs for 7s $\rightarrow$ Interrupted (Remaining: 31s) $\rightarrow$ Moves to **Q3**.
3.  **Q3**: P runs for 12s $\rightarrow$ Interrupted (Remaining: 19s) $\rightarrow$ Moves to **Q4**.
4.  **Q4**: P runs for 17s $\rightarrow$ Interrupted (Remaining: 2s) $\rightarrow$ Moves to **Q5**.
5.  **Q5**: P runs for the final 2s and completes.

**Result**: The process was interrupted **4 times** and terminated in **Queue 5**.

---

## ✅ Advantages
- **Extremely Flexible**: Adapts to the changing behavior of processes.
- **Optimizes TAT**: By running shorter jobs in higher queues, it mimics the behavior of SJF without knowing the burst time in advance.
- **Great Response Time**: Interactive tasks (which usually have short bursts) stay in the top queues and get immediate CPU access.
- **Starvation Solution**: Priority boosting ensures all processes eventually finish.

## ❌ Disadvantages
- **Complexity**: It is the most complex algorithm to implement and requires careful tuning of quanta and promotion/demotion rules.
- **Overhead**: Frequent monitoring and moving of processes between queues add computational overhead.

---

## 🎯 Interview Preparation: MLQ vs MLFQ
- **MLQ**: Processes are **static**. A batch job stays a batch job. High risk of starvation for low-priority queues.
- **MLFQ**: Processes are **dynamic**. A batch job that waits too long can be boosted. It "learns" whether a process is I/O-bound or CPU-bound by observing how much of its quantum it uses.
