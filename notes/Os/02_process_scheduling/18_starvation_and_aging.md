---
title: Starvation and Aging
description: Detailed explanation of Starvation (indefinite blocking) in CPU scheduling and Aging as the primary solution to ensure fairness.
---

# Starvation and Aging in Operating Systems

In many CPU scheduling algorithms, especially those based on priority, certain processes can wait for an extremely long time without ever getting to execute. This leads to two critical concepts in process management: **Starvation** (the problem) and **Aging** (the solution).

---

## 🛑 Starvation (Indefinite Blocking)
Starvation occurs when a process is ready to run but is perpetually denied CPU time because higher-priority processes are constantly being added to the ready queue.

- **The Problem**: A low-priority process might wait indefinitely if the system is heavily loaded with high-priority tasks.
- **Example**: In a priority system where lower numbers mean higher priority, a process with priority **127** might never run if new processes with priority **0 to 10** keep arriving.

### Causes of Starvation:
1.  **Unfair Scheduling**: Algorithms like Priority Scheduling or SJF naturally favor certain characteristics (high priority or short burst), leaving others behind.
2.  **Limited Resources**: When resources are scarce, they are naturally allocated to the most "important" or "efficient" tasks first.
3.  **Random Selection**: In some cases, a scheduling algorithm might pick a victim process repeatedly by chance.

---

## 📈 Aging: The Solution to Starvation
**Aging** is a technique used to ensure that even the lowest-priority process eventually gets to execute. It works by gradually increasing the priority of processes that have been waiting in the system for a long time.

- **How it works**: At regular intervals (e.g., every 15 minutes), the OS increments the priority of all waiting processes.
- **Example**: If priorities range from 127 (lowest) to 0 (highest), a waiting process can move up one level every few minutes until it eventually becomes the highest-priority process in the queue.

---

## 📊 Comparison: Starvation vs. Aging

| Feature | Starvation | Aging |
| :--- | :--- | :--- |
| **Definition** | A process waits indefinitely for the CPU or resources. | A technique that gradually increases priority over time. |
| **Nature** | It is a **problem** in scheduling. | It is a **solution** to fix that problem. |
| **Priority Change** | Priority remains static, leading to indefinite waiting. | Priority increases over time, helping the process run. |
| **Outcome** | Process may never get the CPU (Forever Waiting). | Ensures every process eventually gets the CPU. |

---

## 🎯 Interview Preparation: Key Takeaways
- **Starvation vs. Deadlock**: 
    - **Starvation**: The process *can* run but is being ignored.
    - **Deadlock**: Two or more processes are stuck waiting for each other, and *none* can proceed.
- **Algorithms Prone to Starvation**: Priority Scheduling, SJF (Shortest Job First), and SRTF (Shortest Remaining Time First).
- **Algorithms that are Starvation-Free**: Round Robin (RR) and FCFS (First-Come, First-Served).
