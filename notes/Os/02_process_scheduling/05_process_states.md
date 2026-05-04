---
title: States of a Process
description: Detailed notes on the lifecycle and states of a process in an operating system.
---

# States of a Process in Operating Systems

A process in an operating system passes through multiple states as it begins execution, waits for resources, gets scheduled, runs, and eventually finishes. These stages collectively describe the complete lifecycle of a process.

## Types of Process States

### 1. Two-State Model
The Two-State Model divides the process lifecycle into only two possible conditions. A process is either actively using the CPU to execute instructions or waiting until it gets a chance to run.

- **Running:** The process is currently using the CPU to execute its tasks.
- **Not Running:** The process is not using the CPU. It may be waiting for input, waiting for resources, or simply paused.

When a new process is created, it starts in the **not running** state and is managed by a program called the **dispatcher**.

### 2. Five-State Model
The five-state process lifecycle expands the basic two-state idea by separating processes that are simply waiting for CPU time from those that cannot run because they are waiting for an external event.

- **New:** The process has just been created. Its PCB (Process Control Block) is prepared, but it hasn't started running.
- **Ready:** The process is loaded into memory and prepared to run as soon as the CPU becomes free.
- **Running:** The CPU is currently executing this process.
- **Blocked/Waiting:** The process cannot continue because it is waiting for an event (like I/O completion).
- **Exit/Terminate:** The process has completed or been stopped, and the OS removes it from memory.

### 3. Seven-State Model
The Seven-State Model adds "Suspend" states to handle memory management more efficiently, especially when memory is short.

- **Suspend Ready:** A ready process that has been swapped out of main memory and placed in secondary storage.
- **Suspend Blocked:** A blocked process that has been swapped out to secondary storage.
- **CPU-Bound vs I/O-Bound:** 
    - **CPU-bound:** Spends most time performing computations.
    - **I/O-bound:** Spends more time waiting for input/output operations.

## Movement of a Process From One State to Another

1. **New → Ready:** Process is created and loaded into main memory.
2. **Ready → Running:** The scheduler selects a ready process and assigns the CPU.
3. **Running → Blocked:** Process waits for an event or resource (e.g., I/O).
4. **Blocked → Ready:** Event completes, and the process is ready to run again.
5. **Running → Ready:** OS preempts the process (e.g., time-out or higher priority task).
6. **Running → Terminated:** Process completes its execution.

## Schedulers
Schedulers decide which process should be executed by the CPU at a given time.

| Type | Description |
| :--- | :--- |
| **Long-Term Scheduler** | Decides which processes enter the ready state (Job Scheduler). |
| **Short-Term Scheduler** | Selects the next process from the ready queue to run (CPU Scheduler). |
| **Medium-Term Scheduler** | Handles swapping (moving processes between RAM and Disk). |

## Preemption vs Non-Preemption

- **Preemption:** Process is forcefully removed from the CPU (multitasking/time-sharing).
- **Non-Preemption:** Process holds the CPU until it completes or releases it voluntarily.

## Operations on the Process
- **Creation:** Process is placed in the ready queue.
- **Scheduling:** Selection of a process to run.
- **Execution:** CPU runs the process.
- **Termination:** OS clears the process context.
- **Blocking:** Process waits for resources.
- **Context Switching:** Saving/loading process state during switches.
- **Inter-Process Communication (IPC):** Exchanging data between processes.

---

## 🎯 Interview Preparation: Key Takeaways & Questions

### 💡 Top Interview Questions & Tips

1. **What are the various states of a process?**
   - *Answer*: The primary states are New, Ready, Running, Blocked (Waiting), and Terminated. In a 7-state model, we also have Suspend Ready and Suspend Blocked.

2. **Difference between Ready and Blocked state?**
   - *Answer*: In the **Ready** state, the process is waiting for the CPU to become available. In the **Blocked** state, the process is waiting for an external event (like I/O) and *cannot* use the CPU even if it's free.

3. **What is the role of the Dispatcher?**
   - *Answer*: The dispatcher is the module that gives control of the CPU to the process selected by the short-term scheduler. It handles context switching and jumping to the right location in the program.

4. **Explain the difference between Short-term, Medium-term, and Long-term schedulers.**
   - *Answer*: 
     - **Long-term**: Controls the degree of multiprogramming by selecting jobs from the pool.
     - **Short-term**: Selects which process to run next from the ready queue.
     - **Medium-term**: Handles swapping processes in and out of memory.

5. **What is Preemption?**
   - *Answer*: Preemption is the act of temporarily interrupting a running process without its cooperation, usually to allow a higher-priority process or another process in a time-sliced system to run.

> 🏆 **Pro Tip for Interviews**: When explaining process states, always draw the state transition diagram (even if only in your head or on paper). Mentioning "Degree of Multiprogramming" when talking about Long-term schedulers shows you understand the broader system impact.

