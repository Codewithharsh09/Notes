---
title: Process Schedulers
description: Detailed notes on Long-Term, Short-Term, and Medium-Term Schedulers in Operating Systems.
---

# Process Schedulers in Operating System

Process scheduling is the activity of the process manager that handles the removal of the running process from the CPU and the selection of another process based on a particular strategy. Throughout its lifetime, a process moves between various scheduling queues, such as the **ready queue**, **waiting queue**, or **device queue**.

## What is a Process Scheduler?
Process Schedulers are fundamental components of operating systems responsible for deciding the order in which processes are executed by the CPU. They manage how the CPU allocates its time among multiple tasks or processes that are competing for its attention.

---

## 1. Long-Term Scheduler (Job Scheduler)
The Long-Term Scheduler is responsible for loading processes from the disk into main memory so they can begin execution.

- **Queue Transfer:** Transfers processes from the Job Queue to the Ready Queue.
- **Degree of Multiprogramming:** Controls how many processes are present in memory at any time.
- **Process Mix:** Selects a balanced mix of I/O-bound and CPU-bound processes to ensure efficient system performance.
- **Speed:** It is the slowest among all schedulers as it operates less frequently.
- **Note:** In many modern time-sharing systems (like Windows), a long-term scheduler may not exist; new processes are admitted directly to memory.

---

## 2. Short-Term Scheduler (CPU Scheduler)
The Short-Term Scheduler (STS) is responsible for selecting a process from the ready queue and assigning the CPU to it.

- **Frequency:** Operates very frequently (often every few milliseconds), making it the fastest scheduler.
- **Fairness:** Maintains fairness by allocating CPU time among processes.
- **Efficiency:** Maximizes CPU utilization by keeping the processor as busy as possible.
- **Dispatcher Call:** It calls the **Dispatcher** to perform the actual context switch.

### 2.1 Dispatcher
The Dispatcher is a special program that takes over once the short-term scheduler selects a process. It transfers control of the CPU to the chosen process.

**Functions of the Dispatcher:**
- **Context Switching:** Saves the state of the previously running process and restores the state of the new one.
- **Mode Switching:** Ensures correct transition from kernel mode to user mode.
- **Program Control Transfer:** Jumps to the correct starting point in the newly selected program.

> 💡 **Dispatch Latency**: The time taken by the dispatcher to stop one process and start another is called dispatch latency.

---

## 3. Medium-Term Scheduler (MTS)
The Medium-Term Scheduler (MTS) manages **swapping**, which temporarily moves processes between main memory and disk.

- **Swapping Out:** Moves processes from RAM to secondary storage (disk) when they are blocked (e.g., waiting for I/O) to free up memory.
- **Swapping In:** Moves processes back into memory when they are ready to continue.
- **Performance:** Helps maintain an effective mix of processes and handles memory shortages.
- **Speed:** Operates faster than the long-term scheduler but slower than the short-term scheduler.

---

## Comparison Summary

| Feature | Long-Term Scheduler | Short-Term Scheduler | Medium-Term Scheduler |
| :--- | :--- | :--- | :--- |
| **Type** | Job scheduler | CPU scheduler | Swapping scheduler |
| **Speed** | Slowest | Fastest | Medium |
| **Control** | Controls degree of multiprogramming | Little control over multiprogramming | Reduces degree of multiprogramming |
| **Presence** | Rare in time-sharing systems | Essential | Present as a component |
| **Function** | Selects processes from job pool | Selects ready processes for CPU | Handles swapping and memory |

---

## Other Schedulers
- **I/O Schedulers:** Manage the order of read/write operations to reduce I/O wait time (using algorithms like FCFS, SCAN, C-SCAN).
- **Real-Time Schedulers:** Ensure tasks meet specific deadlines (using algorithms like EDF and Rate Monotonic).

---

## 🎯 Interview Preparation: Key Takeaways & Questions

### 💡 Top Interview Questions & Tips

1. **Why is the Long-Term Scheduler called a Job Scheduler?**
   - *Answer*: Because it selects "jobs" from a pool of processes (the job queue) to be admitted into the system for execution.

2. **What is Dispatch Latency?**
   - *Answer*: It is the time required by the dispatcher to stop one process and start another. Minimizing this is crucial for system performance.

3. **Why do we need a Medium-Term Scheduler?**
   - *Answer*: It helps in managing memory more effectively by swapping out processes that are not currently active, thereby reducing the degree of multiprogramming when memory is scarce.

4. **Which scheduler controls the "Degree of Multiprogramming"?**
   - *Answer*: The **Long-Term Scheduler**. By deciding how many processes enter the ready queue, it directly dictates how many processes are competing for resources.

5. **What happens if the Long-Term Scheduler selects only I/O-bound processes?**
   - *Answer*: The CPU will remain idle most of the time while the I/O devices will be overloaded. A good scheduler must maintain a balanced mix of CPU-bound and I/O-bound processes.
